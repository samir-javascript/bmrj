import { models, ObjectId, Schema } from "mongoose";
import crypto from "crypto"
import { model } from "mongoose";
export interface ISetPasswordToken extends Document {
    userId: Schema.Types.ObjectId;
    setPasswordToken: string;
    setPasswordExpires: Date;
    generateSetPasswordToken(userId: string): string;
  }
const SetPasswordTokenSchema = new Schema<ISetPasswordToken>({
     userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
     },
     setPasswordToken:  {
        type: String,
        required: true
     },
     setPasswordExpires: {
        type:Date,
        default: Date.now()
     }
}, {
    timestamps: true
})
// Instance method to generate and set reset token
SetPasswordTokenSchema.methods.generateSetPasswordToken = function (
    this: ISetPasswordToken,
    userId: ObjectId
  ): string {
    // Generate 6-digit numeric token
    const plainToken = Math.floor(100000 + Math.random() * 900000).toString();

this.setPasswordToken = crypto
  .createHash("sha256")
  .update(plainToken)
  .digest("hex");
    this.setPasswordExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 mins
    this.userId = userId
  
    return plainToken;
  };
  
  

  const SetPasswordToken = models.SetPasswordToken || model<ISetPasswordToken>('SetPasswordToken', SetPasswordTokenSchema);

export default SetPasswordToken;
