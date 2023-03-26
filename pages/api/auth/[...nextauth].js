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

                const { email, password } = credentials;


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
                console.log(user._id);
                console.log(user.username)
                if (!user) {
                    throw new Error("User doesn't exist.")
                }
                const isPasswordCorrect = await compare(password, user.password)

                if (!isPasswordCorrect) {
                    throw new Error("Password doesn't match.")
                }
                return { id: "1", name: "J Smith", email: "jsmith@example.com" }
                return { id: "id", name: "hola" };
            }

        })
    ]
}


export default NextAuth(authOptions)