import connectMongo from "@/db/dbConnect";
import TweetDBV2 from "@/db/modelsV2/tweetModelV2";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method == "GET") {
    const { head } = req.query;

    try {
      await connectMongo();
      const comment = await TweetDBV2.findById(head)
        .populate({ path: "owner", select: "_id username email image" })
        .populate({
          path: "commentsList",
          // select: "tweetText",
          populate: {
            path: "owner",
            select: "username image email _id",
          },
          sort: { createdAt: -1 },
          limit: 20,
          options: { sort: { createdAt: -1 }, limit: 20 },
        });
      if (!comment) return res.status(404).json();
      return res.status(201).json({ msg: "Success", comment });
    } catch (error) {
      res.status(500).json({ msg: "Server Error", error });
    }
  }
  if (req.method == "DELETE") {
    const { head } = req.query;

    try {
      // const session = await getServerSession(req, res, authOptions);

      // const comment = await CommentDB.findById(id);

      const [session, comment] = await Promise.all([
        getServerSession(req, res, authOptions(req)),
        TweetDBV2.findById(head),
      ]);
      const parent = await TweetDBV2.findById(comment.head);

      if (session.user.id != comment.owner) {
        return res.status(401).json({ msg: "Not authorized" });
      }

      if (!comment) {
        return res.status(404).json({ msg: "Comment not found" });
      }
      if (parent) {
        parent.commentsList.pull(comment._id);
        parent.comments = parent.commentsList.length;
      }

      // await parent.save();
      // await TweetDBV2.findByIdAndDelete(comment._id);
      await Promise.all([
        parent.save(),
        TweetDBV2.deleteMany({ head: comment._id }),
        TweetDBV2.findByIdAndDelete(comment._id),
      ]);
      return res.status(200).json({ msg: "Comment deleted" });
    } catch (error) {
      return res.status(500).json({ msg: "Internal server error", error });
    }
  }
}
