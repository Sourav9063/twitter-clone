import connectMongo from "@/db/dbConnect";
import PostDB from "@/db/models/postModel";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await connectMongo();

    const { owner, postImage, postText } = req.body;

    // Validate the request body
    if (!owner || !postText) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    try {
      // Create a new post in the database
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
  }

  return res.status(405).json({ msg: "Method not allowed" });
}
