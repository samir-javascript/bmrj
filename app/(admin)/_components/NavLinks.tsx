"use client";

import { sidebarLinks } from "@/constants";
import { useAppSelector } from "@/hooks/user-redux";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NavLinks = () => {
  const pathname = usePathname();
  const [openParents, setOpenParents] = useState<string[]>([]);

  const toggleParent = (label: string) => {
    setOpenParents((prev) =>
      prev.includes(label)
        ? prev.filter((l) => l !== label)
        : [...prev, label]
    );
  };
  const { isAdminSidebarOpen } = useAppSelector((state) => state.cart )

  return (
    <div className="flex flex-col gap-3 flex-1">
      {sidebarLinks.map((item, index) => {
        const isActive = pathname === item.route;
        const hasChildren = Array.isArray(item.children);
        const isOpen = openParents.includes(item.label);

        return (
          <div key={index} className="flex flex-col">
            {hasChildren ? (
              <button
                onClick={() => toggleParent(item.label)}
                className={`flex hover:bg-[#444] p-3 items-center w-full gap-4 justify-start ${
                  isOpen ? "bg-[#444]" : "bg-transparent"
                }`}
              >
               {isOpen ? (
<ChevronDown color="white" />
               ): (
<item.imgURL className="text-white" size={20} />
               )}  
              {!isAdminSidebarOpen  &&  <p className="max-lg:hidden base-medium text-gray-300">
                  {item.label}
                </p>}  
              </button>
            ) : (
              <Link
                className={`flex hover:bg-[#444] p-3 items-center w-full gap-4 justify-start ${
                  isActive ? "bg-[#444]" : "bg-transparent"
                }`}
                href={item.route!}
              >
                 <item.imgURL className="text-white" size={20} />
              {!isAdminSidebarOpen  &&  <p className="max-lg:hidden base-medium text-gray-300">
                  {item.label}
                </p>} 
              </Link>
            )}

            {/* 🔥 Only show children if this parent is open */}
            {hasChildren && isOpen && (
              <div className="flex flex-col gap-1 transition-all duration-300 ease-in-out ">
                {item?.children?.map((child, childIdx) => {
                  const isChildActive = pathname === child.route;
                  return (
                  
                    <Link
                    key={childIdx}
                className={`flex hover:bg-[#444] p-3 items-center w-full gap-4 justify-start ${
                  isChildActive ? "bg-[#444]" : "bg-transparent"
                }`}
                href={child.route!}
              >
                <child.imgIcon className="text-white" size={20} />
               {!isAdminSidebarOpen  &&  <p className="max-lg:hidden text-sm font-medium text-gray-300">
                  {child.label}
                </p>}
              </Link>
                  );
                })}
              </div>
             
            )}
          </div>
        );
      })}
    </div>
  );
};

export default NavLinks;
