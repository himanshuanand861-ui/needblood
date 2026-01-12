import mongoose from "mongoose";

const UserOTPSchema = new mongoose.Schema({
  phone: { type: String, unique: true },
  otp: String,
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.UserOTP || mongoose.model("UserOTP", UserOTPSchema);
