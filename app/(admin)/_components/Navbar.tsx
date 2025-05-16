"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, {useState} from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'
import { Bell, LogOut, Menu, MenuIcon } from 'lucide-react'
import MobileSidebar from './MobileSidebar'
import { clearCart } from "@/lib/store/cartSlice";
import { signOut, useSession } from "next-auth/react";
import { useAppDispatch } from '@/hooks/user-redux'
import { toggleAdminSidebar } from '@/lib/store/cartSlice'
import LoadingAppState from "@/components/Loaders/LoadingAppState"
import { clearShippingAddress } from '@/lib/store/shippingSlice'
const Navbar = () => {
  const dispatch = useAppDispatch()
  const [loading,setLoading]= useState(false)
  const session = useSession()
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
       dispatch(clearShippingAddress())
       localStorage.removeItem("guest_cart");
       await signOut({ callbackUrl: process.env.NEXT_PUBLIC_API_ENDPOINT });
     } catch (error) {
       console.error(error);
     } finally {
       setLoading(false);
     }
   };
  return (
    <div className='w-full'>
       {loading && (
         <LoadingAppState />
       )}
    <header style={{background: "rgb(18, 18, 18)", boxShadow:"0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)"}}
     className='gap-4 flex text-white flex-col px-4 py-3 max-lg:border-b border-gray-100'>
    <nav className='items-center gap-4  flex justify-between'>
      
       <div className='flex items-center gap-2'>
       <div className="flex items-center max-sm:hidden justify-center w-[45px] h-[45px] rounded-full
          bg-transparent hover:bg-secondary transition-all group cursor-pointer duration-150 ">
           <MenuIcon 
           onClick={()=> {
             dispatch(toggleAdminSidebar())
           }}
            className=' text-white ' size={26}  />
           
       </div>
       <MobileSidebar />
       <Link href="/">
          <Image
            loading="eager"
            width={220}
            priority
            height={220}
            className="max-sm:w-[180px] w-[280px] object-contain"
            src="https://www.marjanemall.ma/static/version1742910845/frontend/Marjane/default/fr_FR/images/marjane-logo.svg"
            alt="marjanemall logo"
          />
          </Link>
       </div>
      
       <div className='flex items-center gap-2 sm:gap-3'>
             <Link href="/">
             <Avatar>
               <AvatarImage src="https://github.com/shadcn.png" />
               <AvatarFallback>CN</AvatarFallback>
              </Avatar>

             </Link>
             <div className='relative cursor-pointer '>
                 <Bell size={26}  className='text-white' />
                 <div className='absolute top-[-4px] right-[-6px] flex items-center justify-center w-[16px] h-[16px]  rounded-full bg-red-500  '>
                      <span className='text-white text-xs'>
                         4
                      </span>
                 </div>
             </div>
             <Button onClick={()=> handleLogOut()} className='bg-secondary sm:flex hidden hover:bg-light_blue text-white' type="button">
                 LogOut <LogOut />
             </Button>
             <LogOut className='sm:hidden block ml-3 text-white' />
       </div>
         
    </nav>
        
    </header>
   
    
    </div>
  )
}

export default Navbar