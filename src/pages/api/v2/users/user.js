import connectMongo from "@/db/dbConnect";
import UserDBV2 from "@/db/modelsV2/userModelV2";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { id = "000000000000000000000000", email = "" } = req.body;

    try {
      await connectMongo();

      const user = await UserDBV2.findOne({
        $or: [{ _id: id }, { email: email }],
      });

      if (!user) {
        return res.status(400).json({ msg: "User not found" });
      }

      return res.status(200).json({ msg: "User found", user });
    } catch (e) {
      return res.status(500).json({ msg: "Server Error" });
    }
  }
}
