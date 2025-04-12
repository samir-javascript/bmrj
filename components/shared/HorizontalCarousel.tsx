"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { products } from '@/constants';
import ProductCard from '../cards/ProductCard';
import Image from 'next/image';
import HeartCart from '../btns/HeartCart';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { IProduct } from '@/database/models/product.model';
interface Props {
    title:string;
    showPagination:boolean;
    data?: IProduct[]
}
const HorizontalCarousel = ({title,showPagination = false, data}: Props) => {
  return (
     <div className='mx-2'>
          <h2 className='h2-bold my-7'>
             {title}
          </h2>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={1}
            slidesPerView={6.5}
             pagination={showPagination}
           
            breakpoints={{
              320: { slidesPerView: 2 },
              480: { slidesPerView: 2.1 },
              768: { slidesPerView: 3.8  },
              1024: { slidesPerView: 6.5 },
            }}
          >
            {data ? data.map((product) => (
               <SwiperSlide key={product._id}>
               <div className="w-[180px] h-[330px] shadow-sm flex flex-col border rounded-lg border-gray-200 ">
      <div  className='w-full relative bg-gray-100 rounded-tr-lg rounded-tl-lg' >
        <Link href={`/products/${product._id}`}>
           <Image src={product.images[0].url} loading='lazy'
            className='object-contain' alt={product.name} width={170} height={170} />
        </Link>
      <HeartCart hasSaved={false} productId={product._id} />

       
       
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
             </SwiperSlide>
            ) ) : products.map((product,index) => (
              <SwiperSlide key={index}>
                <div className="w-[180px] h-[330px] shadow-sm flex flex-col border rounded-lg border-gray-200 ">
       <div  className='w-full relative bg-gray-100 rounded-tr-lg rounded-tl-lg' >
         <Link href={`/products/${product._id}`}>
            <Image src="/mi.png" className='object-contain' alt='product_image' width={170} height={170} />
         </Link>
       <HeartCart hasSaved={false} productId={product._id as string} />

        
        
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
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
  )
}

export default HorizontalCarousel