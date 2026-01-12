import { connectDB } from "../lib/db";
import UserOTP from "../models/UserOTP";

export default async function handler(req,res){
  await connectDB();
  if(req.method === "POST"){
    const { phone, otp, action } = req.body;

    if(action === "send"){
      // generate 6-digit OTP
      const code = Math.floor(100000 + Math.random()*900000).toString();
      await UserOTP.findOneAndUpdate(
        { phone },
        { otp: code, verified: false, createdAt: new Date() },
        { upsert:true }
      );
      // TODO: send OTP via SMS provider (Supabase/Firebase/MSG91)
      console.log(`OTP for ${phone}: ${code}`); // For testing
      return res.json({ success:true, msg:"OTP sent"});
    }

    if(action === "verify"){
      const user = await UserOTP.findOne({ phone, otp });
      if(!user) return res.status(400).json({ success:false, msg:"Invalid OTP" });
      user.verified = true;
      await user.save();
      return res.json({ success:true, msg:"OTP verified" });
    }
  }
  res.status(405).send("Method Not Allowed");
}
