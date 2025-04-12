import HeroForm from '@/components/forms/HeroForm'
import React from 'react'

const page = () => {
  return (
    <div className='h-full  w-full py-7 max-lg:px-5 '>
      <div className='border-b border-gray-200 pb-3 flex flex-col gap-2  '>
          <h2 className="h2-bold">Hero Images</h2>
          <p className='text-gray-500 font-medium text-[16px]  '>Manage Hero images settings and add new ones , edit or delete.</p>
      </div>
        <HeroForm />
    </div>
  )
}

export default page