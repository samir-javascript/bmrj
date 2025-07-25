import mongoose, { Schema, Document, Types } from "mongoose";

export interface IResetCode extends Document {
  userId: Types.ObjectId;
  code: string; // hashed 4-digit code
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ResetCodeSchema = new Schema<IResetCode>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    code: {
      type: String,
      required: true, // this should be a hashed code
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Optional: auto-delete expired codes with TTL index
ResetCodeSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const ResetCode = mongoose.models.ResetCode || mongoose.model<IResetCode>("ResetCode", ResetCodeSchema);
export default ResetCode;
