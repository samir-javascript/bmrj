import { Button } from '@/components/ui/button'
import { CreditCard } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <section className='w-full'>
        <div style={{background: "rgba(0, 175, 170, .1)"}} className=' flex lg:flex-row lg:gap-2 flex-col items-center
         justify-center leading-[1.8] text-center p-[16px] '>
          <CreditCard className='text-light_blue lg:text-[25px] text-[20px] ' />
            <p className='text-light_blue font-[700] lg:text-[20px] text-[16px] '>Paiement à la livraison</p>
        </div>
        <div className="flex  mt-5 max-w-[1500px] border-b pb-5 border-black mx-auto lg:px-5 gap-4 px-3 items-start lg:flex-row flex-col lg:justify-between">
             <div className='flex flex-col'>
                 <h4 className='text-[22px] font-[500] text-primary mb-[8px] leading-[1.8] '>Merci pour votre commande</h4>
                 <p className="text-[#333] font-[400] max-w-[500px] text-[16px] ">Vous allez recevoir un email de confirmation comprenant le numéro de commande, les liens de suivi et le détail de votre commande</p>
             </div>
             <div>
                <h4 className='text-[22px] font-[500] text-primary leading-[1.8] '>Livrée à</h4>
                <div>
                    <p className="text-[#333] font-[400]  text-[16px] ">Mr. Soufiane said</p>
                    <p className="text-[#333] font-[400]  text-[16px] ">Maison sidi baba</p>
                    <p className="text-[#333] font-[400]  text-[16px] ">MEKNES, 50999 Maroc</p>
                    <p className="text-[#333] font-[400]  text-[16px] ">+212607558899</p>
                    <div className='flex items-center gap-2.5'>
                       <span className='text-light_blue font-light text-[16px] '>Total frais de livraison</span>
                       <span  className='text-light_blue font-light text-[16px] '>24,00 Dh</span>
                    </div>
                </div>
             </div>
        </div>
        <div className='flex items-center max-w-[1200px] mx-auto px-3 flex-col mt-7 justify-center'>
          <div className='bg-gray-200 rounded-tr-lg mb-4 rounded-tl-lg p-[16px] flex items-center justify-between w-full '>
               <p className='font-semibold text-[#333] text-[16px] '>Commande</p>
               <Link className='underline text-light_blue font-medium text-[16px] ' href={`/`}>
                  <span>001107534</span>
               </Link>
          </div>
           <div className='grid lg:grid-cols-2 grid-cols-1 gap-2.5'>
                <div className='border border-light_gray rounded-xl p-[16px] flex items-start gap-4 '>
                     <div className='border border-light_gray  w-[140px]  '>
                        <img className='w-full h-full object-contain' src="https://www.marjanemall.ma/media/catalog/product/cache/217553b69ac53547513500483223f4df/_/p/_pdt2_4_1_2_1_700x700_AAAAG87412_2.jpg" alt="" />
                     </div>
                     <div className='flex flex-col gap-2 justify-between'>
                         <p className='font-semibold text-[#222] text-sm '>Verres à Eau - TUA FH - Set de 6 - Transparent - Verre Plat - Compatible Lave-Vaisselle</p>
                         <div>
                             <p className='font-light text-gray-400 text-xs '>Vendu par Marjane.</p>
                             <p className='font-light text-gray-400 text-xs '><span>Qté :</span>1</p>
                             <h4 className='font-semibold text-black text-[18px]'>45,95 Dh</h4>
                         </div>
                     </div>
                </div>
                <div className='border border-light_gray rounded-xl p-[16px] flex items-start gap-4 '>
                     <div className='border border-light_gray  w-[140px]  '>
                        <img className='w-full h-full object-contain' src="https://www.marjanemall.ma/media/catalog/product/cache/217553b69ac53547513500483223f4df/_/p/_pdt2_4_1_2_1_700x700_AAAAG87412_2.jpg" alt="" />
                     </div>
                     <div className='flex flex-col gap-2 justify-between'>
                         <p className='font-semibold text-[#222] text-sm '>Verres à Eau - TUA FH - Set de 6 - Transparent - Verre Plat - Compatible Lave-Vaisselle</p>
                         <div>
                             <p className='font-light text-gray-400 text-xs '>Vendu par Marjane.</p>
                             <p className='font-light text-gray-400 text-xs '><span>Qté :</span>1</p>
                             <h4 className='font-semibold text-black text-[18px]'>45,95 Dh</h4>
                         </div>
                     </div>
                </div>
           </div>
            <Link href="/">
                <Button className='bg-light_blue  my-10 rounded-full w-[300px] h-[48px] hover:bg-light_blue text-white font-medium ' type="button">
                    Retour aux achats
                </Button>
            </Link>
        </div>
    </section>
  )
}

export default page