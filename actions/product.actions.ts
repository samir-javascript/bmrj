"use server"
import { ROUTES } from "@/constants/routes"
// TODO: in edit or delete product delete them also from cloudinary;
import connectToDb from "@/database/connect"
import Order from "@/database/models/order.model"
import Product, { IProduct, IReview } from "@/database/models/product.model"
import User, { IUser } from "@/database/models/user.model"
import { cache } from "@/lib/cache"
import cloudinary from "@/lib/cloudinary"
import { action } from "@/lib/handlers/action"
import handleError from "@/lib/handlers/error"
import { UnAuthorizedError } from "@/lib/http-errors"
import redis from "@/lib/redis"
import { DeleteProductValidationSchema, EditProductSchema, PaginatedSchemaValidation, ProductSchemaValidation, ReviewSchemaValidation, SignleProductSchema, ValidateCommentSchema } from "@/lib/zod"
import { AddReviewParams, DeleteProductParams, EditProductParams, GetProductsByCategoryParams, GetSearchInputResultsParams, GetSingleProductParams, PaginatedSchemaParams, ProductParams, ReviewParams, ValidateCommentParams } from "@/types/action"
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
// export async function getSingleProduct(params:GetSingleProductParams): Promise<ActionResponse<{product:IProduct}>> {
//   const validatedResult = await action({params,schema:SignleProductSchema})
//   if(validatedResult instanceof Error) {
//      return handleError(validatedResult) as ErrorResponse;
//   }
//    const {productId} = validatedResult.params!;
//   try {
//      await connectToDb()
//      const product = await Product.findById(productId)
//      if(!product) throw new Error('Product Not Found')
//         return {
//           success: true,
//           data: {product: JSON.parse(JSON.stringify(product))}
//         }
//   } catch (error) {
//      return handleError(error) as ErrorResponse;
//   }
// }


export async function getSingleProduct(
  params: GetSingleProductParams
): Promise<ActionResponse<{ product: IProduct }>> {
  const validatedResult = await action({ params, schema: SignleProductSchema })

  if (validatedResult instanceof Error) {
    return handleError(validatedResult) as ErrorResponse
  }

  const { productId } = validatedResult.params!
  // const cacheKey = `product:${productId}`

  try {
    await connectToDb()

    // 1. Try Redis first
   
    

    // 2. Fallback to DB
    const product = await Product.findById(productId)
    if (!product) throw new Error('Product Not Found')

    const serializedProduct = JSON.stringify(product)

   

    return {
      success: true,
      data: { product: JSON.parse(serializedProduct) }
    }

  } catch (error) {
    return handleError(error) as ErrorResponse
  }
}

export async function getSuggestionResult(
  params: GetSearchInputResultsParams
): Promise<ActionResponse<{ products: IProduct[] }>> {
  const { query, limit } = params

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
      { $limit: limit },
      {
        $project: {
          name: 1,
          price: 1,
          prevPrice: 1,
          brand: 1,
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
export async function addProductReview(params:AddReviewParams): Promise<ActionResponse> {

 
  const validatedResult = await action({params, schema: ReviewSchemaValidation,authorize:true })
  
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

export async function validateComment(params:ValidateCommentParams): Promise<ActionResponse> {
  const validatedResult = await action({params,schema:ValidateCommentSchema,authorize: true})
   if(validatedResult instanceof Error) {
     return handleError(validatedResult) as ErrorResponse
   }
   const { userId, productId, reviewId } = params;
   const session = validatedResult.session?.user.id;
   if(!session) throw new UnAuthorizedError()
  try {
      const isAdminUser = await User.findById(session) as IUser;
      if(!isAdminUser.isAdmin) throw new Error("UNAUTHORIZED, Only admin users can perform this action")
      const product = await Product.findById(productId) 
      if(!product) throw new Error("Product not found")
        const review = product.reviews.find((r:IReview) => r._id.toString() === reviewId);

        if(!review) throw new Error('review not found')
        const hasPurchased = await Order.exists({
          user: userId,
          orderStatus: "delivered",
          orderItems: { $elemMatch: {productId: productId}}
        })
        if(!hasPurchased) throw new Error("User has not purchased this product. Cannot verify review")
          review.isVerified = true;
        await product.save()
        revalidatePath(ROUTES.products)
        return {
          success: true,
          message: "review has been successfuly verified"
        }
      
  } catch (error) {
     return handleError(error) as ErrorResponse
  }
}

export async function getProductsByCategory(
  params: GetProductsByCategoryParams
): Promise<ActionResponse<{ products: IProduct[] }>> {
  const { categoryName } = params;

  if (!categoryName || typeof categoryName !== 'string') {
    return {
      success: false,
      message: 'Invalid category name provided',
    };
  }

  try {
    await connectToDb();

    const escapeRegex = (str: string) =>
      str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const products = await Product.find({
      category: { $regex: new RegExp(escapeRegex(categoryName), 'i') },
    })

    return {
      success: true,
      data: { products: JSON.parse(JSON.stringify(products)) },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

