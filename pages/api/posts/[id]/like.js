import connectMongo from "@/db/dbConnect";
import LikedDB from "@/db/models/likesModel";


export default async function handler(req, res) {

    console.log(req.query);
    if (req.method === "POST") {
        const { userid, likedPost } = req.body;
        console.log(userid)
        await connectMongo()
        const likedb = await LikedDB.create(

        )


    }

}
