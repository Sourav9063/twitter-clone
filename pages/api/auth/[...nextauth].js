import connectMongo from "@/db/dbConnect";
import UserDB from "@/db/models/userModel";
import { compare } from "bcryptjs";

import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";



export const authOptions = {
    session: {
        strategy: "jwt",
    },

    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {

            },
            async authorize(credentials, req) {
                console.log(credentials);
                console.log(req)
                const { email, password } = credentials;
                console.log(email, password)

                try {

                    await connectMongo();
                }
                catch (e) {
                    console.log(e)
                    throw new Error("Something went wrong.");
                }
                const user = await UserDB.findOne({
                    email: email
                }).select("+password")

                if (!user) {
                    throw new Error("User doesn't exist.")
                }
                const isPasswordCorrect = await compare(password, user.password)

                if (!isPasswordCorrect) {
                    throw new Error("Password doesn't match.")
                }
                return user
            }

        })
    ]
}


export default NextAuth(authOptions)