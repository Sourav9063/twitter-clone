import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import {
  NOTIFICATION_TYPE_SEEN,
  NOTIFICATION_TYPE_SEND,
} from "@/helper/constStrings";
import React from "react";
import { getMessaging, onMessage } from "firebase/messaging";

export const RecentMessageContext = createContext(null);

export default function RecentMessageProvider({ children }) {
  const recentMessages = {
    showNotification: false,
    latestMessage: null,
    latestMessages: [],
    messages: [],
    unseenMessages: [],
  };

  const [recentMessage, setRecentMessage] = useState(recentMessages);
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    const requestOptions = { method: "GET", redirect: "follow" };

    async function fetchNotification() {
      try {
        const response = await fetch(
          `/api/v2/users/getNotification?id=${session.data?.user.id}`,
          requestOptions
        );
        const result = await response.json();

        if (result.msg == "Success" && result.notifications.length > 0) {
          setRecentMessage((state) => {
            return {
              ...state,
              latestMessages: result.notifications,
              showNotification: true,
              latestMessage: result.notifications[0],
            };
          });
        }
      } catch (error) {}
    }

    if (session.data) {
      fetchNotification();
    }
    return () => {};
  }, [session.data, setRecentMessage]);

  useEffect(() => {
    const beat = new Audio("/sounds/noti_sound.wav");
    const seenBeat = new Audio("/sounds/seen.wav");
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      const msg = JSON.parse(payload.data.message);
      if (msg.notificationType === NOTIFICATION_TYPE_SEND) {
        beat.play();
        const newRecentMsg = {
          showNotification: true,
          latestMessage: msg.mainData,
        };
        if (
          router.query.receiverId &&
          router.query.receiverId == msg.mainData.receiver
        ) {
          newRecentMsg.messages;
        }
        setRecentMessage((state) => {
          if (
            router.query.receiverId &&
            router.query.receiverId == msg.mainData.sender
          ) {
            newRecentMsg.messages = [...state.messages, msg.mainData];
          } else {
            newRecentMsg.messages = [...state.messages];
          }
          newRecentMsg.latestMessages = [msg.mainData, ...state.latestMessages];

          return newRecentMsg;
        });
      } else if (msg.notificationType === NOTIFICATION_TYPE_SEEN) {
        // fetchUnseen(
        //   msg.mainData.sender,
        //   msg.mainData.receiver,
        //   setRecentMessage
        // );
        seenBeat.play();

        setRecentMessage((state) => {
          return {
            ...state,
            unseenMessages: !state.unseenMessages
              ? []
              : state.unseenMessages.filter((message) => {
                  message.messageID !== msg.mainData._id;
                }),
          };
        });
      }
    });
    return () => {};
  }, [setRecentMessage, router.query.receiverId]);
  return (
    <RecentMessageContext.Provider value={[recentMessage, setRecentMessage]}>
      {children}
    </RecentMessageContext.Provider>
  );
}
