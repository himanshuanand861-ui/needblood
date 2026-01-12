import mongoose from "mongoose";

const DonorSchema = new mongoose.Schema({
  name: String,
  age: Number,
  bloodGroup: String,
  state: String,
  city: String,
  phone: String,
  availability: { type: String, default: "YES" },
  verified: { type: Boolean, default: false },
  contactMode: { type: String, enum: ["call","whatsapp","both"], default: "both" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Donor || mongoose.model("Donor", DonorSchema);

