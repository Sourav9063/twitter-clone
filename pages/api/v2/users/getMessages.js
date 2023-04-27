import connectMongo from "@/db/dbConnect";
import UserDBV2 from "@/db/modelsV2/userModelV2";

export default async function handler(req, res) {
  if (req.method == "GET") {
    const { id } = req.query;
    console.log(id);
    try {
      await connectMongo();
      const users = await UserDBV2.findById(id).select({
        messages: 1,
      });
      return res.status(200).json({ msg: "Success", users });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Server error" });
    }
  }

  return res.status(404).json({ msg: "Method not found" });
}
