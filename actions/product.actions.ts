"use server"
// TODO: in edit or delete product delete them also from cloudinary;
import connectToDb from "@/database/connect"
import Product, { IProduct, IReview } from "@/database/models/product.model"
import User, { IUser } from "@/database/models/user.model"
import { cache } from "@/lib/cache"
import cloudinary from "@/lib/cloudinary"
import { action } from "@/lib/handlers/action"
import handleError from "@/lib/handlers/error"
import { DeleteProductValidationSchema, EditProductSchema, PaginatedSchemaValidation, ProductSchemaValidation, ReviewSchemaValidation, SignleProductSchema } from "@/lib/zod"
import { DeleteProductParams, EditProductParams, GetSearchInputResultsParams, GetSingleProductParams, PaginatedSchemaParams, ProductParams, ReviewParams } from "@/types/action"
import { FilterQuery, ObjectId } from "mongoose"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export async function createProduct(params:ProductParams): Promise<ActionResponse> {
    const validatedResult = await action({params,schema: ProductSchemaValidation, authorize: true})
    if(validatedResult instanceof Error) {
        return handleError(validatedResult) as ErrorResponse
    }
     const { productBrand,productCategory,productDescription,
        productPrice,productPrevPrice,qty,
        productName,productPosition,productImages} = validatedResult.params!;
   
   try {
      await connectToDb()
       const newProduct = await Product.create({
          name: productName,
          description: productDescription,
          price: Number(productPrice),
          prevPrice: Number(productPrevPrice),
          category: productCategory,
          brand: productBrand,
          countInStock: Number(qty),
          position: productPosition,
          images:productImages
       })
       revalidatePath('/admin/productsManagement/products')
       revalidatePath("/")
       return {
         success: true,
         data: JSON.parse(JSON.stringify(newProduct))
       }
   } catch (error) {
      return handleError(error) as ErrorResponse
   }
}
export async function editProduct(params:EditProductParams): Promise<ActionResponse> {
   const validatedResult = await action({params,schema: EditProductSchema,authorize:true})
   if(validatedResult instanceof Error) {
      return handleError(validatedResult) as ErrorResponse
   }
   const {productId, productBrand,productCategory,productDescription,
      productPrice,productPrevPrice,qty,
      productName,productPosition, productImages} = validatedResult.params!;

  try {
    await connectToDb()
    const product = await Product.findById(productId)
    if(!product) throw new Error('Product not found')
    if(product.name !== productName) product.name = productName;
    if(product.description !== productDescription) product.description = productDescription;
    if(product.brand !== productBrand) product.brand = productBrand;
    if(product.category !== productCategory) product.category = productCategory;
    if(product.price !== Number(productPrice)) product.price = Number(productPrice);
    if(product.prevPrice !== Number(productPrevPrice)) product.prevPrice = Number(productPrevPrice);
   // if(product.images !== productImages) product.images = productImages;
        product.images = productImages;
    if(product.countInStock !== Number(qty)) product.countInStock = Number(qty);
    if(product.position !== productPosition) product.position = productPosition;
     await product.save()
     revalidatePath('/admin/productsManagement/products')
     revalidatePath("/")
    return {
      success: true,
    }
  } catch (error) {
     return handleError(error) as ErrorResponse
  }
}
export async function deleteProduct(prevState: any, formData: FormData) {
   const schema = z.object({
     productId: z.string().min(1, { message: "Product ID is required" }),
   });
 
   try {
     const data = schema.parse({
       productId: formData.get('productId'),
     });
     
 
     await connectToDb();
     const product = await Product.findById(data.productId) as IProduct
 
     if (!product) {
       return {
         success: false,
         message: "Error: Product not found",
       };
     }
     const deletePromises = product.images.map((img: { public_id: string }) =>
      cloudinary.uploader.destroy(img.public_id)
    );
    await Promise.all(deletePromises);
     await Product.findByIdAndDelete(data.productId);
     revalidatePath("/admin/productsManagement/products");
     revalidatePath('/')
 
     return {
       success: true,
       message: "Product has been deleted successfully",
     };
   } catch (error) {
     console.error("DELETE ERROR:", error);
 
     return {
       success: false,
       message: "An error occurred while deleting the product",
     };
   }
 }
 
export const getProducts = cache(async(params:PaginatedSchemaParams):
 Promise<ActionResponse<{products:IProduct[]; isNext: boolean}>> => {
   const validatedResult = await action({params,schema:PaginatedSchemaValidation})
   if(validatedResult instanceof Error) {
      return handleError(validatedResult) as ErrorResponse
   }
   const {page = 1, pageSize = 10, filter,  query } = validatedResult.params!;
   const filterQuery: FilterQuery<typeof Product> = {}
   const skip = pageSize * (page - 1)

   if(query) {
      filterQuery.$or = [
        {name: {$regex: new RegExp(query, "i")}},
        {description: {$regex: new RegExp(query, "i")}}
      ]
   }
   //   let sortCreteria = {}
   //   switch (filter) {
   //    case "":
         
   //       break;
     
   //    default:
   //       break;
   //   }
      try {
         const count = await Product.countDocuments(filterQuery)
         await connectToDb()
        const products = await Product.find(filterQuery)
        .skip(skip)
        .limit(pageSize)
        .sort({createdAt: -1})
        const isNext = count > skip + products.length;
        return  {
          success: true,
          data: {isNext, products: JSON.parse(JSON.stringify(products))}
        }
      } catch (error) {
         return handleError(error) as ErrorResponse
      }
}, ["/", "getProducts"], {revalidate: 60 * 60 * 24})
export async function getProductByIdAdmin(params:GetSingleProductParams): Promise<ActionResponse<{product:IProduct}>> {
   const validatedResult = await action({params,schema:SignleProductSchema,authorize: true})
   if(validatedResult instanceof Error) {
      return handleError(validatedResult) as ErrorResponse;
   }
    const { productId } = validatedResult.params!;

   try {
      await connectToDb()
      const product = await Product.findById(productId)
      if(!product) throw new Error('Product Not Found')
         return {
           success: true,
           data: {product: JSON.parse(JSON.stringify(product))}
         }
   } catch (error) {
      return handleError(error) as ErrorResponse;
   }
}
export async function getSingleProduct(params:GetSingleProductParams): Promise<ActionResponse<{product:IProduct}>> {
  const validatedResult = await action({params,schema:SignleProductSchema})
  if(validatedResult instanceof Error) {
     return handleError(validatedResult) as ErrorResponse;
  }
   const {productId} = validatedResult.params!;
  try {
     await connectToDb()
     const product = await Product.findById(productId)
     if(!product) throw new Error('Product Not Found')
        return {
          success: true,
          data: {product: JSON.parse(JSON.stringify(product))}
        }
  } catch (error) {
     return handleError(error) as ErrorResponse;
  }
}

export async function getSuggestionResult(
  params: GetSearchInputResultsParams
): Promise<ActionResponse<{ products: IProduct[] }>> {
  const { query } = params

  if (!query || typeof query !== 'string' || !query.trim()) {
    return { success: false }
  }

  try {
    await connectToDb()

    const products = await Product.aggregate([
      {
        $search: {
          index: 'default', // or your custom index name
          text: {
            query,
            path: ['name', 'description', 'category'],
            fuzzy: {
              maxEdits: 2, // allows small typos
              prefixLength: 1, // first character must match
            },
          },
        },
      },
      { $limit: 3 },
      {
        $project: {
          name: 1,
          price: 1,
          prevPrice: 1,
          images: 1,
          description: 1,
          category: 1,
          score: { $meta: 'searchScore' },
        },
      },
    ])

    return {
      success: true,
      data: { products: JSON.parse(JSON.stringify(products)) },
    }
  } catch (error) {
    return handleError(error) as ErrorResponse
  }
}
export async function addProductReview(prevState:any,formData:FormData): Promise<ActionResponse> {

  const rawData: ReviewParams = {
    user: formData.get('userId') as string,
    title: formData.get('title') as string,
    comment: formData.get('comment') as string,
    rating: formData.get('rating') as unknown as number,
    productId: formData.get('productId') as string
  }

  const validatedResult = await action({params:rawData, schema: ReviewSchemaValidation,authorize:true })
  
   if(validatedResult instanceof Error) {
      return handleError(validatedResult) as ErrorResponse
   }
   const userSession = validatedResult.session?.user;
   if(!userSession) throw new Error('unAuthorized to perform this action')
   const { user: userId, comment, productId, title, rating} = validatedResult.params!

    try {
      await connectToDb()
      
       const user = await User.findById(userId) as IUser
       if(!user) throw new Error("User Not found")
        const product = await Product.findById(productId)

      if(!product) throw new Error('Product not found')
       const alreadyReviewed = product.reviews.find((rev: IReview) => rev.user.toString() === userId);
   if (alreadyReviewed)  throw new Error("You have already reviewed this product");


        const review = {
         user: user._id,
         name: `${user.name} ${user.lastName}`,
         title,
         comment,
         rating
        }
        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc:number,item:any)=> acc + item.rating, 0) / product.reviews.length;
        await product.save()
        revalidatePath(`/products/${productId}`)
       return {
         success: true,
       }
    } catch (error) {
       console.log(error)
        return handleError(error) as ErrorResponse
    }
}
