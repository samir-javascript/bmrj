import mongoose from "mongoose"
interface ISession {
    userId: mongoose.Schema.Types.ObjectId;
    expiresAt: Date;
}
const SessionModel = new mongoose.Schema<ISession>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  expiresAt: {
     type: Date,
     default: Date.now()
  }
}, {
    timestamps: true
})
const Session = mongoose.models.Session || mongoose.model<ISession>("Session",SessionModel)
export default Session;