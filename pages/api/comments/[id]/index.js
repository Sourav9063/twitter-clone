import connectMongo from "@/db/dbConnect"
import CommentDB from "@/db/models/commentModel"

export default async function handler(req, res) {

    // res.status(200).json({ name: 'John Doe' })

    if (req.method == 'GET') {
        try {
            await connectMongo();
            const comments = await CommentDB.findOne({ head: req.query.id }).populate("nodes").sort({ createdDate: -1 })

            return res.status(200).json({ msg: "Success", comments })

        } catch (error) {
            return res.status(500).json({ msg: "Server error" })

        }
    }
}