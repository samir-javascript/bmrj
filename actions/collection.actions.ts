"use server"
// todo for authentication use the same method you signed up with;

import connectToDb from "@/database/connect";
import Collection, { ICollection } from "@/database/models/collection";
import Product, { IProduct } from "@/database/models/product.model";

import { action } from "@/lib/handlers/action";
import handleError from "@/lib/handlers/error"
import { CollectionSchema, PaginatedSchemaValidation } from "@/lib/zod";
import { CollectionParams, PaginatedSchemaParams } from "@/types/action";
import { CollectionElement } from "@/types/Elements";

import { revalidatePath } from "next/cache";

export async function toggleSaveCollection(params:CollectionParams): Promise<ActionResponse<{saved:boolean}>> {
    const validatedResult = await action({params,schema:CollectionSchema,authorize:true})
    if(validatedResult instanceof Error) {
        return handleError(validatedResult) as ErrorResponse
    }
    const { productId } = validatedResult.params!
    const userId = validatedResult.session?.user.id!
    try {
        await connectToDb()
        const product = await Product.findById(productId)
        if(!product) throw new Error("Product Not found")
        const collection = await Collection.findOne({
            productId,
            userId
        })
        if(collection) {
            await Collection.findByIdAndDelete(collection._id)
            revalidatePath('/wishlist')
            revalidatePath(`/products/${productId}`)
            return {
                success: true,
                data: { saved: false }
            }
        }
        await Collection.create({
             productId,
             userId
        })
        revalidatePath("/wishlist")
        revalidatePath(`/products/${productId}`)
        return {
            success: true,
            data: {
                saved: true
            }
        }
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
}
export async function getSavedProducts(params:PaginatedSchemaParams):Promise<ActionResponse<{collection:CollectionElement[],isNext:boolean}>> {
    const validatedResult = await action({params,schema:PaginatedSchemaValidation,authorize:true})
    if(validatedResult instanceof Error) {
        return handleError(validatedResult) as ErrorResponse
    }
    const { page = 1, pageSize = 2 } = params
    const skip = pageSize * (page - 1)
   
   
    const userId = validatedResult.session?.user.id;
    try {
        const collection = await Collection.find({userId})
        //   .populate({path: "userId", model: User})
          .populate({path: "productId", model: Product})
        .skip(skip)
        .limit(pageSize)
        const count = await Collection.countDocuments({userId})
        const isNext = count > skip + collection.length;
        return {
            success:true,
            data: {
                collection: JSON.parse(JSON.stringify(collection)),
                isNext:isNext
            }
        }
    } catch (error) {
          return handleError(error) as ErrorResponse
    }

}
export async function hasSavedProduct(params:CollectionParams):Promise<ActionResponse<{saved:boolean}>> {
    const validatedResult = await action({params,schema:CollectionSchema,authorize:true})
    if(validatedResult instanceof Error) {
        return handleError(validatedResult) as ErrorResponse;
    }
    const { productId } = validatedResult.params!
    const userId = validatedResult.session?.user.id!
    if(!userId) throw new Error('USER NOT FOUND')
  try {
    await connectToDb()
    const product = await Product.findById(productId)
    if(!product) throw new Error('Product Not found')
     const collection = await Collection.findOne({
       productId,
       userId
    })
    return {
        success: true,
        data: {
            saved: collection ? true : false
        }
    }
  } catch (error) {
     return handleError(error) as ErrorResponse
  }
}

