import connectMongo from "@/db/dbConnect";
import CommentDB from "@/db/models/commentModel";
import PostDB from "@/db/models/postModel";

export default async function handler(req, res) {
  // res.status(200).json({ name: 'John Doe' })

  if (req.method === "POST") {
    try {
      await connectMongo();
      const { owner, body, ownerusername, ownerimage, head } = req.body;

      let headcomment = await CommentDB.findOne({ head: head });
      if (!headcomment) {
        headcomment = await CommentDB.create({
          head: head,
          body: "Main Post Head",
        });
      }
      const node = await CommentDB.create({
        body: body,
        owner: owner,
        head: headcomment._id,
        ownerusername: ownerusername,
        ownerimage: ownerimage,
      });
      headcomment.nodes.push(node._id);
      headcomment = await headcomment.save();

      // const post = await PostDB.findById(headcomment.head);
      //
      // if (!post) {
      //     post.commentNumber = 100;
      //     post.save();
      // }

      return res.status(200).json({ msg: "Success", headcomment });
    } catch (error) {
      return res.status(500).json({ msg: "Server error", error });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
