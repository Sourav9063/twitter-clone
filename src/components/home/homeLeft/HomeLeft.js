import React, { useContext, useEffect, useState } from "react";
import style from "./HomeLeft.module.css";
import TwitterLogo from "@/components/common/svg/TwitterLogo";
import Button from "@/components/common/button/button";
// import { ModalContext } from '@/providers/ModalProvider'
import ProfilePill from "@/components/profilePill/ProfilePill";
import { useRouter } from "next/router";
import {
  MODAL_QUERY_POST,
  NOTIFICATION_TYPE_SEEN,
  NOTIFICATION_TYPE_SEND,
} from "@/helper/constStrings";
import { useSession } from "next-auth/react";
import ThemeToggle from "@/components/common/ThemeToggle";
import Link from "next/link";
import { getMessaging, onMessage } from "firebase/messaging";
import { onMessageListener } from "@/helper/Firebase/OnMessage";
import { RecentMessageContext } from "@/providers/RecentMessageProvider";
import fetchUnseen from "@/helper/frontend/fetchUnseen";

export default function HomeLeft() {
  const router = useRouter();
  const session = useSession();
  const [recentMessage] = useContext(RecentMessageContext);
  const onclick = () => {
    router.push("/" + MODAL_QUERY_POST);
  };

  return (
    <section className={style.left}>
      <div>
        <div>
          <section>
            <TwitterLogo></TwitterLogo>
            <div className={style.logos}>
              <div
                onClick={() => {
                  router.push({
                    pathname: "/profile",
                    query: {
                      id: session.data?.user.id,
                    },
                  });
                }}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path>
                  </g>
                </svg>
                Profile
              </div>
              <div>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M10.54 1.75h2.92l1.57 2.36c.11.17.32.25.53.21l2.53-.59 2.17 2.17-.58 2.54c-.05.2.04.41.21.53l2.36 1.57v2.92l-2.36 1.57c-.17.12-.26.33-.21.53l.58 2.54-2.17 2.17-2.53-.59c-.21-.04-.42.04-.53.21l-1.57 2.36h-2.92l-1.58-2.36c-.11-.17-.32-.25-.52-.21l-2.54.59-2.17-2.17.58-2.54c.05-.2-.03-.41-.21-.53l-2.35-1.57v-2.92L4.1 8.97c.18-.12.26-.33.21-.53L3.73 5.9 5.9 3.73l2.54.59c.2.04.41-.04.52-.21l1.58-2.36zm1.07 2l-.98 1.47C10.05 6.08 9 6.5 7.99 6.27l-1.46-.34-.6.6.33 1.46c.24 1.01-.18 2.07-1.05 2.64l-1.46.98v.78l1.46.98c.87.57 1.29 1.63 1.05 2.64l-.33 1.46.6.6 1.46-.34c1.01-.23 2.06.19 2.64 1.05l.98 1.47h.78l.97-1.47c.58-.86 1.63-1.28 2.65-1.05l1.45.34.61-.6-.34-1.46c-.23-1.01.18-2.07 1.05-2.64l1.47-.98v-.78l-1.47-.98c-.87-.57-1.28-1.63-1.05-2.64l.34-1.46-.61-.6-1.45.34c-1.02.23-2.07-.19-2.65-1.05l-.97-1.47h-.78zM12 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5c.82 0 1.5-.67 1.5-1.5s-.68-1.5-1.5-1.5zM8.5 12c0-1.93 1.56-3.5 3.5-3.5 1.93 0 3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5c-1.94 0-3.5-1.57-3.5-3.5z"></path>
                  </g>
                </svg>
                Settings
              </div>
              <Link
                // href={
                //   recentMessage.latestMessage
                //     ? `/message/?senderId=${session.data?.user.id}&receiverId=${recentMessage.latestMessage.sender}`
                //     : "/message"
                // }
                href={"/message"}
              >
                <div className={style.message}>
                  {recentMessage.showNotification && (
                    <span className={style.notificaion}></span>
                  )}
                  <svg
                    className={
                      recentMessage.showNotification
                        ? style.notiShake
                        : undefined
                    }
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <g>
                      <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path>
                    </g>
                  </svg>
                  Message
                </div>
              </Link>
              {/* <Link href={"/message"}>
                <div>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z"></path>
                    </g>
                  </svg>
                  Notification
                </div>
              </Link> */}
              <ThemeToggle></ThemeToggle>
            </div>
            {session.status == "authenticated" && (
              <>
                <Button onclick={onclick}></Button>
                {recentMessage.latestMessage && (
                  <div className={style.recentMessages}>
                    {/* <div className={style.recentMessage}>
                      <ProfilePill
                        data={{
                          _id: recentMessage.latestMessage,
                          username: recentMessage.latestMessage.senderUsername,
                          // text: msg.body,
                          image: recentMessage.latestMessage.senderImage,
                        }}
                      ></ProfilePill>
                      <p>{recentMessage.latestMessage.body}</p>
                    </div> */}
                    {recentMessage.latestMessages &&
                      recentMessage.latestMessages.map((msg, index) => {
                        return (
                          <div
                            key={index}
                            onClick={(e) => {
                              router.replace(
                                recentMessage.latestMessage
                                  ? `/message/?senderId=${session.data?.user.id}&receiverId=${msg.sender}`
                                  : "/message"
                              );
                            }}
                            className={style.recentMessage}
                          >
                            <ProfilePill
                              avaterWidth={"30px"}
                              data={{
                                _id: index,
                                username: msg.senderUsername,
                                // text: msg.body,
                                image: msg.senderImage,
                              }}
                            ></ProfilePill>
                            <p>{msg.body}</p>
                          </div>
                        );
                      })}
                  </div>
                )}
              </>
            )}
          </section>

          {session.status == "authenticated" && (
            <ProfilePill data={session.data.user}></ProfilePill>
          )}
        </div>
      </div>
    </section>
  );
}
// onMessageListener(messaging)
//   .then((payload) => {
//
//     setRecentMessage([...recentMessage, JSON.parse(payload.data.message)]);
//   })
//   .catch((e) => {
//
//   });

// useEffect(() => {
//   const requestOptions = { method: "GET", redirect: "follow" };

//   async function fetchNotification() {
//     try {
//       const response = await fetch(
//         `/api/v2/users/getNotification?id=${session.data?.user.id}`,
//         requestOptions
//       );
//       const result = await response.json();

//       if (result.msg == "Success" && result.notifications.length > 0) {
//         setRecentMessage((state) => {
//           return {
//             ...state,
//             latestMessages: result.notifications,
//             showNotification: true,
//             latestMessage: result.notifications[0],
//           };
//         });
//       }
//     } catch (error) {}
//   }

//   if (session.data) {
//     fetchNotification();
//   }
//   return () => {};
// }, [session.data, setRecentMessage]);

// useEffect(() => {
//   const beat = new Audio("/sounds/noti_sound.wav");
//   const seenBeat = new Audio("/sounds/seen.wav");
//   const messaging = getMessaging();
//   onMessage(messaging, (payload) => {
//     const msg = JSON.parse(payload.data.message);
//     if (msg.notificationType === NOTIFICATION_TYPE_SEND) {
//       beat.play();
//       const newRecentMsg = {
//         showNotification: true,
//         latestMessage: msg.mainData,
//       };
//       if (
//         router.query.receiverId &&
//         router.query.receiverId == msg.mainData.receiver
//       ) {
//         newRecentMsg.messages;
//       }
//       setRecentMessage((state) => {
//         if (
//           router.query.receiverId &&
//           router.query.receiverId == msg.mainData.sender
//         ) {
//           newRecentMsg.messages = [...state.messages, msg.mainData];
//         } else {
//           newRecentMsg.messages = [...state.messages];
//         }
//         newRecentMsg.latestMessages = [msg.mainData, ...state.latestMessages];

//         return newRecentMsg;
//       });
//       setNotification((state) => [msg.mainData, ...state]);
//     } else if (msg.notificationType === NOTIFICATION_TYPE_SEEN) {
//       // fetchUnseen(
//       //   msg.mainData.sender,
//       //   msg.mainData.receiver,
//       //   setRecentMessage
//       // );
//       seenBeat.play();

//       setRecentMessage((state) => {
//         return {
//           ...state,
//           unseenMessages: !state.unseenMessages
//             ? []
//             : state.unseenMessages.filter((message) => {
//                 message.messageID !== msg.mainData._id;
//               }),
//         };
//       });
//     }
//   });
//   return () => {};
// }, [setRecentMessage, router.query.receiverId]);
