"use client";
import React from "react";
import { ProfileItems as Items } from "@/constants";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

const ProfileItems = () => {
  const pathname = usePathname();
  const session = useSession();

  return (
    <div className="mt-5 lg:hidden mx-4 overflow-x-auto flex items-center sm:gap-14 gap-4 no-scrollbar">
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
     
    </div>
  );
};

export default ProfileItems;