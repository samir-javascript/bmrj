
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import NavLinks from './NavLinks'
  
const MobileSidebar = () => {
  return (
    <div className='sm:hidden flex'>
        <Sheet>
  <SheetTrigger>
      <Menu color="white" size={26} className='cursor-pointer' />
  </SheetTrigger>
  <SheetContent className='bg-[(rgb(48,48,48))] '>
        <section className={` h-screen 
       flex flex-col gap-6 justify-between 
        max-lg:pt-10 overflow-y-auto custom-scrollbar`}>
             <NavLinks />
        </section>
  </SheetContent>
</Sheet>
    </div>
  )
}

export default MobileSidebar