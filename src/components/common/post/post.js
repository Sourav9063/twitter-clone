import React, { useContext, useState } from "react";
import Avatar from "../avatar/avatar";
import style from "./post.module.css";
import Button from "../button/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../../modalComponents/signInDiv/ModalSignInDiv.module.css";
import { EMPTY_TWEET_RETWEET } from "@/helper/constStrings";
import { FeedTweetsContext } from "@/providers/FeedTweetsProvider";
import { TweetActions, TweetDispatch } from "@/actions/tweet";
import Compressor from "compressorjs";
export default function Post({
  width = "100%",
  placeholder = "What's happening?",
  avatarWidth = "70px",
  tweetData = { tweetText: "", tweetImage: "" },
  returnTo = "/",
  onClick,
  head,
  setRetweetCount,
  setShowRetweet,
}) {
  const [tweet, setTweet] = useState(
    tweetData.tweetText == EMPTY_TWEET_RETWEET ? "" : tweetData.tweetText
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageLink, setImageLink] = useState(tweetData.tweetImage);
  const [picInputShow, setPicInputShow] = useState(false);
  const session = useSession();
  const route = useRouter();

  const [FeedData, setFeedData] = useContext(FeedTweetsContext);

  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(tweetData.tweetImage);
  const [selectedFile, setSelectedFile] = useState();

  const callBack = onClick
    ? onClick
    : async () => {
        setLoading(true);

        const formData = new FormData();
        selectedFile &&
          formData.append("tweetImage", selectedFile, selectedFile.name);
        formData.append("owner", session.data.user.id);
        formData.append("tweetText", tweet ? tweet : EMPTY_TWEET_RETWEET);

        if (tweetData.tweetText == "" && !head) {
          TweetDispatch({
            type: TweetActions.postTweet,
            payload: {
              formData,
              setFeedData,
            },
          });
        } else if (head) {
          const body = JSON.stringify({
            owner: session.data.user.id,
            head: head,
            tweetText: tweet ? tweet : EMPTY_TWEET_RETWEET,
          });
          TweetDispatch({
            type: TweetActions.postRetweet,
            payload: {
              setRetweetCount,
              setFeedData,
              body,
              setShowRetweet,
            },
          });
        } else {
          TweetDispatch({
            type: TweetActions.patchTweet,
            payload: {
              formData,
              tweetData,
              setFeedData,
              // FeedData,
            },
          });
        }
        route.replace(returnTo, undefined, { shallow: true });

        setSelectedFile("");
        setSelectedImage("");
        setLoading(false);

        setImageLink("");
        setPicInputShow(false);

        setTweet("");
      };

  return (
    <div
      style={{ width: width }}
      className={style.post}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <section className={style.image}>
        <Avatar width={avatarWidth} image={session.data?.user.image}></Avatar>
      </section>
      <section className={style.body}>
        <div className={style["privacy"]}>
          Everyone
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path d="M3.543 8.96l1.414-1.42L12 14.59l7.043-7.05 1.414 1.42L12 17.41 3.543 8.96z"></path>
            </g>
          </svg>
        </div>

        <form action="">
          <textarea
            onChange={(e) => {
              setTweet(e.target.value);
            }}
            value={tweet}
            placeholder={placeholder}
            type="text"
          />
        </form>

        <div className={style.privacyShow}>
          <p>
            <span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="M12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm-.25 10.48L10.5 17.5l-2-1.5v-3.5L7.5 9 5.03 7.59c1.42-2.24 3.89-3.75 6.72-3.84L11 6l-2 .5L8.5 9l5 1.5-1.75 1.73zM17 14v-3l-1.5-3 2.88-1.23c1.17 1.42 1.87 3.24 1.87 5.23 0 1.3-.3 2.52-.83 3.61L17 14z"></path>
                </g>
              </svg>
            </span>
            Everyone can reply
          </p>
        </div>
        <div className={style.hr}></div>

        <div className={style.likeNcommnet}>
          {!head && (
            <div>
              <label htmlFor="img-upload">
                <input
                  accept="image/*"
                  id="img-upload"
                  hidden
                  type="file"
                  onChange={({ target }) => {
                    try {
                      if (target.files) {
                        const file = target.files[0];

                        new Compressor(file, {
                          quality: 0.6,
                          maxWidth: 600,
                          success(result) {
                            setSelectedFile(result);
                          },
                          error(err) {
                            console.log(err.message);
                          },
                        });

                        setSelectedImage(URL.createObjectURL(file));
                        // setSelectedFile(file);
                      }
                    } catch (e) {}
                  }}
                />
                <div>
                  {
                    <svg
                      width={"20px"}
                      className={style.picSVG}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <g>
                        <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                      </g>
                    </svg>
                  }
                </div>
              </label>

              {selectedImage && (
                <div style={{ position: "relative" }}>
                  <img className={style.uploadPic} src={selectedImage} alt="" />

                  <svg
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                      setSelectedImage("");
                    }}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className={style.cross}
                  >
                    <g>
                      <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                    </g>
                  </svg>
                </div>
              )}
            </div>
          )}
          {picInputShow && (
            <div className={styles["input-group"]}>
              <input
                onChange={(e) => setImageLink(e.target.value)}
                type="email"
                name="Image"
                placeholder="Input Image Link"
                className={styles["input"]}
                value={imageLink}
              />
              <label className={styles["user-label"]}>Image link</label>
            </div>
          )}
          <div>
            <Button
              disabled={!(tweet != "" || selectedFile || head)}
              style={{
                paddingBlock: ".5rem",
              }}
              onclick={callBack}
            >
              {head ? "Retweet" : "Tweet"}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function svgdiv() {
  return (
    <div>
      <svg className={style.picSVG} viewBox="0 0 24 24" aria-hidden="true">
        <g>
          <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
        </g>
      </svg>
    </div>
  );
}

// onClick
//     ? onClick
//     : async () => {
//
//         setLoading(true);

//         // const myHeaders = new Headers();
//         // myHeaders.append("Content-Type", "application/json");

//         const data = {
//           owner: session.data.user.id,
//           tweetText: tweet ? tweet : EMPTY_TWEET_RETWEET,
//         };
//         const formData = new FormData();
//         selectedFile && formData.append("tweetImage", selectedFile);
//         formData.append("owner", session.data.user.id);
//         formData.append("tweetText", tweet ? tweet : EMPTY_TWEET_RETWEET);

//
//         if (imageLink != "") {
//           data.tweetImage = imageLink;
//         }
//         const raw = JSON.stringify(data);

//         const requestOptions = {
//           method: "POST",
//           // headers: myHeaders,
//           // body: raw,
//           body: formData,
//           redirect: "follow",
//         };

//         if (tweetData.tweetText == "") {
//           try {
//             const response = await fetch("/api/v2/posts", requestOptions);

//             const result = await response.json();
//             route.replace(returnTo);
//           } catch (error) {
//
//           }
//         } else {
//           requestOptions.method = "PATCH";
//           const response = await fetch(
//             "/api/v2/posts/" + tweetData._id,
//             requestOptions
//           );

//           const result = await response.json();

//           route.replace(returnTo);
//         }

//         setSelectedFile("");
//         setSelectedImage("");
//         setLoading(false);

//         setImageLink("");
//         setPicInputShow(false);

//         setTweet("");
//       };

//   const body = JSON.stringify({
//     owner: session.data.user.id,
//     head: head,
//     tweetText: tweet ? tweet : EMPTY_TWEET_RETWEET,
//   });
//   try {
//     const res = await fetch("/api/v2/posts/retweet", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         owner: session.data.user.id,
//         head: head,
//         tweetText: tweet ? tweet : EMPTY_TWEET_RETWEET,
//       }),
//     });
//     const data = await res.json();
//     if (data) {
//       setRetweetCount(data.retweets);
//       setFeedData([data.tweet, ...FeedData]);
//     }
//     //
//     route.replace(returnTo);
//   } catch (error) {}
//   setShowRetweet(false);

// requestOptions.method = "PATCH";
// const response = await fetch(
//   "/api/v2/posts/" + tweetData._id,
//   requestOptions
// );

// const result = await response.json();

// if (result.post) {
//   const index = FeedData.findIndex((e) => e._id == result.post._id);
//   if (index != -1) {
//     FeedData[index] = result.post;
//     setFeedData([...FeedData]);
//   }
// }
//           route.replace(returnTo);

// const raw = JSON.stringify(data);

// const requestOptions = {
//   method: "POST",
//   body: formData,
//   redirect: "follow",
// };

// const data = {
//   owner: session.data.user.id,
//   tweetText: tweet ? tweet : EMPTY_TWEET_RETWEET,
// };

// if (imageLink != "") {
//   data.tweetImage = imageLink;
// }
