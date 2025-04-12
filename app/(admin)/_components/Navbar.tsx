import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'
import { Bell, LogOut, Menu } from 'lucide-react'
import MobileSidebar from './MobileSidebar'

const Navbar = () => {
  return (
    <div className='w-full'>
    <header className='bg-primary  gap-4 flex flex-col px-4 py-3 max-lg:border-b border-gray-100'>
    <nav className='items-center gap-4  flex justify-between'>
      
       <div className='flex items-center gap-2'>
       
        <MobileSidebar />
       <Link href="/">
        <Image alt="marjanemall logo"
          width={220}
          className='object-contain max-md:w-[170px]   lg:mr-7'
          height={220}
          src="https://www.marjanemall.ma/static/version1739434205/frontend/Marjane/default/fr_FR/images/marjane-logo.svg" />
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
             <Button className='bg-secondary sm:flex hidden hover:bg-light_blue text-white' type="button">
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