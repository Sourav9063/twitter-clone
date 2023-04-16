import connectMongo from "@/db/dbConnect";

import UserDBV2 from "@/db/modelsV2/userModelV2";

export default async function handler(req, res) {
  if (req.method == "GET") {
    const { userid, number = 20 } = req.query;

    try {
      await connectMongo();
      const likedb = await UserDBV2.findById(userid)
        .populate({
          path: "likedPost",
          populate: { path: "owner", select: "username" },
          select: "tweetText createdAt",
        })
        .limit(number);
      res.status(200).json({ likedb });
    } catch (e) {
      res.status(500).json({ msg: "Server error" });
    }
  }
}
("likedPost");
