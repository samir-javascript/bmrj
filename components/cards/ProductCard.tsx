'use client'

import { IProduct } from '@/database/models/product.model'
import { Heart, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import HeartCart from '../btns/HeartCart'
import { hasSavedProduct } from '@/actions/collection.actions'

const ProductCard = async ({ product }: { product: IProduct }) => {
  const hasSaved = await hasSavedProduct({ productId: product._id })

  return (
    <div className="group relative w-[190px] max-sm:w-[165px] h-[340px] rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      {/* Image + Heart */}
      <div className="relative w-full h-[190px] bg-gray-100 rounded-t-xl overflow-hidden">
        <Link href={`/products/${product._id}`}>
          <Image
            src={product.images[0].url}
            alt="product image"
            width={180}
            height={180}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        {/* Wishlist Button */}
        <div className="absolute top-2 right-2 z-10">
          <HeartCart
            hasSaved={hasSaved.data?.saved as boolean}
            productId={product._id}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col justify-between h-[150px]">
        {/* Name & Brand */}
        <div className="space-y-1">
          <Link href={`/products/${product._id}`}>
            <p className="line-clamp-2 text-sm text-gray-800 font-semibold group-hover:text-light_blue transition-colors duration-200">
              {product.name}
            </p>
          </Link>
          <p className="text-[12px] text-gray-400">
            Vendu par{' '}
            <span className="text-light_blue font-medium">
              {product.brand}
            </span>
          </p>
        </div>

        {/* Price & Cart */}
        <div className="flex items-center justify-between mt-4">
          {/* Pricing */}
          <div className="flex flex-col">
            <p className="text-[15px] text-light_blue font-bold">
              {product.price} Dh
            </p>
            {product.prevPrice && (
              <p className="text-[12px] text-gray-400 line-through">
                {product.prevPrice} Dh
              </p>
            )}
          </div>

          {/* Discount */}
          {product.prevPrice && (
            <div className="bg-pink-600 text-white text-[12px] px-2 py-[2px] rounded-md font-semibold">
              {`-${Math.round(
                ((product.prevPrice - product.price) / product.prevPrice) * 100
              )}%`}
            </div>
          )}

          {/* Cart Icon */}
          <button className="ml-2 p-2 rounded-full bg-light_blue hover:bg-light_blue/90 transition-colors text-white">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
