import React from 'react';
import ProfileItems from '@/components/navbar/ProfileItems';
import RightSidebar from '@/components/navbar/RightSidebar';


import Alert from '@/components/shared/Alert';

const Page = async () => {
  
  return (
    <div className='flex lg:flex-row flex-col lg:px-10 lg:py-8 gap-5'>
      <ProfileItems />
      <RightSidebar />

      {/* Separator for small screens */}
      <div className='w-full lg:hidden h-[10px] bg-gray-100' />

      {/* Main content */}
      <div className='w-full my-5'>
      <Alert message="Vous n’avez aucun coupon" />
      </div>
     
    </div>
  );
};
export default Page