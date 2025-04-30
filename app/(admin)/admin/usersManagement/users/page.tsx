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
                     <div className='flex items-center gap-3'>
                             <img className='w-[45px] h-[45px] object-contain rounded-full ' 
                             src="https://marmelab.com/posters/avatar-141.jpeg?size=25x25" alt="profile picture" />
                             <div className='flex flex-col'>
                                <p className='text-white text-normal font-semibold '>yassine anouar</p>
                                <p className='text-gray-400 text-normal font-medium '>Visited since 29/04/2025</p>
                             </div>
                            
                        </div>
                           <Pencil size={22} className='text-light_blue' />
                     </div>
                     <div className="mt-5">
                       
                        <p className='text-white text-sm font-medium'>Order: 1</p>
                        <p className='text-white text-sm font-medium'>Total spent: {formatPrice(233)} </p>
                        <div className='rounded-full mt-5 flex items-center py-[3px] px-[6px] justify-center w-fit bg-[#333]  '>
          <span className="text-white font-normal text-normal">
               ordered once
          </span>
          </div>
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
       
         <table className="min-w-full max-sm:hidden divide-y divide-gray-600 text-sm text-left">
  <thead className=" text-white bg-black font-semibold">
    <tr>
      <th className="px-4 py-3">
         <Checkbox />
      </th>
      <th className="px-4 py-3">
         <span>Name</span>
        
      </th>
      <th className="px-4 flex items-center gap-2 py-3">
         <span>Last seen</span>
         <ArrowDown />
      </th>
      <th className="px-4 py-3">
         Orders
      </th>
      <th className="px-4 py-3">
        Total spent
      </th>
      <th className="px-4 py-3 lg:whitespace-nowrap">
         Latest purchase
      </th>
      <th className="px-4 py-3">
         News
      </th>
      <th className="px-4 py-3">
         Segments
      </th>
    </tr>
  </thead>
  <tbody style={{background: "rgb(30,30,30)"}} className="divide-y   divide-gray-600">
    {/* Example row — map through your data here */}
    {[0,1,2,3,5,6].map((_,index)=> (
        <tr className='hover:bg-gray-900 cursor-pointer' key={index}>
        <td className="px-4 py-3 text-white">
           <Checkbox />
        </td>
        <td className="px-4  py-3 flex items-center gap-2">
           <img className='rounded-full w-[30px] h-[30px] object-contain' src="https://marmelab.com/posters/avatar-175.jpeg?size=25x25" alt="profile picture" />
           <span className='text-light_blue underline font-medium text-normal'>
               Soufiane Omgil
           </span>
        </td>
        <td className="px-4 py-3">
          <span className='text-white font-medium text-normal '>
           09/25/2025
          </span>
          </td>
        <td className="px-4 py-3 flex mx-auto items-center h-full text-center  font-medium">
        <span className='text-white font-medium text-normal '>
           2
          </span>
        </td>
        <td className="px-4 py-3 ">
        <p className='font-bold text-white text-[16px] '>
             {formatPrice(50.04)}
          </p>
        </td>
        <td className="px-4 py-3 flex flex-col">
          <span className="text-white font-medium text-normal">
               09/25/2025
          </span>
          <span className="text-white font-medium text-normal">
               17:08:33
          </span>
        </td>
        
        <td className="px-4 py-3">
           <X  className='text-gray-200' />
        </td>
        <td className="px-4 py-3">
          <div className='rounded-full flex items-center py-[3px] px-[6px] justify-center w-fit bg-[#333]  '>
          <span className="text-white font-normal whitespace-nowrap text-normal">
               ordered once
          </span>
          </div>
        
    
          </td>
      </tr>
    ) )}
   
    {/* Repeat rows */}
  </tbody>
         </table>
       <div className='mt-3 w-full items-center gap-5 px-3 flex justify-end'>
           <div className='max-sm:hidden'>
               <p><span  className="text-white font-medium text-sm">Rows per page</span>: <select className="bg-gray-500
                text-white rounded-lg outline-none no-focus w-[40px] " name="" id="">
                     <option value="">5</option>
                     <option value="">10</option>
                     <option value="">25</option>
                     <option value="">50</option>
                  </select></p>
                
           </div>
           <div className='max-sm:hidden'>
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