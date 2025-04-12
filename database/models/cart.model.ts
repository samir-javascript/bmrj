import mongoose from 'mongoose';
export interface ICart {
  _id:string;
  userId: mongoose.Schema.Types.ObjectId;
  guestId: string;
  items: {
      productId:mongoose.Schema.Types.ObjectId;
      quantity: number;
  }[];
  
}
const cartSchema = new mongoose.Schema<ICart>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  guestId: { type: String, default: null },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 },
    },
  ],
}, { timestamps: true });

export const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

