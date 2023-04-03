import connectMongo from "@/db/dbConnect";
import LikedDB from "@/db/models/likesModel";
import PostDB from "@/db/models/postModel";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userid } = req.body;
    const { id: likedPost } = req.query;

    try {
      await connectMongo();
      let likedb = await LikedDB.findOne({ userid: userid });
      const post = await PostDB.findById(likedPost);

      if (!likedb) {
        likedb = await LikedDB.create({
          userid: userid,
        });
      }

      if (likedb.likedPost.includes(likedPost)) {
        //update PostDB likes to likes -1

        post.likes = post.likes - 1;
        await post.save();

        // likedb.likedPost = likedb.likedPost.filter((post) => post != likedPost);
        likedb.likedPost.pull(likedPost);
        await likedb.save();
        
        res.status(200).json({ likedb, likes: post.likes });
        return;
      } else {
        //update PostDB likes to likes +1
        post.likes = post.likes + 1;
        await post.save();

        likedb.likedPost.push(likedPost);
        await likedb.save();
        

        res.status(200).json({ likedb, likes: post.likes });
        return;
      }
    } catch (e) {
      res.status(500).json({ msg: "Server error" });
    }
  }
}
