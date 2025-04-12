import mongoose, { model, models, Schema } from "mongoose"
export interface IShipping {
    _id:string;
    city:string;
    postalCode:string;
    phoneNumber:string;
    country: string;
    address:string;
    name:string;
    userId: Schema.Types.ObjectId
}
const ShippingSchema = new mongoose.Schema<IShipping>({
   city: {
     type:String,
     required:true
   },
   postalCode: {
    type:String,
    required:true
   },
   phoneNumber: {
    type:String,
    required:true
   },
   country: {
    type:String,
    required:true
   },
   address: {
    type:String,
    required:true
   },
   name: {
    type:String,
    required:true
   },
   userId:  {
    type: Schema.Types.ObjectId,
    required:true,
    ref: "User"
   }
}, {
    timestamps: true
})
const Shipping = models.Shipping || model<IShipping>("Shipping",ShippingSchema)
export default Shipping;