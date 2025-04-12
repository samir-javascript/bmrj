"use client";


import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useCartStore } from "@/lib/store/cartStore";
import { HouseIcon, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";



const OrderDetailsSidebar = () => {
  // const { isOrderDetailsOpened,  closeOrderDetails } = useCartStore()
 
  // 1s delay;
//  new Promise(resolve => setTimseout(resolve,1000))
const pathname = usePathname()
// useEffect(() => {
//    closeOrderDetails()
// }, [pathname])
//   useEffect(() => {
//     if (isOrderDetailsOpened) {
//       document.body.style.overflow = "hidden"; // Prevent scrolling of the main page
//     } else {
//       document.body.style.overflow = ""; // Restore scrolling when closed
//     }

//     return () => {
//       document.body.style.overflow = ""; // Cleanup on unmount
//     };
//   }, [isOrderDetailsOpened]);
 const isOrderDetailsOpened = false;
  return (
    <React.Fragment>
      {isOrderDetailsOpened && (
        <div
         // onClick={() => closeOrderDetails()}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm transition-opacity"
        />
      )}
      <div
        className={`fixed right-0 top-0 w-full p-3 h-full sm:w-[450px]
           bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 
        ${isOrderDetailsOpened ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <header className="flex items-center justify-between ">
             <h3 className="font-semibold text-primary lg:text-[24px] text-[18px] leading-[1.7] ">Détail de la commande</h3>
             <X 
             // onClick={()=> closeOrderDetails()} 
              className="cursor-pointer" color="gray" size={25} />
        </header>
         <p className="mt-2 text-black text-sm font-[500] ">N° : 001107535</p>
        {/* Scrollable Content */}
        <div className="flex-1 flex flex-col space-y-3 mt-5
         pb-8 overflow-y-auto " style={{ maxHeight: "calc(100vh - 240px)" }}>
          <div className="flex flex-col space-y-3">
          {[0,1,2].map((_,index) => (
             <div className="bg-gray-100 p-3 rounded-xl flex items-start gap-2 " key={index}>
                  <div className='border border-light_gray w-[130px]  '>
                          <img loading='lazy' className='w-full object-contain h-full' src="https://cdn.octopia-io.net/pdt2/4/1/2/1/700x700/AAAAG87412.jpg" alt="" />
                   </div>
                   <div className="flex flex-col">
                      <p className='max-w-[500px] text-[#333] text-sm font-medium' >Verres à Eau - TUA FH - Set de 6 - Transparent - Verre Plat - Compatible Lave-Vaisselle</p>
                      <h4 className='font-bold text-black text-sm m-0'>57.95 dh</h4>
                   </div>
                   <div className='bg-red-500 w-fit flex items-center justify-center rounded-md text-white px-2  '>
                              <span className="text-xs font-semibold">annuler</span>
                           </div>
             </div>
          ))}
          </div>
         <div className="bg-[#f2f2f2] flex flex-col rounded-xl p-3 ">
            <p className="font-light text-[13px] text-[#444] ">Temps de livraison estimé :</p>
            <p className="font-light text-[13px] text-[#444] ">jeudi 03 avril 2025 - samedi 05 avril 2025</p>
         </div>
           
        </div>
        <div className="flex flex-col space-y-1">
                <div className="flex items-center gap-2">
                  <User size={18} className="text-secondary" />
                  <span className="text-[#333] font-semibold text-sm ">Soufianesaid</span> -
                  <span className="text-[#333] font-semibold text-sm ">+212607558899</span>
                </div>
                <div className="flex items-center gap-2">
                  <HouseIcon size={18} className="text-secondary" />
                  <span className="text-[#333] font-semibold text-sm ">Maison sidi baba </span> -
                  <span className="text-[#333] font-semibold text-sm ">MEKNES</span>
                </div>
             </div>
             <Link className="flex items-center justify-center" href="/sales/order/view/order_id/54545">
                 <Button className="flex items-center rounded-full w-[50%] mt-5 justify-center bg-transparent border border-light_blue
                    text-light_blue hover:bg-transparent
                 " type="button">
                     Suivi le colis
                 </Button>
             </Link>
      </div>
    </React.Fragment>
  );
};

export default OrderDetailsSidebar;