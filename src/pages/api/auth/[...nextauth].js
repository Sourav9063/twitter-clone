import connectMongo from "@/db/dbConnect";
import UserDBV2 from "@/db/modelsV2/userModelV2";
import { compare } from "bcryptjs";
import { getToken } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { signIn } from "next-auth/react";
export const authOptions = (reqm) => {
  return {
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
            if (!email && !password) {
              const token = await getToken({ req: reqm });

              const user = await UserDBV2.findById(token.id);

              return user;
            }
            const user = await UserDBV2.findOne({
              email: email,
            }).select("+password");
            //
            //

            if (!user) {
              throw new Error("User doesn't exist.");
            }
            if (!user.isEmailVerified) {
              throw new Error(
                "Your email is not verified. Please sign up properly."
              );
            }
            if (user.password == null) {
              throw new Error("You have signed up in using Github.");
            }
            const isPasswordCorrect = await compare(password, user.password);

            if (!isPasswordCorrect) {
              throw new Error("Password doesn't match.");
            }
            return user;
          } catch (e) {
            throw new Error(e.message);
          }

          return null;
          // user.name = user.username;
          // return { id: "1", name: "J Smith", email: "jsmith@example.com" };
          // return { id: "id", name: "hola" };
        },
      }),
    ],
    pages: {
      signIn: "/?modal=signin",
      // signUp: "/?modal=signup"
    },
    callbacks: {
      async session(params) {
        const user = await UserDBV2.findOne({ email: params.token.email });

        params.session.user.id = user.id;
        params.session.user.image = user.image;
        params.session.user.username = params.token.username;
        return params.session;
      },
      async jwt(params) {
        if (params.user?.id) {
          params.token.id = params.user.id;
          params.token.image = params.user.image;
          params.token.username = params.user.username || params.user.name;
        }
        return params.token;
      },
      async signIn({ user, account, profile }) {
        // UserDB.create()
        await connectMongo();
        const tmpUser = await UserDBV2.findOne({
          $or: [{ email: user.email }],
        });

        if (tmpUser) {
          return true;
        }

        const user2 = await UserDBV2.create({
          username: user.name,
          email: user.email,
          image: user.image,
        });

        return true;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  };
};

// export default NextAuth(authOptions);

export default (req, res) => NextAuth(req, res, authOptions(req));
