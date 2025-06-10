'use client'

import { IProduct } from '@/database/models/product.model'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import HeartCart from '../btns/HeartCart'
import { hasSavedProduct } from '@/actions/collection.actions'

const ProductCard = async ({ product }: { product: IProduct }) => {
  const hasSaved = await hasSavedProduct({ productId: product._id })

  const discount =
    product.prevPrice && product.prevPrice > product.price
      ? Math.round(((product.prevPrice - product.price) / product.prevPrice) * 100)
      : null

  return (
    <div className="group relative flex h-[340px] w-[185px] max-sm:w-[165px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      {/* Image & Heart */}
      <div className="relative bg-gray-50 w-full h-[180px] flex items-center justify-center overflow-hidden">
        <Link href={`/products/${product._id}`} className="block w-full h-full">
          <Image
            src={product.images[0].url}
            alt={product.name}
            width={185}
            height={180}
            className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-[1.05]"
          />
        </Link>

        <div className="absolute top-2 right-2 z-10">
          <HeartCart hasSaved={hasSaved.data?.saved as boolean} productId={product._id} />
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col justify-between p-3 flex-1">
        <div className="space-y-1">
          <Link href={`/products/${product._id}`}>
            <h3 className="line-clamp-2 text-[13px] font-medium text-gray-700 hover:text-light_blue transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-gray-400">
            Vendu par{' '}
            <span className="font-medium text-light_blue">{product.brand}</span>
          </p>
        </div>

        <div className="mt-4 flex items-end justify-between">
          {/* Pricing */}
          <div className="space-y-[2px]">
            <p className="text-[14px] font-semibold text-light_blue">{product.price} Dh</p>
            {product.prevPrice && (
              <p className="text-[12px] font-light text-gray-400 line-through">
                {product.prevPrice} Dh
              </p>
            )}
          </div>

          {/* Discount */}
          {discount && (
            <div className="rounded-md bg-rose-500 px-2 py-[2px] text-xs font-semibold text-white">
              -{discount}%
            </div>
          )}

          {/* Cart Icon */}
          <button
            title="Add to cart"
            className="ml-2 flex h-[35px] w-[35px] items-center justify-center rounded-full bg-light_blue text-white hover:bg-light_blue/90 transition-all"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
