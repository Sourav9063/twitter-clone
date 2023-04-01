import React, { useState } from "react";
import { useRouter } from "next/router";
import connectMongo from "@/db/dbConnect";
import UserDB from "@/db/models/userModel";
import PostDB from "@/db/models/postModel";

import Head from "next/head";
import HomeLeft from "@/components/home/homeLeft/HomeLeft";
import HomeRight from "@/components/home/homeRight/HomeRight";
import Avatar from "@/components/common/avatar/avatar";
import Button from "@/components/common/button/button";
import { signOut, useSession } from "next-auth/react";
import ProfileMid from "@/components/profile/ProfileMid";
import ModalComponent from "@/components/modal/ModalComponent";
import EditProfile from "@/components/modalComponents/editProfile/EditProfile";

export async function getServerSideProps(context) {
  const { id, email } = context.query;

  try {
    await connectMongo();
    const user = await UserDB.findOne({
      $or: [{ _id: id }, { email: email }],
    })
      .populate("follower", "email username image _id")
      .populate("following", "email username image _id");

    // .select({ follower: 0, following: 0 })

    if (!user) {
      throw new Error("Not found");
    }

    const posts = await PostDB.find({ owner: user._id }).sort({
      createdDate: -1,
    });
    if (posts) {
      posts.forEach((element, i) => {
        posts[i].owner = user;
      });
    }

    // const session = await getServerSession(context.req, context.res, authOptions)
    //
    // const followDB = await FollowDB.findOne({ owner: session.user.id }).populate("follower following")

    return {
      props: {
        data: JSON.parse(JSON.stringify(user)),
        posts: JSON.parse(JSON.stringify(posts)),
      },
    };
  } catch (e) {
    return {
      props: {
        data: null,
      },
    };
  }
}

export default function User({ data, posts }) {
  const session = useSession();
  const router = useRouter();
  let amIFollowing = data.follower.find(
    (follower) => follower._id == session.data?.user.id
  );
  amIFollowing = amIFollowing ? true : false;
  const [amIFollowingState, setAmIFollowingState] = useState(amIFollowing);

  const [btnTex, setBtnTex] = useState(amIFollowing ? "Unfollow" : "Follow");

  return (
    <>
      <Head>
        <title>Twitter</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/fav2.ico" />
      </Head>
      <main className="main">
        {router.query.modal == "edit-profile" && (
          <ModalComponent returnTo={router.pathname}>
            <EditProfile>Test</EditProfile>
          </ModalComponent>
        )}
        <HomeLeft></HomeLeft>
        {data && (
          <section className="mid">
            <div className="profileMT">
              <div className="cover"></div>
              <div className="bottom">
                <div className="avWrapper">
                  <Avatar width="180px" image={data.image}></Avatar>
                </div>
                <button
                  className="edit-profile"
                  onClick={() => {
                    router.push({
                      pathname: router.pathname,
                      query: { id: data._id, modal: "edit-profile" },
                    });
                  }}
                >
                  Edit Profile
                </button>
              </div>
              <section className="names">
                {data.username && <div>{data.username}</div>}
                {data.email && <div>@{data.email}</div>}
                {data.bio && <div className="bio">{data.bio}</div>}
                {session.data?.user.id != data._id ? (
                  <div className="followbtn">
                    <Button
                      onclick={async () => {
                        setBtnTex("Loading");
                        const body = {
                          owner: session.data.user.id,
                          who: data._id,
                          what: amIFollowingState ? "UNFOLLOW" : "FOLLOW",
                        };
                        const res = await fetch("/api/follow", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(body),
                        });
                        const result = await res.json();

                        const isFollowingNow =
                          result.msg == "Following" ? true : false;
                        amIFollowing = isFollowingNow;
                        setAmIFollowingState(amIFollowing);
                        setBtnTex(isFollowingNow ? "Unfollow" : "Follow");
                      }}
                    >
                      {btnTex}
                    </Button>
                  </div>
                ) : (
                  <div className="followbtn">
                    <Button
                      onclick={async () => {
                        signOut({
                          callbackUrl: "/",
                        });
                      }}
                    >
                      Sign out
                    </Button>
                  </div>
                )}
              </section>
            </div>
            <ProfileMid data={data} posts={posts}></ProfileMid>
          </section>
        )}

        <HomeRight></HomeRight>
      </main>
      <style jsx>{`
        .main {
          width: 100%;
          height: 100vh;
          height: 100dvh;
          display: grid;
          grid-template-columns: 1fr var(--main-width) 1fr;
          column-gap: 1rem;
        }

        .followbtn {
          margin-block: 1rem;
        }
        .mid {
          border-inline: 1px solid var(--border-color);
        }
        .profileMT {
           {
            /* height: 50vh; */
          }
          background-color: aquamarine;
          background-color: var(--bg);
        }
        .cover {
          background-color: black;
          width: 100%;
          height: 30vh;
          background-image: ${data.coverImage && `url("${data.coverImage}")`};
          background-size: cover;
          background-position: center;
        }
        .bottom {
          position: relative;
          height: calc(90px + 1rem);
          width: 100%;
        }

        .avWrapper {
          position: absolute;
          background-color: var(--bg);
          padding: 1rem;
          width: fit-content;
          border-radius: 10000px;
          left: 1rem;
          top: calc(-90px - 1rem);
        }

        .edit-profile {
          position: absolute;
          right: 1rem;
          top: 1rem;

          background-color: transparent;
          border: 1px solid var(--border-color-2);
          border-radius: 10000px;
          padding: 0.5rem 1rem;
          color: var(--text-color-tertiary);
          font-size: 1rem;
          cursor: pointer;
        }
        .edit-profile:hover {
          background-color: var(--border-color-2);
        }

        .vLine {
          margin-top: auto;
          margin-bottom: auto;
          margin-left: auto;
          margin-right: auto;
          width: 2px;
          height: 70%;
          background-color: #1d9cf05d;
        }
        .names {
          padding: 1rem;
        }
        .names > * {
          font-size: 1.2rem;
          margin-right: 0.3rem;
        }

        .username {
          color: var(--text-color-tertiary);
        }
        .bio {
          text-align: center;
          padding: 1rem;
          border-bottom: 1px solid var(--border-color-2);
        }
      `}</style>
    </>
  );
}

{
  /* {posts.map((tweet, index) => <div key={tweet._id} onClick={() => {

                        // setTweet(tweet);

                        router.push({
                            pathname: '/' + "posts/" + tweet._id,


                        });


                    }} >
                        <Tweet tweet={tweet}></Tweet>
                    </div>)} */
}
