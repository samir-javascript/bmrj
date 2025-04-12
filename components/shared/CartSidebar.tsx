"use client";
import { Minus, Plus, TrashIcon, X } from "lucide-react";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { close } from "@/lib/store/cartSlice"
import { formatPrice } from "@/lib/utils";
import { UserCartElement } from "@/types/Elements";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/user-redux";
interface Props  {
  data?: any
 
}
const CartSidebar = ({data}:Props) => {
  const { isOpen } = useAppSelector((state) => state.cart)
 //  const { isOpen, close, open } = useCartStore()
  const [loading, setLoading] = useState<boolean>(false);
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  // 1s delay;
//  new Promise(resolve => setTimseout(resolve,1000))
  // const { addItem } = useCartStore(
  //    useShallow((state)=>  ({
  //       addItem: state.addItem
  //    }) )
  // )
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling of the main page
    } else {
      document.body.style.overflow = ""; // Restore scrolling when closed
    }

    return () => {
      document.body.style.overflow = ""; // Cleanup on unmount
    };
  }, [isOpen]);
  useEffect(() =>  {
     dispatch(close())
  }, [pathname])


  return (
    <React.Fragment>
      {isOpen && (
        <div
          onClick={() => dispatch(close())}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm transition-opacity"
        />
      )}
      <div
        className={`fixed right-0 top-0 w-full h-full sm:w-[450px]
           bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex fixed top-0 w-full z-50 bg-white items-center p-2 border-b border-gray-200 justify-between gap-2">
          <p className="font-semibold">Mon panier</p>
          <X onClick={() => dispatch(close())} className="text-gray-400 cursor-pointer" size={20} />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 flex flex-col space-y-3 mt-10 pb-8 overflow-y-auto p-4" style={{ maxHeight: "calc(100vh - 240px)" }}>
           {data?.userCart.items.map((item:any,index:number) => (
              <div className="border-b border-gray-300 py-3" key={index}>
               <div >
                 <div className="flex items-start gap-2">
                  <div className="rounded-lg bg-gray-100 w-[350px]   ">
                     <img className="w-full h-full object-cover" src="/mi.png" />
                  </div>
                  <div className="flex flex-col gap-3">
                      <Link href="">
                           <p className="hover:underline hover:text-light_blue
                            font-medium line-clamp-1">
                               {item.productId.name}
                            </p>
                      </Link>
                      <p className="text-gray-400 font-normal ">Vendeur {item.productId.brand} </p>
                  </div>
                     <div>
                        <TrashIcon className="cursor-pointer" size={20} color="red" />
                     </div>
                 </div>
            </div>
            <div className="flex items-center  mt-5 justify-between">
                 <div className="border h-[40px]  flex w-[130px] justify-between items-center rounded-lg border-gray-300">
                      <span className="border-r flex items-center justify-center text-center flex-1 border-gray-300">
                          <Minus size={18} className="text-light_blue cursor-pointer text-center" />
                      </span>
                       <span className="flex-1 text-center font-semibold">
                         {item.quantity}
                       </span>
                       <span className="flex-1 flex items-center justify-center text-center border-l border-gray-300">
                          <Plus size={18} className="text-light_blue cursor-pointer text-center" />
                       </span>
                 </div>
                 <h3 className="font-semibold text-light_blue text-[20px] ">
                   {formatPrice(item.productId.price)} 
                 </h3>
            </div>
              </div>
           ))}
           
        </div>
        <div className="flex fixed bottom-0 flex-col w-full z-50 bg-white   shadow-sm ">
            <div className="bg-gray-200 p-5 flex flex-col space-y-2 w-full">
                  <div className="flex items-center justify-between">
                        <p className="font-semibold text-[15px] text-[#222] ">{data?.qty} produits
                        </p>
                        <p className="font-medium text-sm text-[#222] ">Sous-total</p>
                  </div>
                  <div className="flex justify-end">
                      <span className="font-extrabold text-light_blue text-[18px] ">1 507,99 Dh</span>
                  </div>
            </div>
            <Link href="/checkout/cart"  className="flex items-center  p-8 justify-center" >
                <Button  className="bg-light_blue h-[45px] sm:w-[200px] text-white rounded-lg" type="button">
                    Voir le panier
                </Button>
            </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CartSidebar;
