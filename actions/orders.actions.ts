"use server"

import Order, { IOrder } from "@/database/models/order.model";
import { action } from "@/lib/handlers/action";
import handleError from "@/lib/handlers/error";
import { CancelOrderSchemaValidation, CreateOrderValidationSchema, GetMyOrdersValidationSchema, PaginatedSchemaValidation } from "@/lib/zod";
import { CancelOrderParams, CreateOrderParams, GetMyOrdersParams, PaginatedSchemaParams } from "@/types/action";
import connectToDb from "@/database/connect"
import { auth } from "@/auth";
import Product from "@/database/models/product.model";
import { UnAuthorizedError } from "@/lib/http-errors";
import { revalidatePath } from "next/cache";
import { cache } from "@/lib/cache";
export async function createCODorder(params:CreateOrderParams): Promise<ActionResponse<{order:IOrder}>> {
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
           revalidatePath("/sales/orderHistory")
         return {
            success: true,
            data: {order: JSON.parse(JSON.stringify(newOrder))} 
         }
     } catch (error) {
         return handleError(error) as ErrorResponse
     }
}

export const getMyOrders = cache(async(params:GetMyOrdersParams): Promise<ActionResponse<{orders: IOrder[],
   isNext:boolean, ordersLength:number}>>=> {
    const validatedResult = await action({params,schema: GetMyOrdersValidationSchema})
    if(validatedResult instanceof Error) {
        return handleError(validatedResult) as ErrorResponse
    }
    const { userId , page = 1 , pageSize = 5} = validatedResult.params!
    const skip = pageSize * (page - 1)
    if(!userId) throw new Error("user ID is required")
    try {
     await connectToDb()
     const ordersCount = await Order.countDocuments({user:userId})
     const orders = await Order.find({user: userId})
     .populate({path: "orderItems.product", model: Product})
     .skip(skip)
     .limit(pageSize)
     .sort({createdAt: -1})

     const isNext = ordersCount > skip + orders.length;

        return {
            success: true,
            data: {orders: JSON.parse(JSON.stringify(orders)), isNext, ordersLength:ordersCount}
        }
    } catch (error) {
         return handleError(error) as ErrorResponse
    }
}, ['/sales/orderHistory', "getMyOrders"], {revalidate: 60 * 60 * 24})

export const getAllOrders = cache(async(params:PaginatedSchemaParams):Promise<ActionResponse<{orders:IOrder[], isNext: boolean}>> =>{
    const validatedResult = await action({params,schema:PaginatedSchemaValidation,authorize:true})
    if(validatedResult instanceof Error) {
        return handleError(validatedResult) as ErrorResponse
    }
    const { page = 1, pageSize = 10, filter, sort, query} = validatedResult.params!
    const skip = pageSize * (page - 1)
   try {
      await connectToDb()
      const orders = await Order.find()
      .limit(pageSize)
      .skip(skip)
      
      return {
        success: true,
        data: {orders: JSON.parse(JSON.stringify(orders)), isNext: false}
      }
   } catch (error) {
      return handleError(error) as ErrorResponse;
   }
}, ["getAllOrders", "/admin/ordersManagement/orders"], {revalidate: 60 * 60 * 24})

export const cancelOrder = async (params: CancelOrderParams): Promise<ActionResponse> => {
    const validatedResult = await action({
      params,
      schema: CancelOrderSchemaValidation,
      authorize: true,
    })
  
    if (validatedResult instanceof Error) {
      return handleError(validatedResult) as ErrorResponse
    }
  
    const { orderId } = validatedResult.params!
    const session = validatedResult.session
    if (!session) throw new UnAuthorizedError()
  
    try {
      await connectToDb()
  
      const order = await Order.findById(orderId)
      if (!order) throw new Error('Order not found')
  
      if (order.user.toString() !== session.user.id) {
        throw new UnAuthorizedError("You cannot cancel this order.")
      }
  
      if (order.orderStatus === 'delivered') {
        throw new Error('Order already delivered. Cannot cancel.')
      }
  
      if (order.orderStatus === 'canceled') {
        throw new Error('Order is already canceled.')
      }
  
      await order.updateOne({ orderStatus: 'canceled' })
       revalidatePath("/sales/orderHistory")
      return {
        success: true,
        message: 'Order has been canceled',
      }
    } catch (error) {
      return handleError(error) as ErrorResponse
    }
  }
  