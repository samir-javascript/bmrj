import { formatFullDateTime, formatPrice } from '@/lib/utils'
import { Pencil  } from 'lucide-react'

import React from 'react'
import OrderSearchInput from '@/components/search/OrderSearchInput'

import { getAllOrders } from '@/actions/orders.actions'
import { searchParamsProps } from '@/types/action'
import Pagination from '@/components/pagination/Pagination'
import Select from '../_components/Select'
import DeleteOrdersCheckbox from '../_components/DeleteOrdersCheckbox'
import Alert from '@/components/shared/Alert'



const page = async({searchParams}: searchParamsProps) => {
   const {page,pageSize,orderStatus,query} = await searchParams
   // @ts-ignore
   const { data,error} = await getAllOrders({page: Number(page) || 1, query: query || "" , pageSize: Number(pageSize) || 5,orderStatus: orderStatus})
    if(error) {
       return (
         <div className='my-5'>
         <Alert message={error.message} />
      </div>
       )
    }
  return (
    <div className=' h-full w-full py-7 flex flex-col'>
      {!data ||data?.orders?.length === 0  ? (
          <div className='my-5'>
             <Alert message={"There are no orders at the moment."} />
          </div>
      ): (
         <>
          <OrderSearchInput />
        {/** display orders for mobile */}
        <div className='hidden flex-col mt-3 w-[96%] max-sm:flex  mx-auto space-y-0.5'>
            {data && data.orders.length > 0 && data?.orders?.map((order,index) => (
               <div style={{background:"rgb(22,22,22)"}} className='shadow-md flex flex-col px-5 py-3 rounded-lg' key={index}>
                     <div className='flex items-center justify-between'>
                           <p className='text-white font-medium text-sm '>order #{order._id} </p>
                           <Pencil size={22} className='text-light_blue' />
                     </div>
                     <div className="mt-5">
                        <div className='flex items-center gap-1'>
                             <img className='w-[45px] h-[45px] object-contain rounded-full'
                              src={order?.user?.image || "https://marmelab.com/posters/avatar-141.jpeg?size=25x25"} alt={order?.user?.name} />
                             <p className='text-light_blue text-normal font-semibold '>
                               {order?.user?.name}
                             </p>
                        </div>
                        <p className='text-white text-sm font-medium'>Date: {formatFullDateTime(new Date(order.createdAt))} </p>
                        <p className='text-white text-sm font-medium'>Total: {formatPrice(order.totalPrice)} </p>
                        <p className='text-white text-sm font-medium'>status: {order.orderStatus}</p>
                        <p className='text-white text-sm font-medium'>Method: {order.paymentMethod}</p>
                     </div>

               </div>
            ))}
        </div>
         {/** display orders for desktop and ...  */}
         <div className='mt-4'>
      <DeleteOrdersCheckbox data={data!} />
      
         <div className='mt-3 w-full items-center gap-5 px-3 flex justify-end'>
          <Select />
           <div className='max-sm:hidden'>
              <p className="text-white font-medium text-sm">26-29 of 29</p>
           </div>
          
           <Pagination isAdmin page={Number(page) || 1} isNext={data?.isNext as boolean} />
       </div>
     
       
         </div>
         </>
      )}
      
    </div>
  )
}

export default page