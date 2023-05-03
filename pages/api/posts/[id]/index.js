import connectMongo from "@/db/dbConnect";
import PostDB from "@/db/models/postModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;
    try {
      await connectMongo();
      const post = await PostDB.findById(id).populate("owner");
      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }
      return res.status(200).json({ post });
    } catch (error) {
      return res.status(500).json({ msg: "Internal server error" });
    }
  }

  if (req.method == "PATCH") {
    const { id } = req.query;

    const session = await getServerSession(req, res, authOptions);
    try {
      const { postText, postImage } = req.body;

      const post = await PostDB.findById(id);

      if (session.user.id != post.owner) {
        return res.status(401).json({ msg: "Not authorized" });
      }

      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }

      post.postText = postText ? postText : post.postText;
      post.postImage =
        postImage == "" || postImage ? postImage : post.postImage;

      await post.save();

      return res.status(200).json({ msg: "Updated", post });
    } catch (error) {
      return res.status(500).json({ msg: "Internal server error" });
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
        getServerSession(req, res, authOptions),
        PostDB.findById(id),
      ]);
      if (session.user.id != post.owner) {
        return res.status(401).json({ msg: "Not authorized" });
      }

      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }
      // Delete the post
      await PostDB.findByIdAndDelete(id);
      // await post.remove().exec();
      return res.status(200).json({ msg: "Post deleted" });
    } catch (error) {
      return res.status(500).json({ msg: "Internal server error" });
    }
  }

  return res.status(405).json({ msg: "Method not allowed" });
}
