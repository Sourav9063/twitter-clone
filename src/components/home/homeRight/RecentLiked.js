import Button from "@/components/common/button/button";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { LikedPostsContext } from "@/providers/LikedPosts";
import { useRouter } from "next/router";
import { EMPTY_TWEET_RETWEET } from "@/helper/constStrings";
import { useAutoAnimate } from "@formkit/auto-animate/react";
export default function RecentLiked() {
  const [parent] = useAutoAnimate();
  const header = "Recent Liked";
  const router = useRouter();

  const session = useSession();

  const [liked, setLiked] = useContext(LikedPostsContext);

  useEffect(() => {
    async function fetchLikedPosts() {
      const res = await fetch(
        `/api/v2/users/likedposts/${session.data.user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data) {
        //
        console.log(data);
        data.likedb != null && setLiked(data.likedb?.likedPost.reverse());
      }
    }

    fetchLikedPosts();
    return () => {};
  }, [setLiked, session.data]);

  return (
    <>
      {liked.length != 0 && (
        <div className="follow">
          <h1>{header}</h1>
          <div ref={parent} className="inner">
            {liked.map((tweet, index) => {
              return (
                <div
                  onClick={() => {
                    router.push({
                      pathname: "/posts/" + tweet._id,
                    });
                  }}
                  className="post"
                  key={tweet._id}
                >
                  {tweet.tweetText && tweet.owner.username && (
                    <>
                      <div className="main-tweet">
                        {tweet.tweetText == EMPTY_TWEET_RETWEET
                          ? tweet.type == "tweet"
                            ? "Photo of "
                            : "Retweet of " + tweet.owner.username
                          : tweet.tweetText}
                      </div>
                      <p>{"Tweeted by " + tweet.owner.username}</p>
                    </>
                  )}
                  {/* {tweet.createdAt && (
                    <p>{formatDistanceToNow(new Date(tweet.createdAt))} </p>
                  )} */}
                </div>
              );
            })}
          </div>
          {/* <Button
                    style={{ paddingBlock: ".5rem", backgroundColor: "transparent", color: "var(--primary-color)" }}
                >Show more</Button> */}
        </div>
      )}
      <style jsx>
        {`
          .follow {
            background-color: var(--bg-hover);
            width: 100%;
            border-radius: 1rem;
            padding: 1rem;
            margin-top: 1rem;
          }
          .inner {
            max-height: 40vh;
            overflow-y: scroll;
          }
          .inner::-webkit-scrollbar {
            display: none;
          }

          .inner {
            -ms-overflow-style: none;
            /* IE and Edge */
            scrollbar-width: none;
            /* Firefox */
          }

          .inner > * {
            margin-bottom: 0.5rem;
          }
          .follow > h1 {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--text-color-primary);
            margin-bottom: 0.5rem;
          }

          .post {
            background-color: var(--hover-secondary-trans-color);
            border-bottom: 1px solid var(--border-color);
            padding: 1rem;
            border-radius: 1rem;
            cursor: pointer;
          }
          div > p {
             {
              /* padding: 1rem; */
            }
            font-size: 0.85rem;
            letter-spacing: normal;
            color: var(--text-color-tertiary);
          }
          .main-tweet {
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2; /* number of lines to show */
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        `}
      </style>
    </>
  );
}
