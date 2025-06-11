"use client"
import React, { use, useEffect, useState } from 'react';
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
import { hasSavedProduct } from '@/actions/collection.actions';
import { addItemAsync, open } from '@/lib/store/cartSlice';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/hooks/user-redux';
interface Props {
    title:string;
    showPagination:boolean;
    data?: IProduct[]
}
const HorizontalCarousel = ({title,showPagination = false, data}: Props) => {



  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
  const [savedProducts, setSavedProducts] = useState<{ [key: string]: boolean }>({});

useEffect(() => {
  const fetchSavedStatuses = async () => {
    if (!data) return;

    const results: { [key: string]: boolean } = {};

    await Promise.all(
      data.map(async (product) => {
        const res = await fetch('/api/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: product._id }),
        });
        const json = await res.json();
        results[product._id] = json.saved;
      })
    );

    setSavedProducts(results);
  };

  fetchSavedStatuses();
}, [data]);

  const handleAddToCart = async (product: IProduct) => {
    const data = {
      image: product.images[0]?.url,
      brand: product.brand,
      prevPrice: product.prevPrice,
      price: product.price,
      title: product.name,
      quantity: 1,
      _id: product._id,
    };
  
    try {
      setLoadingProductId(product._id); // shows loader if needed
     // await new Promise((resolve) => setTimeout(resolve, 500)); // simulate delay
      await dispatch(addItemAsync(data) as any);
      dispatch(open());
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingProductId(null);
    }
  };
  
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
              320: { slidesPerView: 1.9 },
              430: { slidesPerView: 2.1 },
              480: { slidesPerView: 2.3 },
              768: { slidesPerView: 3.8  },
              1024: { slidesPerView: 5 },
              1200: {slidesPerView: 6.2}
            }}
          >
            {data ? data.map((product) => {
           //const { data } = use(hasSavedProduct({productId:product._id}))
              return (
                <SwiperSlide key={product._id}>
                {/* <div className="w-[180px] h-[330px] shadow-sm flex flex-col border rounded-lg border-gray-200 ">
       <div  className='w-full relative bg-gray-100 rounded-tr-lg rounded-tl-lg' >
         <Link href={`/products/${product._id}`}>
            <Image src={product.images[0].url} loading='lazy'
             className='object-contain' alt={product.name} width={170} height={170} />
         </Link>
     <HeartCart
  productId={product._id}
  hasSaved={savedProducts[product._id]}
/>

 
        
        
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
              <button
  onClick={() => handleAddToCart(product)}
  disabled={loadingProductId === product._id}
  className={`relative flex w-[35px] h-[35px] ml-[3px] items-center justify-center
     bg-light_blue rounded-full text-white transition-opacity duration-300 ${
    loadingProductId === product._id ? 'opacity-60 pointer-events-none' : ''
  }`}
>
  <div
    className={`cart-spinner-wrapper ${
      loadingProductId === product._id ? 'loading' : ''
    }`}
  >
    <ShoppingCart size={20} />
  </div>
</button>

         </div>
       </div>
       
    </div> */}
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
    
            
              <HeartCart   hasSaved={savedProducts[product._id]} productId={product._id} />
            
          </div>
    
          <div className="p-4 flex flex-col justify-between h-[160px]">
            <div className="flex flex-col gap-1">
              <Link href={`/products/${product._id}`}>
                <h3 className="text-sm font-semibold text-gray-800 group-hover:text-light_blue line-clamp-3 transition">
                  {product.name}
                </h3>
              </Link>
              <p className="text-xs text-gray-400 whitespace-nowrap">
                Vendu par{' '}
                <span className="text-light_blue font-medium">{product.brand}</span>
              </p>
            </div>
    
            <div className="mt-3 flex items-end justify-between">
              <div>
                <p className="text-[15px] font-bold text-light_blue whitespace-nowrap">{product.price}Dh</p>
                <p className="text-xs text-gray-400 line-through whitespace-nowrap">{product.prevPrice}Dh</p>
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
              </SwiperSlide>
              )
            }
               
              
            
   ) : products.map((product, index) => (
    <SwiperSlide key={index}>
      
        <div className="w-[180px] h-[330px] shadow-sm flex flex-col border rounded-lg border-gray-200 ">
       <div  className='w-full relative bg-gray-100 rounded-tr-lg rounded-tl-lg' >
         <Link href={`/products/${product._id}`}>
            <Image src={"https://www.marjanemall.ma/media/catalog/product/cache/2d24969db123d312c3d8c8732be47ef4/_/p/_pdt2_3_2_4_1_700x700_AAARP41324_1.jpg"} loading='lazy'
             className='object-contain' alt={product.name} width={170} height={170} />
         </Link>
     <HeartCart
  productId={""}
  hasSaved={false}
/>

 
        
        
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
              <button
 
  disabled={loadingProductId === product._id}
  className={`relative flex w-[35px] h-[35px] ml-[3px] items-center justify-center
     bg-light_blue rounded-full text-white transition-opacity duration-300 ${
    loadingProductId === product._id ? 'opacity-60 pointer-events-none' : ''
  }`}
>
  {/* <div
    className={`cart-spinner-wrapper ${
      loadingProductId === product._id ? 'loading' : ''
    }`}
  >
    <ShoppingCart size={20} />
  </div> */}
</button>

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