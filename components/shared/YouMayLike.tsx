"use client"

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { products } from '@/constants'

const YouMayAlsoLike = () => {
  return (
    <section className="you-may-also-like w-full bg-[#f7f4f1] py-10 px-4 md:px-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
        You May Also Like
      </h2>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={5}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        className="!pb-8"
      >
        {products.map((product, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <div className="group w-[90%] sm:w-[85%] bg-white rounded-xl overflow-hidden shadow-sm transition-transform duration-300 hover:scale-[1.03] hover:shadow-lg">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-4 text-center">
                <h3 className="text-sm font-medium text-gray-700 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-lg font-semibold text-gray-900 mt-2">
                  {product.price} Dh
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default YouMayAlsoLike
