import HomeLeft from "@/components/home/homeLeft/HomeLeft";
import MessageList from "@/components/message/messageList/MessageList";
import Messages from "@/components/message/messages/Messages";

import { messaging } from "@/helper/Firebase/FirebaseInit";
import { getToken } from "firebase/messaging";
import { useSession } from "next-auth/react";

// import UserDBV2 from "@/db/modelsV2/userModelV2";
import Head from "next/head";
import React, { useEffect, useState } from "react";

export default function Message() {
 const session= useSession()

  

  useEffect(() => {
    async function requestPermission() {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        // Generate Token
        const token = await getToken(messaging, {
          vapidKey:
            process.env.FCM_VAPID_KEY,
        });
   
     
        try {
          const res = await fetch("/api/v2/users/token", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              _id: session.data.user._id,
              token
            })
          })
          const result =await  res.json()
          console.log(result)
          
        } catch (error) {
          console.log(error)
          
        }
        // Send this token  to server ( db)
        //
        // send to the UserDBV2
      } else if (permission === "denied") {
        alert("You denied for the notification");
      }
    }
    
   if(session.data?.user._id){ requestPermission();}
  }, [session.data]);
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
