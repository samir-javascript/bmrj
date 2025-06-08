import CategoryImage from '@/components/shared/CategoryImage';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const page = async({params}: {params: Promise<{categoryName:string}>}) => {
    const { categoryName} = await params;
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
    </div>
  )
}

export default page