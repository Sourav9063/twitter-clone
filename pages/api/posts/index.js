import connectMongo from "@/db/dbConnect";
import PostDB from "@/db/models/postModel";


export default async function handler(req, res) {

    if (req.method == "POST") {
        try {

            console.log('CONNECTING TO MONGO');
            await connectMongo();
            console.log('CONNECTED TO MONGO');

            console.log('CREATING DOCUMENT');
            const post = await PostDB.create(req.body);
            console.log('CREATED DOCUMENT');

            res.status(201).json({ post });
        }
        catch (e) {
            console.log(e)
            res.status(500).json({
                msg: "Server not working",
                error: "Server Issue",
                errorMsg: e
            })
        }
    }
}