import connectMongo from "@/db/dbConnect";
import UserDB from "@/db/models/userModel";
import { compare } from "bcryptjs";

import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { signIn } from "next-auth/react";

export const authOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;

        try {
          await connectMongo();
        } catch (e) {
          throw new Error("Something went wrong.");
        }
        const user = await UserDB.findOne({
          email: email,
        }).select("+password");
        //
        //

        if (!user) {
          throw new Error("User doesn't exist.");
        }
        if (user.password == null) {
          throw new Error("You have signed up in using Github.");
        }
        const isPasswordCorrect = await compare(password, user.password);

        if (!isPasswordCorrect) {
          throw new Error("Password doesn't match.");
        }

        // user.name = user.username;
        return user;
        return { id: "1", name: "J Smith", email: "jsmith@example.com" };
        return { id: "id", name: "hola" };
      },
    }),
  ],
  pages: {
    signIn: "/?modal=signin",
    // signUp: "/?modal=signup"
  },
  callbacks: {
    async session(params) {
      const user = await UserDB.findOne({ email: params.token.email });

      params.session.user.id = user.id;
      params.session.user.username = params.token.username;
      return params.session;
    },
    async jwt(params) {
      if (params.user?.id) {
        params.token.id = params.user.id;
        params.token.username = params.user.username || params.user.name;
      }
      return params.token;
    },
    async signIn({ user, account, profile }) {
      // UserDB.create()

      await connectMongo();
      const tmpUser = await UserDB.findOne({
        $or: [{ email: user.email }],
      });

      if (tmpUser) {
        return true;
      }

      const user2 = await UserDB.create({
        username: user.name,
        email: user.email,
        image: user.image,
        // password: (Math.random() + 1).toString(36).substring(10)
      });

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
