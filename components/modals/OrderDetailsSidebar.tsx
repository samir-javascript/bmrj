"use client";


import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";

import { HouseIcon, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { closeOrderDetails, endLoadingOrderDetails, saveOrderId } from "@/lib/store/cartSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/user-redux";
import { IOrder } from "@/database/models/order.model";
import { formatPrice } from "@/lib/utils";
import OrderDetailsSidebarSkeleton from "../skeletons/OrderDetailsSidebarSkeleton";



const OrderDetailsSidebar = () => {
  const dispatch = useAppDispatch()
const pathname = usePathname()
const [order,setOrder] = useState<IOrder | undefined>()
const {isOrderDetailsOpened} = useAppSelector((state)  => state.cart)
const { orderId } = useAppSelector((state) => state.cart)
const {loadOrderDetails} = useAppSelector((state) => state.cart)
const [error,setError] = useState<string | null>()
useEffect(() => {
   dispatch(closeOrderDetails())
}, [pathname])
  useEffect(() => {
    if (isOrderDetailsOpened) {
      document.body.style.overflow = "hidden"; // Prevent scrolling of the main page
    } else {
      document.body.style.overflow = ""; // Restore scrolling when closed
    }

    return () => {
      document.body.style.overflow = ""; // Cleanup on unmount
    };
  }, [isOrderDetailsOpened]);
//  useEffect(() => {
//     const fetchOrder = async()=> {
//         const response = await fetch(`/api/order/${orderId}`)
       
//         const {data} = await response.json()

//      setOrder(data)
     
//      dispatch(endLoadingOrderDetails())
//     }
//    if(orderId) fetchOrder()
   
//  },
// [orderId])
useEffect(() => {
  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/order/${orderId}`);
      const { data } = await response.json();
      setOrder(data);
    } catch (error) {
      setError("Une erreur s'est produite lors du chargement de la commande.");
    } finally {
      dispatch(endLoadingOrderDetails());
    }
  };

  if (isOrderDetailsOpened && orderId) {
    fetchOrder();
  }
}, [orderId, isOrderDetailsOpened]);

  return (
    <React.Fragment>
      {isOrderDetailsOpened && (
        <div
          onClick={() => 
            dispatch(closeOrderDetails())
           }
          className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm transition-opacity"
        />
      )}
      <div
        className={`fixed right-0 top-0 w-full p-3 h-full sm:w-[450px]
           bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 
        ${isOrderDetailsOpened ? "translate-x-0" : "translate-x-full"}`}
      >
         {error && (
            <p className="text-red-500 font-medium text-sm ">
               {error}
            </p>
         )}
        {loadOrderDetails ? (
          <OrderDetailsSidebarSkeleton />
        ): (
          <div>
          <header className="flex items-center justify-between ">
               <h3 className="font-semibold text-primary lg:text-[24px] text-[18px] leading-[1.7] ">Détail de la commande</h3>
               <X 
               onClick={()=> dispatch(closeOrderDetails())} 
                className="cursor-pointer" color="gray" size={25} />
          </header>
           <p className="mt-2 text-black text-sm font-[500] ">N° : {order?._id} </p>
          {/* Scrollable Content */}
          <div className="flex-1 flex flex-col space-y-3 mt-5
           pb-8 overflow-y-auto " style={{ maxHeight: "calc(100vh - 240px)" }}>
            <div className="flex flex-col space-y-3">
            {order?.orderItems.map((x,index) => (
               <div className="bg-gray-100 p-3 rounded-xl flex items-start gap-2 " key={index}>
                    <div className='border border-light_gray w-[130px]  '>
                            <img loading='lazy' className='w-full object-contain h-full' src={x.images[0]} alt={x.name} />
                     </div>
                     <div className="flex flex-col">
                        <p className='max-w-[500px] text-[#333] text-sm font-medium' >
                           {x.name}
                        </p>
                        <h4 className='font-bold text-black text-sm m-0'>
                           {formatPrice(x.price)}
                        </h4>
                     </div>
                     <div className='bg-red-500 w-fit flex items-center py-1 justify-center rounded-md text-white px-2  '>
                                <span className="text-xs font-semibold whitespace-nowrap">
                                   {order.orderStatus}
                                </span>
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
                    <span className="text-[#333] font-semibold text-sm ">
                       soufiane Omgil
                       </span> -
                    <span className="text-[#333] font-semibold text-sm ">
                       +212{order?.shippingAddress.phoneNumber}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HouseIcon size={18} className="text-secondary" />
                    <span className="text-[#333] font-semibold text-sm ">{order?.shippingAddress.address} </span> -
                    <span className="text-[#333] font-semibold text-sm ">
                       {order?.shippingAddress.city}
                    </span>
                  </div>
               </div>
               <Link className="flex items-center justify-center" href={`/sales/order/view/order_id/${order?._id}`}>
                   <Button className="flex items-center rounded-full w-[50%] mt-5 justify-center bg-transparent border border-light_blue
                      text-light_blue hover:bg-transparent
                   " type="button">
                       Suivi le colis
                   </Button>
               </Link>
          </div>
        )}
      
        {/* Header */}
      
      </div>
    </React.Fragment>
  );
};

export default OrderDetailsSidebar;