import { IProduct } from '@/database/models/product.model'
import { CollectionElement } from '@/types/Elements'
import { Heart, ShoppingCart } from 'lucide-react'
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
 } from "@/components/ui/tooltip"
 
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { hasSavedProduct } from '@/actions/collection.actions'
import HeartCart from '../btns/HeartCart'
// authentication;
// cart functionality (global state management);
// admin dashbord;
// payment process;
// user profile;
const ProductCard = async({product}: {
   product:IProduct
}) => {
  const hasSaved = await hasSavedProduct({productId:product._id})
  return (
    <div className="w-[180px] max-sm:w-[165px] h-[330px] shadow-sm flex flex-col border rounded-lg border-gray-200 ">
       <div  className='w-full relative bg-gray-100 rounded-tr-lg rounded-tl-lg' >
         <Link href={`/products/${product._id}`}>
            <Image src={product.images[0].url}
             className='object-contain' alt='product_image' width={170} height={170}  />
         </Link>
       <HeartCart hasSaved={hasSaved.data?.saved || false} productId={product._id} />

        
        
       </div>
       <div className='p-3 flex flex-col justify-between'>
        <div>
        <Link href={`/products/${product._id}`}>
          <p className='line-clamp-3 text-[#555] font-medium text-[13px]
           hover:text-light_blue hover:underline'>
             {product.name}
           </p>
           </Link>
           <p className='text-[12px] font-light text-gray-400 '>Vendu par <span className='text-light_blue font-medium '>
             {product.brand}
             </span></p>
        </div>
         <div className="flex items-center mt-5 justify-between gap-2">
              <div className='flex flex-col'>
                    <p className='text-light_blue font-medium text-[14px]'>{product.price} Dh</p>
                    <p className='text-[12px] font-light text-gray-400 line-through'>{product.prevPrice} Dh</p>
              </div>
              <div className='rounded-[3px] bg-[#d70073] w-[45px]  h-[18px] flex items-center justify-center px-[2px] py-[4px] '>
                 <span className='text-white font-medium text-[14px]'>-22%</span>
              </div>
              <div className='flex w-[35px] h-[35px] ml-[3px] items-center justify-center bg-light_blue rounded-full text-white'>
                 <ShoppingCart size={20} />
              </div>
         </div>
       </div>
       
    </div>
  )
}

export default ProductCard