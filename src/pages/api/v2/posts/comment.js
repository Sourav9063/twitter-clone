import connectMongo from "@/db/dbConnect";
import TweetDBV2 from "@/db/modelsV2/tweetModelV2";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const { owner, head, tweetText, typeOf } = req.body;
    const type = typeOf ? typeOf : "comment";
    await connectMongo();

    try {
      const [headDB, tweet] = await Promise.all([
        TweetDBV2.findById(head).select({
          commentByHashMap: 1,
          commentsList: 1,
          comments: 1,
          tweetText: 1,
          nodes: 1,
        }),
        TweetDBV2.create({
          owner,
          head,
          // mainParent: headDB.mainParent ? headDB.mainParent : headDB._id,
          tweetText,
          type,
        }),
      ]);
      if (!headDB) {
        return res.status(400).json({ msg: "Head tweet not found" });
      }

      await tweet.populate({
        path: "owner",
        select: "username email image _id",
      });

      headDB.commentByHashMap.set(owner, true);
      headDB.commentsList.push(tweet._id);

      headDB.nodes.push(tweet._id);
      headDB.comments = headDB.commentsList.length;

      await headDB.save();
      return res.status(201).json({ tweet, comments: headDB.comments });
    } catch (error) {
      res.status(500).json({ msg: "Server Error", error });
    }
  }
}
// const headDB = await TweetDBV2.findById(head);
// const tweet = await TweetDBV2.create({
//   owner,
//   head,
//   mainParent: headDB.mainParent ? headDB.mainParent : headDB._id,
//   tweetText,
//   type,
// });
