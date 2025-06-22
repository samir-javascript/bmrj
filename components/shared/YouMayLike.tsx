"use client"

import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

import { products } from "@/constants"
import ProductCard from "../cards/ProductCard"
import { IProduct } from "@/database/models/product.model"

const YouMayAlsoLike = () => {
  return (
    <section className="w-full bg-gradient-to-b from-[#faf7f4] to-[#f3eee9] py-12 px-4 md:px-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10 tracking-tight">
        You May Also Like
      </h2>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={16}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        className="!pb-10"
      >
        {products.map((product, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            {/* <div className="group w-[90%] sm:w-[85%] bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden aspect-[4/5]">
                <img
                  src={product.image || "https://via.placeholder.com/300x400.png?text=Product"}
                  alt={product.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                />
              </div>

              <div className="p-4 text-center">
                <h3 className="text-base font-semibold text-gray-800 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-lg font-bold text-rose-600 mt-2">
                  {product.price} Dh
                </p>
              </div>
            </div> */}
            <ProductCard product={product as unknown as IProduct} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default YouMayAlsoLike
