import { connectDB } from "../../lib/db";
import Donor from "../../models/Donor";
import HelpRequest from "../../models/HelpRequest";

export default async function handler(req,res){
  await connectDB();
  if(req.method==="POST"){
    const { phone, message, city, state } = req.body;

    // Check if donor exists
    const user = await Donor.findOne({ phone, verified:true });
    if(!user) return res.status(403).json({ success:false, msg:"Register your blood group first" });

    const help = await HelpRequest.create({
      requester_user_id: user._id,
      bloodGroup: user.bloodGroup,
      city,
      state,
      message,
      contactMode: user.contactMode
    });

    return res.json({ success:true, help });
  }

  if(req.method==="GET"){
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
