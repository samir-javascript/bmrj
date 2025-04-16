"use server"

import Order, { IOrder } from "@/database/models/order.model";
import { action } from "@/lib/handlers/action";
import handleError from "@/lib/handlers/error";
import { CreateOrderValidationSchema, GetMyOrdersValidationSchema } from "@/lib/zod";
import { CreateOrderParams, GetMyOrdersParams } from "@/types/action";
import connectToDb from "@/database/connect"
import { auth } from "@/auth";
export async function createCODorder(params:CreateOrderParams): Promise<ActionResponse> {
    // const validatedResult = await action({params,schema:CreateOrderValidationSchema,authorize:true})
    // if(validatedResult instanceof Error) {
    //     return handleError(validatedResult) as ErrorResponse
    // }
    // const validatedParams = validatedResult.params;
    // if (!validatedParams) throw new Error("Invalid request parameters");
     const { orderItems, shippingAddress, shippingPrice, itemsPrice, orderStatus, paymentMethod, totalPrice } 
     = params
     const userSession = await auth()
     if(!userSession) throw new Error("You're unauthorized to create an order")
      if (orderItems && orderItems.length === 0) {
            throw new Error('No order items');
      }

     try {
         await connectToDb()
         const newOrder = await Order.create({
             user: userSession.user.id,
             orderItems,
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

export const getMyOrders = async(params:GetMyOrdersParams): Promise<ActionResponse<{orders: IOrder[]}>>=> {
    const validatedResult = await action({params,schema: GetMyOrdersValidationSchema,authorize:true})
    if(validatedResult instanceof Error) {
        return handleError(validatedResult) as ErrorResponse
    }
    const { userId } = validatedResult.params!
    const userSession = validatedResult.session?.user;
    if(!userSession) throw new Error('User session is missing')
    try {
     await connectToDb()
     const orders = await Order.find({user: userId})
     .populate('orderItems.product')
     .sort({createdAt: -1})

        return {
            success: true,
            data: {orders: JSON.parse(JSON.stringify(orders))}
        }
    } catch (error) {
         return handleError(error) as ErrorResponse
    }
}