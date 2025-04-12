"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import SearchInput from '../shared/SearchInput'
import { Heart, MenuIcon, ShoppingBag, User } from 'lucide-react'
import TopBar from './TopBar'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
import {getOrCreateGuestId, open} from "@/lib/store/cartSlice"

import { setGuestId } from '@/lib/store/cartSlice'
import { useAppDispatch } from '@/hooks/user-redux'
//import { getOrCreateGuestId, useCartStore } from '@/lib/store'



const HomeNavbar = ({qty}: {
   qty: number | undefined
}) => {
   const dispatch = useAppDispatch()
   // const { getTotalItems, open, setGuestId } = useCartStore()
   
    
   // useEffect(() => {
   //    useCartStore.persist.rehydrate();
   // },[])
      useEffect(() => {
         const guestId = getOrCreateGuestId();
         setGuestId(guestId as string);
       }, []);
  return (
    <>
    <header className='bg-primary w-full gap-4 flex flex-col px-4 py-2 max-lg:border-b border-gray-100'>
    <nav className='items-center gap-4  flex justify-between'>
       <div className='flex items-center gap-2'>
        <MenuIcon className='lg:hidden block text-white' size={28} />
        <Link href="/">
        <Image alt="marjanemall logo"
          width={220}
          className='object-contain w-auto h-auto max-md:w-[170px]   lg:mr-7'
          height={220}
          loading="eager"
          priority
          src="/logoo.svg" />
        </Link>
      
       </div>
         
           <div className='flex-1 hidden lg:flex'>
              <SearchInput />
           </div>
            
          
          
          <div className="flex items-center lg:ml-7 lg:gap-7 gap-4 text-white">
               <Link href="/wishlist" className='hidden lg:flex flex-col cursor-pointer hover:text-light_blue items-center gap-1'>
                  <Heart />
                  <p className='font-medium lg:block hidden text-sm'>Mes favoris</p>
               </Link>
               <Link href={`${ROUTES.userProfile}`} className='flex flex-col cursor-pointer  hover:text-light_blue items-center gap-1'>
                  <User />
                  <p className='font-medium lg:block hidden text-sm'>Mon compte</p>
               </Link>
               <div onClick={()=> dispatch(open())} className='flex flex-col cursor-pointer 
                 hover:text-light_blue items-center gap-1'>
                  <div className='relative'>
                     <ShoppingBag />
                     <span className='absolute top-[-4px] right-[-6px] flex items-center justify-center w-[16px] h-[16px]  rounded-full bg-red-500  '>
                      <span className='text-white text-xs'>
                         {qty && qty > 0 ? qty : 4}
                      </span>
                 </span>
                  </div>
                  
                  <p className='font-medium lg:block hidden text-sm'>Mon panier</p>
                 
               </div>
          </div>

    </nav>
          <div className='flex-1 flex lg:hidden'>
              <SearchInput />
           </div>
    </header>
    <div className='max-lg:flex hidden'>
      <TopBar />
    </div>
    
    </>
  )
}

export default HomeNavbar