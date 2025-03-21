"use server"

// NOTE: This file contains functionality for future development
// These features are not implemented in the early tester version

import { revalidatePath } from "next/cache"
import { PromotionAPI } from "@/lib/api-client-crud"
import type { CreatePromotionInput, CreateBookingInput } from "@/lib/api-client-crud"
import Stripe from "stripe"
import { generateQRCode } from "@/lib/qr-generator"
import { sendTicketEmail } from "@/lib/email-service"
import { createClient } from "@supabase/supabase-js"

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

// Promotion actions
export async function createPromotion(formData: FormData) {
  try {
    const data: CreatePromotionInput = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      location: formData.get("location") as string,
      start_date: formData.get("start_date") as string,
      end_date: formData.get("end_date") as string,
      price: Number.parseFloat(formData.get("price") as string),
      discounted_price: formData.get("discounted_price")
        ? Number.parseFloat(formData.get("discounted_price") as string)
        : undefined,
      currency: formData.get("currency") as string,
      category: formData.get("category") as string,
      tags: formData.get("tags") ? (formData.get("tags") as string).split(",").map((tag) => tag.trim()) : undefined,
      max_bookings: formData.get("max_bookings") ? Number.parseInt(formData.get("max_bookings") as string) : undefined,
      commission_rate: Number.parseFloat((formData.get("commission_rate") as string) || "10"),
      itinerary_id: (formData.get("itinerary_id") as string) || undefined,
      promotion_budget: formData.get("promotion_budget")
        ? Number.parseFloat(formData.get("promotion_budget") as string)
        : undefined,
    }

    const promotion = await PromotionAPI.create(data)
    revalidatePath("/promotion")
    return { success: true, data: promotion }
  } catch (error) {
    console.error("Error creating promotion:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function trackPromotionInteraction(
  promotionId: string,
  interactionType: "view" | "click" | "save" | "share",
) {
  try {
    await PromotionAPI.trackInteraction(promotionId, interactionType)
    return { success: true }
  } catch (error) {
    console.error(`Error tracking ${interactionType}:`, error)
    return { success: false, error: (error as Error).message }
  }
}

export async function createBooking(formData: FormData) {
  try {
    const promotionId = formData.get("promotion_id") as string
    const quantity = Number.parseInt(formData.get("quantity") as string)
    const affiliateLinkId = (formData.get("affiliate_link_id") as string) || undefined

    // Create booking in database
    const bookingData: CreateBookingInput = {
      promotion_id: promotionId,
      quantity,
      affiliate_link_id: affiliateLinkId,
    }

    const booking = await PromotionAPI.createBooking(bookingData)

    // Get promotion details for payment
    const { data: promotion } = await PromotionAPI.getById(promotionId)

    if (!promotion) {
      throw new Error("Promotion not found")
    }

    const price = promotion.discounted_price || promotion.price
    const totalAmount = price * quantity

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Convert to cents
      currency: promotion.currency.toLowerCase(),
      metadata: {
        booking_id: booking.id,
        promotion_id: promotionId,
        quantity: quantity.toString(),
      },
    })

    // Update booking with payment intent ID
    await updateBookingPaymentIntent(booking.id, paymentIntent.id)

    revalidatePath(`/promotion/${promotionId}`)
    return {
      success: true,
      data: {
        booking,
        clientSecret: paymentIntent.client_secret,
      },
    }
  } catch (error) {
    console.error("Error creating booking:", error)
    return { success: false, error: (error as Error).message }
  }
}

async function updateBookingPaymentIntent(bookingId: string, paymentIntentId: string) {
  // Update booking with payment intent ID
  const { error } = await supabase.from("bookings").update({ payment_intent_id: paymentIntentId }).eq("id", bookingId)

  if (error) throw error
}

export async function generateAffiliateLink(formData: FormData) {
  try {
    const promotionId = formData.get("promotion_id") as string
    const commissionRate = Number.parseFloat((formData.get("commission_rate") as string) || "5")

    const affiliateLink = await PromotionAPI.generateAffiliateLink(promotionId, commissionRate)

    return { success: true, data: affiliateLink }
  } catch (error) {
    console.error("Error generating affiliate link:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function processSuccessfulPayment(paymentIntentId: string) {
  try {
    // Get payment intent details
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    const bookingId = paymentIntent.metadata.booking_id

    // Update booking status
    const { data: booking, error } = await supabase
      .from("bookings")
      .update({
        payment_status: "paid",
        status: "confirmed",
      })
      .eq("id", bookingId)
      .select("*, promotions(*), users(*)")
      .single()

    if (error) throw error

    // Generate tickets
    for (let i = 0; i < Number.parseInt(paymentIntent.metadata.quantity); i++) {
      // Generate unique ticket ID
      const ticketId = `TKT-${Math.random().toString(36).substring(2, 10).toUpperCase()}`

      // Generate QR code
      const qrCodeUrl = await generateQRCode(ticketId)

      // Create ticket in database
      const { data: ticket, error: ticketError } = await supabase
        .from("tickets")
        .insert({
          booking_id: bookingId,
          user_id: booking.user_id,
          qr_code_url: qrCodeUrl,
          ticket_number: ticketId,
          is_used: false,
        })
        .select()
        .single()

      if (ticketError) throw ticketError

      // Send ticket email
      await sendTicketEmail({
        email: booking.users.email,
        name: booking.users.full_name || booking.users.display_name,
        ticketId,
        qrCodeUrl,
        bookingDetails: {
          title: booking.promotions.title,
          date: booking.promotions.start_date,
          quantity: 1, // Each ticket is for 1 person
          location: booking.promotions.location,
          businessName: booking.promotions.users?.business_name,
          totalAmount: booking.promotions.discounted_price || booking.promotions.price,
          currency: booking.promotions.currency,
        },
      })
    }

    // Update promotion current_bookings count
    await supabase.rpc("increment_promotion_bookings", {
      promotion_id: paymentIntent.metadata.promotion_id,
      booking_quantity: Number.parseInt(paymentIntent.metadata.quantity),
    })

    return { success: true }
  } catch (error) {
    console.error("Error processing payment:", error)
    return { success: false, error: (error as Error).message }
  }
}

