import { checkPasswordcanChange, getUserInfo } from '@/actions/user.actions';
import { auth } from '@/auth';
import EditProfileForm from '@/components/forms/EditProfileForm';
import ProfileItems from '@/components/navbar/ProfileItems';
import RightSidebar from '@/components/navbar/RightSidebar';

import { redirect } from 'next/navigation';
import React from 'react'

const page = async({params}: {params: Promise<{id:string}>}) => {
   const session = await auth()
   if(!session) redirect("/")
    const {id} = await params;

  const [userInfoResult, passwordCheckResult] = await Promise.all([
    getUserInfo({ userId: id }),
    checkPasswordcanChange({ userId: id }),
  ]);
  
  const { data } = passwordCheckResult;
  const result = userInfoResult;

  return (
    <div className='flex lg:flex-row flex-col lg:px-10  pb-7 lg:py-8 gap-5'>
        <ProfileItems /> 
        <RightSidebar />
        <div className='w-full lg:hidden  h-[10px] bg-gray-100  ' />
        {/* box info */}
        <div className='flex flex-1 flex-col px-3 pt-4 space-y-5'>
            <h2 className='h2-bold'>Information du compte</h2>
           <EditProfileForm canChangePasswordPromise={data?.canPasswordChange as boolean} user={result!.data?.userInfo!} />
        </div>
    </div>
  )
}

export default page