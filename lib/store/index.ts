import {create} from "zustand"
import { persist } from "zustand/middleware"
export type CartItem = {
    _id:string;
    title: string;
    image: string;
    price: number;
    quantity: number;
}
type CartStore = {
    items: CartItem[],
    isLoaded: boolean;
    isOpen: boolean;
    cartId:string | null;
    setStore: (store: Partial<CartStore>) => void;
    addItem:(item:CartItem) => Promise<void>;
    removeItem: (id:string) => Promise<void>;
    updateQuantity: (id:string,quantity:number) => Promise<void>;
    clearCart: () => void;
    open: ()=> void;
    close: ()=> void;
    setLoaded: (loaded:boolean) => void;
    syncWithUser: ()=> Promise<void>;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
      (set,get) => ({
         items: [],
         isLoaded: false,
         isOpen: false,
         cartId: null,
         setStore: (store) => set(store),
         addItem: async(item) => {},
         removeItem: async(id) =>  {},
         updateQuantity: async (id,quantity) =>  {},
         syncWithUser: async() => {},
         clearCart: () => {
            set((state) => ({ ...state, items: [] }));
        },
         open: () => {
             set((state) => ({...state, isOpen: true}))
         },
         close: ()=> {
            set((state) => ({...state, isOpen: false}))
         },
         setLoaded: (loaded) => {
            set((state) => ({ ...state, isLoaded: loaded }));
        },
         getTotalItems: () => {
            const { items } = get();
            return items.reduce((total, item) => total + item.quantity, 0);
         },
         getTotalPrice: () => {
            const { items } = get();
            return items.reduce((total, item) => total + item.price * item.quantity, 0);
        },
      }),
      { name: 'cart-storage',
       skipHydration: true },
      
    ),
  )