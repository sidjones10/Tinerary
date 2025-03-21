import { type NextRequest, NextResponse } from "next/server"
import {  } from ""
import { handleSuccessfulPayment } from "@/app/actions/promotion-actions"

const  = new (process.env._SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

const endpointSecret = process.env._WEBHOOK_SECRET || ""

export async function POST(request: NextRequest) {
  const payload = await request.text()
  const signature = request.headers.get("-signature") || ""

  let event

  try {
    event = .webhooks.constructEvent(payload, signature, endpointSecret)
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as .Checkout.Session

      // Process the successful payment
      await handleSuccessfulPayment(session.id)
      break

    case "payment_intent.succeeded":
      // Handle successful payment intent if needed
      break

    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}`)
  }

  return NextResponse.json({ received: true })
}

