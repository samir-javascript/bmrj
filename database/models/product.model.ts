import mongoose, { model, models, Schema } from "mongoose";
export interface IReview  {
   user:string | Schema.Types.ObjectId;
   name:string;
   title: string;
   comment: string;
   rating: number;
   isVerified:boolean
}
export interface IProduct  {
   _id:string;
    name: string;
    description: string;
    price: number;
    prevPrice: number;
    category: string;
    brand: string;
    images: {
      public_id:string;
      url:string;
    }[];
    position:string;
    countInStock: number;
    numReviews: number;
    rating: number;
    reviews: IReview[];
}
const reviewsSchema = new mongoose.Schema<IReview>({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
   },
   name: {
      type: String,
      required: true
   },
   comment: {
      type: String,
      required: true
   },
   title: {
      type: String,
      required: true
   },
   rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
   },
   isVerified: {
      type: Boolean,
      default: false
   }
}, {timestamps: true})
const ProductSchema = new mongoose.Schema<IProduct> ({
   name: {
      type:String,
      required: true
   },
   description: {
     type: String,
     required: true
   },
   images:[{ 
      url: {
         type:String,
         required: true
      },
      public_id: {
         type:String,
         required: true
      }
   }],
   price: {
    type: Number,
    required: true
   },
   prevPrice: {
     type:Number,
     required: true
   },
   category: {
     type: String,
     required: true
   },
   brand: {
     type: String,
     required: true
   },
   position: {
     type: String,
     required: true,
   },
   numReviews: {
    type: Number,
    default: 0
   },
   rating: {
    type: Number,
    default: 0
   },
   countInStock: {
      type: Number,
      default: 0
   },
   reviews: [reviewsSchema]
}, {timestamps: true})
const Product = models?.Product || model("Product",ProductSchema)
export default Product;