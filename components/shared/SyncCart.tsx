"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

//import { getOrCreateGuestId,  useCartStore } from "@/lib/store";
import { syncCarts } from "@/actions/cart.actions";

import { useAppDispatch } from "@/hooks/user-redux";
import { getOrCreateGuestId, resetGuestId, setGuestId, syncWithUser } from "@/lib/store/cartSlice";

const CartSyncHandler = () => {
  const { data: session } = useSession();

  const dispatch = useAppDispatch()
 
  // useEffect(() => {
  //   const handleSync = async () => {
  //     if (!session?.user?.id) return;

  //     const guestId = getOrCreateGuestId();

  //     // Fire server action to sync
  //     const res = await syncCarts(guestId);

  //     if (res.success) {
  //       console.log("Cart sync complete.");

  //       // Optional: clear guestId from localStorage
  //       localStorage.removeItem("guestId");
  //     }
  //   };

  //   handleSync();
  // }, [session]);
  useEffect(() => {
    const handleSync = async () => {
      if (!session?.user?.id) return;
  
      const guestId = getOrCreateGuestId();
  
      const res = await syncCarts(guestId);
  
      if (res.success) {
        console.log("Cart sync complete.");
        localStorage.removeItem("guest_id"); // 🔁 match key with your cartSlice
        dispatch(resetGuestId()); // 🔁 clear Redux guestId if needed
        dispatch(syncWithUser());   // 🔁 optionally refetch synced cart to Redux
      }
    };
  
    handleSync();
  }, [session]);
  
  return null;
};

export default CartSyncHandler;
