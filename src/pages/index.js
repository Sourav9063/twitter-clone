import React, { useContext, useEffect } from "react";
import style from "../styles/Home.module.css";

import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import Post from "@/components/common/post/post";

import HomeMain from "@/components/home/homeMain/HomeMain";
import HomeLeft from "@/components/home/homeLeft/HomeLeft";
import HomeRight from "@/components/home/homeRight/HomeRight";
import { HomeBottom } from "@/components/home/homeBottom/HomeBottom";

import ModalComponent from "@/components/modal/ModalComponent";
import ModalSignInDiv from "@/components/modalComponents/signInDiv/ModalSignInDiv";
import ModalSignUpDiv from "@/components/modalComponents/signInDiv/ModalSignUpDiv";
import CommentBox from "@/components/modalComponents/CommentBox";
import ModalTweet from "@/components/modalComponents/ModalTweet";

import connectMongo from "@/db/dbConnect";
import UserDBV2 from "@/db/modelsV2/userModelV2";
import TweetDBV2 from "@/db/modelsV2/tweetModelV2";

import { RandomContext } from "@/providers/RandomProvider";
import { FeedTweetsContext } from "@/providers/FeedTweetsProvider";

import { TWEET_LIMIT } from "@/helper/constStrings";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

export async function getServerSideProps(context) {
  let postsArray = [];
  let error = null;
  try {
    await connectMongo();
    const [user, posts, session] = await Promise.all([
      UserDBV2.find().limit(1),
      TweetDBV2.find({ type: { $in: ["tweet", "retweet"] } })
        .populate({
          path: "owner",
          select: "username email image",
        })
        .populate({
          path: "head",
          populate: {
            path: "owner",
            select: "username email image",
          },
        })
        .populate({
          path: "commentsList",
          populate: {
            path: "owner",
            select: "username image email _id",
          },
          options: { sort: { createdAt: -1 }, limit: 20 },
        })
        .sort({ createdAt: -1 })
        .limit(TWEET_LIMIT),
      getServerSession(context.req, context.res, authOptions(context.req)),
    ]);

    if (session && session.user) {
      console.log(session);
      const user = await UserDBV2.findById(session.user.id).select("following");
      const following = JSON.parse(JSON.stringify(user.following));
      const tmpPosts = JSON.parse(JSON.stringify(posts));
      const tweetf = [];
      const tweetuf = [];
      for (const post of tmpPosts) {
        if (following.includes(post.owner?._id)) {
          tweetf.push(post);
        } else {
          tweetuf.push(post);
        }
      }
      console.log(tweetf);
      console.log(tweetuf);
      postsArray = [...tweetf, ...tweetuf];
    } else {
      postsArray = posts;
    }
  } catch (e) {
    error = e.message;
  }

  return {
    props: {
      data: JSON.parse(JSON.stringify(postsArray)),
      error: error,
    },
  };
}

export default function Home({ data, error }) {
  const router = useRouter();
  const session = useSession();
  const [random] = useContext(RandomContext);
  const [, setFeedTweets] = useContext(FeedTweetsContext);
  useEffect(() => {
    setFeedTweets([...data]);
    return () => {};
  }, [setFeedTweets, data]);

  return (
    <>
      <Head>
        <title>Twitter</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/fav2.ico" />
      </Head>
      {router.query.modal == "signin" && (
        <ModalComponent>
          <ModalSignInDiv></ModalSignInDiv>
        </ModalComponent>
      )}
      {router.query.modal == "signup" && (
        <ModalComponent>
          <ModalSignUpDiv></ModalSignUpDiv>
        </ModalComponent>
      )}
      {router.query.modal == "verify" && (
        <ModalComponent>
          <ModalSignUpDiv></ModalSignUpDiv>
        </ModalComponent>
      )}

      {router.query.modal == "post" && (
        <ModalComponent>
          <Post width="600px"></Post>
        </ModalComponent>
      )}

      {router.query.modal == "comment" && (
        <ModalComponent>
          <CommentBox></CommentBox>
        </ModalComponent>
      )}
      {router.query.modal == "tweet" && (
        <ModalComponent>
          <ModalTweet></ModalTweet>
        </ModalComponent>
      )}

      {router.query.modal == "edit-tweet" && (
        <ModalComponent returnTo={"/"}>
          <Post
            returnTo={"/"}
            width="600px"
            tweetData={random.editTweet}
          ></Post>
        </ModalComponent>
      )}
      <main className={style.body}>
        <HomeLeft></HomeLeft>
        {error == null ? (
          <HomeMain posts={data}></HomeMain>
        ) : (
          <div>{error}</div>
        )}
        <HomeRight></HomeRight>
        {session.status == "unauthenticated" && <HomeBottom></HomeBottom>}
      </main>
    </>
  );
}

//
//
//
//
//
//
//
//dead code

{
  /* <ModalComponent>
        {modal.showPostEditor && <Post />}
        {modal.showSignIn && <ModalSignInDiv />}
        {modal.showSignUp && <ModalSignUpDiv></ModalSignUpDiv>}
      </ModalComponent> */
}
{
  /* <SelectedTweetProvider> */
}

{
  /* <LikedPostsProvider> */
}
{
  /* </LikedPostsProvider> */
}
{
  /* </SelectedTweetProvider> */
}

// useEffect(() => {
//   setFeedTweets([...data]);
//   return () => {};
// }, [setFeedTweets, data]);
// useEffect(() => {

//   return () => {};
// }, [session.data]);
