
import { createProduct } from '@/actions/product.actions'
import { auth } from '@/auth'
import ProductForm from '@/components/forms/ProductForm'

import { ProductSchemaValidation } from '@/lib/zod'
import React from 'react'

const page = async() => {
  const session = await auth()
  console.log(session, "session yassinos here")
  return (
    <div className='h-full  w-full py-7 max-lg:px-5 '>
      <div className='border-b border-gray-200 pb-3 flex flex-col gap-2  '>
          <h2 className="h2-bold text-white">Products</h2>
          <p className='text-gray-300 font-medium text-[16px]  '>Manage your producrs settings and add new products , edit or delete.</p>
      </div>
        <ProductForm />
    </div>
  )
}

export default page