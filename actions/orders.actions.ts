"use server"

import Order from "@/database/models/order.model";
import { action } from "@/lib/handlers/action";
import handleError from "@/lib/handlers/error";
import { CreateOrderValidationSchema } from "@/lib/zod";
import { CreateOrderParams } from "@/types/action";
import connectToDb from "@/database/connect"
export async function createCODorder(params:CreateOrderParams): Promise<ActionResponse> {
    const validatedResult = await action({params,schema:CreateOrderValidationSchema,authorize:true})
    if(validatedResult instanceof Error) {
        return handleError(validatedResult) as ErrorResponse
    }
    const validatedParams = validatedResult.params;
    if (!validatedParams) throw new Error("Invalid request parameters");
     const { orderItems, shippingAddress, shippingPrice, itemsPrice, orderStatus, paymentMethod, totalPrice } 
     = validatedParams;
     const userSession = validatedResult.session?.user;
     if(!userSession) throw new Error("You're unauthorized to create an order")
      if (orderItems && orderItems.length === 0) {
            throw new Error('No order items');
      }

     try {
         await connectToDb()
         const newOrder = await Order.create({
             user: userSession.id,
             orderItems: orderItems.map((order)=> ({
                ...order,
                product: order._id,
                _id: undefined
             })),
             shippingAddress,
             shippingPrice,
             itemsPrice,
             orderStatus,
             paymentMethod,
             totalPrice,
         })
         if (!newOrder) throw new Error("Order creation failed");

         return {
            success: true,
            data: JSON.parse(JSON.stringify(newOrder))
         }
     } catch (error) {
         return handleError(error) as ErrorResponse
     }
}