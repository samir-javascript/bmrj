import { formatPrice } from '@/lib/utils'
import { ArrowDown, ChevronLeft, ChevronRight, Edit, Pencil, Search, Trash, X } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"
import React from 'react'
import OrderSearchInput from '@/components/search/OrderSearchInput'
import { Button } from '@/components/ui/button'
import Tabs from '@/components/btns/Tabs'



const page = () => {
  return (
    <div className=' h-full w-full py-7 flex flex-col'>
       <OrderSearchInput />
        {/** display orders for mobile */}
        <div className='hidden flex-col mt-3 w-[96%] max-sm:flex  mx-auto space-y-0.5'>
            {[0,1,2,3,4,5,6].map((_,index) => (
               <div style={{background:"rgb(22,22,22)"}} className='shadow-md flex flex-col px-5 py-3 rounded-lg' key={index}>
                     <div className='flex items-center justify-between'>
                           <p className='text-white font-medium text-sm '>order #ht5584c1</p>
                           <Pencil size={22} className='text-light_blue' />
                     </div>
                     <div className="mt-5">
                        <div className='flex items-center gap-1'>
                             <img className='w-[45px] h-[45px] object-contain rounded-full ' src="https://marmelab.com/posters/avatar-141.jpeg?size=25x25" alt="" />
                             <p className='text-light_blue text-normal font-semibold '>yassine anouar</p>
                        </div>
                        <p className='text-white text-sm font-medium'>Date: 21/04/2025 00:49:10</p>
                        <p className='text-white text-sm font-medium'>Total: {formatPrice(233)} </p>
                        <p className='text-white text-sm font-medium'>status: Delivered</p>
                        <p className='text-white text-sm font-medium'>Method: COD</p>
                     </div>

               </div>
            ))}
        </div>
         {/** display orders for desktop and ...  */}
         <div className='mt-4'>
         {/* <div className="bg-light_blue py-3 px-4 rounded-tr-lg rounded-tl-lg flex items-center justify-between ">
             <div className='flex items-center gap-2.5'>
               <div className='w-[30px] h-[30px] rounded-full transition-all duration-200 flex items-center justify-center hover:bg-secondary  '>
                  <X  color="gray" className="cursor-pointer" size={20} />
               </div>
                 
                 <p className='text-white font-medium text-[16px] tracking-wide'>2 items selected</p>
             </div>
             <Button className='bg-transparent w-fit h-fit hover:bg-red-300 '>
                 <Trash color="red" />
                 <p className='text-red-500 uppercase font-medium text-[15px] '>Delete</p>
             </Button>
         </div> */}
        {/** btns go here */}
        <Tabs />
         <table className="min-w-full divide-y divide-gray-600 text-sm text-left">
  <thead className=" text-white bg-black font-semibold">
    <tr>
      <th className="px-4 py-3">
         <Checkbox />
      </th>
      <th className="px-4 py-3 flex items-center gap-2">
         <span>Date</span>
         <ArrowDown color="gray"/>
      </th>
      <th className="px-4 py-3">
         Reference
      </th>
      <th className="px-4 py-3">
         Customer
      </th>
      <th className="px-4 py-3">
         Address
      </th>
      <th className="px-4 py-3 lg:whitespace-nowrap">
         NB items
      </th>
      <th className="px-4 py-3">
         Total
      </th>
    </tr>
  </thead>
  <tbody style={{background: "rgb(30,30,30)"}} className="divide-y  divide-gray-600">
    {/* Example row — map through your data here */}
    {[0,1,2,3,5,6].map((_,index)=> (
        <tr className='hover:bg-gray-900 cursor-pointer' key={index}>
        <td className="px-4 py-3 text-white">
           <Checkbox />
        </td>
        <td className="px-4  py-3">
           <span className='text-white font-medium text-normal '>21/04/2025 00:23:10</span>
        </td>
        <td className="px-4 py-3">
          <span className='text-white font-medium text-normal '>
          LC25D
          </span>
          </td>
        <td className="px-4 py-3 flex mx-auto items-center h-full text-center  font-medium">
            <img className='w-[30px] h-[30px] object-contain rounded-full ' src="https://marmelab.com/posters/avatar-58.jpeg?size=25x25" alt="" />
            <p className='text-light_blue text-sm  underline '>Yassine anouar</p>
        </td>
        <td className="px-4 py-3 ">
          <p className="text-sm text-white font-medium ">Norberto O'Connell ,41756 Wiza Points ,Quitzonton, WI 93189-3873</p>
        </td>
        <td className="px-4 py-3">
          <span className="text-white font-medium text-normal">3</span>
        </td>
        
        <td className="px-4 py-3">
          <p className='font-bold text-white text-[16px] '>
             {formatPrice(278.19)}
          </p>
        </td>
      </tr>
    ) )}
   
    {/* Repeat rows */}
  </tbody>
         </table>
       <div className='mt-3 w-full items-center gap-5 px-3 flex justify-end'>
           <div>
               <p><span  className="text-white font-medium text-sm">Rows per page</span>: <select className="bg-gray-500
                text-white rounded-lg outline-none no-focus w-[40px] " name="" id="">
                     <option value="">5</option>
                     <option value="">10</option>
                     <option value="">25</option>
                     <option value="">50</option>
                  </select></p>
                
           </div>
           <div>
              <p className="text-white font-medium text-sm">26-29 of 29</p>
           </div>
           <div className='flex text-white items-center gap-2'>
              <ChevronLeft />
              <p>1</p>
              <div className='w-[30px] h-[30px] rounded-full
               bg-[#555] flex items-center justify-center '>
                 <p>2</p>
              </div>
              <ChevronRight />
           </div>
       </div>
         </div>
    </div>
  )
}

export default page