import SelectOrderStatus from '@/components/btns/SelectOrderStatus';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Save, TrashIcon } from 'lucide-react';
import React from 'react'

const page = async({params}: {params: Promise<{id:string}>}) => {
    const { id } = await params;
    const items = [
       {
        ref: "yassine anouar",
        unitPrice: "27,93 $US",
        qty: 4,
        total: "111,72 $US"
       },
       {
        ref: "mouad hmamou",
        unitPrice: "33,93 $US",
        qty: 2,
        total: "67,72 $US"
       },
       {
        ref: "karim amlah",
        unitPrice: "27,93 $US",
        qty: 4,
        total: "111,72 $US"
       },
       {
        ref: "walid kbiri",
        unitPrice: "30.50 $US",
        qty: 3,
        total: "95,72 $US"
       }

    ]
  return (
    <div className='py-7 w-full'>
         <div className='flex items-center gap-3 text-white'>
             <div className='w-[30px] cursor-pointer h-[30px] rounded-full transition-all duration-200 hover:bg-[#777] flex items-center justify-center '>
                <ChevronLeft />
             </div>
              <p>11 / 512</p>
             <div className='w-[30px] cursor-pointer h-[30px] rounded-full hover:bg-[#777] transition-all duration-200 flex items-center justify-center '>
                <ChevronRight />
             </div>
         </div> 
         <div className="rounded-lg p-3 flex flex-col w-full lg:w-[70%] mt-3 " style={{background: "rgb(18,18,18)"}}>
            <div className='flex flex-col lg:flex-row items-start justify-between'>
                <div className="flex flex-col space-y-3">
                      <h3 className='text-white font-medium text-[17px] '>Order</h3>
                      <div>
                          <p className='text-gray-400 text-sm '>Date</p>
                          <span className='text-gray-100 text-sm'>07/03/2022</span>
                      </div>
                      <div>
                        <p className='text-light_blue text-sm mb-1 font-medium'>Status:</p>
                         <SelectOrderStatus />
                      </div>
                     
                </div>
                <div className='flex flex-col space-y-3'>
                     <h3 className="opacity-0">some placeholder</h3>
                      <div>
                          <p className='text-gray-400 text-sm '>Reference</p>
                          <span className='text-gray-100 text-sm'>HD3KPU</span>
                      </div>
                </div>
                
                <div className="flex flex-col space-y-3">
                    <div className='flex flex-col space-y-3'>
                    <h3 className='text-white font-medium text-[17px] '>Customer</h3>
                      <div>
                          <p className='text-[16px] text-light_blue underline font-medium '>Yassine anouar</p>
                          <span className='text-[17px] text-light_blue underline font-medium '>Yassinezmagri@gmail.com</span>
                      </div>
                    </div>
                    <div className='flex flex-col space-y-3'>
                    <h3 className='text-white font-medium text-[17px] '>Shipping Address</h3>
                      <div>
                          <p className='text-[16px] text-white font-medium '>Yassine anouar</p>
                          <p className='text-[16px] text-white font-medium '>82534 Aniyah Canyon</p>
                          <p className='text-[16px] text-white font-medium '>Adaberg, AK 18348-2375</p>
                      </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col mt-10 gap-3'>
                 <h3 className='text-gray-200 text-[18px] font-medium  '>Items</h3>
                 <table className="min-w-full divide-y divide-gray-600 text-sm text-left">
                     <thead>
                        <tr>
                            <th className='text-white px-4 py-3 font-semibold'>Reference</th>
                            <th className='text-white px-4 py-3 font-semibold'>Unit Price</th>
                            <th className='text-white px-4 py-3 font-semibold'>Quantity</th>
                            <th className='text-white px-4 py-3 font-semibold'>Total</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y  divide-gray-600">
                        {items.map((x,index) => (
                            <tr key={index}>
                                  <td className="px-4  py-3">
           <span className='text-white font-medium text-normal '>
             {x.ref}
           </span>
        </td>
        <td className="px-4  py-3">
           <span className='text-white  whitespace-nowrap font-medium text-normal '>
             {x.unitPrice}
           </span>
        </td>
        <td className="px-4  py-3">
           <span className='text-white font-medium text-normal '>
             {x.qty}
           </span>
        </td>
        <td className="px-4  py-3">
           <span className='text-white whitespace-nowrap font-medium text-normal '>
             {x.total}
           </span>
        </td>
                            </tr>
                        ))}
                     </tbody>
                 </table>
                 <div className="flex flex-col space-y-3">
                    
                     {items.map((x,index) => (
                        <p key={index}></p>
                     ))}
                    
                    
                 </div>
                
            </div>
            <div className='flex flex-col gap-3'>
                 <h3 className='text-gray-200 text-[18px] font-medium  '>Total</h3>
                 <div className="flex flex-col space-y-3">
                     <div className='flex border-b pb-3 border-gray-500 items-center justify-between'>
                         <p className='text-white font-normal text-[15px] '>Sum</p>
                         <p className='text-white font-medium text-[16px] '>459,73 $US</p>
                     </div>
                     <div className='flex border-b pb-3 border-gray-500 items-center justify-between'>
                         <p className='text-white font-normal text-[15px] '>Delivery</p>
                         <p className='text-white font-medium text-[16px] '>3,81 $US</p>
                     </div>
                     <div className='flex border-b pb-3 border-gray-500 items-center justify-between'>
                         <p className='text-white font-normal text-[15px] '>Tax (12 %)</p>
                         <p className='text-white font-medium text-[16px] '>55,62 $US</p>
                     </div>
                     <div className='flex border-b pb-3 border-gray-500 items-center justify-between'>
                         <p className='text-white font-normal text-[15px] '>Total</p>
                         <p className='text-white font-medium text-[16px] '>519,16 $US</p>
                     </div>
                 </div>
                 <div className='flex items-center justify-between'>
                     <Button disabled className="disabled:bg-[#333]">
                       <Save /> Save
                     </Button>
                     <Button className="bg-transparent text-red-500 hover:bg-red-200 rounded-xl w-fit h-fit ">
                       <TrashIcon /> Delete
                     </Button>
                 </div>
            </div>
         </div>
    </div>
  )
}

export default page