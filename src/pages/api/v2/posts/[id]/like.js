import connectMongo from "@/db/dbConnect";
import TweetDBV2 from "@/db/modelsV2/tweetModelV2";
import UserDBV2 from "@/db/modelsV2/userModelV2";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userid } = req.body;
    const { id: likedPost } = req.query;

    try {
      await connectMongo();

      const [user, session, tweet] = await Promise.all([
        await UserDBV2.findById(userid).select({
          likedPost: 1,
          _id: 1,
        }),
        getServerSession(req, res, authOptions(req)),
        TweetDBV2.findById(likedPost)
          .select({
            owner: 1,
            likes: 1,
            likedBy: 1,
            tweetText: 1,
            createdAt: 1,
            type: 1,
          })
          .populate({ path: "owner", select: "username" }),
      ]);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      if (!session.user || session.user.id != user._id) {
        return res.status(401).json({ msg: "Not authorize", users: {} });
      }

      if (user.likedPost.includes(likedPost)) {
        tweet.likedBy.pull(userid);
        tweet.likes = tweet.likedBy.length;
        user.likedPost.pull(likedPost);

        await Promise.all([user.save(), tweet.save()]);

        res
          .status(200)
          .json({ tweet: tweet, likes: tweet.likes, status: "Unliked" });
        return;
      } else {
        tweet.likedBy.push(userid);
        tweet.likes = tweet.likedBy.length;
        user.likedPost.push(likedPost);

        await Promise.all([user.save(), tweet.save()]);

        res
          .status(200)
          .json({ tweet: tweet, likes: tweet.likes, status: "Liked" });
        return;
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ msg: "Server error" });
    }
  }
}

// const tweet = await TweetDBV2.findById(likedPost)
//   .select({
//     owner: 1,
//     likes: 1,
//     likedBy: 1,
//     tweetText: 1,
//     createdAt: 1,
//   })
//   .populate({ path: "owner", select: "username" });
// const user = await UserDBV2.findById(userid).select({
//   likedPost: 1,
// });
