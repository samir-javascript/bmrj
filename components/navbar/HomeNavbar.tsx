import Image from 'next/image'
import React from 'react'
import SearchInput from '../shared/SearchInput'
import { Heart, MenuIcon, ShoppingBag, User } from 'lucide-react'
import TopBar from './TopBar'
import Link from 'next/link'

const HomeNavbar = () => {
  return (
    <>
    <header className='bg-primary w-full gap-4 flex flex-col px-4 py-2 max-lg:border-b border-gray-100'>
    <nav className='items-center gap-4  flex justify-between'>
       <div className='flex items-center gap-2'>
        <MenuIcon className='lg:hidden block text-white' size={28} />
        <Link href="/">
        <Image alt="marjanemall logo"
          width={220}
          className='object-contain max-md:w-[170px]   lg:mr-7'
          height={220}
          src="https://www.marjanemall.ma/static/version1739434205/frontend/Marjane/default/fr_FR/images/marjane-logo.svg" />
        </Link>
      
       </div>
         
           <div className='flex-1 hidden lg:flex'>
              <SearchInput />
           </div>
            
          
          
          <div className="flex items-center lg:ml-7 lg:gap-7 gap-4 text-white">
               <div className='hidden lg:flex flex-col cursor-pointer hover:text-light_blue items-center gap-1'>
                  <Heart />
                  <p className='font-medium lg:block hidden text-sm'>Mes favoris</p>
               </div>
               <div className='flex flex-col cursor-pointer  hover:text-light_blue items-center gap-1'>
                  <User />
                  <p className='font-medium lg:block hidden text-sm'>Mon compte</p>
               </div>
               <div className='flex flex-col cursor-pointer  hover:text-light_blue items-center gap-1'>
                  <ShoppingBag />
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