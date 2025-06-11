// "use client"
// import React, { useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Thumbs, FreeMode, Pagination } from 'swiper/modules'; // ✅ Corrected import

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/thumbs';
// import 'swiper/css/pagination'; // ✅ Import pagination styles
// import 'swiper/css/free-mode';
// import useMobile from '@/hooks/use-mobile';
// import { Heart } from 'lucide-react';
// import SaveProductHeart from '../btns/SaveProductHeart';
// import { IProduct } from '@/database/models/product.model';



// export default function ProductImages({productId, hasSavedProductPromise,product}:
//    {productId:string;
//     product: IProduct;
//     hasSavedProductPromise:ActionResponse<{saved:boolean}>

//    }) {
//   const [thumbsSwiper, setThumbsSwiper] = useState(null);
//   console.log(product?.name, "name")
//   return (
//     <div className="lg:w-[450px] relative mx-auto w-auto h-auto ">
//       {/* Main Swiper */}
//       <Swiper
//         modules={[Navigation, Thumbs, FreeMode, Pagination]} // ✅ Added Pagination module
//         spaceBetween={10}
//         loop
//         thumbs={{ swiper: thumbsSwiper }}
//         pagination={{ clickable: true }}  // ✅✅✅ Enable dots and make them clickable
//         className="main-swiper"
//       >
//         {product?.images.map((src, index) => (
//           <SwiperSlide key={index}>
//             <img src={src?.url} alt={product.name} className="main-image  object-contain" />
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Thumbnail Swiper */}
//       <Swiper
//        // @ts-ignore
//         onSwiper={setThumbsSwiper}
//         modules={[Thumbs, FreeMode]} // ✅ Modules should be passed here
//         spaceBetween={10}
//         slidesPerView={4}
//         freeMode
//         watchSlidesProgress
//         className="thumbs-swiper lg:!flex !hidden"
//       >
//         {product?.images.map((src, index) => (
//           <SwiperSlide key={index}>
//             <img src={src?.url} alt={`Thumbnail ${index}`} className="thumbnail-image object-contain" />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//       <div className='lg:hidden flex'>
//                <SaveProductHeart hasSavedProductPromise={hasSavedProductPromise} productId={productId}  className='absolute lg:hidden flex z-[50] bottom-4 right-4'  /> 
//             </div>
                  
//     </div>
//   );
// }
"use client";
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

import SaveProductHeart from '../btns/SaveProductHeart';
import { IProduct } from '@/database/models/product.model';


export default function ProductImages({
  productId,
  hasSavedProductPromise,
  product,
}: {
  productId: string;
  product: IProduct;
  hasSavedProductPromise: ActionResponse<{ saved: boolean }>;
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className="lg:w-[450px] relative mx-auto w-auto h-auto">
      <Swiper
        modules={[Navigation, Thumbs, FreeMode, Pagination]}
        spaceBetween={10}
        loop
        thumbs={{ swiper: thumbsSwiper }}
        pagination={{ clickable: true }}
        className="main-swiper"
      >
        {product?.images.map((src, index) => (
          <SwiperSlide key={index}>
            <img src={src?.url} alt={product.name} className="main-image object-contain" />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[Thumbs, FreeMode]}
        spaceBetween={10}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        className="thumbs-swiper lg:!flex !hidden"
      >
        {product?.images.map((src, index) => (
          <SwiperSlide key={index}>
            <img src={src?.url} alt={`Thumbnail ${index}`} className="thumbnail-image object-contain" />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="lg:hidden flex">
        <SaveProductHeart
          hasSavedProductPromise={hasSavedProductPromise}
          productId={productId}
          className="absolute z-50 bottom-4 right-4"
        />
      </div>
    </div>
  );
}
