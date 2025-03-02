import mongoose, {Schema,Document} from "mongoose";
export interface IUser {
    name: string;
    _id: string
    lastName: string;
    email: string;
    gender: "male" | "female";
    password: string;
    phoneNumber: string;
    isAdmin: boolean;
    isVerified: boolean;
    token?: string;
}
const UserSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        enum: ["male" , "female"],
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
       
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    token: {
        type: String
    }
}, {
    timestamps: true
})
const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
export default User;
