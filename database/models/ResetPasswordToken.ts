import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IResetToken extends Document {
  userId: mongoose.Types.ObjectId;
  resetCode: number;
  expiresAt: Date;
  createdAt: Date;
}

const ResetTokenSchema = new Schema<IResetToken>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resetCode: {
      type: Number,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 1000 * 60 * 10),
      index: { expires: 0 }, // Default expiration: 10 minutes
    },
  },
  { timestamps: true }
);

const ResetToken = models.Token || model("ResetToken",ResetTokenSchema)
export default ResetToken
