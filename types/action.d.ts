// =======================
// AUTH INTERFACES
// =======================
import mongoose from "mongoose";
export interface GetUserInfoParams {
  userId:string;
}
export interface SignUpParams {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: "male" | "female";
  password: string;
}
export interface CreateCategoryParams {
  name:string;
  image: {
    public_id:string;
    imageUrl:string;
  }
}
export interface DeleteHeroBannerParams {
  id:string;
}
export interface AddHeroImageParams {
  title:string;
  imgUrl: {
    mobile:string;
    desktop:string;
  }
  isActive: boolean;
}
export interface SignInWithOAuthParams {
  provider: "google" | "github";
  providerAccountId: string;
  user: {
    email: string;
    lastName: string;
    name: string;
    image: string;
  };
}

export interface EmailVerificationParams {
  token: string;
}

export interface AuthCredentials {
  name: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: "male" | "female";
}

// =======================
// PRODUCT INTERFACES
// =======================

export interface ProductParams {
  productName: string;
  productDescription: string;
  productPrice: string;
  productPrevPrice: string;
  productCategory: string;
  productBrand: string;
  productPosition: string;
  qty: string;
  productImages: {
    url:string;
    public_id:string
  }[];
}
export interface VerifyCodeAndSetPasswordParams {
  password:string;
  confirmPassword:string;
  code:string;
}
export interface GetSingleProductParams {
  productId: string;
}

export interface EditProductParams extends ProductParams {
  productId: string;
}

export interface DeleteProductParams {
  productId: string;
}

// =======================
// COLLECTION INTERFACES
// =======================

export interface CollectionParams {
  productId: string;
}

// =======================
// PROFILE INTERFACES
// =======================

export interface EditProfileParams {
  name: string;
  lastName: string;
  phoneNumber: string;
  gender: "male" | "female";
  email: string;
  currentPassword?:string;
  password?: string;
  confirmPassword?: string;
}

// =======================
// SHIPPING INTERFACES
// =======================

export interface CreateShippingParams {
  city: string;
  postalCode: string;
  address: string;
  phoneNumber: string;
  name: string;
  country: string;
}

export interface GetSingleShippingParams {
  id: string;
}
export interface searchParamsProps  {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}
export interface EditShippingParams extends CreateShippingParams {
  id: string;
}

export interface DeleteShippingParams {
  id: string;
}

// =======================
// PAGINATION INTERFACES
// =======================

export interface PaginatedSchemaParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  query?: string;
  sort?: string;
}

export interface CancelOrderParams {
  orderId:string;
}
export interface GetUserCartParams  {
  userId:string;
}
export interface CouponParams  {
   code:string;
   userId:string
}

// ORDERS PARAMS;

export interface GetSearchInputResultsParams {
  query:string
}
export interface ReviewParams  {
   user:string | Schema.Types.ObjectId;
  
   title: string;
   comment: string;
   rating: string;
   productId:string
}
export interface orderItemParams {
  name: string;
  price: number;
  qty: number;
  images: string[];
  product: mongoose.Schema.Types.ObjectId | string;
}
export interface CreateOrderParams {
  orderItems: orderItemParams[];
  shippingPrice: number;
  totalPrice: number;
  itemsPrice: number;
  paymentMethod: "stripe" | "COD";
  shippingAddress: {
    city: string;
    postalCode: string;
    country: string;
    address: string;
    phoneNumber: string;
  };
  orderStatus?: "canceled" | "in preparation" | "confirmed" | "delivered";
  isPaid?: boolean;
  paidAt?: Date;
  isDelivered?: boolean;
  deliveredAt?: Date;
  paymentResult?: {
    id?: string;
    status?: string;
    update_time?: string;
    email_address?: string;
  };
}

export interface ClearUserCartParams {
  userId:string;
}
export interface GetMyOrdersParams extends PaginatedSchemaParams {
  userId:string;
}