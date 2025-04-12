import mongoose from "mongoose";
export interface ICollection {
    userId: mongoose.Schema.Types.ObjectId;
    productId: mongoose.Schema.Types.ObjectId;
}

const CollectionSchema = new mongoose.Schema<ICollection>({
     userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
     },
     productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
     }
}, {
    timestamps: true
})
const Collection = mongoose.models.Collection || mongoose.model<ICollection>('Collection', CollectionSchema)
export default Collection;