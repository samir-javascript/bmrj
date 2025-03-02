import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
// authentication;
// cart functionality (global state management);
// admin dashbord;
// payment process;
// user profile;
const ProductCard = () => {
  return (
    <div className="w-[180px] shadow-sm flex flex-col border rounded-lg border-gray-200 ">
       <div className='w-full bg-gray-100 rounded-tr-lg rounded-tl-lg' >
       <Image src="/mi.png" className='object-contain' alt='product_image' width={170} height={170} />
       </div>
       <div className='p-3 flex flex-col justify-between'>
        <div>
        <Link href="/products/productName">
          <p className='line-clamp-3 text-[#555] font-medium text-[13px]
           hover:text-light_blue hover:underline'>5 Mini Éponges de maquillage Multi usage Sans Latex - Couleurs aléatoires</p>
           </Link>
           <p className='text-[12px] font-light text-gray-400 '>Vendu par <span className='text-light_blue font-medium '>New toys Maroc</span></p>
        </div>
         <div className="flex items-center mt-5 justify-between gap-2">
              <div className='flex flex-col'>
                    <p className='text-light_blue font-medium text-[14px]'>243,00 Dh</p>
                    <p className='text-[12px] font-light text-gray-400 line-through'>300,00 Dh</p>
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