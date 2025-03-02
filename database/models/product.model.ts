import mongoose, {Schema} from 'mongoose'
interface IReview {
   user: mongoose.Schema.Types.ObjectId;
   comment: string;
   rating: number;
   name: string;
}
interface IProduct {
    name: string;
    description: string;
    price: number;
    prevPrice: number;
    category: string;
    brand: string;
    images: string[];
    countInStock: number;
    reviews: IReview[]
}
const Reviews = new Schema<IReview>({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:  "User"
    },
    comment: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    name: {
        type: String,
        required: true,
    },
}) 

const ProductModel = new Schema<IProduct>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    prevPrice: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    brand: {
        type: String,
        required: true
    },
    countInStock: {
        type: Number,
        default: 0
    },
    reviews: [Reviews]

})
const Product = mongoose.models.Product || mongoose.model("Product",ProductModel)
export default Product;