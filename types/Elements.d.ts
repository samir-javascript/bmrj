import { IProduct, IReview } from "@/database/models/product.model";
import { IUser } from "@/database/models/user.model";

export interface CollectionElement {
    _id:string
    productId: IProduct;
    userId: IUser
}
export interface CartElement {
    _id:string;
    guestId:string | null;
    userId: string;
    productId: {
         quantity:number;
         items: IProduct[]
    }
}

export interface Order {
  _id:string;
  user: IUser;
  createdAt: Date;
  orderStatus: "canceled" | "in preparation" | "confirmed" | "delivered";
  stripePaymentIntentId?:string;
  paymentMethod: "stripe" | "COD";
  shippingAddress: {
    city: string;
    postalCode: string;
    country: string;
    address: string;
    phoneNumber: string;
  };
  orderItems: [
    {
      name: string;
      price: number;
      qty: number;
      images: string[]
      product:IProduct;
    }
  ];
  shippingPrice: number;
  totalPrice: number;
  itemsPrice: number;
 
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  paymentResult?: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };

}
export interface cartItemsProps {
  _id: string,
  brand: string,
  title: string,
  image: string,
  prevPrice: number,
  price: number,
  quantity: number,
}
export interface UserCartElement {
     qty:number;
     userCart: {
      items: [
        {
          productId: IProduct,
          quantity: number,
        },
      ],
     }
    
    // userCart: {
        
    //     items: [{
    //          productId: IProduct;
    //               quantity: number;
    //     }]
    // }
}