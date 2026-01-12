import mongoose from "mongoose";

const HelpRequestSchema = new mongoose.Schema({
  requester_user_id: { type: mongoose.Schema.Types.ObjectId, ref: "Donor" },
  bloodGroup: String,
  city: String,
  state: String,
  message: String,
  contactMode: String,
  status: { type: String, default: "open" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.HelpRequest || mongoose.model("HelpRequest", HelpRequestSchema);


