import React from 'react'
import UserDetailsForm from '../../_components/UserDetailsForm';
import { IUser } from '@/database/models/user.model';
import { getUserWithShipping } from '@/actions/user.actions';
import Alert from '@/components/shared/Alert';
import { MdRateReview } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import { DollarSign } from 'lucide-react';
import { formatDate, formatPrice } from '@/lib/utils';
const page = async({params}: {params:Promise<{id:string}>}) => {
    const { id } = await params;
    const { error, data } = await getUserWithShipping({userId:id})
    console.log(data?.user, "data.user")
    if(!data || error) {
       return (
        <div className='my-5 w-[80%] '>
<Alert message={error?.message || "Something went wrong"} />

        </div>
       )
    }
  return (
    <div className='w-full py-8 max-lg:px-3 '>
        <div className="flex w-full flex-row items-start gap-5">
             <div style={{background: "rgb(18,18,18)"}} className="rounded-lg w-full flex flex-col px-4 py-3 flex-1">
                 <h3 className='text-gray-100 font-medium text-[18px] tracking-wide '>Identity</h3>
                 <UserDetailsForm  id={id} userWithShipping={data} />
             </div>
             <div className="lg:flex flex-col w-[320px] mr-2 space-y-3 hidden">
                  <div style={{background: "rgb(18,18,18)"}} className='rounded-lg flex flex-col py-3 px-2'>
                       <h2 className='h2-bold !text-white'>History</h2>
                       <div className='flex flex-col mt-5 space-y-3'>
                          <div className='flex items-start justify-between'>
                               <div className='flex items-start gap-1'>
                                  <IoTimeOutline size={24} color='gray'  />
                                  <div className='flex text-gray-100 text-sm font-medium flex-col gap-[3px] '>
                                         <p>First seen</p>
                                         <p>
                                           {formatDate(data?.user.firstSeen)}
                                         </p>
                                  </div>
                               </div>
                               <div className='flex items-center gap-2'>
                                  <DollarSign color='gray' size={18} />
                                  <p className='underline text-light_blue text-sm font-medium '>{data.orders.length} orders</p>
                               </div>
                          </div>
                          <div className='flex items-start justify-between'>
                               <div className='flex items-start gap-1'>
                                  <IoTimeOutline size={24} color="gray"  />
                                  <div className='flex text-gray-100 text-sm font-medium flex-col gap-[3px] '>
                                         <p>Last seen</p>
                                         <p>
                                          {data.user.lastSeen ? formatDate(data.user.lastSeen) : formatDate(new Date()) } 
                                         </p>
                                  </div>
                               </div>
                               <div className='flex items-center gap-2'>
                                  <MdRateReview color='gray' size={24} />
                                  <p className='underline text-light_blue text-sm font-medium '>2 reviews</p>
                               </div>
                          </div>
                       </div>
                      
                  </div>
                  {[0,1,2].map((_,index) => (
   <div key={index} className="flex space-y-2 flex-col">
   <div className='flex flex-col border-b border-gray-500 pb-3 gap-3'>
       <div className="flex items-center gap-4">
          <DollarSign color="gray" size={18}  />
           <h2 className='text-[16px] font-bold  !text-white '>orders 2 posters</h2>
           
       </div>
       <div className='flex text-gray-300 font-medium text-sm space-y-1.5  flex-col'>
           <p>May 5, 2025, 8:26 Pm</p> 
           <p>Reference #2544ddtr - delivered</p> 
            <p>{formatPrice(235.04)}</p>
       </div>
   </div>
</div>
                  ))}
               
             </div>
        </div>
    </div>
  )
}

export default page