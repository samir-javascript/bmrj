
// import { create } from "zustand";
// import { persist, createJSONStorage } from 'zustand/middleware';
// import { v4 as uuidv4 } from 'uuid';
// import { addToCart, removeFromCart, syncCarts, updateCartItemQuantity } from "@/actions/cart.actions";




// // Define guest ID key once (clean code)
// const guestIdKey = 'guest_id';

// // Function to safely get or create guestId (browser only)
// export const getOrCreateGuestId = () => {
//   if (typeof window === 'undefined') return null;

//   let guestId = localStorage.getItem(guestIdKey);

//   if (!guestId) {
//     guestId = uuidv4();
//     localStorage.setItem(guestIdKey, guestId);
//   }

//   return guestId;
// };

// // l7aj
//  "06 25 05 21 03"

// export type CartItem = {
//   _id: string;
//   brand:string;
//   prevPrice:number;
//   title: string;
//   image: string;
//   price: number;
//   quantity: number;
// };

// type CartStore = {
//   items: CartItem[];
//   isLoaded: boolean;
//   guestId: string | null;
//   isOpen: boolean;
 
//   cartId: string | null;

//   // Actions
//   setStore: (store: Partial<CartStore>) => void;
//   setGuestId: (guestId: string | null) => void;
//   openOrderDetails: ()=> void;
//   isOrderDetailsOpened: boolean;
//   closeOrderDetails: ()=> void;
//   addItem: (item: CartItem) => Promise<void>;
//   removeItem: (id: string) => Promise<void>;
//   updateQuantity: (id: string, quantity: number) => Promise<void>;
//   clearCart: () => void;
//   open: () => void;
//   close: () => void;
//   setLoaded: (loaded: boolean) => void;
//   syncWithUser: () => Promise<void>;
//   getTotalItems: () => number;
//   getTotalPrice: () => number;
// };

// // ✅ Zustand Store Setup
// export const useCartStore = create<CartStore>()(
//   persist(
//     (set, get) => ({
//       items: [],
//       isLoaded: false,
//       isOrderDetailsOpened: false,
//       isOpen: false,
//       cartId: null,
//       guestId: null, // Initialized later on client

//       // Set partial store
//       setStore: (store) => set(store),

//       // Set guest ID (called in useEffect client-side)
//       setGuestId: (guestId) => set({ guestId }),

//       // Add item to cart (local + backend)
//       addItem: async (item) => {
//         const guestId = get().guestId;
      

//         // 1. Sync with backend cart
//         const result = await addToCart({
//           guestId: guestId || undefined,
          
//           item: {
//             productId: item._id,
//             quantity: item.quantity,
//           },
//         });

//         // 2. Sync local cart (Zustand)
//         set((state) => {
          
//           const existingItem = state.items.find((i) => i._id === item._id);

//           if (existingItem) {
//             return {
//               ...state,
//               items: state.items.map((i) =>
//                 i._id === item._id
//                   ? { ...i, quantity: i.quantity + item.quantity }
//                   : i
//               ),
//             };
//           } else {
//             return {
//               ...state,
//               cartId: result.cart._id,
//               items: [...state.items, item],
//             };
//           }
//         });
    
//       },
      
//       removeItem: async (id) => {
//         const guestId = get().guestId;
//         // const session = useSession()
      
      
//         try {
//           // Sync with backend
//           const res = await removeFromCart({
//             guestId: guestId || undefined,
          
//             productId: id,
//           });
      
//           if (!res.success) {
//             console.error("Failed to remove item from cart backend:", res.message);
//           }
      
//           // Sync local Zustand store
//           set((state) => ({
//             ...state,
//             items: state.items.filter((item) => item._id !== id),
//           }));
//         } catch (error) {
//           console.error("Error removing item from cart:", error);
//         }
//       },

//       updateQuantity: async (id, quantity) => {
//         if (quantity <= 0) return;
      
//         const guestId = get().guestId;
      
     
      
//         try {
//           // Sync with backend
//           const res = await updateCartItemQuantity({
//             guestId: guestId || undefined,
         
//             productId: id,
//             quantity,
//           });
      
//           if (!res.success) {
//             console.error("Failed to update item quantity in backend:", res.message);
//           }
      
//           // Update local Zustand state
//           set((state) => ({
//             ...state,
//             items: state.items.map((item) =>
//               item._id === id ? { ...item, quantity } : item
//             ),
//           }));
//         } catch (error) {
//           console.error("Error updating item quantity:", error);
//         }
//       },
//      openOrderDetails: ()=> {
//         set((state) => ({ ...state, isOrderDetailsOpened: true }));
//      },
//     closeOrderDetails: ()=> {
//       set((state) => ({ ...state, isOrderDetailsOpened: false }));
//    },
//       clearCart: () => {
//         // Clear localStorage for cart as well
//         if (typeof window !== "undefined") {
//           localStorage.removeItem("cart");
//         }
      
//         // Clear backend cart (if needed)
//         // TODO: Clear backend cart as well
      
//         // Clear the Zustand cart state
//         set((state) => ({
//           ...state,
//           items: []
//         }));
//       },

//       open: () => {
//         set((state) => ({ ...state, isOpen: true }));
//       },

//       close: () => {
//         set((state) => ({ ...state, isOpen: false }));
//       },

//       setLoaded: (loaded) => {
//         set((state) => ({ ...state, isLoaded: loaded }));
//       },

    
//     //   syncWithUser: async () => {
//     //     const guestId = get().guestId;
    
//     //     if (!guestId) {
//     //         console.warn("No guestId found, skipping cart sync.");
//     //         return;
//     //     }
    
//     //     try {
//     //         const { data, success, message } = await syncCarts(guestId);
    
//     //         console.log("Sync Carts Result:", { data, success, message }); // Log the result
    
//     //         if (!success) {
//     //             console.warn("Cart sync failed:", message);
//     //             return;
//     //         }
    
//     //         if (!data?.mergedCart || !data?.mergedCart.items) {
//     //             console.warn("No merged cart found after sync.");
//     //             return;
//     //         }
    
//     //         console.log("Merged Cart Data:", data.mergedCart); // Log mergedCart data
//     //         console.log("Current Zustand State:", get().items); // Log current state
    
//     //         set((state) => ({
//     //             ...state,
//     //             items: data.mergedCart,
//     //             cartId: data?.mergedCart._id,
//     //             guestId: undefined,
//     //         }));
    
//     //         console.log("Zustand State After Update:", get().items); // Log state after update
    
//     //         if (typeof window !== "undefined") {
//     //             localStorage.removeItem("guestId");
//     //         }
    
//     //         console.log("Cart sync complete. Guest cart merged into user cart.");
//     //     } catch (error) {
//     //         console.error("Error syncing cart on client:", error);
//     //     }
//     // },
//     syncWithUser: async () => {
//       const guestId = get().guestId;
    
//       if (!guestId) {
//         console.warn("No guestId found, skipping cart sync.");
//         return;
//       }
    
//       try {
//         const { data, success, message } = await syncCarts(guestId);
    
//         console.log("Sync Carts Result:", { data, success, message });
    
//         if (!success) {
//           console.warn("Cart sync failed:", message);
//           return;
//         }
    
//         if (!data || !data.mergedCart) { // Check if data and data.cart exist
//           console.warn("No merged cart data found after sync.");
//           return;
//         }
    
//         const mergedCart = data.mergedCart; // Extract cart data from data object.
    
//         console.log("Merged Cart Data:", mergedCart);
//         console.log("Current Zustand State:", get().items);
    
//         // Ensure mergedCart is an array of CartItems
//         if (Array.isArray(mergedCart)) {
//           set((state) => ({
//             ...state,
//             items: mergedCart, // Directly set the merged cart items
//             cartId: mergedCart.length > 0 ? mergedCart[0]._id : null, // Get cartId from the first item, or null if empty
//             guestId: undefined,
//           }));
    
//           console.log("Zustand State After Update:", get().items);
    
//           if (typeof window !== "undefined") {
//             localStorage.removeItem("guestId");
//           }
    
//           console.log("Cart sync complete. Guest cart merged into user cart.");
//         } else {
//             console.error("Merged cart data is not an array:", mergedCart);
//         }
//       } catch (error) {
//         console.error("Error syncing cart on client:", error);
//       }
//     }
// ,
//       getTotalItems: () => {
//         const { items } = get();
//         return items.reduce((total, item) => total + item.quantity, 0);
//       },

//       getTotalPrice: () => {
//         const { items } = get();
//         return items.reduce(
//           (total, item) => total + item.price * item.quantity,
//           0
//         );
//       },
//     }),
//     {
//       name: 'cart',
//        // Key in localStorage
      
//       storage: createJSONStorage(() => localStorage), // Use browser localStorage
//     }
//   )
// );
