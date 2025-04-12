import { getUserInfo } from '@/actions/user.actions';
import { auth } from '@/auth';
import CancelOrderBtn from '@/components/btns/CancelOrderBtn';
import OpenOrderDetailsBtn from '@/components/btns/OpenOrderDetailsBtn';
import ProfileItems from '@/components/navbar/ProfileItems';
import RightSidebar from '@/components/navbar/RightSidebar';
import Alert from '@/components/shared/Alert';
import { Button } from '@/components/ui/button';

import { ROUTES } from '@/constants/routes';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async () => {
  const session = await auth();
  if (!session) redirect(ROUTES.signup);

  const orders = "jdjfhfd";
  return (
    <div className='flex lg:flex-row flex-col lg:px-10 lg:py-8 gap-5'>
      <ProfileItems />
      <RightSidebar />
      <div className='w-full lg:hidden h-[10px] bg-gray-100' />
      {/* box info */}
      {orders ? (
        <div className="w-full px-2">
          <h2 className="h2-bold w-full lg:text-left text-center mb-5">2 Commandes</h2>
          <div className='flex flex-col space-y-3 w-full'>
            {[0, 1].map((_, index) => (
              <div className='rounded-lg border border-light_gray' key={index}>
                <div className='bg-[#f2f2f2] border-b border-gray-200 h-[50px]  flex items-center justify-between rounded-tr-lg rounded-tl-lg'>
                  <div className='flex h-full py-[8px] px-[10px] items-center gap-3'>
                    <div>
                      <p className='font-light text-xs text-gray-500 '>N°001107535</p>
                    </div>
                    <div className='border-l border-gray-200 h-full'></div>
                    <div className='flex flex-col'>
                    <p className='font-bold text-[#333] lg:text-sm text-xs whitespace-nowrap '>Effectuée le 02-04-2025</p>
                    <p className='font-light lg:hidden block text-sm text-gray-600 '><span>Total :</span> 57,95Dh
                    </p>
                    </div>
                    
                  </div>
                  <div className='flex lg:pr-2 pr-1 items-center gap-4'>
                       <p className='font-light lg:block hidden text-sm text-gray-600 '><span>Total :</span> 57,95Dh
                       </p>
                       <OpenOrderDetailsBtn />
                  </div>
                </div>
               <div className="p-[10px] flex items-center justify-between ">
                   <div className='flex items-start gap-3'>
                       <div className='border border-light_gray w-[100px] lg:w-[75px] '>
                          <img loading='lazy' className='w-full object-contain h-full' src="https://cdn.octopia-io.net/pdt2/4/1/2/1/700x700/AAAAG87412.jpg" alt="" />
                        </div>
                        <div className="flex flex-col gap-[2px] " >
                           <div className='bg-green-500 w-fit flex items-center justify-center rounded-md text-white px-2  '>
                              <span className="text-xs font-semibold">Confirmée</span>
                           </div>
                            <p className='max-w-[500px] text-[#333] text-sm font-medium '>Verres à Eau - TUA FH - Set de 6 - Transparent - Verre Plat - Compatible Lave-Vaisselle</p>
                            <p className="text-gray-500 font-light text-sm"><span>QTY :</span> 2</p>
                            <h4 className='font-bold text-black text-sm m-0'>57,95Dh</h4>
                
                        </div>
                   </div>
                   <div className="flex flex-col gap-2">
                     <Button className="h-fit py-1.5 border border-light_blue bg-transparent
                      hover:bg-transparent text-light_blue rounded-full text-xs font-bold " >
                       suivi colis
                     </Button>
                      <CancelOrderBtn />
                   </div>
               </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Alert message="You haven't placed any orders yet" />
      )}
    </div>
  );
};

export default page;
