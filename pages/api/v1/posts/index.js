import connectMongo from "@/db/dbConnect";
import PostDB from "@/db/models/postModel";
import { parseForm } from "@/helper/backend/parseForm";

export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handler(req, res) {
  if (req.method === "POST") {
    await connectMongo();

    // const { owner, postImage, postText } = req.body;

    //
    // if (!owner || !postText) {
    //   return res.status(400).json({ msg: "Missing required fields" });
    // }

    try {
      const { fields, files } = await parseForm(req);

      const postImage = files.postImage
        ? "/images/tweets/" + files.postImage?.newFilename
        : null;

      const { owner, postText } = fields;
      const post = await PostDB.create({ owner, postImage, postText });

      return res.status(201).json({ post });
    } catch (error) {
      return res.status(500).json({ msg: "Internal server error" });
    }
  }

  //get methode

  // Get all posts
  else if (req.method === "GET") {
    try {
      await connectMongo();

      // Get all posts from the database
      const posts = await PostDB.find()
        .populate("owner")
        .sort({ createdDate: -1 });

      return res.status(200).json({ posts });
    } catch (error) {
      return res.status(500).json({ msg: "Internal server error", ...error });
    }
  } else if (req.method === "DELETE") {
    await connectMongo();

    const postId = req.params.id;

    try {
      // Check if the post exists in the database
      const post = await PostDB.findById(postId);

      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }

      // Delete the post from the database
      await post.remove();

      return res.status(200).json({ msg: "Post deleted successfully" });
    } catch (error) {
      return res.status(500).json({ msg: "Internal server error" });
    }
  }

  return res.status(405).json({ msg: "Method not allowed" });
}
