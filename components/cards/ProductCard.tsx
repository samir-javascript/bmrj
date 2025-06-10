
import { IProduct } from '@/database/models/product.model'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import HeartCart from '../btns/HeartCart'
import { hasSavedProduct } from '@/actions/collection.actions'

const ProductCard = async ({ product }: { product: IProduct }) => {
  const hasSaved = await hasSavedProduct({ productId: product._id })

  return (
    <div className="group w-full  h-[360px] rounded-2xl border border-gray-200 shadow-md overflow-hidden bg-white transition hover:shadow-xl hover:scale-[1.015]">
      <div className="relative w-full h-[200px] bg-gray-50">
        <Link href={`/products/${product._id}`}>
          <Image
            src={product.images[0].url}
            alt="product image"
            fill
            className="object-contain p-4 transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </Link>

        <div className="absolute top-2 right-2 z-[50] ">
          <HeartCart hasSaved={hasSaved.data?.saved as boolean} productId={product._id} />
        </div>
      </div>

      <div className="p-4 flex flex-col justify-between h-[160px]">
        <div className="flex flex-col gap-1">
          <Link href={`/products/${product._id}`}>
            <h3 className="text-sm font-semibold text-gray-800 group-hover:text-light_blue line-clamp-2 transition">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-gray-400">
            Vendu par{' '}
            <span className="text-light_blue font-medium">{product.brand}</span>
          </p>
        </div>

        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-[15px] font-bold text-light_blue">{product.price} Dh</p>
            <p className="text-xs text-gray-400 line-through">{product.prevPrice} Dh</p>
          </div>

          <div className="flex items-center gap-1">
            <div className="bg-[#d70073] px-2 py-[2px] rounded-md text-white text-xs font-bold">
              -22%
            </div>
            <button className="bg-light_blue hover:bg-blue-600 transition p-2 rounded-full text-white">
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
