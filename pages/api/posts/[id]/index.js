import connectMongo from "@/db/dbConnect";
import PostDB from "@/db/models/postModel";


export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { id } = req.query;



        try {
            await connectMongo();
            // Get the post from the database
            const post = await PostDB.findById(id).populate("owner");

            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            return res.status(200).json({ post });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });

        }
    }

    // Update a post
    // async function updatePost(req, res) {
    //     const { id } = req.params;
    //     const { postText } = req.body;

    //     try {
    //         // Get the post from the database
    //         const post = await PostDB.findById(id);

    //         if (!post) {
    //             return res.status(404).json({ message: 'Post not found' });
    //         }

    //         // Update the post
    //         post.postText = postText;
    //         await post.save();

    //         return res.status(200).json({ post });

    //     } catch (error) {
    //         console.error(error);
    //         return res.status(500).json({ message: 'Internal server error' });

    //     }
    // }

    // Delete a post
    if (req.method === "DELETE") {
        const { id } = req.params;

        try {
            // Get the post from the database
            const post = await PostDB.find

            // Delete the post
            await post.remove();

            return res.status(200).json({ message: 'Post deleted' });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });

        }
    }




    return res.status(405).json({ message: 'Method not allowed' });
}
