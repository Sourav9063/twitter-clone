import { FeedTweetsContext } from "@/providers/FeedTweetsProvider";
import { useContext } from "react";

export const TweetActions = {
  postTweet: "POST_TWEET",
  postRetweet: "POST_RETWEET",
  postComment: "POST_COMMENT",
  postLike: "POST_LIKE",
  deleteTweet: "DELETE_TWEET",
  deleteComment: "DELETE_COMMENT",
  patchTweet: "PATCH_TWEET",
  patchComment: "PATCH_COMMENT",
};

export const TweetReducer = (state, action) => {
  switch (action.type) {
    case TweetActions.postTweet:
      postTweetFn(action.payload);
      break;
    case TweetActions.postRetweet:
      postRetweetFn(action.payload);
      break;
    case TweetActions.postLike:
      postLikeFn(action.payload);
      break;
    case TweetActions.patchTweet:
      patchTweetFn(action.payload);
      break;
    case TweetActions.postComment:
      break;
    case TweetActions.deleteTweet:
      break;
    case TweetActions.deleteComment:
      break;
    case TweetActions.patchComment:
      break;
    default:
      return state;
  }
};

export const TweetDispatch = (action) => {
  TweetReducer(null, action);
};

//functions
const postTweetFn = async ({ formData, setFeedData }) => {
  // const [feedData,setFeedData]=useContext(FeedTweetsContext)
  const requestOptions = {
    method: "POST",
    body: formData,
    redirect: "follow",
  };
  try {
    const response = await fetch("/api/v2/posts", requestOptions);
    const result = await response.json();
    setFeedData((state) => [result.post, ...state]);
  } catch (error) {}
};
const postRetweetFn = async ({
  setRetweetCount,
  setFeedData,
  body,
  setShowRetweet,
}) => {
  try {
    const res = await fetch("/api/v2/posts/retweet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    const data = await res.json();
    if (data) {
      setRetweetCount(data.retweets);
      setFeedData((state) => [data.tweet, ...state]);
    }
    //
    //   route.replace(returnTo);
  } catch (error) {}
  setShowRetweet(false);
};

const patchTweetFn = async ({ formData, tweetData, setFeedData, FeedData }) => {
  try {
    const requestOptions = {
      method: "PATCH",
      body: formData,
      redirect: "follow",
    };
    const response = await fetch(
      "/api/v2/posts/" + tweetData._id,
      requestOptions
    );

    const result = await response.json();

    if (result.post) {
      const index = FeedData.findIndex((e) => e._id == result.post._id);
      if (index != -1) {
        FeedData[index] = result.post;
        setFeedData([...FeedData]);
      }
    }
  } catch (e) {}
};

const postLikeFn = async ({
  postId,
  userId,
  setLikesState,
  setLiked,
  props,
}) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const res = await fetch("/api/v2/posts/" + postId + "/like", {
      method: "POST",
      body: JSON.stringify({
        userid: userId,
      }),
      headers: myHeaders,
    });

    const [data, data1] = await Promise.all([res.json()]);
    if (data) {
      setLikesState(data.likes);
      props.tweet.likes = data.likes;
      if (data.status == "Liked") {
        setLiked((state) => [data.tweet, ...state]);
      } else {
        setLiked((state) => state.filter((like) => like._id != data.tweet._id));
      }
    }
  } catch (e) {}
};
