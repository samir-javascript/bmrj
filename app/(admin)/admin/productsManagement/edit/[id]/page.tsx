
import { getProductByIdAdmin } from '@/actions/product.actions'
import EditProductForm from '@/components/forms/EditProductForm'

import { notFound } from 'next/navigation'
import React from 'react'

const page = async({params}: {params: Promise<{id:string}>}) => {
  const { id } = await params;
  const result = await getProductByIdAdmin({productId: id})
  if(!result.success) return notFound()
  return (
    <div className='h-full  w-full py-7 max-lg:px-5 '>
      <div className='border-b border-gray-200 pb-3 flex flex-col gap-2  '>
          <h2 className="h2-bold">Edit Product</h2>
          <p className='text-gray-500 font-medium text-[16px]  '>Manage your products settings and add new products , edit or delete.</p>
      </div>
        <EditProductForm productId={id} product={result?.data?.product!}  />
    </div>
  )
}

export default page