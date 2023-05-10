import { RecentMessageContext } from "@/providers/RecentMessageProvider";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { postMessageFn } from "./messageFn";

export const MessageActions = {
  postMessage: "POST_MESSAGE",
};
const useMessageDispatch = ({ type, initPayload }) => {
  const [recentmessages, setRecentMessages] = useContext(RecentMessageContext);
  const session = useSession();
  const [messages, setMessages] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ status: false, message: "" });

  switch (type) {
    case MessageActions.postMessage:
      const dispatch = ({ payload, states }) => {
        const innerStates = {
          setMessages,
          setError,
          setLoading,
          setRecentMessages,
        };
        payload.senderEmail = session.data?.user.email;
        payload.senderId = session.data?.user.id;
        payload.message = messages;

        postMessageFn(
          {
            ...initPayload,
            ...payload,
          },
          { ...innerStates, ...states }
        );
      };
      return {
        messages,
        setMessages,
        loading,
        error,
        dispatch,
      };
    case MessageActions.sendMessage:
      break;
    default:
      break;
  }
};
export default useMessageDispatch;
