"use server"

import Order, { IOrder } from "@/database/models/order.model";
import { action } from "@/lib/handlers/action";
import handleError from "@/lib/handlers/error";
import { CancelOrderSchemaValidation, CreateOrderValidationSchema, DeleteOrderByIdSchema, DeleteSelectedOrdersValidationSchema, GetAllOrdersSchemaValidation, GetMyOrdersValidationSchema, GetOrderDetailsSchema, PaginatedSchemaValidation } from "@/lib/zod";
import { CancelOrderParams, CreateOrderParams, DeleteOrderByIdParams, DeleteSelectedOrdersParams, GetAllOrdersParams, GetMyOrdersParams, GetOrderDetailsParams, PaginatedSchemaParams } from "@/types/action";
import connectToDb from "@/database/connect"
import { auth } from "@/auth";
import Product from "@/database/models/product.model";
import { UnAuthorizedError } from "@/lib/http-errors";
import { revalidatePath } from "next/cache";
import { cache } from "@/lib/cache";
import User, { IUser } from "@/database/models/user.model";
import { Order as OrderType } from "@/types/Elements";

import { ROUTES } from "@/constants/routes";

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

export const getAllOrders = async(params:GetAllOrdersParams):Promise<ActionResponse<{orders:OrderType[],
   isNext: boolean}>> =>{
    const validatedResult = await action({params,schema:GetAllOrdersSchemaValidation,authorize:true})
    if(validatedResult instanceof Error) {
        return handleError(validatedResult) as ErrorResponse
    }
    const session = validatedResult.session
    if(!session) throw new UnAuthorizedError()
    const { page = 1, pageSize = 5, orderStatus = "", query} = params;
    const skip = pageSize * (page - 1)
   try {
      await connectToDb()
      const isAdminUser = await User.findById(session.user.id) as IUser
      if(!isAdminUser?.isAdmin) throw new UnAuthorizedError('UnAuthorized Error: Only admin users can have access to this area!')
      const queryOrder: Record<string, any> = {};
      if (query && query.trim() !== '') {
        const users = await User.find({
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { lastName: { $regex: query, $options: 'i' } }
          ]
        }).select('_id');
        queryOrder.user = { $in: users.map((u) => u._id) };
      }
      if (orderStatus) {
        queryOrder.orderStatus = orderStatus;
      }
      const ordersCount = await Order.countDocuments(queryOrder)
      const orders = await Order.find(queryOrder)
      .populate({path: "user", model: User, select: "image name lastName"})
      .populate({path: "orderItems.product",model: Product})
      .limit(pageSize)
      .skip(skip)
      .sort({createdAt: -1})
      const isNext:boolean = ordersCount > skip + orders.length;
      return {
        success: true,
        data: {orders: JSON.parse(JSON.stringify(orders)), isNext}
      }
   } catch (error) {
      return handleError(error) as ErrorResponse;
   }
}
export const getOrders = async (
  params: {}
): Promise<ActionResponse<{
  orders: OrderType[],
  monthlyRevenue: number;
  ordersCount: number;
}>> => {
  const validatedResult = await action({ params, authorize: true });
  if (validatedResult instanceof Error) {
    return handleError(validatedResult) as ErrorResponse;
  }

  const session = validatedResult.session;
  if (!session) throw new UnAuthorizedError();

  try {
    await connectToDb();

    const isAdminUser = await User.findById(session.user.id) as IUser;
    if (!isAdminUser?.isAdmin) {
      throw new UnAuthorizedError('UnAuthorized Error: Only admin users can have access to this area!');
    }

    // Get all orders
    const orders = await Order.find()
      .populate({ path: "user", model: User, select: "image name lastName" })
      .populate({ path: "orderItems.product", model: Product })
      .sort({ createdAt: -1 });

    // Get monthly revenue (last 30 days)
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30);

    const monthlyStats = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: lastMonth }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalPrice" }
        }
      }
    ]);

    const monthlyRevenue = monthlyStats[0]?.total || 0;
    const ordersCount = orders.length;

    return {
      success: true,
      data: {
        orders: JSON.parse(JSON.stringify(orders)),
        monthlyRevenue,
        ordersCount
      }
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

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

  export const deleteSelectedOrders = async (
    params: DeleteSelectedOrdersParams
  ): Promise<ActionResponse> => {
    const validatedResult = await action({
      params,
      schema: DeleteSelectedOrdersValidationSchema,
      authorize: true,
    })
  
    if (validatedResult instanceof Error) {
      return handleError(validatedResult) as ErrorResponse
    }
  
    const session = validatedResult.session
    if (!session) throw new UnAuthorizedError()
  
    const { ordersId } = params
  
    try {
      await connectToDb()
  
      const isAdminUser = await User.findById(session.user.id) as IUser
      if (!isAdminUser?.isAdmin) {
        throw new UnAuthorizedError("Only admin users can perform this action")
      }
  
      await Order.deleteMany({
        _id: { $in: ordersId }
      })
     revalidatePath("/admin/ordersManagement/orders")
      return {
        success: true,
        message: `${ordersId.length} order(s) successfully deleted.`,
      }
    } catch (error) {
      return handleError(error) as ErrorResponse
    }
  }
  
  export const getOrderDetails = async(params:GetOrderDetailsParams):Promise<ActionResponse<{order: OrderType}>> => {
    const validatedResult = await action({params,schema:GetOrderDetailsSchema,authorize:true})
    if(validatedResult instanceof Error) {
       return handleError(validatedResult) as ErrorResponse
    }
    const session = validatedResult.session 
    if(!session) throw new UnAuthorizedError()
      const { orderId } = params;
    try {
        await connectToDb()
        const isAdminUser = await User.findById(session.user.id) as IUser
        if(!isAdminUser.isAdmin) throw new UnAuthorizedError('Only admin users can have access to this operation')
        const order = await Order.findById(orderId)
      .populate({path: "user", model: User, select: "name lastName"})
        .populate({path: "orderItems.product", model: Product})
        if(!order) throw new Error('Order not found')
        return {
          success: true,
          data: {order: JSON.parse(JSON.stringify(order))}
        }
    } catch (error) {
        return handleError(error) as ErrorResponse
    }
  }

  export const deleteOrderById = async(params:DeleteOrderByIdParams):Promise<ActionResponse> =>{
    const validatedResult = await action({params,schema:DeleteOrderByIdSchema,authorize:true})
     if(validatedResult instanceof Error) {
        return handleError(validatedResult) as ErrorResponse
     }
      const session = validatedResult.session
      if(!session) throw new UnAuthorizedError("")
        const {id} = params;
        try {
          await connectToDb()
          const isAdminUser = await User.findById(session.user.id) as IUser
          if(!isAdminUser.isAdmin) throw new Error('Only admin users can perform this action')
          await Order.findByIdAndDelete(id)
        revalidatePath(ROUTES.adminOrdersList)
        return {
           success:true,
           message: "Order has been deleted successfuly"
        }
        } catch (error) {
            return handleError(error) as ErrorResponse
        }
  }