import connectMongo from "@/db/dbConnect";

import UserDB from "@/db/models/userModel";
import { hashPassword } from "@/helper/encrypt/hashPassword";

export default async function handler(req, res) {

    if (req.method == "POST") {
        const { username, email, password } = req.body
        await connectMongo()

        console.log(password.trim().length < 6)
        if (!email || !email.includes("@") || !password || password.trim().length < 6) {

            res.status(422).json({ msg: "Wrong credential" })
            return;
        }

        const hashPass = await hashPassword(password)
        const existingUser = await UserDB.findOne({ email: email });



        if (existingUser) {
            res.status(422).json({ msg: "User already exist. Please log in." })
            client.close()
            return
        }


        const result = await UserDB.create({
            username: username,
            email: email,
            password: hashPass
        })


        res.status(201).json({ msg: "Sign Up Successful", result })
    }
}