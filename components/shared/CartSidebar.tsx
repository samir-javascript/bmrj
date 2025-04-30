"use client";

import { Minus, Plus, TrashIcon, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { close, removeItemAsync, updateQuantityAsync } from "@/lib/store/cartSlice";
import { formatPrice } from "@/lib/utils";
import { cartItemsProps, UserCartElement } from "@/types/Elements";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/user-redux";
import { useCartItems } from "@/hooks/useCartItems";
import LoadingAppState from "../Loaders/LoadingAppState";
import Image from "next/image";

interface Props {
  data?: UserCartElement;
  isAuthenticated: boolean;
}

const CartSidebar = ({ data, isAuthenticated }: Props) => {
  interface ItemProps {
    name:string;
    price:string;
    quantity:number,
    image: string[]
    _id:string
 }
  const { isOpen } = useAppSelector((state) => state.cart);
  const [pending,setPending] = useState(false)
  const router = useRouter()
  const pathname = usePathname();
  const dispatch = useAppDispatch();

   const cartItems = useCartItems({isAuthenticated,data})
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    dispatch(close());
  }, [pathname, dispatch]);

  const totalQty = cartItems?.reduce((acc:number, item:{quantity:number}) => acc + item.quantity, 0);
  const totalPrice = cartItems?.reduce(
    (acc:number, item:{quantity:number,price:number}) => acc + item.quantity * item.price,
    0
  );
    const handleRemoveItem = async(productId:string)=> {
        try {
           setPending(true)
           await new Promise(resolve => setTimeout(resolve, 500) )
           dispatch(removeItemAsync(productId) as any)
           setPending(false)
           router.refresh()
        } catch (error) {
            console.log(error)
        }finally {
           setPending(false)
        }
          
       }
    const handleUpdateItemQty = async(productId:string,quantity:number)=> {
       try {
         setPending(true)
        await  dispatch(updateQuantityAsync({id:productId, quantity}) as any)
         setPending(false)
         router.refresh()
       } catch (error) {
          console.error(error)
       }finally {
         setPending(false)
       }
    }
  return (
    <>
      {isOpen && (
        <div
          onClick={() => dispatch(close())}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm transition-opacity"
        />
      )}
       {pending && (
          <LoadingAppState />
       )}
      <div
        className={`fixed right-0 top-0 w-full h-full sm:w-[450px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex fixed top-0 w-full z-50 bg-white items-center p-2 border-b border-gray-200 justify-between gap-2">
          <p className="font-semibold">Mon panier</p>
          <X
            onClick={() => dispatch(close())}
            className="text-gray-400 cursor-pointer"
            size={20}
          />
        </div>

        {/* Content */}
        {cartItems.length > 0 ? (
   <>
   <div
     className="flex-1 flex flex-col space-y-3 mt-10 pb-8 overflow-y-auto p-4"
     style={{ maxHeight: "calc(100vh - 240px)" }}
   >
     {cartItems?.map((item: cartItemsProps, index:number) => (
       <div className="border-b border-gray-300 py-3" key={index}>
         <div className="flex items-start gap-2">
           <div className="rounded-lg bg-gray-100 h-[120px]  w-[300px]">
             <img
               className="w-full h-full rounded-lg  object-contain"
               src={item.image}
               alt={item.title}
              
               loading="lazy"
             />
           </div>
           <div className="flex flex-col gap-3">
             <Link href={`/products/${item._id}`}>
               <p className="hover:underline max-sm:text-sm hover:text-light_blue font-medium line-clamp-3">
                 {item.title}
               </p>
             </Link>
             <p className="text-gray-400 font-normal">
               Vendeur {item.brand}
             </p>
           </div>
           <div>
             <TrashIcon onClick={()=> handleRemoveItem(item._id)} className="cursor-pointer" size={20} color="red" />
           </div>
         </div>
         <div className="flex items-center mt-5 justify-between">
           <div className="border h-[40px] flex w-[130px] justify-between items-center rounded-lg border-gray-300">
             <span className="border-r flex items-center justify-center text-center flex-1 border-gray-300">
               <Minus
                 onClick={()=> item.quantity > 1 && handleUpdateItemQty(item._id, item.quantity - 1) }
                 size={18}
                 className="text-light_blue cursor-pointer text-center"
               />
             </span>
             <span className="flex-1 text-center font-semibold">
               {item.quantity}
             </span>
             <span className="flex-1 flex items-center justify-center text-center border-l border-gray-300">
               <Plus 
                onClick={()=> handleUpdateItemQty(item._id, item.quantity + 1) }
                 size={18}
                 className="text-light_blue cursor-pointer text-center"
               />
             </span>
           </div>
          
           <h3 className="font-semibold text-light_blue text-[20px]">
             {formatPrice(item.price * item.quantity)}
           </h3>
          
           
          
         </div>
       </div>
     ))}
   </div>

   {/* Footer */}
   <div className="flex fixed bottom-0 flex-col w-full z-50 bg-white shadow-sm">
     <div className="bg-gray-200 p-5 flex flex-col space-y-2 w-full">
       <div className="flex items-center justify-between">
         <p className="font-semibold text-[15px] text-[#222]">
           {totalQty} produits
         </p>
         <p className="font-medium text-sm text-[#222]">Sous-total</p>
       </div>
       <div className="flex justify-end">
         <span className="font-extrabold text-light_blue text-[18px]">
           {formatPrice(totalPrice)}
         </span>
       </div>
     </div>
     <Link href="/checkout/cart" className="flex items-center p-8 justify-center">
       <Button
         className="bg-light_blue h-[45px] sm:w-[200px] text-white rounded-full font-semibold"
         type="button"
       >
         Voir le panier
       </Button>
     </Link>
   </div>
   </>
        ): (
           <div className="w-full mt-20">
              <p className="text-center mx-auto font-bold text-[#000] text-[15px] ">Aucun article dans votre panier.</p>
           </div>
        )}
     
       
      </div>
    </>
  );
};

export default CartSidebar;

