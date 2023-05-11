// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import UserDBV2 from "@/db/modelsV2/userModelV2";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method == "PATCH") {
    const token = req.body.token;
    const _id = req.body._id;
    try {
      const user = await UserDBV2.findById(_id);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      user.token = token;
      await user.save();
      return res.status(200).json({ msg: "Token updated", user });
    } catch (error) {
      return res.status(500).json({ msg: "Server Error" });
    }
  }
  if (req.method == "DELETE") {
    const _id = req.body._id;
    try {
      // const user = await UserDBV2.findById(_id);
      const [user, session] = await Promise.all([
        UserDBV2.findById(_id).select({
          token: 1,
          _id: 1,
        }),
        getServerSession(req, res, authOptions(req)),
      ]);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      user.token = "";
      console.log(session);
      if (!session.user || session.user.id != user._id) {
        return res.status(401).json({ msg: "Not authorize", users: {} });
      }
      await user.save();
      return res.status(200).json({ msg: "Token updated", user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Server Error" });
    }
  }
  return res.status(404).json({ msg: "Method not defined" });
}
