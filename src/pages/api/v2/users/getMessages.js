import connectMongo from "@/db/dbConnect";
import UserDBV2 from "@/db/modelsV2/userModelV2";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method == "GET") {
    const { id } = req.query;

    try {
      await connectMongo();
      // const users = await UserDBV2.findById(id).select({
      //   messages: 1,
      // });

      // const session = getServerSession(req, res, authOptions(req));
      const [users, session] = await Promise.all([
        UserDBV2.findById(id).select({
          messages: 1,
        }),
        getServerSession(req, res, authOptions(req)),
      ]);
      if (!users) {
        return res.status(404).json({ msg: "User not found", users });
      }
      if (!session || session.user.id != users._id) {
        return res.status(401).json({ msg: "Not authorize", users: {} });
      }
      return res.status(200).json({ msg: "Success", users });
    } catch (error) {
      return res.status(500).json({ msg: "Server error" });
    }
  }

  return res.status(404).json({ msg: "Method not found" });
}
