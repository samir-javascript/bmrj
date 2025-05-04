"use server"

import { cache } from "@/lib/cache"
import { action } from "@/lib/handlers/action"
import handleError from "@/lib/handlers/error"
import { AddHeroImageParams, CreateCategoryParams, DeleteHeroBannerParams } from "@/types/action"
import connectToDb from '@/database/connect';
import Category from "@/database/models/categories.model"
import { CategorySchemaValidation, CreateCategorySchema, DeleteHeroBannerSchema, HeroValidationSchema } from "@/lib/zod"
import HeroImage, { IHero } from "@/database/models/heroImages.model"
import { revalidatePath } from "next/cache"
import { NotFoundError } from "@/lib/http-errors"
import cloudinary from "@/lib/cloudinary"
export const createCategory = async(params:CreateCategoryParams): Promise<ActionResponse> => {
    const validatedResult = await action({params,schema:CategorySchemaValidation,authorize:true})
     if(validatedResult instanceof Error) {
         return handleError(validatedResult) as ErrorResponse;
     }
     const userId = validatedResult.session?.user.id;
     if(!userId)  {
         throw new Error('it sounds like you are anAuthorized to perform this action!')
     }
     const { name , image } = validatedResult.params!
   try {
       await connectToDb()
       const newCategory = await Category.create({
          name,
          image
       })
      return {
         success: true,
         data: JSON.parse(JSON.stringify(newCategory))
      }
   } catch (error) {
      return handleError(error) as ErrorResponse
   }
}

export const addHeroImage = async(params:AddHeroImageParams):Promise<ActionResponse> => {
     const validatedResult = await action({params,schema:HeroValidationSchema,authorize:true})
     if(validatedResult instanceof Error) {
       return handleError(validatedResult) as ErrorResponse
     } 
      const session = validatedResult?.session?.user.id;
      if(!session) throw new Error("it sounds like you are an authorized to perform this action")
      const { title, imgUrl,isActive } = validatedResult.params!
     try {
       await connectToDb()
       const newHeroBanner = await HeroImage.create({
          title,
          imgUrl,
          isActive
       })
       if(!newHeroBanner) throw new Error("Failed to create new hero banner! try again")
         revalidatePath("/")
         return {
            success:true,
            message: "hero banner has been added successfully"
         }
     } catch (error) {
        return handleError(error) as ErrorResponse;
     }
}

export const getHeroImages = cache(async(): Promise<ActionResponse<{items: IHero[]}>> => {
   try {
       await connectToDb()
       const items = await HeroImage.find({isActive: true})
       .sort({createdAt: -1})
       return {
         success:true,
         data: {items: JSON.parse(JSON.stringify(items))}
       }
   } catch (error) {
       return handleError(error) as ErrorResponse
   }
},["getHoroImages", "/admin/productsManagement/add_hero"], {revalidate: 1060 * 60 * 24})

export const deleteHeroBanner = async(params:DeleteHeroBannerParams): Promise<ActionResponse>=> {
   const validatedResult = await action({params,schema:DeleteHeroBannerSchema,authorize: true})
   if(validatedResult instanceof Error) {
       return handleError(validatedResult) as ErrorResponse
   }
   const session = validatedResult.session?.user.id;
   if(!session) throw new Error("it sounds like you're an authorized to perform this action")
   const { id } = validatedResult.params!;

   try {
      await connectToDb()
      const heroBanner = await HeroImage.findById(id) as IHero
      if(!heroBanner) throw new NotFoundError("Hero banner")
      // TODO: delete images from cloudinary storage
     
     // TODO: delete hero banner from db.
     await HeroImage.findByIdAndDelete(heroBanner._id)
      revalidatePath("/")
      return {
          success: true,
          message: "hero banner has been deleted"
      }
   } catch (error) {
       return handleError(error) as ErrorResponse
   }
}