"use client";
import React, { useState } from "react";
import { ProfileItems as Items } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { clearCart } from "@/lib/store/cartSlice";
import { useAppDispatch } from "@/hooks/user-redux";
import User from "@/database/models/user.model";
import LoadingAppState from "../Loaders/LoadingAppState";


const RightSidebar = () => {
  const pathname = usePathname();
  const [loading,setLoading] = useState(false)
  const session = useSession()
  const dispatch = useAppDispatch()
  const handleLogOut = async()=> {
     setLoading(true)
    try {
       await signOut({redirectTo: "/"})
       if(session.status !== "loading" && session.status === "authenticated")  {
        await User.findByIdAndUpdate(session?.data?.user?.id!, { lastSeen: new Date() });
       }
     

       dispatch(clearCart())
       localStorage.removeItem('guest_cart');
    } catch (error) {
       console.log(error)
    }finally  {
      setLoading(false)
    }
  }
  return (
    <div className="lg:block hidden w-[300px]">
       {loading && (
         <LoadingAppState />
       )}
      <div className="flex flex-col border border-gray-200 rounded-lg">
        {Items.map((item, index) => {
          const isActive = item.pathname === pathname;
          const isFirst = index === 0;
          const isLast = index === Items.length - 1;

          return (
            
            <Link  key={index} href={item.pathname} className="block">
              <div
                className={`p-4 border-b border-gray-200 transition-all duration-300
                  ${isActive ? "bg-light_blue text-white font-semibold" : "text-[#333]"}
                  ${isActive && isFirst ? "rounded-tl-lg rounded-tr-lg" : ""}
                  ${isActive && isLast ? "rounded-bl-lg rounded-br-lg" : ""}
                  ${isLast ? "border-b-0" : ""}
                `}
              >
                <p className="text-[18px] capitalize font-semibold">{item.name}</p>
              </div>
            </Link>
          );
        })}
       <div onClick={handleLogOut}
                className={`p-4 border-t border-gray-200 transition-all duration-300
                   text-[#333] cursor-pointer `}
                 
                 
                
              >
                <p className="text-[18px] font-semibold">LogOut</p>
              </div>
      </div>
    
    </div>
  );
};

export default RightSidebar;
