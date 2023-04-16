import React, { useContext, useState } from "react";
import style from "./tweet.module.css";
import Avatar from "../common/avatar/avatar";
import { format, formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { LikedPostsContext } from "@/providers/LikedPosts";
import { SelectedTweetContext } from "@/providers/SelectedTweet";
import Link from "next/link";
import PostOption from "../home/homeRight/postOption/PostOption";
import DropDown from "../common/dropDown/DropDown";
import { RandomContext } from "@/providers/RandomProvider";
import ReTweet from "./retweet";
import { EMPTY_TWEET_RETWEET } from "@/helper/constStrings";
import CommentBox from "../modalComponents/CommentBox";
import Post from "../common/post/post";
import Comments from "../common/comment/Comments";
// import Image from 'next/image';
export default function Tweet(props) {
  const {
    showCommentIcon = true,
    showLikeNCommentIcon = true,
    avatarWidth = "70px",
    padding = "1rem",
  } = props;
  const {
    owner,
    postImage,
    tweetImage,
    createdDate,
    createdAt,
    tweetText,
    postText,
    likes,
    comments,
    _id,
  } = props.tweet;
  const tweet = props.tweet;
  //
  const [commentsList, setCommentsList] = useState(tweet.commentsList);
  const [likesState, setLikesState] = useState(likes);
  const [retweetCount, setRetweetCount] = useState(tweet.retweets || 0);
  const [commentCount, setCommentCount] = useState(tweet.comments || 0);
  const [showRetweet, setShowRetweet] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const session = useSession();
  const router = useRouter();
  const [liked, setLiked] = useContext(LikedPostsContext);
  const [curTweet, setCurTweet] = useContext(SelectedTweetContext);
  let likedPost = liked.find((post) => post._id == _id);
  likedPost = likedPost ? true : false;
  const [random, setRandom] = useContext(RandomContext);
  const dropDownOption1 = () => {
    return (
      <PostOption
        onClick={() => {
          random.editTweet = props.tweet;
          setRandom({ ...random });
          router.push({
            pathname: "/",
            query: { modal: "edit-tweet" },
          });
        }}
        postid={_id}
        tweet={props.tweet}
      />
    );
  };
  return (
    <>
      <div
        className={style.tweet}
        style={{
          padding: padding,
          borderRadius: router.asPath.includes("posts") ? "1rem" : "0",
        }}
      >
        <div className={style.tweetInner}>
          <section className={style.image}>
            <Avatar width={avatarWidth} image={owner?.image}></Avatar>
          </section>
          <>
            <section className={style.body}>
              <div className={style["header"]}>
                <Link
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  href={"/profile?id=" + owner._id}
                >
                  <div className={style.names}>
                    <span className={style["name"]}>{owner?.username}</span>
                    <span className={style["username"]}>@{owner?.email}</span>
                    {/* {createdDate ||
                      (createdAt && (
                        <span className={style["day"]}>
                          {createdDate
                            ? formatDistanceToNow(new Date(createdDate))
                            : formatDistanceToNow(new Date(createdAt))}
                        </span>
                      ))} */}
                    {!router.asPath.includes("posts") &&
                      (createdDate || createdAt) && (
                        <>
                          <span>·</span>
                          <span className={style["day"]}>
                            {formatDistanceToNow(
                              new Date(createdDate ? createdDate : createdAt)
                            )}
                          </span>
                        </>
                      )}
                  </div>
                </Link>
                {session.data?.user.id == owner._id && (
                  <DropDown width={"300px"} options={[dropDownOption1()]}>
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className={style.threeDot}
                    >
                      <g>
                        <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                      </g>
                    </svg>
                  </DropDown>
                )}
              </div>
              {/* <div className={style.hr}></div> */}
              {tweetText != EMPTY_TWEET_RETWEET && (
                <div className={style.mainTweet}>
                  <p>{postText || tweetText}</p>
                </div>
              )}
              {(postImage && postImage != "") ||
                (tweetImage && tweetImage != "" && (
                  <div className={style.tweetImg}>
                    <img src={postImage || tweetImage} alt="" />
                  </div>
                ))}
              {tweet.type == "retweet" && tweet.head ? (
                // <Link
                //   onClick={(e) => {
                //     e.stopPropagation();
                //   }}
                //   href={`/posts/${
                //     typeof tweet.head === "string" ? tweet.head : tweet.head._id
                //   }`}
                // >
                <ReTweet
                  tweet_id={
                    typeof tweet.head === "string" ? tweet.head : tweet.head._id
                  }
                  tweet={typeof tweet.head === "string" ? null : tweet.head}
                ></ReTweet>
              ) : (
                // </Link>
                tweet.type == "retweet" && (
                  <div className={style.wrapper}>
                    <div>Tweet not found!</div>
                  </div>
                )
              )}
              {router.asPath.includes("posts") &&
                (createdDate || createdAt) && (
                  <div className={style.date}>
                    {format(
                      new Date(createdDate ? createdDate : createdAt),
                      "dd-LL-yyyy 'at' h:mm a"
                    )}
                  </div>
                )}
              {/* <div>{likedPost}</div> */}
              {session.status == "authenticated" && showLikeNCommentIcon && (
                <div className={style.likeNcommnet}>
                  <div
                    className={`${likedPost ? style.likedPost : ""} ${
                      style.likes
                    }`}
                    onClick={async (e) => {
                      e.stopPropagation();
                      try {
                        const myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/json");
                        const res = await fetch(
                          "/api/v2/posts/" + _id + "/like",
                          {
                            method: "POST",
                            body: JSON.stringify({
                              userid: session.data.user.id,
                            }),
                            headers: myHeaders,
                          }
                        );
                        // const [res, res1] = await Promise.all([
                        //   fetch("/api/v1/posts/" + _id + "/like", {
                        //     method: "POST",
                        //     body: JSON.stringify({ userid: session.data.user.id }),
                        //     headers: myHeaders,
                        //   }),
                        //   fetch(`/api/v1/users/likedposts/${session.data.user.id}`, {
                        //     method: "GET",
                        //     headers: {
                        //       "Content-Type": "application/json",
                        //     },
                        //   }),
                        // ]);
                        const [data, data1] = await Promise.all([res.json()]);
                        // const data1 = await res1.json();
                        if (data) {
                          setLikesState(data.likes);
                          props.tweet.likes = data.likes;
                          if (data.status == "Liked") {
                            setLiked([...liked, data.tweet]);
                          } else {
                            setLiked(
                              liked.filter((like) => like._id != data.tweet._id)
                            );
                          }
                        }
                      } catch (e) {}
                    }}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <g>
                        <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
                      </g>
                    </svg>
                    <span>{likesState}</span>
                  </div>
                  {/* retweet icon */}
                  <div
                    onClick={async (e) => {
                      e.stopPropagation();
                      // try {
                      //   const res = await fetch("/api/v2/posts/retweet", {
                      //     method: "POST",
                      //     headers: {
                      //       "Content-Type": "application/json",
                      //     },
                      //     body: JSON.stringify({
                      //       owner: session.data.user.id,
                      //       head: _id,
                      //       tweetText: EMPTY_TWEET_RETWEET,
                      //     }),
                      //   });
                      //   const data = await res.json();
                      //   if (data) {
                      //     setRetweetCount(data.retweets);
                      //   }
                      //
                      // } catch (error) {
                      //
                      // }
                      setShowRetweet(!showRetweet);
                    }}
                    className={style.retweet}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <g>
                        <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path>
                      </g>
                    </svg>
                    <span>{retweetCount}</span>
                  </div>
                  {showCommentIcon && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        // router.push({
                        //     // pathname: router.pathname,
                        //     pathname: "/",
                        //     query: { modal: "comment", id: _id },
                        // });
                        // setCurTweet(props.tweet);
                        // router.push({
                        //   pathname: router.pathname,
                        //   query: { modal: "tweet", id: _id },
                        // });
                        setShowCommentBox(!showCommentBox);
                      }}
                      className={style.comments}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <g>
                          <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
                        </g>
                      </svg>
                      <span>{commentCount}</span>
                    </div>
                  )}
                </div>
              )}
              {showLikeNCommentIcon && showRetweet && (
                <section className="retweetBox">
                  <Post
                    setShowRetweet={setShowRetweet}
                    setRetweetCount={setRetweetCount}
                    head={_id}
                    avatarWidth="1.5rem"
                    placeholder="Retweet"
                  ></Post>
                </section>
              )}
            </section>
          </>
        </div>
        {showLikeNCommentIcon && showCommentBox && (
          // <section className="retweetBox">
          <div className={style.commentsList}>
            <h2>Comments</h2>
            <CommentBox
              setCommentCount={setCommentCount}
              setCommentsList={setCommentsList}
              head={_id}
              btnTxt="Comment"
            ></CommentBox>
            {tweet.commentsList &&
              commentsList.map((comment, index) => {
                return (
                  <div key={comment._id}>
                    <Comments
                      setCommentsList={setCommentsList}
                      comment={comment}
                      setCommentCount={setCommentCount}
                    ></Comments>
                  </div>
                );
              })}
          </div>
          // </section>
        )}
      </div>
    </>
  );
}
