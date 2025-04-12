"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Edit } from 'lucide-react'
import { ChooseShippingsModal } from '../modals/ChooseShippingsModal'
import { IShipping } from '@/database/models/shippingAdress.model'

const EditShippingBtn = ({data}: {
   data:IShipping[] | undefined
}) => {
    const [open,setOpen] = useState<boolean>(false)
  return (
   <div>
             <Button onClick={()=> setOpen(true)} className='bg-transparent lg:flex hidden hover:bg-transparent border-2 text-black font-medium rounded-xl w-[120px] border-black' type="button">
                   <Edit />
                   Edit
               </Button>
               <ChooseShippingsModal data={data} open={open} setOpen={setOpen} />
   </div>
  )
}

export default EditShippingBtn