import React, { useContext, useEffect, useRef, useState } from "react";
import Tweet from "@/components/tweet/tweet";
import style from "./HomeMain.module.css";
import Post from "@/components/common/post/post";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { FeedTweetsContext } from "@/providers/FeedTweetsProvider";
import Button from "@/components/common/button/button";
import { useOnScreen } from "@/helper/hooks/useOnScreen";
import Loader from "@/components/common/loader/Loader";
import { NO_MORE_TWEETS, TWEET_LIMIT, TWEET_SKIP } from "@/helper/constStrings";
import Or from "@/components/common/Or";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function HomeMain({ posts }) {
  const [parent, enableAnimations] = useAutoAnimate();

  const router = useRouter();

  const session = useSession();
  const [FeedTweets, setFeedTweets] = useContext(FeedTweetsContext);
  const [btnText, setBtnText] = useState("Load More.");
  const btnRef = useRef(null);
  const onScreen = useOnScreen(btnRef);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    async function fetchPosts() {
      const TWEET_SKIP = FeedTweets.length;

      try {
        let response = await fetch(
          `/api/v2/posts?skip=${TWEET_SKIP}&limit=${TWEET_LIMIT}`,
          requestOptions
        );
        let result = await response.json();

        if (response.ok) {
          if (result.posts.length > 0) {
            setFeedTweets((state) => [...state, ...result.posts]);
          } else {
            // btnRef.current.style.display = "none";
            setBtnText(NO_MORE_TWEETS);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    console.log(onScreen);

    if (onScreen) {
      setBtnText("Loading");
      fetchPosts();
    }
    return () => {};
  }, [onScreen, setFeedTweets]);

  return (
    <section
      className={style.main}
      // style={{ borderInline: "1px solid var( --border-color)" }}
    >
      <div>
        <div className={style.glassPortion}>
          <h1>Home</h1>
        </div>
        {/* <div style={{
                    height: "100px"
                }}></div> */}
        {session.status == "authenticated" && <Post></Post>}
        <div ref={parent}>
          {FeedTweets.map((tweet, index) => (
            <div
              key={tweet._id}
              onClick={() => {
                // setTweet(tweet);
                router.push({
                  pathname: router.pathname + "posts/" + tweet._id,
                });
              }}
            >
              <Tweet tweet={tweet}></Tweet>
            </div>
          ))}
        </div>
        {btnText != NO_MORE_TWEETS ? (
          <div
            className={`${style.load} ${
              FeedTweets.length == 0 ? style.mtvh : ""
            }`}
            ref={btnRef}
          >
            <Loader />
            <button
              className={style.btnOutline}
              onClick={async (e) => {
                const TWEET_SKIP = FeedTweets.length;
                try {
                  let response = await fetch(
                    `/api/v2/posts?skip=${TWEET_SKIP}&limit=${TWEET_LIMIT}`,
                    requestOptions
                  );
                  let result = await response.json();
                  if (response.ok) {
                    if (result.posts.length > 0) {
                      setFeedTweets((state) => [...state, ...result.posts]);
                    } else {
                      // btnRef.current.style.display = "none";
                      setBtnText(NO_MORE_TWEETS);
                    }
                  }
                } catch (error) {
                  console.log(error);
                } finally {
                  console.log(FeedTweets.length);
                }
              }}
            >
              {btnText}
            </button>
          </div>
        ) : (
          <Or text={btnText} height="200px" padding="1rem"></Or>
        )}
      </div>
    </section>
  );
}

// const tweet = {
//     name: "name",
//     username: "@username",
//     tweet: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam quod eum repudiandae amet? Voluptatem amet quod quae repellendus ea repellat! Adipisci accusamus quam nesciunt ea dolorem deserunt recusandae cum optio ad tempora ut minus repellendus, quaerat cumque id quo ab saepe? A harum consectetur suscipit itaque soluta perferendis eligendi earum.",
//     day: "10d",
//     image: "https://sourav9063.github.io/my_portfolio/static/media/headLS1.685d407d113157028b1e.png",
//     likes: 10,
//     comments: 30,

// }

// const tweet2 = {
//     name: "name",
//     username: "@username",
//     tweet: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam quod eum repudiandae amet? Voluptatem amet quod quae repellendus ea repellat! Adipisci accusamus quam nesciunt ea dolorem deserunt recusandae cum optio ad tempora ut minus repellendus, quaerat cumque id quo ab saepe? A harum consectetur suscipit itaque soluta perferendis eligendi earum.",
//     day: "10d",
//     image: "https://sourav9063.github.io/my_portfolio/static/media/headLS1.685d407d113157028b1e.png",
//     likes: 10,
//     comments: 30,
//     tweetImg: "https://user-images.githubusercontent.com/53114581/118112856-61972c00-b407-11eb-8004-1f516bbf91f4.png"

// }

// const tweet3 = {
//     name: "name",
//     username: "@username",
//     tweet: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam quod eum repudiandae amet? Voluptatem amet quod quae repellendus ea repellat! Adipisci accusamus quam nesciunt ea dolorem deserunt recusandae cum optio ad tempora ut minus repellendus, quaerat cumque id quo ab saepe? A harum consectetur suscipit itaque soluta perferendis eligendi earum.",
//     day: "10d",
//     image: "https://sourav9063.github.io/my_portfolio/static/media/headLS1.685d407d113157028b1e.png",
//     likes: 10,
//     comments: 30,
//     tweetImg: "https://user-images.githubusercontent.com/53114581/148637656-447cdf3b-5267-4e43-99aa-7fb7237184b9.png"

// }

// const tweets = [ tweet, tweet2, tweet3, tweet, tweet2, tweet3, tweet, tweet2, tweet3, tweet, tweet2, tweet3, tweet, tweet2, tweet3, tweet, tweet2, tweet3, ]

// onclick={async (e) => {
//   const TWEET_SKIP = FeedTweets.length;
//   try {
//     let response = await fetch(
//       `/api/v2/posts?skip=${TWEET_SKIP}&limit=${TWEET_LIMIT}`,
//       requestOptions
//     );
//     let result = await response.json();
//     if (response.ok) {
//       if (result.posts.length > 0) {
//         setFeedTweets((state) => [...state, ...result.posts]);
//       } else {
//         // btnRef.current.style.display = "none";
//         setBtnText(NO_MORE_TWEETS);
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   } finally {
//     console.log(FeedTweets.length);
//   }
// }}
