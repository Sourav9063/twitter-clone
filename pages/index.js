import React, { useContext } from "react";
import style from "../styles/Home.module.css";
import Image from "next/image";
import TwitterLogo from "@/components/common/svg/TwitterLogo";
import Head from "next/head";
import Tweet from "@/components/tweet/tweet";
import HomeMain from "@/components/home/homeMain/HomeMain";
import ModalComponent from "@/components/modal/ModalComponent";
import HomeLeft from "@/components/home/homeLeft/HomeLeft";

import Post from "@/components/common/post/post";
// import { ModalContext } from '@/providers/ModalProvider'
import HomeRight from "@/components/home/homeRight/HomeRight";
import ModalSignInDiv from "@/components/modalComponents/signInDiv/ModalSignInDiv";
import ModalSignUpDiv from "@/components/modalComponents/signInDiv/ModalSignUpDiv";
import { useRouter } from "next/router";
import { HomeBottom } from "@/components/home/homeBottom/HomeBottom";
import { useSession } from "next-auth/react";
import PostDB from "@/db/models/postModel";
import connectMongo from "@/db/dbConnect";

import CommentBox from "@/components/modalComponents/CommentBox";
import ModalTweet from "@/components/modalComponents/ModalTweet";
import UserDB from "@/db/models/userModel";

export async function getServerSideProps(context) {
  let postsArray = [];
  let error = null;
  try {
    await connectMongo();
    // const user = await UserDB.find().limit(2);
    // posts = await PostDB.find().populate("owner").sort({ createdDate: -1 });

    const [user, posts] = await Promise.all([
      UserDB.find().limit(1),
      PostDB.find().populate("owner").sort({ createdDate: -1 }),
    ]);
    postsArray = posts;
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
  // const [ modal, ] = useContext(ModalContext)
  const router = useRouter();
  const session = useSession();
  return (
    <>
      <Head>
        <title>Twitter</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/fav2.ico" />
      </Head>

      {/* <SelectedTweetProvider> */}

      {/* <LikedPostsProvider> */}
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
      {router.query.modal == "post" && (
        <ModalComponent>
          <Post></Post>
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

      <main className={style.body}>
        {/* <div>{data}</div> */}
        <HomeLeft></HomeLeft>
        {error == null ? (
          <HomeMain posts={data}></HomeMain>
        ) : (
          <div>{error}</div>
        )}
        <HomeRight></HomeRight>
        {session.status !== "authenticated" && <HomeBottom></HomeBottom>}
      </main>
      {/* </LikedPostsProvider> */}
      {/* </SelectedTweetProvider> */}
    </>
  );
}

{
  /* <ModalComponent>
        {modal.showPostEditor && <Post />}
        {modal.showSignIn && <ModalSignInDiv />}
        {modal.showSignUp && <ModalSignUpDiv></ModalSignUpDiv>}
      </ModalComponent> */
}
