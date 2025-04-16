// // lib/store/cartSlice.ts
// import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
// import { v4 as uuidv4 } from 'uuid';
// import { addToCart, removeFromCart, syncCarts, updateCartItemQuantity } from '@/actions/cart.actions';


// export type CartItem = {
//   _id: string;
//   brand: string;
//   prevPrice: number;
//   title: string;
//   image: string;
//   price: number;
//   quantity: number;
// };

// interface CartState {
//   items: CartItem[];
//   isLoaded: boolean;
//   isOrderDetailsOpened: boolean;
//   isOpen: boolean;
//   cartId: string | null;
//   guestId: string | null;
//   // coupon?: {
//   //   code: string;
//   //   discountAmount: number; // e.g. 10 for 10%
//   // } | null;
//   // isGuest: boolean;
// }

// const initialState: CartState = {
//   items: [],
//   isLoaded: false,
//  //  coupon:null,
//   isOrderDetailsOpened: false,
//   isOpen: false,
//   cartId: null,
//   guestId: typeof window !== 'undefined' ? localStorage.getItem('guest_id') : null,
//  //  isGuest: true,
// };

// // Get or Create Guest ID
// export const getOrCreateGuestId = (): string => {
//   if (typeof window === 'undefined') return '';
//   let guestId = localStorage.getItem('guest_id');
//   if (!guestId) {
//     guestId = uuidv4();
//     localStorage.setItem('guest_id', guestId);
//   }
//   return guestId;
// };
// // const saveGuestCart = (items: CartItem[]) => {
// //   if (typeof window !== 'undefined') {
// //     localStorage.setItem('guest_cart', JSON.stringify(items));
// //   }
// // };

// // Thunks for async actions
// export const addItemAsync = createAsyncThunk(
//   'cart/addItem',
//   async (item: CartItem, { getState }) => {
//     const state = getState() as { cart: CartState };
//     const guestId = state.cart.guestId || getOrCreateGuestId();
   
//     await addToCart({
//       guestId,
//       item: { productId: item._id, quantity: item.quantity },
//     });
   
   
//     return item;
//   }
// );

// export const removeItemAsync = createAsyncThunk(
//   'cart/removeItem',
//   async (id: string, { getState }) => {
//     const state = getState() as { cart: CartState };
//     const guestId = state.cart.guestId || getOrCreateGuestId();
//     await removeFromCart({ guestId, productId: id });
//     return id;
//   }
// );

// export const updateQuantityAsync = createAsyncThunk(
//   'cart/updateQuantity',
//   async ({ id, quantity }: { id: string; quantity: number }, { getState }) => {
//     const state = getState() as { cart: CartState };
//     const guestId = state.cart.guestId || getOrCreateGuestId();
//     await updateCartItemQuantity({ guestId, productId: id, quantity });
//     return { id, quantity };
//   }
// );

// export const syncWithUser = createAsyncThunk(
//   'cart/syncWithUser',
//   async (_, { getState }) => {
//     const state = getState() as { cart: CartState };
//     const guestId = state.cart.guestId;
//     if (!guestId) return [];

//     const { data } = await syncCarts(guestId);
//     localStorage.removeItem('guest_id');
//     return data?.mergedCart || [];
//   }
// );


// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     setGuestId: (state, action) => {
//       state.guestId = action.payload;
//       if (typeof window !== 'undefined') {
//         localStorage.setItem('guest_id', action.payload);
//       }
//     },
//     resetGuestId: (state) => {
//        state.guestId = null
//     },
    
//     open: (state) => {
//       state.isOpen = true;
//     },
//     close: (state) => {
//       state.isOpen = false;
//     },
//     setLoaded: (state, action: PayloadAction<boolean>) => {
//       state.isLoaded = action.payload;
//     },
//     openOrderDetails: (state) => {
//       state.isOrderDetailsOpened = true;
//     },
//     // applyCoupon: (state, action: PayloadAction<{ code: string; discountAmount: number }>) => {
//     //   state.coupon = action.payload;
//     // },
//     // removeCoupon: (state) => {
//     //   state.coupon = null;
//     // },
//     // hydrateCart: (state, action: PayloadAction<{ items: CartItem[]; isGuest: boolean }>) => {
//     //   state.items = action.payload.items;
//     //   state.isGuest = action.payload.isGuest;
//     // },
//     closeOrderDetails: (state) => {
//       state.isOrderDetailsOpened = false;
//     },
//     clearCart: (state) => {
//       state.items = [];
//       state.cartId = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(addItemAsync.fulfilled, (state, action) => {
//         const existing = state.items.find(i => i._id === action.payload._id);
//         if (existing) {
//           existing.quantity += action.payload.quantity;
//         } else {
//           state.items.push(action.payload);
//         }
//         // if (state.isGuest) {
//         //   saveGuestCart(state.items);
//         // }
//       })
//       .addCase(removeItemAsync.fulfilled, (state, action) => {
//         state.items = state.items.filter(i => i._id !== action.payload);
//         // if (state.isGuest) {
//         //   saveGuestCart(state.items);
//         // }
//       })
//       .addCase(updateQuantityAsync.fulfilled, (state, action) => {
//         const item = state.items.find(i => i._id === action.payload.id);
//         if (item) {
//           item.quantity = action.payload.quantity;
//         }
//         // if (state.isGuest) {
//         //   saveGuestCart(state.items);
//         // }
//       })
//       .addCase(syncWithUser.fulfilled, (state, action) => {
//         state.items = action.payload;
//         state.guestId = null;
//       });
//   },
// });

// export const getTotalItems = (state: { cart: CartState }): number => {
//   return state.cart.items.reduce((total, item) => total + item.quantity, 0);
// };

// // export const getTotalPrice = (state: { cart: CartState }): number => {
// //   const subtotal = state.cart.items.reduce((total, item) => total + item.quantity * item.price, 0);
// //   const discount = state.cart.coupon?.discountAmount ? (subtotal - state.cart.coupon.discountAmount) : 0;
// //   return subtotal - discount;
// // };

// export const {
//   setGuestId,
//   // applyCoupon,
//   // removeCoupon,
//   // hydrateCart,
//   open,
//   close,
//   clearCart,
//   resetGuestId,
//   setLoaded,
//   openOrderDetails,
//   closeOrderDetails,
// } = cartSlice.actions;

// export default cartSlice.reducer;
// lib/store/cartSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { addToCart, removeFromCart, syncCarts, updateCartItemQuantity } from '@/actions/cart.actions';

export type CartItem = {
  _id: string;
  brand: string;
  prevPrice: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
};

interface CartState {
  items: CartItem[];
  isLoaded: boolean;
  isOrderDetailsOpened: boolean;
  isOpen: boolean;
  cartId: string | null;
  guestId: string | null;
}

const initialState: CartState = {
  items: [],
  isLoaded: false,
  isOrderDetailsOpened: false,
  isOpen: false,
  cartId: null,
  guestId: typeof window !== 'undefined' ? localStorage.getItem('guest_id') : null,
};

// Get or Create Guest ID
export const getOrCreateGuestId = (): string => {
  if (typeof window === 'undefined') return '';
  let guestId = localStorage.getItem('guest_id');
  if (!guestId) {
    guestId = uuidv4();
    localStorage.setItem('guest_id', guestId);
  }
  return guestId;
};

// Thunks for async actions
export const addItemAsync = createAsyncThunk(
  'cart/addItem',
  async (item: CartItem, { getState }) => {
    const state = getState() as { cart: CartState };
    // const guestId = state.cart.guestId || getOrCreateGuestId();
    const guestId = "73176b57-09ee-4a5c-bc37-05b7f28800fd"
    await addToCart({
      guestId,
      item: { productId: item._id, quantity: item.quantity },
    });
    return item;
  }
);

export const removeItemAsync = createAsyncThunk(
  'cart/removeItem',
  async (id: string, { getState }) => {
    const state = getState() as { cart: CartState };
    const guestId = state.cart.guestId || getOrCreateGuestId();
    await removeFromCart({ guestId, productId: id });
    return id;
  }
);

export const updateQuantityAsync = createAsyncThunk(
  'cart/updateQuantity',
  async ({ id, quantity }: { id: string; quantity: number }, { getState }) => {
    const state = getState() as { cart: CartState };
    const guestId = state.cart.guestId || getOrCreateGuestId();
    await updateCartItemQuantity({ guestId, productId: id, quantity });
    return { id, quantity };
  }
);

export const syncWithUser = createAsyncThunk(
  'cart/syncWithUser',
  async (_, { getState }) => {
    const state = getState() as { cart: CartState };
    const guestId = state.cart.guestId;
    if (!guestId) return [];

    const { data } = await syncCarts(guestId);
    localStorage.removeItem('guest_id');
    return data?.mergedCart || [];
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setGuestId: (state, action) => {
      state.guestId = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('guest_id', action.payload);
      }
    },
    resetGuestId: (state) => {
       state.guestId = null
    },
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload;
    },
    openOrderDetails: (state) => {
      state.isOrderDetailsOpened = true;
    },
    closeOrderDetails: (state) => {
      state.isOrderDetailsOpened = false;
    },
    clearCart: (state) => {
      state.items = [];
      state.cartId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemAsync.fulfilled, (state, action) => {
        const existing = state.items.find(i => i._id === action.payload._id);
        if (existing) {
          existing.quantity += action.payload.quantity;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(removeItemAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(i => i._id !== action.payload);
      })
      .addCase(updateQuantityAsync.fulfilled, (state, action) => {
        const item = state.items.find(i => i._id === action.payload.id);
        if (item) {
          item.quantity = action.payload.quantity;
        }
      })
      .addCase(syncWithUser.fulfilled, (state, action) => {
        state.items = action.payload;
        state.guestId = null;
      });
  },
});
export const getTotalItems = (state: { cart: CartState }): number => {
  return state.cart.items.reduce((total, item) => total + item.quantity, 0);
};
export const {
  setGuestId,
  open,
  close,
  clearCart,
  resetGuestId,
  setLoaded,
  openOrderDetails,
  closeOrderDetails,
} = cartSlice.actions;

export default cartSlice.reducer;