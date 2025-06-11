import React from 'react'
import { Skeleton } from '../ui/skeleton'

const ProductDetailsSkeleton = () => {



  return (
    <div className="container max-w-7xl mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Image Gallery Skeleton */}
        <div className="space-y-4">
          <Skeleton className="w-full aspect-square bg-gray-100 rounded-2xl" />
          <div className="flex gap-3">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-20 bg-gray-100 rounded-xl" />
            ))}
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="space-y-6">
          {/* Title */}
          <Skeleton className="h-8 w-3/4 rounded bg-gray-100" />
          
          {/* Price */}
          <Skeleton className="h-6 w-1/4 rounded bg-gray-100" />

          {/* Rating */}
          <Skeleton className="h-5 w-32 rounded bg-gray-100" />

          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-gray-100" />
            <Skeleton className="h-4 w-5/6 bg-gray-100" />
            <Skeleton className="h-4 w-4/6 bg-gray-100" />
          </div>

          {/* Variant selector (e.g. size/color) */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-24 bg-gray-100" />
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-10 bg-gray-100 w-10 rounded-full" />
              ))}
            </div>
          </div>

          {/* Add to Cart + Wishlist */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Skeleton className="h-12 bg-gray-100 w-full sm:w-1/2 rounded-xl" />
            <Skeleton className="h-12 bg-gray-100 w-full sm:w-1/2 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}

  

export default ProductDetailsSkeleton