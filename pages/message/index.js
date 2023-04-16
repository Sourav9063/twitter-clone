import HomeLeft from "@/components/home/homeLeft/HomeLeft";
import MessageList from "@/components/message/messageList/MessageList";
import Messages from "@/components/message/messages/Messages";
import Head from "next/head";
import React, { useEffect, useState } from "react";

export default function Message() {
  return (
    <>
      <Head>
        <title>Twitter</title>
        <meta name="description" content="Message page of twitter clone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/fav2.ico" />
      </Head>
      <main className="body">
        <HomeLeft></HomeLeft>
        <MessageList></MessageList>
        <Messages _id={"64326d06498c08c135977357"}></Messages>
      </main>
      <style jsx>{`
        .body {
          width: 100%;
          height: 100vh;
          height: 100dvh;
          display: flex;
        }
        .left {
          margin-right: 1rem;
        }
      `}</style>
    </>
  );
}
