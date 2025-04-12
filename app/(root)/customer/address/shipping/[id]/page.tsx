
import {  getSingleShipping } from '@/actions/shipping.actions'
import EditShippingForm from '@/components/forms/EditShippingForm'

import ProfileItems from '@/components/navbar/ProfileItems'
import RightSidebar from '@/components/navbar/RightSidebar'

import { notFound } from 'next/navigation'
import React from 'react'

const page = async({params}: {params: Promise<{id:string}>}) => {
  const { id } = await params
  const {success, data } = await getSingleShipping({id})
 
  if(!success) return notFound()
   
  return (
    <div className='flex lg:flex-row flex-col lg:px-10 pb-5  lg:py-8 gap-5'>
    <ProfileItems /> 
    <RightSidebar />
    <div className='w-full lg:hidden  h-[10px] bg-gray-100  ' />
    {/* box info */}
    <div className='flex flex-1 flex-col px-3 pt-4 space-y-5'>
      <div className='border-b border-gray-200 pb-3 flex flex-col gap-2  '>
          <h2 className="h2-bold">Edit Address</h2>
          <p className='text-gray-500 font-medium text-[16px]  '>Manage your address settings and add new ones , edit or delete.</p>
      </div>
      
      <EditShippingForm shipping={data?.shipping!} id={id} />
      
    </div>
</div>
  )
}

export default page