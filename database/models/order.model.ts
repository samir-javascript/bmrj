import { model, models, Schema } from "mongoose";

export interface IOrder {
  _id:string;
  user: Schema.Types.ObjectId;
  orderStatus: "canceled" | "in preparation" | "confirmed" | "delivered";
  stripePaymentIntentId?:string;
  paymentMethod: "stripe" | "COD";
  shippingAddress: {
    city: string;
    postalCode: string;
    country: string;
    address: string;
    phoneNumber: string;
  };
  orderItems: [
    {
      name: string;
      price: number;
      qty: number;
      images: string[]
      product: Schema.Types.ObjectId;
    }
  ];
  shippingPrice: number;
  totalPrice: number;
  itemsPrice: number;
 
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  paymentResult?: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
}

const OrderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        qty: { type: Number, required: true },
        images: [{type: String}],
        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      default: 0.0,
      required: true,
    },
    itemsPrice: {
      type: Number,
      default: 0.0,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["stripe", "COD"],
      required: true,
    },
    shippingAddress: {
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      address: { type: String, required: true },
      phoneNumber: { type: String, required: true },
    },
    orderStatus: {
      type: String,
      default: "in preparation",
      enum: ["canceled", "in preparation", "confirmed", "delivered"],
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const Order = models.Order || model<IOrder>("Order", OrderSchema);
export default Order;