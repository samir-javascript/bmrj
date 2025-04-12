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
export interface UserCartElement {
     qty:number;
    userCart: {
        
        items: [{
             productId: IProduct;
                  quantity: number;
        }]
    }
}