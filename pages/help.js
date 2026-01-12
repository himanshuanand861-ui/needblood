import connectDB from "../../lib/db";
import Donor from "../../models/Donor";
import HelpRequest from "../../models/HelpRequest";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    const { phone, bloodGroup, city, state, message, contactMode } = req.body;

    const user = await Donor.findOne({ phone });
    if (!user) return res.status(403).json({ error: "User not registered" });

    const help = await HelpRequest.create({
      requester_user_id: user._id,
      bloodGroup,
      city,
      state,
      message,
      contactMode,
    });

    return res.json({ success: true, help });
  }

  if (req.method === "GET") {
    const { bloodGroup, city, state } = req.query;

    const donors = await Donor.find({
      bloodGroup,
      city: { $regex: city, $options: "i" },
      state: { $regex: state, $options: "i" },
      availability: "YES",
      verified: true,
    });

    return res.json(donors);
  }

  res.status(405).send("Method Not Allowed");
}

