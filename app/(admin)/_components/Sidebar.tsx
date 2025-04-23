"use client"
import React from 'react'
import NavLinks from './NavLinks'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'
import { useAppSelector } from '@/hooks/user-redux'

const sidebar = () => {
  const {isAdminSidebarOpen} = useAppSelector((state) => state.cart)
  return (
    <section className={`sticky  max-lg:mx-2 top-0 left-0 h-screen 
       flex flex-col gap-6 justify-between border-[#666] border-r shadow-light-300 dark:shadow-none 
        max-lg:pt-10 overflow-y-auto custom-scrollbar max-sm:hidden ${isAdminSidebarOpen ? "w-fit" : "lg:w-[266px] lg:mr-6"}`}>
           <NavLinks />
           {/* <div className={`mt-auto flex flex-col gap-3 ${isClick ? "mr-0" : "lg:mr-6"}  `}>
               <div className='flex flex-col gap-3 mx-auto w-full'>
               <Button className='small-medium bg-secondary min-h-[41px]
               w-full rounded-lg px-4 py-3 shadow-none'>
                <User 
                  className=' object-contain text-white lg:hidden' 
                  
                  width={24} 
                  height={24} 
                />
                <span className='text-white max-lg:hidden'>Log In</span>
              </Button>
              <Button className='small-medium bg-secondary min-h-[41px]
               w-full rounded-lg px-4 py-3 shadow-none'>
                <User 
                  className=' object-contain text-white lg:hidden' 
                 
                  width={24} 
                  height={24} 
                />
                <span className='text-white max-lg:hidden'>Sign up</span>
              </Button>
               </div>
           </div> */}
       </section>
  )
}

export default sidebar