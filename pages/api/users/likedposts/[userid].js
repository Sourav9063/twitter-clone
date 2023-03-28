import connectMongo from "@/db/dbConnect";
import LikedDB from "@/db/models/likesModel";

export default async function handler(req, res) {
    if (req.method == "GET") {
        const { userid } = req.query;

        try {
            await connectMongo();
            const likedb = await LikedDB.findOne({ userid: userid }).populate("likedPost").limit(10);
            res.status(200).json({ likedb })
        }
        catch (e) {

            res.status(500).json({ msg: "Server error" })
        }
    }

}