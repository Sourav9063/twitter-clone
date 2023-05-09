import React, { useEffect, useState } from "react";
import Loader from "../common/loader/Loader";
import Tweet from "./tweet";
import style from "./tweet.module.css";
import { useRouter } from "next/router";
export default function ReTweet({ tweet_id, tweet }) {
  const [tweetData, setTweetData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const fetchTweet = async () => {
      try {
        const res = await fetch("/api/v2/posts/" + tweet_id, {
          method: "GET",
        });
        const data = await res.json();
        if (data.post) {
          setTweetData(data.post);
          setLoading(false);
        }
        if (!res.ok) {
          throw new Error(data.msg);
        }
      } catch (e) {
        setError(e.message);
      }
    };

    if (!tweet) {
      fetchTweet();
    } else {
      setLoading(false);
      setTweetData(tweet);
    }
    return () => {};
  }, []);

  if (error) {
    return (
      <div className={style.wrapper}>
        <div>{error}</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={style.wrapper}>
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        router.push("/posts/" + tweetData._id);
      }}
      className={style.wrapper}
    >
      <Tweet
        showLikeNCommentIcon={false}
        avatarWidth={"1.5rem"}
        tweet={tweetData}
      ></Tweet>
    </div>
  );
}

// <style jsx>{`
//         .wrapper {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           min-width: 100%;
//           min-height: 200px;
//           border-radius: 1rem;
//           border: 1px var(--border-color-2) solid;
//         }
//       `}</style>
