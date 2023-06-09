import connectMongo from "@/db/dbConnect";

import UserDB from "@/db/models/userModel";
import UserDBV2 from "@/db/modelsV2/userModelV2";

export default async function handler(req, res) {
  req.statusCode = 200;

  if (req.method == "POST") {
    try {
      await connectMongo();
      const { owner, what, who } = req.body;

      // let ownerDB = await UserDB.findById(owner).populate(
      //   "following",
      //   "email username image _id"
      // );

      // let whoDB = await UserDB.findById(who);

      const [ownerDB, whoDB] = await Promise.all([
        UserDBV2.findById(owner)
          .populate("following", "email username image _id")
          .select({
            _id: 1,
            follower: 1,
            following: 1,
            email: 1,
            username: 1,
            image: 1,
          }),
        UserDBV2.findById(who).select({
          _id: 1,
          follower: 1,
          following: 1,
          email: 1,
          username: 1,
          image: 1,
        }),
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
        return res.status(200).json({ msg: "Unfollowed", data: ownerDB });
      } else {
        ownerDB.following.push(who);
        whoDB.follower.push(owner);
        await whoDB.save();
        await ownerDB.save();
        return res.status(200).json({ msg: "Following", data: ownerDB });
      }
    } catch (e) {
      return res.status(500).json({ msg: "Server error" });
    }
  }
}
