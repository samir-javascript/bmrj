'use server';

// update prose styles;

// TODO: DONE: still one issue on process | upload product images,
// TODO: DONE password configuration;

// TODO: DONE cache mechanism;
// sync user cart in localstrage,
import { auth } from '@/auth';
import connectToDb from '@/database/connect';
import { Cart, ICart } from '@/database/models/cart.model';
import Product, { IProduct } from '@/database/models/product.model';
import { action } from '@/lib/handlers/action';
import handleError from '@/lib/handlers/error';
import { GetUserCartSchema } from '@/lib/zod';
import { GetUserCartParams } from '@/types/action';
import { CartElement, UserCartElement } from '@/types/Elements';
import { revalidatePath } from 'next/cache'; // Optional, if you're revalidating pages



// Adjust path as needed

interface AddToCartParams {
  guestId?: string;
 
  item: {
    productId: string;
    quantity: number;
    // Optionally extend with more fields like color, size, etc.
  };
}

export async function addToCart({ guestId, item }: AddToCartParams) {
  try {
    const session = await auth()
    const userId = session?.user.id;
    await connectToDb();

    let cart;

    // ✅ 1. Find or create the cart (user or guest)
    if (userId) {
      cart = await Cart.findOne({ userId });

      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }
    } else if (guestId) {
      cart = await Cart.findOne({ guestId });

      if (!cart) {
        cart = new Cart({ guestId, items: [] });
      }
    } else {
      // If neither userId nor guestId is provided, throw an error
      return { success: false, message: 'Missing guestId or userId.' };
    }

    // ✅ 2. Check if the product already exists in the cart
    const existingItemIndex = cart.items.findIndex(
      (cartItem: any) => cartItem.productId.toString() === item.productId
    );

    // ✅ 3. If it exists, increase quantity; otherwise, add the item
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += item.quantity;
    } else {
      cart.items.push({
        productId: item.productId,
        quantity: item.quantity,
      });
    }

    // ✅ 4. Save the updated cart
    await cart.save();

    // Optional: revalidate cached paths if needed
    // revalidatePath('/cart');

    return { success: true, cart: JSON.parse(JSON.stringify(cart)) };
  } catch (err) {
    console.error('Error adding to cart:', err);
    return { success: false, message: 'Failed to add item to cart.' };
  }
}
// /actions/cart.actions.ts



export async function removeFromCart({
  
  guestId,
  productId,
}: {
  
  guestId?: string;
  productId: string;
}) {
  try {
    const session = await auth()
    const userId = session?.user.id;
    await connectToDb();

    let cart;

    // Find cart by userId or guestId
    if (userId) {
      cart = await Cart.findOne({ userId });
    } else if (guestId) {
      cart = await Cart.findOne({ guestId });
    }

    if (!cart) {
      return { success: false, message: "Cart not found." };
    }

    // Filter out the item from items array
    cart.items = cart.items.filter(
      (item: any) => item.productId.toString() !== productId
    );

    await cart.save();

    return { success: true, cart: JSON.parse(JSON.stringify(cart)) };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to remove item from cart." };
  }
}
// /actions/cart.actions.ts



export async function updateCartItemQuantity({

  guestId,
  productId,
  quantity,
}: {
 
  guestId?: string;
  productId: string;
  quantity: number;
}) {
  try {
    const session = await auth()
    const userId = session?.user.id;
    await connectToDb();

    let cart;

    // Find cart by userId or guestId
    if (userId) {
      cart = await Cart.findOne({ userId });
    } else if (guestId) {
      cart = await Cart.findOne({ guestId });
    }

    if (!cart) {
      return { success: false, message: "Cart not found." };
    }

    const item = cart.items.find(
      (item: any) => item.productId.toString() === productId
    );

    if (!item) {
      return { success: false, message: "Item not found in cart." };
    }

    item.quantity = quantity;

    await cart.save();

    return { success: true, cart };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to update item quantity." };
  }
}







// export const syncCarts = async (guestId: string | null) => {
//   const session = await auth();
//   const userId = session?.user?.id;

//   if (!userId) {
//     console.warn("No userId provided. Skipping sync.");
//     return { success: false, message: "No userId provided." };
//   }

//   try {
//     await connectToDb();

//     // 1. Find both carts
//     const guestCart = guestId ? await Cart.findOne({ guestId }) : null;
//     let userCart = await Cart.findOne({ userId });

//     console.log("guestCart:", guestCart);
//     console.log("userCart before merge:", userCart);

//     let mergedItems: any[] = [];

//     if (userCart && userCart.items) {
//       mergedItems = [...userCart.items]; // existing user items
//     }

//     if (guestCart && guestCart.items.length > 0) {
//       console.log(`Merging ${guestCart.items.length} guest items`);

//       guestCart.items.forEach((guestItem: any) => {
//         const index = mergedItems.findIndex(
//           (item: any) => item.productId.toString() === guestItem.productId.toString()
//         );

//         if (index > -1) {
//           // Item already exists in user's cart; increment quantity
//           mergedItems[index].quantity += guestItem.quantity;
//         } else {
//           // New item from guest cart
//           mergedItems.push({
//             productId: guestItem.productId,
//             quantity: guestItem.quantity,
//           });
//         }
//       });
//     }

//     // 2. Update or create user cart with merged items
//     const updatedUserCart = await Cart.findOneAndUpdate(
//       { userId },
//       {
//         $set: {
//           userId,
//           guestId: null, // Make sure guestId is null on user cart
//           items: mergedItems,
//         },
//       },
//       { new: true, upsert: true }
//     );

//     console.log("Updated userCart after merge:", updatedUserCart);

//     // 3. Delete guest cart if it exists
//     if (guestCart) {
//       await Cart.deleteOne({ guestId: guestCart.guestId });
//       console.log("Deleted guest cart:", guestCart.guestId);
//     }

//     return {
//       success: true,
//       cart: JSON.parse(JSON.stringify(updatedUserCart)),
//     };
//   } catch (error) {
//     console.error("Error syncing carts:", error);
//     return { success: false, message: "Failed to sync carts." };
//   }
// };
export const syncCarts = async (guestId: string | null): Promise<ActionResponse<{mergedCart: any}>> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    console.warn("No userId provided. Skipping sync.");
    return { success: false, message: "No userId provided." };
  }

  try {
    await connectToDb();

    // 1. Find both carts
    const guestCart = guestId ? await Cart.findOne({ guestId }) : null;
    let userCart = await Cart.findOne({ userId });

   

    let mergedItems: any[] = [];

    if (userCart && userCart.items) {
      mergedItems = [...userCart.items]; // existing user items
    }

    if (guestCart && guestCart.items.length > 0) {
     

      guestCart.items.forEach((guestItem: any) => {
        const index = mergedItems.findIndex(
          (item: any) => item.productId.toString() === guestItem.productId.toString()
        );

        if (index > -1) {
          // Item already exists in user's cart; increment quantity
          mergedItems[index].quantity += guestItem.quantity;
        } else {
          // New item from guest cart
          mergedItems.push({
            productId: guestItem.productId,
            quantity: guestItem.quantity,
          });
        }
      });
    }

    // 2. Update or create user cart with merged items
    const updatedUserCart = await Cart.findOneAndUpdate(
      { userId },
      {
        $set: {
          userId,
          guestId: null, // Make sure guestId is null on user cart
          items: mergedItems,
        },
      },
      { new: true, upsert: true }
    );

   

    // 3. Delete guest cart if it exists
    if (guestCart) {
      await Cart.deleteOne({ guestId: guestCart.guestId });
     
    }

    // 4. Populate product details before returning the cart
    const populatedCart = await Cart.findById(updatedUserCart._id).populate({
      path: "items.productId",
    });

    if (!populatedCart) {
      return { success: false, message: "Failed to populate user cart." };
    }


    // 5. Format cart items for the frontend

    // const formattedCart = {
    //   _id: populatedCart._id,
    //   items: populatedCart.items.map((item: any) => ({
    //     _id: item.productId._id,
    //     title: item.productId.name,
    //     image: item.productId.images[0] || "", // Get the first image or an empty string
    //     price: item.productId.price,
    //     quantity: item.quantity,
    //   })),
    // };
    const formattedItems = populatedCart.items.map((item:any) => ({
       _id: item.productId._id,
       title: item.productId.name,
           image: item.productId.images[0] || "",
           price: item.productId.price,
            quantity: item.quantity,
    }))

    return {
      success: true,
      cart: JSON.parse(JSON.stringify(formattedItems)),
    };
  } catch (error) {
   return handleError(error) as ErrorResponse
  }
};

export const getAuthenticatedUserCart = async(params:GetUserCartParams):Promise<ActionResponse<{userCart: UserCartElement, qty:number }>> => {
  //  const validatedResult = await action({params,schema:GetUserCartSchema})
  //  if(validatedResult instanceof Error) {
  //     return handleError(validatedResult) as ErrorResponse
  //  }
   const {userId} = params;
   if(!userId) return {
      success:false,
      message: "missing USER ID"
   };
   try {
    await connectToDb()
    const userCart = await Cart.findOne({ userId })
    .populate({
      path: 'items.productId', // Specify which field to populate
    });
       if(!userCart) throw new Error('USER CART NOT FOUND')
        const qty:number = userCart.items.reduce((current:number,item: {quantity:number}) => current + item.quantity,0)
        return {
        success:true,
       data: {userCart: JSON.parse(JSON.stringify(userCart)), qty}
      }
   } catch (error) {
      return handleError(error) as ErrorResponse
   }
}

