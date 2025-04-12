// "use server"
// import { auth } from "@/auth";
// import handleError from "@/lib/handlers/error";
// import { CartItem } from "@/lib/store/cartSlice";
// import Stripe from 'stripe'

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2025-02-24.acacia",
// });

// export async function createCheckoutSession(cartId:string,cart:CartItem[],totalPrice:number): Promise<ActionResponse<{url:string }>> {
//     const userSession = await auth()
//     if(!userSession) throw new Error("please Log in to your account to procced")
    
//   try {
//        if(cart.length === 0) throw new Error('Cannot procced to stripe checkout, cart is empty! ')
//        const session = await stripe.checkout.sessions.create({
//            mode: "payment",
//           line_items: cart.map((item) => ({
//              price_data: {
//                  currency: "usd",
//                  product_data: {
//                     name: item.title,
//                     images: [item.image]
//                  },
//                  unit_amount: Math.round(item.price * 100)
//              },
//              quantity: item.quantity,
             
//           })),
        
//           success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
//           cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
//           customer_email: userSession.user.email,
//           metadata: {
//              cartId,
//              userId: userSession.user.id
//           },
//           shipping_options: [{
//              shipping_rate_data: {
//                 type : "fixed_amount",
//                 fixed_amount: {
//                     currency: "usd",
//                     amount: totalPrice >= 15 ? 0 : 5,
//                 },
//                 display_name: totalPrice >= 15 ? "FREE SHIPPING" : "SHIPPING",
//                 delivery_estimate: {
//                     minimum: {
//                       unit: "business_day",
//                       value: 3
//                     },
//                     maximum: {
//                         unit: "business_day",
//                         value: 5
//                     }
//                 }
                
//              }
//           }]
          
//        })
//      if(!session.url) throw new Error("Failed to create session URL")
//      return {
//       success:true,
//       data: {url: session.url}
//    }
//   } catch (error) {
//     return handleError(error) as ErrorResponse
//   }
// }
"use server";

import { auth } from "@/auth";
import handleError from "@/lib/handlers/error";
import { CartItem } from "@/lib/store/cartSlice";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
interface Props {
   cartId: string,
   cart: CartItem[],
   totalPrice: number
}
export async function createCheckoutSession(
 params:Props
): Promise<ActionResponse<{ url: string }>> {
  const userSession = await auth();
  if (!userSession)
    throw new Error("Please log in to your account to proceed.");
  const { cart, cartId, totalPrice} = params;
  try {
    if (cart.length === 0)
      throw new Error("Cannot proceed to Stripe checkout, cart is empty!");

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
        cartId,
        userId: userSession.user.id,
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              currency: "usd",
              amount: totalPrice >= 15 ? 0 : 500,
            },
            display_name: totalPrice >= 15 ? "FREE SHIPPING" : "STANDARD SHIPPING",
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
