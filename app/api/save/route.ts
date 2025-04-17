import handleError from "@/lib/handlers/error";
import { NextResponse } from "next/server";
import connectToDb from "@/database/connect"
import Collection from "@/database/models/collection";
import { auth } from "@/auth";
import Product from "@/database/models/product.model";
export const POST = async (req:Request)=> {
    const session = await auth()
    const { productId } = await req.json()
    if(!session) throw new Error("UnAuthorized to perform this action")
      console.log(productId, "product ID from server")
        if(!productId) throw new Error('Product ID is missing')
   try {
    await connectToDb()
    const product = await Product.findById(productId)
    if(!product) throw new Error('Product not found')
         const collection = await Collection.findOne({
               productId,
               userId: session.user.id
            })
        
      return NextResponse.json({success:true, saved: collection ? true : false})
   } catch (error) {
      return handleError(error,"api") as APIErrorResponse
   }
}