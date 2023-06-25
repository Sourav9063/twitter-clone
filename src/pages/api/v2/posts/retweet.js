import connectMongo from "@/db/dbConnect";
import TweetDBV2 from "@/db/modelsV2/tweetModelV2";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const { owner, head, tweetText, typeOf } = req.body;
    const type = typeOf ? typeOf : "retweet";
    await connectMongo();

    try {
      const [headDB, tweet] = await Promise.all([
        TweetDBV2.findById(head).select({
          retweetedByHashMap: 1,
          retweetedBy: 1,
          retweets: 1,
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

      headDB.retweets++;
      headDB.retweetedByHashMap.set(owner, true);
      headDB.retweetedBy.push(owner);
      headDB.nodes.push(tweet._id);

      const [tweetData, headData] = await Promise.all([
        TweetDBV2.findById(tweet._id)
          .populate({
            path: "owner",
            select: "username email image",
          })
          .populate({
            path: "head",
            populate: {
              path: "owner",
              select: "username email image",

              // select: {},
            },
          })
          .populate({
            path: "commentsList",
            // select: "tweetText",
            populate: {
              path: "owner",
              select: "username image email _id",
            },
            options: { sort: { createdAt: -1 }, limit: 20 },
          }),
        headDB.save(),
      ]);
      return res
        .status(201)
        .json({ tweet: tweetData, retweets: headData.retweets });
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
