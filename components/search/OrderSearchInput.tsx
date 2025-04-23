"use client"
import { Search , X} from 'lucide-react'
import React, {useState} from 'react'

const OrderSearchInput = () => {
    const [value,setValue] = useState("")
  return (
    <div style={{background:'rgb(58,58,58)'}} className='flex max-sm:ml-2 max-sm:w-[90%] px-3 shadow-lg w-[300px] 
        lg:w-[500px] py-1.5 rounded-tr-lg rounded-tl-lg items-center justify-between relative'>
            <input value={value}
              type="text"
              onChange={(e) => setValue(e.target.value)}
               className='flex-1 text-white placeholder:text-gray-200 outline-none no-focus bg-transparent' placeholder='Search' />
           {value ? <X size={20} onClick={()=> setValue("")} className='text-gray-400 cursor-pointer' /> : <Search className='text-gray-400' />} 
        </div>
  )
}

export default OrderSearchInput