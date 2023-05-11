import connectMongo from "@/db/dbConnect";
import { getServerSession } from "next-auth";
import { parseForm } from "@/helper/backend/parseForm";
import TweetDBV2 from "@/db/modelsV2/tweetModelV2";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;
    try {
      await connectMongo();
      const post = await TweetDBV2.findById(id).populate("owner");
      if (!post) {
        return res.status(404).json({ msg: "Tweet not found" });
      }
      return res.status(200).json({ post });
    } catch (error) {
      return res.status(500).json({ msg: "Internal server error" });
    }
  }

  if (req.method == "PATCH") {
    const { id } = req.query;

    try {
      const session = await getServerSession(req, res, authOptions(req));
      const { fields, files } = await parseForm(req);

      const tweetImage = files.tweetImage
        ? "/images/tweets/" + files.tweetImage?.newFilename
        : null;

      const { tweetText } = fields;

      const post = await TweetDBV2.findById(id);
      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }
      if (!session || session.user.id != post.owner) {
        return res.status(401).json({ msg: "Not authorized" });
      }

      // post.tweetText = tweetText ?? post.tweetText;
      post.tweetText =
        tweetText != "undefined" && tweetText ? tweetText : post.tweetText;
      post.tweetImage =
        // tweetImage;
        tweetImage == "" || tweetImage ? tweetImage : post.tweetImage;

      await Promise.all([
        post.save(),
        post.populate({
          path: "owner",
          select: "username email image",
        }),
      ]);

      return res.status(200).json({ msg: "Updated", post });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ msg: "Internal server error", error });
    }
  }

  // Delete a post
  if (req.method == "DELETE") {
    const { id } = req.query;

    // const session = await getServerSession(req, res, authOptions);

    try {
      // Get the post from the database
      // const post = await PostDB.findById(id);
      const [session, post] = await Promise.all([
        getServerSession(req, res, authOptions(req)),
        TweetDBV2.findById(id),
      ]);
      if (!session || session.user.id != post.owner) {
        return res.status(401).json({ msg: "Not authorized" });
      }

      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }
      // Delete the post
      await Promise.all([
        TweetDBV2.deleteMany({ head: post._id, type: "comment" }),
        TweetDBV2.findByIdAndDelete(id),
      ]);
      // await TweetDBV2.findByIdAndDelete(id);
      // await post.remove().exec();
      return res.status(200).json({ msg: "Post deleted" });
    } catch (error) {
      return res.status(500).json({ msg: "Internal server error" });
    }
  }

  return res.status(405).json({ msg: "Method not allowed" });
}
