import { formatDate, formatFullDateTime, formatPrice } from '@/lib/utils'
import { ArrowDown, Check, ChevronLeft, ChevronRight, Edit, Pencil, Search, Trash, X } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"
import React from 'react'
import OrderSearchInput from '@/components/search/OrderSearchInput'
import { Button } from '@/components/ui/button'
import Tabs from '@/components/btns/Tabs'
import { searchParamsProps } from '@/types/action'
import { getAllUsers } from '@/actions/user.actions'
import Select from '../../ordersManagement/_components/Select'
import Pagination from '@/components/pagination/Pagination'
import SelectCheckboxUsers from './_components/SelectCheckboxUsers'
import Alert from '@/components/shared/Alert'



const page = async({searchParams}:searchParamsProps) => {
   const { page, pageSize,query} = await searchParams
   const { data, error } = await getAllUsers({page: Number(page) || 1, query: query as string || "" , pageSize: Number(pageSize) || 5})
   console.log(data, "users with orders count")
   if(error)  {
      return (
         <div className="my-5">
             <Alert  message={error.message} />
          </div>
      )
   }
  return (
    <div className=' h-full w-full py-7 flex flex-col'>
       {!data || data.users.length === 0 ? (
          <div className="my-5">
             <Alert  message={"There are no users at the moment."} />
          </div>
       ): (
          <>
 <OrderSearchInput />
        {/** display orders for mobile */}
        <div className='hidden flex-col mt-3 w-[96%] max-sm:flex  mx-auto space-y-0.5'>
            {data.users.map((user,index) => (
               <div style={{background:"rgb(22,22,22)"}} className='shadow-md flex flex-col px-5 py-3 rounded-lg' key={index}>
                     <div className='flex items-center justify-between'>
                     <div className='flex items-center gap-3'>
                             <img className='w-[45px] h-[45px] object-contain rounded-full ' 
                             src={user.image || "https://marmelab.com/posters/avatar-141.jpeg?size=25x25"} alt={user.name + user.lastName} />
                             <div className='flex flex-col'>
                                <p className='text-white text-normal font-semibold '>
                                  {user.name} {' '} {user.lastName}
                                </p>
                                <p className='text-gray-400 text-normal font-medium '>Visited since { user.lastSeen ? formatFullDateTime(new Date(user.lastSeen)) : formatFullDateTime(new Date())}</p>
                             </div>
                            
                        </div>
                           <Pencil size={22} className='text-light_blue' />
                     </div>
                     <div className="mt-5">
                       
                        <p className='text-white text-sm font-medium'>Order: {user.orderCount}</p>
                        <p className='text-white text-sm font-medium'>Total spent: {formatPrice(user.totalSpent)} </p>
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
       <SelectCheckboxUsers data={data!} />
       {data?.isNext && (
 <div className='mt-3 w-full items-center gap-5 px-3 flex justify-end'>
 {/* <div className='max-sm:hidden'>
     <article><span  className="text-white font-medium text-sm">Rows per page</span>: <Select /></article>
      
 </div> */}
 <Select />

<Pagination isAdmin page={Number(page) || 1} isNext={data?.isNext as boolean} />
</div>
       )}
      
         </div>
          </>
       )}
      
    </div>
  )
}

export default page