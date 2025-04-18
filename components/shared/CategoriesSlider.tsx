"use client";
import { useEffect, useState } from "react";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

import Image from "next/image";
import { categories } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";


const CategoriesSlider = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [api,setApi] = useState<CarouselApi>()
  const [current,setCurrent] = useState(0)
  const [count,setCount] = useState(0)
  const classNamePrevStyles = "absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
  const classNameNextStyles = "absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
   useEffect(() => {
      if(!api) return;
      setCount(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap() + 1)
      api.on("select", ()=> {
        setCurrent(api.selectedScrollSnap() + 1)
      } )
   }, [api])
  return (
    //  
    <div className="w-full max-w-[1270px] mx-auto">
       <h2 className="text-[24px] font-extrabold leading-[31.2px]  my-4  max-lg:px-3 text-[#333]">Découvrez nos catégories</h2>
    <div className="relative">
   
       <div className={cn(
        "absolute left-0 top-0 bottom-0 w-10 sm:w-14 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent", current === 1 && "hidden")} />
      <Carousel setApi={setApi} draggable onMouseLeave={() => setIsHovered(false)} onMouseEnter={() => setIsHovered(true)} className="w-full">
        <CarouselContent className="flex items-center ml-4">
          {categories.map((item, index) => (
            <CarouselItem key={index} className="basis-1/7 px-2"> {/* Each item takes 1/5 of width */}
              <Link href={`/category/${item.name}`} className="w-full h-auto flex flex-col items-center justify-center gap-2">
                <img
                  src={item.imgSrc}
                  alt={item.name}
                  loading="lazy"
                  width={150} // Adjust width if needed
                  height={150} // Adjust height if needed
            className="object-cover sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] "
                />
                <p className="paragraph-medium"> 
                  {item.name}
                </p>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Navigation Arrows */}
        <CarouselPrevious className={cn(classNamePrevStyles, isHovered && "opacity-100")} />
        <CarouselNext className={cn(classNameNextStyles, isHovered && "opacity-100")} />
        <div className={cn(
        "absolute right-0 top-0 bottom-0 w-10 sm:w-14 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent", current === count && "hidden")} />
      </Carousel>
    </div>
    </div>
  );
};

export default CategoriesSlider;
