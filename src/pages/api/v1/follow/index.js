import connectMongo from "@/db/dbConnect";
import FollowDB from "@/db/models/followModel";
import UserDB from "@/db/models/userModel";

export default async function handler(req, res) {
  req.statusCode = 200;

  if (req.method == "POST") {
    try {
      await connectMongo;
      const { owner, what, who } = req.body;

      // let ownerDB = await UserDB.findById(owner).populate(
      //   "following",
      //   "email username image _id"
      // );

      // let whoDB = await UserDB.findById(who);

      const [ownerDB, whoDB] = await Promise.all([
        UserDB.findById(owner).populate(
          "following",
          "email username image _id"
        ),
        UserDB.findById(who),
      ]);

      // if (!ownerDB) {
      //     ownerDB = await FollowDB.create({ owner: owner })

      // }
      // if (!whoDB) {
      //     whoDB = await FollowDB.create({ owner: who })

      // }

      if (what == "UNFOLLOW") {
        ownerDB.following.pull(who);
        whoDB.follower.pull(owner);
        await whoDB.save();
        await ownerDB.save();
        return res
          .status(200)
          .json({ msg: "Unfollowed", data: ownerDB.following });
      } else {
        ownerDB.following.push(who);
        whoDB.follower.push(owner);
        await whoDB.save();
        await ownerDB.save();
        return res.status(200).json({ msg: "Following" });
      }
    } catch (e) {
      return res.status(500).json({ msg: "Server error" });
    }
  }
}
