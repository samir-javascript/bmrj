import { brands, footerCategories } from '@/constants'
import { Facebook, Instagram, Youtube } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const Footer = () => {
  return (
    <footer className='lg:flex hidden flex-col '>
        <div className='w-full px-4 py-3 bg-secondary flex  flex-col'>
             <h4 className='text-white font-bold text-[17px] '>Suivez nous</h4>
             <div className='flex items-center mt-2 gap-1'>
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
        <div className='bg-primary px-4 py-6 lg:flex hidden items-start gap-10 '>
            <div>
            <h4 className='text-white font-bold text-[17px]  mb-3 '>categories</h4>
           <ul className='flex flex-col gap-3'>
                {footerCategories.map((item,index)=> (
                     <li className='text-white  hover:underline list-none text-[13px] font-normal' key={index}>
                         <Link href={`/${item}`}>
                            {item}
                         </Link>
                     </li>
                ))}
           </ul>

            </div>
            <div>
            <h4 className='text-white font-bold text-[17px]  mb-3 '>Découvrez la Marketplace</h4>
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

            </div>
            <div>
            <h4 className='text-white font-bold text-[17px]  mb-3 '>Informations légales</h4>
           <ul className='flex flex-col gap-3'>
                
                     <li className='text-white  hover:underline list-none text-[13px] font-normal'>
                         <Link href={`/engagement}`}>
                            CGU/CGV
                         </Link>
                      </li>
                      <li className='text-white  hover:underline list-none text-[13px] font-normal'>
                         <Link href={`/engagement}`}>
                            Données personnelles et cookies
                         </Link>
                      </li>
                      <li className='text-white  hover:underline list-none text-[13px] font-normal'>
                         <Link href={`/engagement}`}>
                            Mentions légales
                         </Link>
                      </li>
                     <Link href="/">
                        <Button className='bg-transparent hover:bg-transparent text-sm font-normal w-full hover:underline text-white border rounded-full ' type='button'>
                            Devenir vendeur
                        </Button>
                     </Link>
                     
                     
           </ul>

            </div>
            <div className='border border-gray-500 h-[200px]'/>
            <div>
            <h4 className='text-white font-bold text-[17px] mb-3 border-gray-300  '>
               Nos engagement
            </h4>
            <div className='grid lg:grid-cols-2 grid-cols-4 gap-7'>
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
            <div className='mt-4'>
            <h4 className='text-white font-bold text-[17px] mb-3 border-gray-300  '>
               Modes de paiement
            </h4>
              <img className='w-[350px] object-contain' src="https://www.marjanemall.ma/media/footer/paiement_x2_1.png" alt="" />
            </div>
            </div>
        </div>
        <div className='bg-secondary w-full px-4 py-3 flex flex-col'>
           <h4 className='text-white font-bold text-[17px] max-lg:border-b max-lg:pb-3 border-gray-300  '>Nos marques</h4>
           <ul className='lg:grid lg:grid-cols-9 flex flex-col gap-3 lg:px-5 mt-3'>
                {brands.map((item,index)=> (
                     <li className='text-white lg:list-disc hover:underline list-none text-[13px] font-medium' key={index}>
                         <Link href={`/boutique-officielle/${item}`}>
                            {item}
                         </Link>
                     </li>
                ))}
           </ul>
        </div>
        <div className='bg-primary w-full px-4 py-6'>
           <p className='text-white text-[13px] font-normal'><span>© </span>2025 - marjanemall - Tous droits réservés.</p>
        </div>
    </footer>
  )
}

export default Footer