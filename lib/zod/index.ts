import z from "zod"
export const SignUpValidationSchema = z.object({
    gender: z.enum(["male", "female"], {message: "gender Type is not valid!"}),
    name: z.string().min(1, {message: "name field is required!"}),
    lastName: z.string().min(1, {message: "lastName is required!"}),
    phoneNumber: z.string().regex(
        /^[+\d]?(?:[\d-.\s()]*)$/, 
        "Invalid phone number format"
    ),
    email: z.string().email({message: "please provide a valid email address!"}),
    password: z.string().min(8, "Password must be at least 8 characters long").regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
})
export const CancelOrderSchemaValidation = z.object({
   orderId: z.string().min(1, {message: "order ID is required"})
})
export const CreateCategorySchema  = z.object({
   name: z.string().min(1, {message: "name is required"}),
   image: z.string().url({message: "invalid URL"})
})
export const LoginValidationSchema = z.object({
    email: z.string().email({message: "please provide a valid email address!"}),
    password: z.string().min(8, "Password must be at least 8 characters long").regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
})
export const EmailVerificationValidationSchema  = z.object({
   token: z.string().min(1, {message: "token is required"})
})
export const UsersSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    lastName: z
      .string()
      .min(3, { message: "lastName must be at least 3 characters long." }),
    email: z.string().email({ message: "Please provide a valid email address." }),
   
    image: z.string().url({ message: "Please provide a valid URL." }).optional(),
    gender: z.enum(["male", "female"], {message: "Invalid gender type"}),
    phoneNumber: z.string()
    .trim()
    .min(10, { message: "Phone number must be at least 10 digits long" })
    .max(15, { message: "Phone number must not exceed 15 digits" })
    .regex(/^\+?[1-9]\d{9,14}$/, { message: "Invalid phone number format" }),
    isAdmin: z.boolean().default(false).optional(),
    isVerified: z.boolean().default(false).optional()
  });
export const AccountSchema = z.object({
    userId: z.string().min(1, {message: "User ID is required"}),
    name: z.string().min(1, {message: "name is required"}),
    image: z.string().url({message: "invalid image URL"}).optional(),
    password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    })
    .optional(),
    provider: z.string().min(1, {message: "provider name is required"}),
    providerAccountId: z.string().min(1, {message: "ProviderAccount ID is required"})
})
export const GetUserCartSchema = z.object({
  userId: z.string().min(1, {message: "USER ID IS REQUIRED"})
})
export const CouponSchema = z.object({
   code: z.string().min(1, {message: "coupon code is required"}),
   userId: z.string().min(1,{message: "user ID is required"})
})


export const GetSetPasswordCodeSchema = z.object({
  code: z.string().min(6, {message: "code must contain at least 6 characters long"}).max(6, {message: "code must contain maximum 6 characters long" }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
export const SignInWithOAuthSchema = z.object({
   provider: z.enum(["google", "github"], {message: "Invalid provider type"}),
   providerAccountId: z.string().min(1, {message: "provider account ID is required"}),
   user: z.object({
      name: z.string().min(1, {message: "name is required"}),
      image: z.string().url({message: "invalid image URL"}).optional(),
      lastName: z.string().min(3),
      email: z.string().email({message: "Invalid email address"})
   })
})
export const SignleProductSchema = z.object({
  productId: z.string().min(1,{message: "Product ID is required"})
})
export const ShippingSchemaValidation = z.object({
   postalCode:z.string().min(1, {message: "Postal code is required"}),
   country: z.string().min(1, {message: "country is required"}),
   city: z.string().min(1, {message: "city is required"}),
   phoneNumber: z.string().regex(
    /^[+\d]?(?:[\d-.\s()]*)$/, 
    "Invalid phone number format"
),
   name: z.string().min(3, {message: "name is required"}),
   address: z.string().min(3, {message: "address is required"}),
})
export const GetSingleShippingSchema = z.object({
  id: z.string().min(1, {message: "ID is required"})
})
export const editShippingSchema = ShippingSchemaValidation.extend({
  id: z.string().min(1, {message: "ID is required"})
})
export const DeleteShippingSchema = z.object({
   id: z.string().min(1, {message: "ID is required"})
})
export const CollectionSchema  = z.object({
   productId: z.string().min(1, {message: "Product ID is required"})
})
export const ProductSchemaValidation = z.object({
   productName: z.string().min(3, {message: "product name is required"}),
   productDescription: z.string().min(8, {message: "product description is required"}),
   productPrice: z.string().nonempty({message: "product price is required"}),
   productPrevPrice: z.string().min(1 ,{ message: "Product discount price is required" }),
   productCategory: z.string().min(1, {message: "product category name is required"}),
   productBrand: z.string().min(1, {message: "product brand name is required"}),
   productPosition: z.string().min(1, {message: "product position is required"}),
   qty: z.string().min(1, {message: "product qty is required"}),
   productImages: z.array(
    z.object({
      url: z.string().min(1, "Image URL is required"),
      public_id: z.string().min(1, "Image public_id is required"),
    })
  ).min(1, "Please upload at least one image."),
  
})
export const EditProductSchema = ProductSchemaValidation.extend({
    productId: z.string().min(1, {message: "Product ID is required"})
})
export const DeleteProductValidationSchema = z.object({
  productId: z.string().min(1, {message: "Product ID is required"})
})
export const PaginatedSchemaValidation = z.object({
  page: z.number().int().default(1),
  pageSize: z.number().int().default(10),
  filter: z.string().optional(),
  query: z.string().optional(),
  sort: z.string().optional(),
})
export const HeroValidationSchema = z.object({
   isActive: z.boolean().default(false),
   title: z.string().min(1, {message: "title is required"}),
   imgUrl: z.object({
      mobile: z.string().url({message: "invalid mobile size img URL"}),
      desktop: z.string().url({message: "invalid desktop sizr img  URL"})
   })
})
export const CategorySchemaValidation = z.object({
  name: z.string().min(1, {message: "category name is required"}),
  image: z.object({
     public_id: z.string().min(1, {message: "public ID is required"}),
     imageUrl: z.string().min(1, {message: "imageUrl ID is required"})
  })
})

export const ClearCartSchema = z.object({
  userId: z.string().min(1, {message: "userId is required"})
})
export const GetMyOrdersValidationSchema = z.object({
   userId: z.string().min(1, {message: "user ID is required"})
})
export const CreateOrderValidationSchema = z.object({
 
  orderItems: z.array(
    z.object({
      name: z.string().min(1, "Item name is required"),
      price: z.number({ message: "Item price is required" }),
      qty: z.number({ message: "Item quantity is required" }),
      images: z.array(z.string().min(1, "Image URL is required")),
      product: z.string().min(1, "Product ID is required"), // ObjectId as string
    }, {message: "this shit is required"})
  ),

  shippingPrice: z.number({ message: "Shipping price is required" }),
  totalPrice: z.number({ message: "Total price is required" }),
  itemsPrice: z.number({ message: "Items price is required" }),

  paymentMethod: z.enum(["stripe", "COD"], {
    required_error: "Payment method is required",
  }),

  shippingAddress: z.object({
    city: z.string().min(1, "City is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
    address: z.string().min(1, "Address is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
  }),

  orderStatus: z.enum(["canceled", "in preparation", "confirmed", "delivered"]),

  isPaid: z.boolean().optional(),
  paidAt: z.date().optional(),
  isDelivered: z.boolean().optional(),
  deliveredAt: z.date().optional(),

  paymentResult: z
    .object({
      id: z.string().optional(),
      status: z.string().optional(),
      update_time: z.string().optional(),
      email_address: z.string().optional(),
    })
    .optional(),
});
export const ReviewSchemaValidation = z.object({
   user: z.string().min(1, {message:"user ID is required"}),
  
   title:z.string().min(1, {message: "title is required"}),
   comment: z.string().min(1, {message: "comment is required"}),
   rating: z.string().min(1).max(5),
   productId: z.string().min(1, {message: "PRODUCT IS IS REQUIRED"})
})
export const DeleteHeroBannerSchema = z.object({
   id: z.string().min(1, {message: "ID is required"})
})
export const editProfileSchema = z.object({
  gender: z.enum(["male", "female"], { message: "Invalid gender type" }),
  name: z.string().min(1, { message: "Name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Please provide a valid email address" }),
  currentPassword: z.string().optional(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
  phoneNumber: z
    .string()
    .regex(/^[+\d]?(?:[\d-.\s()]*)$/, { message: "Invalid phone number format" }),
})
.superRefine((data, ctx) => {
  // Only validate new password fields if currentPassword is provided
  if (data.currentPassword) {
    if (!data.password) {
      ctx.addIssue({
        code: "custom",
        message: "New password is required",
        path: ["password"],
      });
    }

    if (!data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Please confirm your new password",
        path: ["confirmPassword"],
      });
    }

    if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });
    }
  }
});

export const GetUserInfoSchema = z.object({
  userId: z.string().min(1, {message: "user ID is required"})
})