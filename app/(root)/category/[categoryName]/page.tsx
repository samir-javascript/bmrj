import { getProductsByCategory } from '@/actions/product.actions';
import ProductCard from '@/components/cards/ProductCard';
import Alert from '@/components/shared/Alert';
import CategoryImage from '@/components/shared/CategoryImage';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import FilterColumn from '../_components/Filters';

const page = async({params}: {params: Promise<{categoryName:string}>}) => {
    const { categoryName} = await params;
    const { data , error } = await getProductsByCategory({categoryName})
  return (
    <div className='w-full flex flex-col py-5 '>
       
        <div className='px-3 flex items-center gap-1'>
             <Link className="text-sm  hover:underline font-medium text-light_blue " href="/">
                Accueil 
             </Link>
             <ChevronRight size={16} />

             <p className='text-sm font-medium text-[#333] '>
               {categoryName}
             </p>
        </div>
         <CategoryImage categoryName={categoryName}  />
          <h2 className='h2-bold my-7'>Notre sélection</h2>
         <div className='flex px-5 flex-col gap-8 lg:flex-row items-start'>
          <FilterColumn />
  <div className=' flex mt-5 flex-col space-x-7'>
           
             <div>
          {data?.products.length! > 0 ? (
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-4">
                     {data?.products.map((product,index) => (
                         <div key={index}>
                               <ProductCard product={product} />
                         </div>
                     ))}
                     </div>
          ) : (
            <Alert message="Il n’y a aucun article associated with this category." />
          )}
         {error && (
           <Alert message={error.message}  />
         )}
        </div>
         </div>
         </div>
       
    </div>
  )
}

export default page