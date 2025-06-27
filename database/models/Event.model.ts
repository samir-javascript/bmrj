// models/UserEvent.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUserEvent extends Document {
  userId?: string;
  sessionId?: string;
  eventType: string;
  eventData: Record<string, any>;
  timestamp: Date;
}

const UserEventSchema = new Schema<IUserEvent>({
  userId: { type: String },
  sessionId: { type: String },
  eventType: { type: String, required: true },
  eventData: { type: Object, required: true },
  timestamp: { type: Date, default: Date.now },
});

const UserEvent =  mongoose.models.UserEvent || mongoose.model<IUserEvent>("UserEvent", UserEventSchema);
export default UserEvent
