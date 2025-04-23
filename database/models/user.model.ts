import mongoose, { Schema, Document } from "mongoose";

export interface IUser {
  _id: string;
  gender: "male" | "female";
  name: string;
  lastName: string;
  hasNewsLetter:boolean;
  image: string;
  phoneNumber?: string;
  hasOrdered: boolean,
  email: string;
  password?: string;
  isAdmin: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    gender: {
      type: String,
      enum: ["female", "male"],
       default: "male"
    },
    name: {
      type: String,
      required: true,
    },
    image: {
       type:String
    },
    lastName: {
      type: String,
      required: true,
    },
    hasNewsLetter: {
      type: Boolean,
      default: false,
    },
    hasOrdered: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      sparse: true, 
      unique: true,
      trim: true,
    },
    password: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
export default User;
