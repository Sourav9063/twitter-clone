import React from "react";
import Tweet from "../tweet/tweet";
import { useRouter } from "next/router";

export default function ProfileMidPosts({ posts }) {
  const router = useRouter();
  return (
    <>
      {posts.map((tweet, index) => (
        <div
          key={tweet._id}
          onClick={() => {
            // setTweet(tweet);

            router.push({
              pathname: "/" + "posts/" + tweet._id,
            });
          }}
        >
          <Tweet tweet={tweet}></Tweet>
        </div>
      ))}
    </>
  );
}
