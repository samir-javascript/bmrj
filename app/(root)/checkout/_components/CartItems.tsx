"use client"
import CouponBtn from '@/components/btns/CouponBtn'
import Features from '@/components/shared/Features'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { useCartItems } from '@/hooks/useCartItems'
import { useAppSelector } from '@/hooks/user-redux'
import { getTotalItems } from '@/lib/store/cartSlice'
import { formatPrice } from '@/lib/utils'
import { UserCartElement } from '@/types/Elements'
//import { useCartStore } from '@/lib/store/cartStore'

import { Minus, Plus, TrashIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CartItems = ({data,isAuthenticated,userId}: {
    data?: UserCartElement;
    isAuthenticated: boolean
    userId:string
}) => {
  
   
    const cartItems  = useCartItems({isAuthenticated,data})

   
    const totalQty = cartItems?.reduce((acc:number, item:{quantity:number}) => acc + item.quantity, 0);
    const totalPrice = 220
    
  return (
   cartItems &&  cartItems.length > 0 ? (
        <div className='flex flex-col lg:flex-row items-start gap-10'>
        <div className='bg-gray-100 px-5 py-3'>
             <div className='flex items-center justify-between'>
                  <p className='font-bold text-[18px] leading-[16px] text-[#333] '>Expedié depuis le Maroc</p>
                 
                  <p className='text-[#333] font-normal '>{totalQty} produits</p>
             </div>
             {/* cart items */}
             {cartItems.map((item:any,index:number) => (
      <div key={index} className='border-gray-300 mt-3  rounded-lg bg-white p-3 '>
      <div className='flex items-start   justify-between gap-3'>
      <div className='bg-gray-100 rounded-lg w-[120px] h-[120px] '>
      <img  className='object-contain w-full h-full' src={"https://www.marjanemall.ma/media/catalog/product/cache/2d24969db123d312c3d8c8732be47ef4/_/p/_pdt2_3_8_7_1_700x700_AAANE25387_6.jpg"} alt={item.title} />
      </div>
      <div className='flex-1 justify-between h-full flex flex-col'>
      <Link href={`/products/${item._id}`}>
      <p className='line-clamp-1 text-gray-600 text-sm hover:text-light_blue hover:underline'>
         {item.title}
      </p>
      </Link>
      <div className="lg:mt-9">
      <p className='text-sm text-gray-400 font-normal  '>Vendeur {item.brand} </p>
      <h5 className='text-[16px] font-bold text-[#222] '>Livraison entre le vendredi 7 mars 2025 et le lundi 10 mars 2025</h5>
      </div>
      </div>
      <div className='lg:hidden flex w-fit justify-end'>
      <TrashIcon size={20} color="red" />
      </div>
      <div className='lg:flex hidden flex-col gap-1.5 justify-end items-end'>
          <div>
              <TrashIcon color="red" />
          </div>
          <div className="border  flex w-[130px] justify-between items-center rounded-lg border-gray-300">
      <span className="border-r flex items-center py-2 px-2 justify-center text-center flex-1 border-gray-300">
         <Minus size={18} className="text-light_blue cursor-pointer text-center" />
      </span>
      <span className="flex-1 px-5 text-center py-2 font-semibold">
        {item.quantity}
      </span>
      <span className="flex-1 flex py-2 px-2 items-center justify-center text-center border-l border-gray-300">
         <Plus size={18} className="text-light_blue cursor-pointer text-center" />
      </span>
      </div>
      <div className='flex flex-col items-end '>
         <h3 className='text-2xl font-extrabold text-[#111] '>
             {formatPrice(item.price)}
         </h3>
         <p className='text-gray-400 line-through text-sm font-normal '>
             {formatPrice(totalPrice)}
         </p>
      </div>
      </div>
      
      </div>
      <div className='lg:hidden flex mt-3 items-center justify-between gap-2'>
      <div className="border  flex w-[130px] justify-between items-center rounded-lg border-gray-300">
      <span className="border-r flex items-center py-2 px-2 justify-center text-center flex-1 border-gray-300">
         <Minus size={18} className="text-light_blue cursor-pointer text-center" />
      </span>
      <span className="flex-1 px-5 text-center py-2 font-semibold">
        {item.quantity}
      </span>
      <span className="flex-1 flex py-2 px-2 items-center justify-center text-center border-l border-gray-300">
         <Plus size={18} className="text-light_blue cursor-pointer text-center" />
      </span>
      </div>
      <div className='flex flex-col items-end '>
         <h3 className='text-[16px] font-semibold text-[#111] '>{formatPrice(item.price)}</h3>
         <p className='text-gray-400 line-through text-sm font-normal '>
             {formatPrice(totalPrice)}
         </p>
      </div>
      </div>
      </div>
             ))}
           
        </div>
        <>
           <div className='flex flex-col max-lg:w-full px-3 space-y-3 lg:sticky lg:top-[10px] '>
           {/* checkout total */}
           <CouponBtn totalPrice={totalPrice} userId={userId} />
        <div className='border w-full  lg:w-[450px] flex flex-col   border-gray-200 rounded-lg px-3 py-10 '>
             <div className='flex items-center justify-between border-b border-gray-100 pb-5'>
                  <p className='text-sm text-[14px] text-[#555] font-semibold '>
                  Total articles({data?.qty})</p>
                  <p className='text-sm text-[14px] text-[#555] font-semibold '>
                      {formatPrice(totalPrice)}
                  </p>
             </div>
             <div className='flex items-center justify-between w-full border-b border-gray-100 py-2'>
                  <p className=' text-[12px] whitespace-nowrap text-[#999] font-normal '>
                  Frais de livraison</p>
                  <p className=' text-[12px] text-[#999] font-normal '>
                  {/* Calculé après sélection d'adresse */}
                   {formatPrice(15)}
                  </p>
             </div>
             <div className='flex items-center justify-between w-full pt-3 '>
                  <h4 className=' text-[18px] whitespace-nowrap text-light_blue font-bold '>
                  Total à payer</h4>
                  <p className=' text-[18px] whitespace-nowrap text-light_blue font-bold '>
                  {formatPrice(totalPrice + 15)}
      
                  </p>
             </div>
        </div>
        <Button disabled={cartItems.length === 0} className='w-full bg-light_blue text-white rounded-2xl font-bold h-[46px]  ' type='button'>
           <Link href={ROUTES.shipping_checkout}>
              Valider mon panier
           </Link>   
        </Button>
        <Features />
            </div>
           
        </>
       
      
        </div>
               ): (
                    <div className='flex flex-col max-lg:px-3 space-y-3'>
                        <p className='base-medium'>Aucun article dans votre panier.</p>
                        <p className='base-medium'>Cliquer <Link href="/"> <span className='text-light_blue underline'>ici</span></Link> pour continuer vos achats.</p>
                    </div>
               )
  )
}

export default CartItems