import mongoose from "mongoose"

const CartLineItemSchema = new mongoose.Schema({
    quantity: { type: Number, required: true, default: 1 },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: "Cart", required: true }
  }, { timestamps: true });
  const CartSchema = new mongoose.Schema({
    userId: { type: Number, unique: true, sparse: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "CartLineItem" }]
  }, { timestamps: true });
  const CartLineItem = mongoose.models.CartLineItem || mongoose.model("CartLineItem", CartLineItemSchema);
const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

export { Cart, CartLineItem };