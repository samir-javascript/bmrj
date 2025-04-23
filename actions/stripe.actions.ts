"use server";

import { auth } from "@/auth";
import Order , { IOrder } from "@/database/models/order.model";
import handleError from "@/lib/handlers/error";
import { CartItem } from "@/lib/store/cartSlice";
import Stripe from "stripe";
import connectToDb from "@/database/connect"
import Product from "@/database/models/product.model";
import { Order as OrderType } from "@/types/Elements";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
interface Props {
   cart: CartItem[],
   shippingAddress: {
    city: string;
    postalCode: string;
    country: string;
    address: string;
    phoneNumber: string;
   }
   
}
export async function createCheckoutSession(
 params:Props
): Promise<ActionResponse<{ url: string }>> {
  const userSession = await auth();
  if (!userSession)
    throw new Error("Please log in to your account to proceed.");
  const { cart, shippingAddress } = params;
  try {
    if (cart.length === 0)
      throw new Error("Cannot proceed to Stripe checkout, cart is empty!");
  // @ts-ignore
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: cart.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      customer_email: userSession.user.email!,
      metadata: {
        userId: userSession.user.id,
        shipping: JSON.stringify(shippingAddress)
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              currency: "usd",
              amount: 150,
            },
            display_name: "STANDARD SHIPPING",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 3,
              },
              maximum: {
                unit: "business_day",
                value: 5,
              },
            },
          },
        },
      ],
    });

    if (!session.url) throw new Error("Failed to create Stripe session URL");

    return {
      success: true,
      data: { url: session.url },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getLastOrderToDisplay(): Promise<ActionResponse<{order:OrderType}>> {
  const session = await auth()
  if(!session) throw new Error('UnAuthorized')
  try {
     await connectToDb()
     const order = await Order.find({ user: session.user.id })
     .populate({ path: "orderItems.product", model: Product })
     .sort({ createdAt: -1 })
     .limit(1)
   
   const [latestOrder] = order
   if (!latestOrder) throw new Error('Order not found')
   
   return {
     success: true,
     data: { order: JSON.parse(JSON.stringify(latestOrder)) }
   }
   
  } catch (error) {
     return handleError(error) as ErrorResponse
  }
}