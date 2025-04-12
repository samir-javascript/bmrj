import mongoose from "mongoose";
export interface ICoupon {
    code: string;
    discount: number;
    expiryDate:Date;
    isActive: boolean;
}
const CouponSchema = new mongoose.Schema<ICoupon>({
  code: { type: String, required: true, unique: true }, // Unique coupon code
  discount: { type: Number, required: true }, // Discount percentage or fixed amount
  expiryDate: { type: Date, required: true }, // Expiration date
  isActive: { type: Boolean, default: true }, // Check if the coupon is active
}, {
  timestamps:true
});
const Coupon = mongoose.models.Coupon || mongoose.model<ICoupon>("Coupon", CouponSchema);
export default Coupon;
