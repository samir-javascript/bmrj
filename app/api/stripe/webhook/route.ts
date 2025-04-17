import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia", // Use the latest stable version if "2025-02-24.acacia" is incorrect
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: Request) {
  const body = await req.text();
  const headerList = await headers();
  const signature = headerList.get("stripe-signature");

  if (!webhookSecret) {
    return NextResponse.json({ error: "Stripe webhook secret is missing" }, { status: 400 });
  }
  
  if (!signature) {
    return NextResponse.json({ error: "Stripe signature not found" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const cartId = session.metadata?.cartId;

      console.log("Checkout session completed for user:", userId, "Cart ID:", cartId);

      // TODO: Create order in DB
      // TODO: Empty cart
      // TODO: order email confirmation using RESEND.
      return NextResponse.json({ success: true, data: {cartId,userId } });
    }

    return NextResponse.json({ error: "Unhandled event type" }, { status: 400 });
  } catch (error) {
    console.error("Stripe Webhook Error:", error);
    return NextResponse.json({ error: "Webhook handler error" }, { status: 400 });
  }
}
