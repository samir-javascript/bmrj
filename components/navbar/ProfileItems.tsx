"use client";
import React, { useState } from "react";
import { ProfileItems as Items } from "@/constants";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useAppDispatch } from "@/hooks/user-redux";
import { clearCart } from "@/lib/store/cartSlice";
import { LogOut } from "lucide-react";
import LoadingAppState from "../Loaders/LoadingAppState";

const ProfileItems = () => {
  const pathname = usePathname();
  const [loading,setLoading] = useState(false)
  const session = useSession();
  const dispatch = useAppDispatch()
   const handleLogOut = async () => {
     setLoading(true);
     try {
       // Call server API to update user lastSeen
       if (session.status === "authenticated") {
         await fetch("/api/logout", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ userId: session.data.user.id }),
         });
       }
 
       dispatch(clearCart());
       localStorage.removeItem("guest_cart");
       await signOut({ callbackUrl: process.env.NEXT_PUBLIC_API_ENDPOINT });
     } catch (error) {
       console.error(error);
     } finally {
       setLoading(false);
     }
   };
  return (
    <div className="mt-5 lg:hidden mx-4 overflow-x-auto flex items-center sm:gap-14 gap-4 no-scrollbar">
       {loading && (
         <LoadingAppState />
       )}
      {Items.map((item, index) => {
        const isActive = pathname === item.pathname; // Ensure dynamic matching
        
        return (
          <Link
            href={item.pathname}
            className="flex flex-col items-center justify-center gap-1"
            key={index}
          >
            <div className="border-2 w-[70px] h-[70px] p-[2px] border-gray-200 rounded-full flex items-center justify-center">
              <div
                className={`w-full h-full rounded-full flex items-center justify-center ${
                  isActive ? "bg-secondary !text-white" : "bg-gray-100 !text-secondary"
                }`}
              >
                <item.icon className={`${isActive ? "text-white" : "text-secondary"}`} size={28} />
              </div>
            </div>
            <p className={`text-[12px] ${isActive && "text-secondary"}  whitespace-nowrap text-center capitalize  font-semibold`}>{item.name}</p>
          </Link>
        );
        
      })}
          <div
            onClick={handleLogOut}
            className="flex flex-col cursor-pointer items-center justify-center gap-1"
           
          >
            <div className="border-2 w-[70px] h-[70px] p-[2px] border-gray-200 rounded-full flex items-center justify-center">
              <div
                className={`w-full h-full rounded-full flex items-center justify-center 
                  bg-gray-100 !text-secondary`}
              >
                <LogOut className={`text-secondary`} size={28} />
              </div>
            </div>
            <p className={`text-[12px]  whitespace-nowrap text-center capitalize  font-semibold`}>
               Log Out
            </p>
          </div>
    </div>
  );
};

export default ProfileItems;