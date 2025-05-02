import { getMyOrders } from '@/actions/orders.actions';
import { getUserInfo } from '@/actions/user.actions';
import { auth } from '@/auth';
import CancelOrderBtn from '@/components/btns/CancelOrderBtn';
import OpenOrderDetailsBtn from '@/components/btns/OpenOrderDetailsBtn';
import ProfileItems from '@/components/navbar/ProfileItems';
import RightSidebar from '@/components/navbar/RightSidebar';
import Pagination from '@/components/pagination/Pagination';
import Alert from '@/components/shared/Alert';
import { Button } from '@/components/ui/button';

import { ROUTES } from '@/constants/routes';
import { formatDate, formatPrice } from '@/lib/utils';
import { searchParamsProps } from '@/types/action';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async ({searchParams}:searchParamsProps) => {
  const { page, pageSize } = await searchParams
  const session = await auth();
  if (!session) redirect(ROUTES.signup);

  const  {data} = await getMyOrders({userId: session.user.id, page: Number(page) || 1, pageSize: Number(pageSize) || 5})
  console.log(page, "page")
 
  return (
    <div className='flex lg:flex-row flex-col lg:px-10 lg:py-8 gap-5'>
      <ProfileItems />
      <RightSidebar />
      <div className='w-full lg:hidden h-[10px] bg-gray-100' />
      {/* box info */}
      {data && data?.orders?.length > 0  ? (
        <div className="w-full px-2 flex-1">
          <h2 className="h2-bold w-full lg:text-left text-center mb-5">vos Commandes</h2>
          <div className='flex flex-col space-y-3 w-full'>
            {data?.orders.map((item) => (
              <div className='rounded-lg border border-light_gray' key={item._id}>
                <div className='bg-[#f2f2f2] border-b border-gray-200 max-sm:h-auto h-[50px] 
                 flex items-center justify-between rounded-tr-lg rounded-tl-lg'>
                  <div className='flex h-full py-[8px] max-sm:px-[4px] max-sm:py-[11px] px-[10px] items-center gap-3'>
                    <div>
                      <p className='font-light text-xs text-gray-500 max-sm:hidden '>N°{item._id}</p>
                    </div>
                    <div className='border-l max-sm:hidden border-gray-200 h-full'></div>
                    <div className='flex flex-col max-sm:gap-1'>
                    <p className='font-bold text-[#333] lg:text-sm text-xs whitespace-nowrap '>Effectuée le {formatDate(item.createdAt)} </p>
                    <p className='font-light lg:hidden block text-sm text-gray-600 '><span>Total :</span> {formatPrice(item.totalPrice)}
                    </p>
                    <div>
                      <p className='font-light text-xs text-gray-500 sm:hidden '>N°{item._id}</p>
                    </div>
                    </div>
                    
                  </div>
                  <div className='flex lg:pr-2 pr-1 items-center gap-4'>
                       <p className='font-light lg:block hidden text-sm text-gray-600 '><span>Total :</span> {formatPrice(item.totalPrice)}
                       </p>
                      <OpenOrderDetailsBtn  orderId={item._id} />
                  </div>
                </div>
                {item.orderItems.map((x,index) => (
 <div key={index} className="p-[10px] flex items-center justify-between ">
 <div className='flex items-start gap-3'>
     <div className='border border-light_gray w-[100px] lg:w-[75px] '>
        <img loading='lazy' className='w-full object-contain h-full' src={x.images[0]} alt={x.name} />
      </div>
      <div className="flex flex-col gap-[2px] " >
        <div className=' flex items-center max-sm:justify-between'>
        <div className={`${item.orderStatus === "canceled" ? "bg-red-500 " : "bg-green-500"} w-fit flex items-center justify-center rounded-md text-white px-2`}>
            <span className="text-xs font-semibold">
               {item.orderStatus}
            </span>
         </div>
         <div className='flex items-center gap-1 sm:hidden'>
         <p className="text-gray-500 font-light text-sm"><span>QTY :</span> {x.qty}</p>
          <span className='text-gray-500'>|</span>
         <h4 className='font-bold text-black  text-sm m-0'>
             {formatPrice(x.price)}
          </h4>
         </div>
        
        </div>
        
          <p className='max-w-[500px] max-sm:max-w-[350px] text-[#333] text-sm font-medium '>
            {x.name}
          </p>
          <p className="text-gray-500 font-light max-sm:hidden text-sm"><span>QTY :</span> {x.qty}</p>
          <h4 className='font-bold text-black max-sm:hidden text-sm m-0'>
             {formatPrice(x.price)}
          </h4>
          {/* <div className="flex items-center w-full sm:hidden gap-2">
   <Button className="h-fit py-1.5 flex-1 border border-light_blue bg-transparent
    hover:bg-transparent text-light_blue rounded-full text-xs font-bold " >
     suivi colis
   </Button>
    <CancelOrderBtn orderId={item._id} />
 </div> */}
      </div>
 </div>
 {/* <div className="flex flex-col max-sm:hidden gap-2 max-sm:gap-1">
   <Button className="h-fit py-1.5 border border-light_blue bg-transparent
    hover:bg-transparent max-sm:w-fit text-light_blue rounded-full text-xs font-bold " >
     suivi colis
   </Button>
    <CancelOrderBtn orderId={item._id}  />
 </div> */}
</div>
                ))}
                 <div  className="flex px-3 pb-3 max-sm:hidden gap-3 max-sm:gap-1">
                 
                 
                 <Button asChild className="h-fit py-1.5 border border-light_blue bg-transparent
    hover:bg-light_blue hover:text-white flex-1 text-light_blue rounded-full text-xs font-bold " >
      <Link href={ROUTES.orderDetails(item._id)}>suivi colis</Link>
   
   </Button>
               
   
    <CancelOrderBtn orderId={item._id}  />
 </div>
               <div className="flex items-center w-full sm:hidden gap-2">
   <Button className="h-fit py-1.5 flex-1 border border-light_blue bg-transparent
    hover:bg-transparent text-light_blue rounded-full text-xs font-bold " >
     suivi colis
   </Button>
    <CancelOrderBtn orderId={item._id} />
 </div>
              </div>
            ))}
          </div>
          <div className="my-5">
            <Pagination page={Number(page) || 1} isNext={data.isNext} />
          </div>
         
        </div>
      ): (
        <div className='w-full h-fit flex-1 my-3 '>
        <Alert message="You haven't placed any orders yet" />
      </div>
      )}
    </div>
  );
};

export default page;
