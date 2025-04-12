"use client"
import EditShippingBtn from '@/components/btns/EditShippingBtn'
import Features from '@/components/shared/Features'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { IShipping } from '@/database/models/shippingAdress.model'
import { useAppSelector } from '@/hooks/user-redux'
import { Edit, LocateIcon, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const ShippingCheckout = ({data}: {
    data: IShipping[]
}) => {
    const { shippingAddress } = useAppSelector(state => state.shipping)
    
  return (
    <>
        <div className='flex lg:flex-row flex-col items-start w-full gap-5'>
              <div>
              <h2 className="h2-bold lg:block hidden mb-4">Choix adresse de livraison</h2>
               <div className='rounded-lg flex flex-col gap-3 bg-gray-200 px-2 py-3'>
               <div className='flex items-center justify-between'>
              <h3 className='text-[16px] font-bold text-black '>Adresse de livraison</h3>
                  
                      <Edit className='lg:hidden flex' />
                     
              </div>
                  <div className='flex items-center gap-2.5'>
                       <User className='text-light_blue' />
                       <p className='font-medium text-black text-sm '>{shippingAddress?.name}</p>
                       <span>|</span>
                       <p className='font-medium text-black text-sm '>+212{shippingAddress?.phoneNumber}</p>
                  </div>
                  <div className="flex items-center justify-between">
                  <div className='flex items-center gap-2.5'>
                       <LocateIcon className='text-light_blue' />
                        <p className='font-medium text-black text-sm '> {shippingAddress?.city}, {shippingAddress?.address}, {shippingAddress?.country}, {shippingAddress?.postalCode}</p>
                  </div>
                  <EditShippingBtn data={data} />
                  </div>
                 
               </div>
                 <div className='bg-gray-100 px-5 mt-4 py-3'>
                      <div className='flex items-center justify-between'>
                           <p className='font-bold text-[18px] leading-[16px] text-[#333] '>Expedié depuis le Maroc</p>
                           <p className='text-[#333] font-normal '>10 produits</p>
                      </div>
                      {/* cart items */}
                      {[0,1,2,3,4,5,6,7,8,9].map((_,index) => (
               <div key={index} className='border-gray-300 mt-3  rounded-lg bg-white p-3 '>
               <div className='flex items-start   justify-between gap-3'>
               <div className='bg-gray-100 rounded-lg lg:w-[120px] w-[80px] h-[80px] lg:h-[120px] '>
               <img  className='object-contain w-full h-full' src="/y.png" alt="" />
               </div>
               <div className='flex-1 justify-between h-full flex flex-col'>
               <Link href="/">
               <p className='line-clamp-1 text-gray-600 text-sm hover:text-light_blue hover:underline'>
               Ustensiles de cuisine en silicone 12 ensembles Spoonula Brush Fouet Spatule Louche Slotted Turner et Spoon Tongs Pasta Fork
               </p>
               </Link>
               
               <p className='text-sm text-gray-400 font-normal lg:mt-2.5 '>Vendeur SHOP ATLAS</p>
               <h5 className='lg:text-[16px] text-[12px]  font-bold text-[#222] '>Livraison entre le vendredi 7 mars 2025 et le lundi 10 mars 2025</h5>
        
                <p className='lg:mt-2.5 font-semibold text-sm'><span>QTY:</span> 5</p>
               </div>
              
               <div className='lg:flex hidden flex-col gap-1.5 justify-end items-end'>
                  
                  
               <div className='flex flex-col items-end '>
                  <h3 className='text-2xl font-extrabold text-[#111] '>649,00 Dh</h3>
                  <p className='text-gray-400 line-through text-sm font-normal '>1 299,00 Dh</p>
               </div>
               </div>
               
               </div>
               <div className='lg:hidden flex  flex-col gap-1.5 justify-end items-end'>
                  
                  
               <div className='flex flex-col items-end '>
                  <h3 className='text-2xl font-extrabold text-[#111] '>649,00 Dh</h3>
                  <p className='text-gray-400 line-through text-sm font-normal '>1 299,00 Dh</p>
               </div>
               </div>
               </div>
                      ))}
                    
                 </div>
              </div>
         <div className='flex flex-col max-lg:w-full px-3 space-y-3 '>
             {/* checkout total */}
            
          <div className='border w-full  lg:w-[450px] flex flex-col   border-gray-200 rounded-lg px-3 py-10 '>
               <div className='flex items-center justify-between border-b border-gray-100 pb-5'>
                    <p className='text-sm text-[14px] text-[#555] font-semibold '>
                    Total articles(10)</p>
                    <p className='text-sm text-[14px] text-[#555] font-semibold '>1 954,92 Dh</p>
               </div>
               <div className='flex items-center justify-between w-full border-b border-gray-100 py-2'>
                    <p className=' text-[12px] whitespace-nowrap text-[#999] font-normal '>
                    Frais de livraison</p>
                    <p className=' text-[12px] text-[#999] font-normal '>Calculé après sélection d'adresse</p>
               </div>
               <div className='flex items-center justify-between w-full pt-3 '>
                    <h4 className=' text-[18px] whitespace-nowrap text-light_blue font-bold '>
                    Total à payer</h4>
                    <p className=' text-[18px] whitespace-nowrap text-light_blue font-bold '>
                    1 954,92 Dh
        
                    </p>
               </div>
          </div>
          <Button className='w-full bg-light_blue text-white rounded-2xl font-bold h-[46px]  ' type='button'>
             <Link href={ROUTES.payment_checkout}>
               Confirmer la commande
             </Link>
              
          </Button>
          <Features />
              </div>
             
              </div>
    </>
  )
}

export default ShippingCheckout