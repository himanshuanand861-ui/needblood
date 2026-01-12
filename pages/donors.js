import { connectDB } from "../../lib/db";
import Donor from "../models/Donor";
import UserOTP from "../models/UserOTP";

export default async function handler(req,res){
  await connectDB();

  if(req.method === "POST"){
    const { phone, name, age, bloodGroup, state, city, contactMode } = req.body;

    // Check OTP verified
    const otpUser = await UserOTP.findOne({ phone, verified:true });
    if(!otpUser) return res.status(403).json({ success:false, msg:"Phone not verified" });

    // Add donor
    const donor = await Donor.create({ phone, name, age, bloodGroup, state, city, contactMode, verified:true });
    return res.json({ success:true, donor });
  }

  if(req.method === "GET"){
    const { bloodGroup, city, state } = req.query;
    const donors = await Donor.find({
      bloodGroup,
      city: { $regex: city, $options:"i" },
      state: { $regex: state, $options:"i" },
      availability:"YES",
      verified:true
    });
    return res.json(donors);
  }

  res.status(405).send("Method Not Allowed");
}
