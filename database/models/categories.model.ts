import { model, models, Schema } from "mongoose";
export interface ICategory {
    name:string;
    image: {
        public_id: string;
        imageUrl: string;
    }
}
const CategorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        
            public_id: {
                type: String,
                required: true
            },
            imageUrl: {
                type: String,
                required: true
            }
        
    }
}, {
    timestamps: true
})
const Category = models.Category || model<ICategory>("Category",CategorySchema)
export default Category;