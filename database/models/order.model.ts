import mongoose from 'mongoose';
const OrderSchema = new mongoose.Schema({
    orderDate: { type: Date, required: true, default: Date.now },
    customerId: { type: String, required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    stripeCustomerId: { type: String },
    stripeCheckoutSessionId: { type: String },
    stripePaymentIntentId: { type: String },
    totalPrice: { type: Number, required: true },
    shippingAddress: { 
    name: { type: String, required: true },
    line1: { type: String, required: true },
    line2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
     },
    orderItems: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true }
    }],
    status: {
        type: String,
        enum: ['PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
        default: 'PROCESSING'
    }
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);

export default Order;
