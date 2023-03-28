import connectMongo from "@/db/dbConnect";
import UserDB from "@/db/models/userModel";

export default async function handler(req, res) {
    console.log(req);
    if (req.method === "GET") {
        const { id = "000000000000000000000000", email = "" } = req.body;
        console.log(id, email)
        try {
            await connectMongo();
            const user = await UserDB.findOne({
                $or: [
                    { _id: id },
                    { email: email }
                ]
            })

            if (!user) {
                return res.status(400).json({ msg: "User not found" })
            }

            return res.status(200).json({ msg: "User found", user })

        }
        catch (e) {
            console.log(e)
            return res.status(500).json({ msg: "Server Error" })
        }
    }

}
