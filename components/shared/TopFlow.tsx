"use client";

import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";


import { cn } from "@/lib/utils";
import useMobile from "@/hooks/use-mobile";
import Image from "next/image";
import Link from "next/link";

const TopFlow = () => {
    const isMobile = useMobile()
  const classNamePrevStyles = "absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full sm:opacity-0 opacity-100 transition-opacity duration-300"
  const classNameNextStyles = "absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full sm:opacity-0 opacity-100 transition-opacity duration-300"
    const items = [
        {
            imgSrc: isMobile ? "https://www.marjanemall.ma/media/wysiwyg/dar_darek/dar_darek_2025/slider_secondaire/AAAOM54669_-slider_secondaire.png" : "https://www.marjanemall.ma/media/wysiwyg/dar_darek/dar_darek_2025/slider_secondaire/AAAOM54669_-slider_secondaire.png",
            name: "mini mascara offert"
        },
        {
            imgSrc: isMobile ? "https://www.marjanemall.ma/media/wysiwyg/dar_darek/dar_darek_2025/slider_secondaire/RF-SS.png" : "https://www.marjanemall.ma/media/wysiwyg/dar_darek/dar_darek_2025/slider_secondaire/RF-SS.png",
            name: "roue de la fortune"
        },
        {
            imgSrc: isMobile ? "https://www.marjanemall.ma/media/wysiwyg/dar_darek/dar_darek_2025/slider_secondaire/SOL8433766160053.jpg" : "https://www.marjanemall.ma/media/wysiwyg/dar_darek/dar_darek_2025/slider_secondaire/SOL8433766160053.jpg",
            name: "blender SOLAC"
        },
        {
            imgSrc: isMobile ? "https://www.marjanemall.ma/media/wysiwyg/dar_darek/dar_darek_2025/slider_secondaire/LOG5099206063853-slider-secondaire.jpg" : "https://www.marjanemall.ma/media/wysiwyg/dar_darek/dar_darek_2025/slider_secondaire/LOG5099206063853-slider-secondaire.jpg",
            name: "clavier+Souris sans fil"
        },
        {
            imgSrc: isMobile ? "https://www.marjanemall.ma/media/wysiwyg/dar_darek/dar_darek_2025/slider_secondaire/AAACF30289.jpg" : "https://www.marjanemall.ma/media/wysiwyg/dar_darek/dar_darek_2025/slider_secondaire/AAACF30289.jpg",
            name: "friteuse granite"
        },

    ]
    
  return (
    
  
 <div className="relative mt-[-90px] z-20 w-full max-w-[1200px] mx-auto">

  
   <Carousel  draggable   className="w-full">
     <CarouselContent className="flex items-center ml-4">
       {items.map((item, index) => (
         <CarouselItem key={index} className="lg:basis-1/5 md:basis-1/4 px-2 basis-1/2"> {/* Each item takes 1/5 of width */}
           <Link href={`/boutique-officielle/${item.name}`} className="w-full h-auto flex flex-col items-center justify-center ">
            <div className="bg-white w-full p-2">
            <p className="paragraph-medium whitespace-nowrap max-sm:text-[12px] text-[14px] capitalize"> 
               {item.name}
             </p>
            </div>
            
             <img
             alt={item.name}

               src={item.imgSrc}
               
               loading="lazy"
               
         className="object-cover"
             />
             
           </Link>
         </CarouselItem>
       ))}
     </CarouselContent>
     {/* Navigation Arrows */}
     <CarouselPrevious className={cn(classNamePrevStyles)} />
     <CarouselNext className={cn(classNameNextStyles)} />
    
   </Carousel>
 </div>
 
  )
}

export default TopFlow