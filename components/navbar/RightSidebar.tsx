"use client";
import React, { useState } from "react";
import { ProfileItems as Items } from "@/constants";
import {ROUTES} from "@/constants/routes"
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { clearCart } from "@/lib/store/cartSlice";
import { useAppDispatch } from "@/hooks/user-redux";
import LoadingAppState from "../Loaders/LoadingAppState";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

const RightSidebar = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const dispatch = useAppDispatch();

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
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:block hidden w-[300px]">
      {loading && <LoadingAppState />}
      <div className="flex flex-col border border-gray-200 rounded-lg">
        {Items.map((item, index) => {
          const isActive = item.pathname === pathname;
          const isFirst = index === 0;
          const isLast = index === Items.length - 1;
           if(item.pathname.includes("edit") || item.pathname === "/customer/account/edit") {
              item.pathname = ROUTES.editProfile(session?.data?.user?.id as string)
           }
          return (
            <Link key={index} href={item.pathname} className="block">
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

        <div
          onClick={handleLogOut}
          className="p-4 border-t flex items-center gap-2 border-gray-200 transition-all duration-300 text-[#333] cursor-pointer"
        >
         
          <p className="text-[18px] font-semibold">LogOut</p>
          <LogOut className="text-light_blue" />
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;