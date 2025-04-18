import { headers } from "next/headers";
import { NextResponse } from "next/server";
import connectToDb from "@/database/connect"
import Stripe from "stripe";
import Order from "@/database/models/order.model";
import { Cart } from "@/database/models/cart.model";
import { clearUserCart } from "@/actions/cart.actions";
import handleError from "@/lib/handlers/error";
interface props {
  productId: {
     name:string;
     price:number,
     qty:number;
     _id:string;
     images: string[]
  }
  quantity:number;
}
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
      let shippingAddress;
      try {
        shippingAddress = JSON.parse(session.metadata?.shipping || '{}');
      } catch (error) {
        console.error("Failed to parse shipping address", error);
        shippingAddress = {};
      }
      await connectToDb()
      // 🛒 Grab cart from persistent storage
      const cart = await Cart.findOne({ userId }).populate('items.productId');
        
    //   if (!cart || cart.items.length === 0) {
    //     throw new Error('No cart items found for user');
    //   }
    //   const paymentIntent = await stripe.paymentIntents.retrieve(
    //     session.payment_intent as string
    //   );
      
    //   // Fetch the customer email from the session (or you can get it from paymentIntent if needed)
    //   const email = session.customer_details?.email ?? "no-email@unknown.com";
    //  const order = await Order.create({
    //       user: userId,
    //       paymentMethod: "stripe",
    //       orderStatus: "in preparation",
    //       stripePaymentIntentId: session.payment_intent,
    //       paidAt: Date.now(),
    //       isPaid: true,
    //       // orderItems: cart.items.map((item: props) => ({
    //       //   name: item.productId.name,
    //       //   price: item.productId.price,
    //       //   qty: item.quantity,
    //       //   images: item.productId.images,
    //       //   product: item.productId._id,
    //       // })),
    //       orderItems: [],

    //       itemsPrice: cart.items.reduce((sum:number, item:props) => sum + item.productId.price * item.quantity, 0),
    //       shippingPrice: 15,
    //       totalPrice: cart.items.reduce((sum:number, item:props) => sum + item.productId.price * item.quantity, 0) + 15,
    //       paymentResult: {
    //         id: paymentIntent.id,
    //         status: paymentIntent.status,
    //         update_time: new Date(paymentIntent.created * 1000).toISOString(),
    //         email_address: email,
    //       },
    //       shippingAddress: shippingAddress, // if stored in cart
    //  })
      

    //   // TODO: Create order in DB
    //   if(!order) throw new Error("Failed to create new Order")
       
    //   // TODO: Empty cart
    //   await clearUserCart({userId:userId as string})
    //   // TODO: order email confirmation using RESEND.
      return NextResponse.json({ success: true, data: cart, message: "let's create order" });
    }

    return NextResponse.json({ error: "Unhandled event type" }, { status: 400 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse
    // console.error("Stripe Webhook Error:", error);
    // return NextResponse.json({ error: "Webhook handler error" }, { status: 400 });
  }
}
