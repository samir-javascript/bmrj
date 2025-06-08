import mongoose, { Schema } from "mongoose";

// =======================
// AUTH INTERFACES
// =======================

export interface AuthCredentials {
  email: string;
  gender: "male" | "female";
  lastName: string;
  name: string;
  password: string;
  phoneNumber: string;
}

export interface EmailVerificationParams {
  token: string;
}

export interface GetUserInfoParams {
  userId: string;
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

export interface SignUpParams {
  email: string;
  gender: "male" | "female";
  lastName: string;
  name: string;
  password: string;
  phoneNumber: string;
}

// =======================
// CATEGORY & HERO BANNER INTERFACES
// =======================

export interface AddHeroImageParams {
  imgUrl: {
    desktop: string;
    mobile: string;
  };
  isActive: boolean;
  title: string;
}

export interface CreateCategoryParams {
  name: string;
  image: {
    public_id: string;
    imageUrl: string;
  };
}

export interface DeleteHeroBannerParams {
  id: string;
}

// =======================
// COLLECTION INTERFACES
// =======================

export interface CollectionParams {
  productId: string;
}
export interface RemoveAllWishlistItemsParams {
   userId:string
}
// =======================
// ORDER INTERFACES
// =======================

export interface CancelOrderParams {
  orderId: string;
}

export interface ClearUserCartParams {
  userId: string;
}

export interface CreateOrderParams {
  itemsPrice: number;
  orderItems: orderItemParams[];
  paymentMethod: "stripe" | "COD";
  shippingAddress: {
    city: string;
    postalCode: string;
    country: string;
    address: string;
    phoneNumber: string;
  };
  shippingPrice: number;
  totalPrice: number;
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

export interface DeleteSelectedOrdersParams {
  ordersId: string[];
}
export interface GetOrderDetailsParams {
   orderId:string
}
export interface GetAllOrdersParams extends PaginatedSchemaParams {
  orderStatus?: "" | "canceled" | "in preparation" | "confirmed" | "delivered";
}

export interface GetMyOrdersParams extends PaginatedSchemaParams {
  userId: string;
}

export interface orderItemParams {
  images: string[];
  name: string;
  price: number;
  product: mongoose.Schema.Types.ObjectId | string;
  qty: number;
}

// =======================
// PAGINATION INTERFACES
// =======================

export interface PaginatedSchemaParams {
  filter?: string;
  page?: number;
  pageSize?: number;
  query?: string;
  sort?: string;
}

// =======================
// PRODUCT INTERFACES
// =======================

export interface DeleteProductParams {
  productId: string;
}

export interface EditProductParams extends ProductParams {
  productId: string;
}

export interface GetSingleProductParams {
  productId: string;
}
export interface IUserWithShipping  {
  user: IUser,
  shippingAddresses: IShipping[];
  orders: OrderType[];
  reviews: {
     productId: string,
     productName:string;
     reviews: IReview
  }[]
}
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
    url: string;
    public_id: string;
  }[];
}

// =======================
// PROFILE INTERFACES
// =======================

export interface EditProfileParams {
  confirmPassword?: string;
  currentPassword?: string;
  email: string;
  gender: "male" | "female";
  lastName: string;
  name: string;
  password?: string;
  phoneNumber: string;
}

export interface EditUserProfileByAdmin {
  address: string;
  city: string;
  country: string;
 
  email: string;
  firstName: string;
  gender: "male" | "female";
  isAdmin: boolean;
  lastName: string;
 
  phoneNumber: string;
  postalCode: string;
  userId: string;
}

export interface DeleteUserParams {
  userId: string;
}

export interface DeleteSelectedUsersParams {
  usersId: string[];
}

// =======================
// REVIEW INTERFACES
// =======================

export interface ReviewParams {
  comment: string;
  productId: string;
  rating: string;
  title: string;
  user: string | Schema.Types.ObjectId;
}

// =======================
// SHIPPING INTERFACES
// =======================

export interface CreateShippingParams {
  address: string;
  city: string;
  country: string;
  name: string;
  phoneNumber: string;
  postalCode: string;
}

export interface DeleteShippingParams {
  id: string;
}
export interface GetUserWithShippingParams  {
  userId: string;
}
export interface DeleteOrderByIdParams {
  id:string
}
export interface EditShippingParams extends CreateShippingParams {
  id: string;
}

export interface GetSingleShippingParams {
  id: string;
}

// =======================
// UTILITY INTERFACES
// =======================

export interface CouponParams {
  code: string;
  userId: string;
}

export interface GetSearchInputResultsParams {
  query: string;
  limit : number;
}
export interface  GetProductsByCategoryParams  {
  categoryName:string
}
export interface GetUserCartParams {
  userId: string;
}

export interface searchParamsProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export interface VerifyCodeAndSetPasswordParams {
  code: string;
  confirmPassword: string;
  password: string;
}
