
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
  orderId:string | null;
  loadOrderDetails:boolean;
  isOpen: boolean;
  cartId: string | null;
  guestId: string | null;
}

const initialState: CartState = {
  items: [],
  isLoaded: false,
  loadOrderDetails:false,
  orderId:null,
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
     const guestId = state.cart.guestId || getOrCreateGuestId();
  
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
    startLoadingOrderDetails: (state) => {
        state.loadOrderDetails = true
    },
   endLoadingOrderDetails: (state) => {
    state.loadOrderDetails = false
    },
    closeOrderDetails: (state) => {
      state.isOrderDetailsOpened = false;
    },
    saveOrderId: (state,action)=> {
        state.orderId = action.payload
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
  startLoadingOrderDetails,
  endLoadingOrderDetails,
  open,
  close,
  clearCart,
  saveOrderId,
  resetGuestId,
  setLoaded,
  openOrderDetails,
  closeOrderDetails,
} = cartSlice.actions;

export default cartSlice.reducer;