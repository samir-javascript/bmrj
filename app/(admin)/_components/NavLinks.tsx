"use client";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
const NavLinks = () => {
  const pathname = usePathname()
  return (
    <div className="flex flex-col gap-3  flex-1">
        {sidebarLinks.map((item,index) => {
          const isActive = pathname === item.route
        
            return (
                <Link className={`flex hover:bg-gray-100 items-center w-full gap-4
                  p-4 justify-start  ${isActive ? "bg-gray-100" : "bg-transparent"} 
                `} key={index} href={item.route}>
                     <item.imgURL size={25} />
                     <p className="max-lg:hidden base-medium">{item.label} </p>
                </Link>
            )
        })}
    </div>
  )
}

export default NavLinks