import { getOrderDetails } from '@/actions/orders.actions';
import DeleteOrderBtn from '@/components/btns/DeleteOrderBtn';
import SelectOrderStatus from '@/components/btns/SelectOrderStatus';
import Alert from '@/components/shared/Alert';
import { Button } from '@/components/ui/button';
import Order from '@/database/models/order.model';
import { formatDate, formatPrice } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Save, TrashIcon } from 'lucide-react';
import { notFound, redirect } from 'next/navigation';
import React from 'react'

const page = async({params}: {params: Promise<{id:string}>}) => {
    const { id } = await params;
    const { data , error } = await getOrderDetails({orderId:id})
    if(!data) return notFound()
 
    if(error) {
       return (
         <div className='my-5'>
            <Alert message={error.message} />
         </div>
       )
    }
  return (
    <div className='py-7 w-full'>
         
         <div className="rounded-lg p-3 flex flex-col min-w-full mx-auto lg:w-[70%] mt-3 "
          style={{background: "rgb(18,18,18)"}}>
            <div className='flex flex-col lg:flex-row items-start justify-between'>
                <div className="flex flex-col space-y-3">
                      <h3 className='text-white font-medium text-[17px] '>Order</h3>
                      <div>
                          <p className='text-gray-400 text-sm '>Date</p>
                          <span className='text-gray-100 text-sm'>
                             {formatDate(data?.order?.createdAt as Date)}
                          </span>
                      </div>
                      <div>
                        <p className='text-light_blue text-sm mb-1 font-medium'>Status:</p>
                         <SelectOrderStatus status={data.order.orderStatus} />
                      </div>
                     
                </div>
                <div className='flex flex-col space-y-3'>
                     <h3 className="opacity-0">some placeholder</h3>
                      <div>
                          <p className='text-gray-400 text-sm '>Reference</p>
                          <span className='text-gray-100 text-sm'>
                             {data?.order._id}
                          </span>
                      </div>
                </div>
                
                <div className="flex flex-col space-y-3">
                    <div className='flex flex-col space-y-1'>
                    <h3 className='text-white font-medium text-[17px] '>Customer</h3>
                      <div>
                          <p className='text-[16px] text-light_blue underline font-medium '>
                             {data?.order.user.name} {" "} {data?.order.user.lastName}
                          </p>
                          <span className='text-[17px] text-light_blue underline font-medium '>
                             {data?.order.user.email}
                          </span>
                      </div>
                    </div>
                    <div className='flex flex-col space-y-3'>
                    <h3 className='text-white font-medium text-[17px] '>Shipping Address</h3>
                      <div>
                          <p className='text-[16px] text-white font-medium '>
                             {data?.order.user.name} {" "} {data?.order.user.lastName}
                          </p>
                          <p className='text-[16px] text-white font-medium '>{data?.order.shippingAddress.postalCode} {data?.order.shippingAddress.address} </p>
                          <p className='text-[16px] text-white font-medium '>{data?.order.shippingAddress.city}, +212{data?.order.shippingAddress.phoneNumber}</p>
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
                        {data?.order.orderItems.map((x,index) => (
                            <tr key={index}>
                                  <td className="px-4  py-3">
           <span className='text-white font-medium text-normal '>
             {x._id}
           </span>
        </td>
        <td className="px-4  py-3">
           <span className='text-white  whitespace-nowrap font-medium text-normal '>
             {formatPrice(x.price)}
           </span>
        </td>
        <td className="px-4  py-3">
           <span className='text-white font-medium text-normal '>
             {x.qty}
           </span>
        </td>
        <td className="px-4  py-3">
           <span className='text-white whitespace-nowrap font-medium text-normal '>
             {formatPrice(x.price * x.qty)}
           </span>
        </td>
                            </tr>
                        ))}
                     </tbody>
                 </table>
                 {/* <div className="flex flex-col space-y-3">
                    
                     {items.map((x,index) => (
                        <p key={index}></p>
                     ))}
                    
                    
                 </div> */}
                
            </div>
            <div className='flex flex-col gap-3 mt-5'>
                 <h3 className='text-gray-200 text-[18px] font-medium  '>Total</h3>
                 <div className="flex flex-col space-y-3">
                     <div className='flex border-b pb-3 border-gray-500 items-center justify-between'>
                         <p className='text-white font-normal text-[15px] '>Sum</p>
                         <p className='text-white font-medium text-[16px] '>
                           {formatPrice(data?.order?.totalPrice as number)}
                         </p>
                     </div>
                     <div className='flex border-b pb-3 border-gray-500 items-center justify-between'>
                         <p className='text-white font-normal text-[15px] '>Delivery</p>
                         <p className='text-white font-medium text-[16px] '>
                           {formatPrice(15)}
                         </p>
                     </div>
                     <div className='flex border-b pb-3 border-gray-500 items-center justify-between'>
                         <p className='text-white font-normal text-[15px] '>Tax (0 %)</p>
                         <p className='text-white font-medium text-[16px] '>Tax free</p>
                     </div>
                     <div className='flex border-b pb-3 border-gray-500 items-center justify-between'>
                         <p className='text-white font-normal text-[15px] '>Total</p>
                         <p className='text-white font-medium text-[16px] '>
                           {formatPrice(data?.order?.totalPrice as number + 15)}
                         </p>
                     </div>
                 </div>
                 <div className='flex items-center justify-between'>
                     <Button disabled className="disabled:bg-[#333]">
                       <Save /> Save
                     </Button>
                  <DeleteOrderBtn id={id} />
                 </div>
            </div>
         </div>
    </div>
  )
}

export default page