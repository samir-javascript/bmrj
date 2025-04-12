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
  
const MobileSidebar = () => {
  return (
    <div className='sm:hidden block'>
        <Sheet>
  <SheetTrigger>
      <Menu color="white" size={26} className='cursor-pointer' />
  </SheetTrigger>
  <SheetContent className='bg-white'>
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
    </div>
  )
}

export default MobileSidebar