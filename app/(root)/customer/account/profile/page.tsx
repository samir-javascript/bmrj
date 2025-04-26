import { checkPasswordcanChange, getUserInfo } from '@/actions/user.actions';
import { auth } from '@/auth';
import ProfileItems from '@/components/navbar/ProfileItems';
import RightSidebar from '@/components/navbar/RightSidebar';
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'
import AddressComponent from '../../address/_components/AddressComponent';
import { getShippingAddress } from '@/actions/shipping.actions';
import ChangePasswordBtn from '@/components/btns/ChangePasswordBtn';

const page = async() => {
    const session = await auth()
    console.log(session, "session")
    if(!session) redirect(ROUTES.signup)
    const result = await getUserInfo({userId:session.user.id})
    const data = await getShippingAddress()
    const { data:canChangePasswordPromise} = await  checkPasswordcanChange({ userId: session.user.id })

  return (
    <div className='flex lg:flex-row flex-col lg:px-10 lg:py-8 gap-5'>
        <ProfileItems /> 
        <RightSidebar />
        <div className='w-full lg:hidden  h-[10px] bg-gray-100  ' />
        {/* box info */}
        <div className='flex flex-1 flex-col px-3 pt-4 space-y-5'>
            <h2 className='h2-bold'>Information du compte</h2>
            <div className='flex border-b border-gray-200 pb-4 flex-col lg:flex-row lg:justify-between w-full  gap-7'>
                 <div className='flex flex-col gap-2'>
                     <h3 className='text-[18px] font-semibold text-[#333] '>Information du contact</h3>
                     <div className='flex flex-col space-y-2 mt-3'>
                         <p className='small-medium text-gray-500'>{result.data?.userInfo?.gender === "male" ? "Mr" : "Mrs"} {result.data?.userInfo.name} {result?.data?.userInfo?.lastName} </p>
                         <p className='small-medium text-gray-500'>{result.data?.userInfo?.email} </p>
                          <div className='flex items-center gap-3'>
                            <Link href={ROUTES.editProfile(session.user.id)}>
                            <button className='text-light_blue paragraph-semibold underline' type='button'>
                                Modifier
                            </button>
                            </Link>
                               <span>|</span>
                               {canChangePasswordPromise?.canPasswordChange ? (
                                   <Link href={ROUTES.editProfile(session.user.id)}>
                                      <button  className='underline whitespace-nowrap paragraph-semibold text-light_blue'
                                     type="button">Changer le mot de pass</button>
                                   </Link>
                               ): (
                                <ChangePasswordBtn text={canChangePasswordPromise ? "Changer le mot de pass" : "Set Password"} email={session.user.email as string} />
                               )}
                             
                          </div>
                     </div>
                 </div>
                 <div className='flex flex-col gap-2'>
                     <h3 className='text-[18px] font-semibold text-[#333] '>mes communications</h3>
                     <div>
                         <p className='small-medium text-gray-500'>Vous êtes abonné à nos communications email et/ou SMS</p>
                         
                          
                              <button className='underline paragraph-semibold mt-3 text-light_blue' type="button">Modifier</button>
                              
                     </div>
                 </div>
            </div>
            <div>
            <div className='flex items-center mb-5 max-sm:justify-between w-full lg:gap-5'>
                      <h3 className='text-[18px] font-semibold text-[#333] '>Carnet D'addresses</h3>
                      <Link href="/customer/address">
                      <button className='underline paragraph-semibold text-light_blue' type="button">
                           Gérer les adresses
                      </button>
                      </Link>
                      

                    </div>
         
            <AddressComponent address={data?.data?.shippingAddresses[0]} />
            </div>
          
        </div>
    </div>
  )
}

export default page