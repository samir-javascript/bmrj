"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { products } from '@/constants';
 const YouMayAlsoLike = () => {
  return ( 
    <div className="you-may-also-like bg-[#f2eeea] p-4">
      <h2 className='h2-bold mb-3'>You May Also Like</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={5}
        slidesPerView={5}
        navigation
       
        breakpoints={{
          320: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
      >
        {products.map((product,index) => (
          <SwiperSlide key={index}>
            <div className="">
              <img src={product.image} alt={product.name} />
              <div className="bg-white p-2.5  text-black shadow-md">
              <h3 className='text-sm font-medium text-center line-clamp-2'>{product.name}</h3>
              <p className='font-bold text-[16px] text-center mt-2'>{product.price} Dh</p>
              </div>
             
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )}
  export default YouMayAlsoLike