import connectMongo from "@/db/dbConnect";
import UserDB from "@/db/models/userModel";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
export default async function handler(req, res) {
  console.log(req.method);
  // if (req.method === "GET") {
  //   const { id = "", email = "" } = req.body;

  //   try {
  //     await connectMongo();
  //     const user = await UserDB.findOne({
  //       $or: [{ id: id }, { email: email }],
  //     });

  //     if (!user) {
  //       return res.status(400).json({ msg: "User not found" });
  //     }

  //     return res.status(200).json({ user });
  //   } catch (e) {
  //     return res.status(500).json({ msg: "Server Error" });
  //   }
  // }

  if (req.method == "PATCH") {
    const session = await getServerSession(req, res, authOptions);
    console.log(session);
    req.body._id = session.user.id;
    const { _id, bio, username, image, coverImage } = req.body;

    try {
      const user = await UserDB.findById(_id);

      if (!user) {
        return res.status(400).json({ msg: "User not found" });
      }

      user.bio = bio ? bio : user.bio;
      user.username = username ? username : user.username;
      user.image = image ? image : user.image;
      user.coverImage = coverImage ? coverImage : user.coverImage;

      console.log(user);
      await user.save();

      return res.status(200).json({ user });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ msg: "Server error", e });
    }
  }

  return res.status(404).json({ msg: "Method not found" });
}
