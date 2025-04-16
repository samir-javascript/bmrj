import { hasSavedProduct } from '@/actions/collection.actions';
import { getSingleProduct } from '@/actions/product.actions';
import SaveProductHeart from '@/components/btns/SaveProductHeart';
import ProductImages from '@/components/shared/ProductImages';
import Reviews from '@/components/shared/Reviews';
import YouMayLike from '@/components/shared/YouMayLike';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft, ChevronRight, CreditCard, Heart, Minus, Package, Plus, Truck } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'
import CartQtyAdd from '../_components/CartQtyAdd';
import ParseHtml from '@/components/forms/editor/ParseHtml';
import { IProduct } from '@/database/models/product.model';
import CartQtyMobile from '../_components/CartQtyMobile';
import { products } from '@/constants';
const ModePaiment = ({isMobile} : {isMobile:boolean}) => {
    return (
        <div className='bg-gray-100 rounded-md  w-full flex flex-col pt-2'>
        <h5 className='text-[16px] px-3 text-black font-semibold mb-3 '>Mode de paiement</h5>
        <div className='flex  flex-col'>
            
            <div className='flex items-start px-3 mb-[16px]  gap-1.5'>
            <CreditCard />
                <div className="flex flex-col">
                    <p className="font-bold text-sm text-black">Paiement par carte bancaire</p>
                    <img className='object-contain w-[125px] ' src="/cards.png" alt="paiment card" />
                </div>
            </div>
           
            
         <div className='flex items-center  hover:!text-white transition-all duration-200 border-b border-gray-300
          px-3 py-2 justify-between group cursor-pointer hover:bg-secondary'>
         <div className='flex  items-center 
             gap-1.5 '>
                <Package />
                <div className="flex flex-col">
                    <p className="font-bold text-sm group-hover:text-white text-black">
                    Paiement à la livraison</p>
                    <p className='font-light text-sm'>Paiement en espèce à la livraison</p>
                </div>
            </div>
           {isMobile && <ChevronRight className='group-hover:text-white' />} 
         </div>
         <div className='flex items-center  hover:!text-white transition-all duration-200 border-b border-gray-300
          px-3 py-2 justify-between group cursor-pointer hover:bg-secondary'>
         <div className='flex  items-center  gap-1.5'>
                <ArrowRightLeft />
                <div className="flex flex-col">
                    <p className="font-bold text-sm group-hover:text-white text-black">
                   Politique de retours</p>
                    <p className='font-light text-sm'>Note de politique de retour</p>
                </div>
            </div>
            {isMobile && <ChevronRight className='group-hover:text-white' />} 
         </div>
         
        </div>
   </div>
    )
}

const page = async({params}: {params: Promise<{id:string}>}) => {

    const { id } = await params;
    const result = await getSingleProduct({productId:id})
    const hasSavedPromise = await hasSavedProduct({productId:id})
  
    const product = result.data?.product;
          
    if(!product) return notFound()
  return (
    <>
     <CartQtyMobile product={product} /> 
    <div className='my-7 w-full lg:px-5 px-3 max-w-[1500px] mx-auto flex flex-col '>
      
        <h3 className='text-[24px] lg:hidden block mb-3 lg:max-w-[350px]  max-sm:text-[18px] font-semibold text-[#333] '>
             {product.name}
                    </h3>
        <div className='flex w-full flex-col lg:flex-row gap-3'>
            <div className="sm:mr-8">
                <ProductImages product={product} hasSavedProductPromise={hasSavedPromise} productId={product._id} />
            </div>
            <div className='flex  w-full flex-1 flex-col gap-3'>
                <div className='flex items-start gap-2'>
                  <div className='flex flex-col'>
                     <h3 className='text-[24px] lg:block hidden lg:max-w-[350px]  max-sm:text-[18px] font-semibold text-[#333] '>
                         {product.name}
                      </h3>
                      <div className='px-2 bg-yellow-500 rounded-lg w-fit'>
                          <span className='text-black font-medium text-xs'>Offres Ramadan</span>
                      </div>
                  </div>
                   
            <div>
               <SaveProductHeart hasSavedProductPromise={hasSavedPromise} productId={product._id}  /> 
            </div>
                    
                </div>
                <div className='flex lg:hidden  border-b border-gray-200 pb-7 flex-col '>
                       <h2 className='h2-bold text-light_blue'>{product.price} Dh</h2>
                       <div className='flex items-center gap-3'>
                          <p className='text-[12px] font-light text-gray-400 line-through'>{product.prevPrice} Dh</p>
                          <div className='rounded-[3px] bg-[#d70073] w-[45px]  h-[18px] flex items-center justify-center px-[2px] py-[4px] '>
                 <span className='text-white font-medium text-[14px]'>-22%</span>
              </div>
                       </div>
                   </div>
                <div className='flex flex-col gap-[3px] mt-3'>
                   <div className='flex items-center gap-1'>
                      <span className='text-gray-500 text-sm '>Marque:</span>
                      <span className='hover:underline text-light_blue font-semibold cursor-pointer'>{product.brand} </span>
                   </div>
                   <div className='flex items-center gap-1'>
                      <span className='text-gray-500 text-sm '>Vendu par</span>
                      <span className='hover:underline text-light_blue font-semibold cursor-pointer'>MARJANE</span>
                   </div>
                </div>
                <div className='rounded-md max-w-[350px] px-2 py-2.5 bg-gray-100 flex items-start gap-1 '>
                    <Package />
                    <p className='text-xs font-light text-[#555]'>Livraison entre le <span className='text-black font-bold'>mercredi 12 mars 2025</span>  et le <span className='text-black font-bold'>jeudi 13 mars 2025</span></p>
                </div>
                <div className='lg:hidden flex w-full'>
                     <ModePaiment isMobile />
                </div>
                <article>
                   <h4 className='text-[18px] font-bold text-black mb-2'>À propos de cet article :</h4>
                   {/* <p className=' text-[#111] lg:max-w-[400px] text-sm leading-[1.7] '>
                     {product.description}
                   </p> */}
                   <ParseHtml data={product.description} />
                </article>
            </div>
            {/* checkout & price  */}
            <div className='lg:flex hidden flex-col space-y-4'>
            <div className='border lg:max-w-[300px]  h-fit  border-gray-300 rounded-lg px-4 py-3 flex flex-col '>
                   <div className='flex items-center justify-center border-b border-gray-200 pb-7 flex-col '>
                       <h2 className='h2-bold text-light_blue'>{product.price} Dh</h2>
                       <div className='flex items-center gap-3'>
                          <p className='text-[12px] font-light text-gray-400 line-through'>{product.prevPrice} Dh</p>
                          <div className='rounded-[3px] bg-[#d70073] w-[45px]  h-[18px] flex items-center justify-center px-[2px] py-[4px] '>
                 <span className='text-white font-medium text-[14px]'>-22%</span>
              </div>
                       </div>
                   </div>
                   <div className='py-3 border-b border-gray-200 flex flex-col space-y-2'>
                    <div className='flex items-center justify-between gap-2'>
                      <div className='flex items-center gap-1'>
                          <Truck size={24} />
                          <span className='text-sm font-normal text-[#777] '>Livraison à domicile</span>
                       </div>
                       {/* btn model */}
                        <div className='cursor-pointer'>
                           <span className='text-light_blue font-medium text-sm underline'>Details</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-1'>
                        <span className='font-medium text-[#777] text-sm '>Frais de livraison à partir de :</span>
                        <span className='font-bold text-black text-sm'>15 dh</span>
                    </div>
                       
                   </div>
                   
                  <CartQtyAdd item={product} />
                      
                   </div>
            
            {/* mode de paiment */}
           
            <div>
                 <ModePaiment isMobile={false} />
            </div>
            </div>
           
        </div>
       
    </div> 
    <div className='h-[10px] w-full bg-gray-100 mt-5 ' />
    <YouMayLike />
    <div className='h-[10px] w-full bg-gray-100 mt-5 ' />
    <Reviews product={product} />
    </>
  )
}

export default page