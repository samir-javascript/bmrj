"use client"
import { createShippingAddress } from '@/actions/shipping.actions'
import ShippingForm from '@/components/forms/ShippingForm'
import ProfileItems from '@/components/navbar/ProfileItems'
import RightSidebar from '@/components/navbar/RightSidebar'
import { ShippingSchemaValidation } from '@/lib/zod'
import React from 'react'

const page = () => {
  return (
    <div className='flex lg:flex-row flex-col pb-4 lg:px-10 lg:py-8 gap-5'>
    <ProfileItems /> 
    <RightSidebar />
    <div className='w-full lg:hidden  h-[10px] bg-gray-100  ' />
    {/* box info */}
    <div className='flex flex-1 flex-col px-3 pt-4 space-y-5'>
    <div className='border-b border-gray-200 pb-3 flex flex-col gap-2  '>
          <h2 className="h2-bold">Addresses</h2>
          <p className='text-gray-500 font-medium text-[16px]  '>Manage your address settings and add new ones , edit or delete.</p>
      </div>
      
      <ShippingForm type='CREATE' defaultValues={{
        name: "",
        phoneNumber: "",
        address: "",
        city: "",
        country: "",
        postalCode: ""
      }} onSubmit={createShippingAddress} schema={ShippingSchemaValidation} />
      
    </div>
</div>
  )
}

export default page