"use server"

// NOTE: This file contains functionality for future development
// These features are not implemented in the early tester version

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { supabase } from "@/lib/supabase-client"
import { generateTicketQRCode } from "@/lib/qr-generator"
import { createNotification } from "@/lib/notification-service"
import { sendTicketEmail, sendBookingConfirmationEmail } from "@/lib/email-service"
import { v4 as uuidv4 } from "uuid"

// Mock Stripe for now - would be replaced with actual Stripe in production
const mockStripePayment = async (amount: number, currency: string) => {
  // Simulate payment processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Return a mock payment intent
  return {
    id: `pi_${uuidv4().replace(/-/g, "")}`,
    status: "succeeded",
    amount,
    currency,
  }
}

export async function createBooking(formData: FormData) {
  try {
    // Get user session
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      // Store intended booking in cookies and redirect to login
      const bookingIntent = {
        promotionId: formData.get("promotionId"),
        quantity: formData.get("quantity"),
        date: formData.get("date"),
      }

      cookies().set("bookingIntent", JSON.stringify(bookingIntent), {
        maxAge: 60 * 30, // 30 minutes
        path: "/",
      })

      redirect("/login?redirect=/promotion/" + formData.get("promotionId"))
    }

    const userId = session.user.id
    const userEmail = session.user.email || ""
    const userName = session.user.user_metadata?.full_name || "Customer"
    const promotionId = formData.get("promotionId") as string
    const quantity = Number.parseInt(formData.get("quantity") as string, 10)
    const date = formData.get("date") as string
    const affiliateCode = (formData.get("affiliateCode") as string) || null

    // Get promotion details
    const { data: promotion, error: promotionError } = await supabase
      .from("promotions")
      .select("*")
      .eq("id", promotionId)
      .single()

    if (promotionError || !promotion) {
      return { success: false, error: "Promotion not found" }
    }

    // Calculate total amount and commission
    const totalAmount = promotion.discounted_price * quantity
    const commissionRate = promotion.commission_rate || 0.1 // Default 10%
    const commissionAmount = totalAmount * commissionRate

    // Process affiliate commission if applicable
    let affiliateLinkId = null
    let affiliateCommission = 0

    if (affiliateCode) {
      const { data: affiliateLink } = await supabase
        .from("affiliate_links")
        .select("*")
        .eq("short_code", affiliateCode)
        .single()

      if (affiliateLink) {
        affiliateLinkId = affiliateLink.id
        affiliateCommission = totalAmount * (affiliateLink.commission_rate || 0.05) // Default 5%

        // Create notification for affiliate owner
        await createNotification({
          userId: affiliateLink.user_id,
          type: "affiliate_conversion",
          title: "New Affiliate Conversion!",
          message: `Someone used your affiliate link and made a purchase worth ${totalAmount} ${promotion.currency || "USD"}. You earned ${affiliateCommission} ${promotion.currency || "USD"} in commission!`,
          linkUrl: "/dashboard/affiliate",
          metadata: {
            promotionId,
            promotionTitle: promotion.title,
            amount: totalAmount,
            commission: affiliateCommission,
            currency: promotion.currency || "USD",
          },
        })
      }
    }

    // Process payment (mock for now)
    const payment = await mockStripePayment(totalAmount, promotion.currency || "USD")

    // Create booking record
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert({
        promotion_id: promotionId,
        user_id: userId,
        affiliate_link_id: affiliateLinkId,
        quantity,
        total_amount: totalAmount,
        commission_amount: commissionAmount,
        affiliate_commission: affiliateCommission,
        currency: promotion.currency || "USD",
        status: "confirmed",
        payment_intent_id: payment.id,
        payment_status: payment.status,
        booking_date: new Date().toISOString(),
        date: date,
      })
      .select()
      .single()

    if (bookingError || !booking) {
      return { success: false, error: "Failed to create booking" }
    }

    // Send booking confirmation email
    try {
      await sendBookingConfirmationEmail(userEmail, userName, booking.id, {
        title: promotion.title,
        date: date,
        location: promotion.location,
        quantity: quantity,
        totalAmount: totalAmount,
        currency: promotion.currency || "USD",
      })
    } catch (emailError) {
      console.error("Error sending booking confirmation email:", emailError)
      // Continue even if email fails
    }

    // Create booking confirmation notification
    await createNotification({
      userId,
      type: "booking_confirmation",
      title: "Booking Confirmed!",
      message: `Your booking for ${promotion.title} has been confirmed. You can view your tickets in the tickets section.`,
      linkUrl: "/tickets",
      imageUrl: promotion.cover_image,
      metadata: {
        bookingId: booking.id,
        promotionId,
        promotionTitle: promotion.title,
        quantity,
        totalAmount,
        currency: promotion.currency || "USD",
        date,
      },
    })

    // Generate tickets
    const tickets = []
    for (let i = 0; i < quantity; i++) {
      const ticketId = `TKT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
      const qrCodeUrl = await generateTicketQRCode(ticketId)

      const { data: ticket, error: ticketError } = await supabase
        .from("tickets")
        .insert({
          booking_id: booking.id,
          user_id: userId,
          qr_code_url: qrCodeUrl,
          ticket_number: ticketId,
          is_used: false,
        })
        .select()
        .single()

      if (ticketError) {
        console.error("Error creating ticket:", ticketError)
      } else {
        tickets.push(ticket)

        // Send ticket email
        try {
          await sendTicketEmail({
            email: userEmail,
            name: userName,
            ticketId: ticketId,
            qrCodeUrl: qrCodeUrl,
            bookingDetails: {
              title: promotion.title,
              date: date,
              quantity: 1, // Each ticket is for 1 person
              location: promotion.location,
              businessName: promotion.business_name,
              totalAmount: promotion.discounted_price,
              currency: promotion.currency || "USD",
            },
          })
        } catch (emailError) {
          console.error("Error sending ticket email:", emailError)
          // Continue even if email fails
        }
      }
    }

    // Create ticket issued notification
    await createNotification({
      userId,
      type: "ticket_issued",
      title: "Tickets Issued",
      message: `${quantity} ticket${quantity > 1 ? "s" : ""} for ${promotion.title} ${quantity > 1 ? "have" : "has"} been issued. You can access ${quantity > 1 ? "them" : "it"} in the tickets section.`,
      linkUrl: "/tickets",
      imageUrl: tickets[0]?.qr_code_url,
      metadata: {
        bookingId: booking.id,
        promotionId,
        promotionTitle: promotion.title,
        ticketIds: tickets.map((t) => t.id),
        quantity,
      },
    })

    // Update promotion booking count
    await supabase
      .from("promotions")
      .update({
        current_bookings: (promotion.current_bookings || 0) + quantity,
      })
      .eq("id", promotionId)

    // Track interaction
    await supabase.from("user_interactions").insert({
      user_id: userId,
      interaction_type: "booking",
      item_type: "promotion",
      item_id: promotionId,
    })

    // Revalidate paths
    revalidatePath(`/promotion/${promotionId}`)
    revalidatePath("/tickets")

    // Redirect to tickets page
    redirect("/tickets")
  } catch (error) {
    console.error("Booking error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

