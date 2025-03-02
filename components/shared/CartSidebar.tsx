"use client";
import { Minus, Plus, TrashIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";

const CartSidebar = () => {
  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"; // Prevent scrolling of the main page
    } else {
      document.body.style.overflow = ""; // Restore scrolling when closed
    }

    return () => {
      document.body.style.overflow = ""; // Cleanup on unmount
    };
  }, [open]);

  return (
    <React.Fragment>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm transition-opacity"
        />
      )}
      <div
        className={`fixed right-0 top-0 w-full h-full sm:w-[450px]
           bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex fixed top-0 w-full z-50 bg-white items-center p-2 border-b border-gray-200 justify-between gap-2">
          <p className="font-semibold">Mon panier</p>
          <X onClick={() => setOpen(false)} className="text-gray-400 cursor-pointer" size={20} />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 flex flex-col space-y-3 mt-10 pb-8 overflow-y-auto p-4" style={{ maxHeight: "calc(100vh - 240px)" }}>
           {[0,1,2,3,4,10,6,7,8,95,55,89898,989777,18,19,20,77,66,44,900,9].map((_,index) => (
              <div className="border-b border-gray-300 py-3" key={index}>
               <div >
                 <div className="flex items-start gap-2">
                  <div className="rounded-lg bg-gray-100 w-[200px] h-[130px]  ">
                     <img className="w-full h-full object-cover" src="/mi.png" />
                  </div>
                  <div className="flex flex-col gap-3">
                      <Link href="">
                           <p className="hover:underline hover:text-light_blue
                            font-medium line-clamp-1">SET DE 4 BOITES A EPICES BAMBOU IH-1080-4B</p>
                      </Link>
                      <p className="text-gray-400 font-normal ">Vendeur SHOP ATLAS</p>
                  </div>
                     <div>
                        <TrashIcon className="cursor-pointer" size={20} color="red" />
                     </div>
                 </div>
            </div>
            <div className="flex items-center  mt-5 justify-between">
                 <div className="border   flex w-[130px] justify-between items-center rounded-lg border-gray-300">
                      <span className="border-r flex items-center justify-center text-center flex-1 border-gray-300">
                          <Minus size={18} className="text-light_blue cursor-pointer text-center" />
                      </span>
                       <span className="flex-1 text-center font-semibold">
                         5
                       </span>
                       <span className="flex-1 flex items-center justify-center text-center border-l border-gray-300">
                          <Plus size={18} className="text-light_blue cursor-pointer text-center" />
                       </span>
                 </div>
                 <h3 className="font-semibold text-light_blue text-[20px] ">
                   122,00 Dh
                 </h3>
            </div>
              </div>
           ))}
           
        </div>
        <div className="flex fixed bottom-0 flex-col w-full z-50 bg-white   shadow-sm ">
            <div className="bg-gray-200 p-5 flex flex-col space-y-2 w-full">
                  <div className="flex items-center justify-between">
                        <p>5 produits
                        </p>
                        <p>Sous-total</p>
                  </div>
                  <div className="flex justify-end">
                      <span className="font-semibold text-light_blue text-[18px] ">1 507,99 Dh</span>
                  </div>
            </div>
            <Link className="flex items-center  p-8 justify-center" href="/cart">
                <Button className="bg-light_blue h-[45px] sm:w-[200px] text-white rounded-lg" type="button">
                    Voir le panier
                </Button>
            </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CartSidebar;
