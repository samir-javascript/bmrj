import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { brands, footerCategories } from "@/constants"
import Link from "next/link"
import { Button } from "../ui/button"
import { Facebook, Instagram, Youtube } from "lucide-react"
  
  export default function MobileFooter() {
    return (
        <footer className="w-full px-4 py-3 bg-secondary lg:hidden flex gap-5 flex-col">
              <Accordion type="single" collapsible >
        <AccordionItem value="item-1">
          <AccordionTrigger className="!no-underline  text-white font-medium text-[15px] ">categories</AccordionTrigger>
          <AccordionContent className="no-focus">
               <ul className='flex flex-col gap-3'>
                              {footerCategories.map((item,index)=> (
                                   <li className='text-white  hover:underline list-none text-[13px] font-normal' key={index}>
                                       <Link href={`/${item}`}>
                                          {item}
                                       </Link>
                                   </li>
                              ))}
                              </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="!no-underline  text-white font-medium text-[15px] ">Découvrez la Marketplace</AccordionTrigger>
          <AccordionContent className="no-focus">
          <ul className='flex flex-col gap-3'>
                
                <li className='text-white  hover:underline list-none text-[13px] font-normal'>
                    <Link href={`/engagement}`}>
                       Engagements
                    </Link>
                 </li>
                 <li className='text-white  hover:underline list-none text-[13px] font-normal'>
                    <Link href={`/engagement}`}>
                        Modes et frais de livraison
                    </Link>
                 </li>
                 <li className='text-white  hover:underline list-none text-[13px] font-normal'>
                    <Link href={`/engagement}`}>
                       Politique de Retour
                    </Link>
                 </li>
                 <li className='text-white  hover:underline list-none text-[13px] font-normal'>
                    <Link href={`/engagement}`}>
                       Garantie
                    </Link>
                 </li>
                 <li className='text-white  hover:underline list-none text-[13px] font-normal'>
                    <Link href={`/engagement}`}>
                       Utiliser un coupon
                    </Link>
                 </li>
                 <li className='text-white  hover:underline list-none text-[13px] font-normal'>
                    <Link href={`/engagement}`}>
                       FAQ
                    </Link>
                 </li>
                 <li className='text-white  hover:underline list-none text-[13px] font-normal'>
                    <Link href={`/engagement}`}>
                    Assistance

                    </Link>
                 </li>
                 <li className='text-white  hover:underline list-none text-[13px] font-normal'>
                    <Link href={`/engagement}`}>
                    Accès espace vendeur
                    </Link>
                 </li>
                
         
      </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="!no-underline  text-white font-medium text-[15px] ">Nos marques</AccordionTrigger>
          <AccordionContent className="no-focus">
          <ul className=' flex flex-col gap-3 lg:px-5 mt-3'>
                {brands.map((item,index)=> (
                     <li className='text-white lg:list-disc hover:underline list-none text-[13px] font-medium' key={index}>
                         <Link href={`/boutique-officielle/${item}`}>
                            {item}
                         </Link>
                     </li>
                ))}
           </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
       <Link href="/">
                              <Button className='bg-transparent hover:bg-transparent text-sm font-normal w-full hover:underline text-white border rounded-full ' type='button'>
                                  Devenir vendeur
                              </Button>
                           </Link>
                           <div>
           
            <div className='grid max-sm:grid-cols-2 grid-cols-4 gap-7'>
                <div className='flex items-center gap-1'>
                  <img className='w-[40px] object-contain' src="https://www.marjanemall.ma/media/footer/pt-fr-ftr-1.png" alt="" />
                    <p className='text-[13px] text-white font-medium'>Produits 100% <br /> authentiques</p>
                </div>
                <div className='flex items-center gap-1'>
                  <img  className='w-[40px] object-contain' src="https://www.marjanemall.ma/media/footer/pt-fr-ftr-2.png" alt="" />
                    <p className='text-[13px] text-white font-medium'>Livraison partout <br /> au Maroc</p>
                </div>
                <div className='flex items-center gap-1'>
                  <img  className='w-[40px] object-contain' src="https://www.marjanemall.ma/media/footer/pt-fr-ftr-3.png" alt="" />
                    <p className='text-[13px] text-white font-medium'>Satisfait ou <br /> remboursé</p>
                </div>
                <div className='flex items-center gap-1'>
                  <img  className='w-[40px] object-contain' src="https://www.marjanemall.ma/media/footer/pt-fr-ftr-4.png" alt="" />
                    <p className='text-[13px] text-white font-medium'>Offre nationale et <br /> internationale</p>
                </div>
            </div>
            <div className='mt-7'>
            <h4 className='text-white font-bold text-[17px] mb-3 border-gray-300  '>
               Modes de paiement
            </h4>
              <img className='w-[350px] object-contain' src="https://www.marjanemall.ma/media/footer/paiement_x2_1.png" alt="" />
            </div>
            </div>
            <div className="flex items-center py-3 justify-between">
                 <p className="text-[12px] text-white font-normal">© 2025 marjanemall.</p>
                  <div className='flex items-center gap-1'>
                                 <Link target='_blank' href="https://www.youtube.com" className='flex items-center justify-center border-2 w-[45px] h-[45px] rounded-full border-white'>
                                   <Youtube color='white' size={20} />
                                 </Link>
                                 
                                 <Link target='_blank' href="https://www.instagram.com" className='flex items-center justify-center border-2 w-[45px] h-[45px] rounded-full border-white'>
                                   <Instagram color='white' size={20} />
                                 </Link>
                                 <Link target='_blank' href="https://www.facebook.com" className='flex items-center justify-center border-2 w-[45px] h-[45px] rounded-full border-white'>
                                   <Facebook color='white' size={20} />
                                 </Link>
                              </div>
            </div>
        </footer>
   
    )
  }
  