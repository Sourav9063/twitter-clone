import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import style from "./Message.module.css";
import Avatar from "@/components/common/avatar/avatar";
export default function MessageComponent({ message }) {
  console.log(message);
  const session = useSession();
  const [isMy, setIsMy] = useState(false);
  useEffect(() => {
    console.log("effect");
    setIsMy(session.data?.user.id === message.sender);
    console.log(session.data.user.id);
    console.log(message);

    return () => {};
  }, [session.data, message.sender]);

  return (
    <div className={style.msgComponentWrapper}>
      {isMy || <Avatar width="20px" image={message.senderImage} />}
      <div className={style.msgComponentDiv}>
        {/* <div>{isMy ? "y" : "n"}</div> */}
        <div
          className={`${style.msgComponent} ${
            isMy ? style.msgComponentMy : style.msgComponentNotMy
          }`}
        >
          {message.body}
        </div>
      </div>
      {isMy && <Avatar width="20px" image={session.data?.user.image} />}
    </div>
  );
}
