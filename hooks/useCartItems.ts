"use client"

import { UserCartElement } from "@/types/Elements";
import { useAppSelector } from "./user-redux";

interface props {
    isAuthenticated:boolean;
    data?: UserCartElement | undefined
}
export const useCartItems = ({isAuthenticated,data}:props)=> {

     const {items} = useAppSelector((state) => state.cart)
        const cartItems = isAuthenticated
        ? data?.userCart?.items?.map((item) => ({
            _id: item.productId._id,
            brand: item.productId.brand,
            title: item.productId.name,
            image: item.productId.images[0]?.url,
            prevPrice: item.productId.prevPrice,
            price: item.productId.price,
            quantity: item.quantity,
          })) ?? items
        : items;
    return cartItems
}
