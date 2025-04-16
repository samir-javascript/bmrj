"use client";
import React from "react";
import { ProfileItems as Items } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { clearCart } from "@/lib/store/cartSlice";
import { useAppDispatch } from "@/hooks/user-redux";


const RightSidebar = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch()
  const handleLogOut = async()=> {
    try {
       await signOut({redirectTo: "/"})
       dispatch(clearCart())
       localStorage.removeItem('guest_cart');
    } catch (error) {
       console.log(error)
    }
  }
  return (
    <div className="lg:block hidden w-[300px]">
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
