import HomeLeft from "@/components/home/homeLeft/HomeLeft";
import MessageList from "@/components/message/messageList/MessageList";
import Messages from "@/components/message/messages/Messages";

// import { messaging } from "@/helper/Firebase/FirebaseInit";
import { getToken } from "firebase/messaging";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import connectMongo from "@/db/dbConnect";
import UserDBV2 from "@/db/modelsV2/userModelV2";

export async function getServerSideProps(context) {
  const { senderId, receiverId } = context.query;
  console.log(senderId, receiverId);

  try {
    await connectMongo();
    const [
      user,
      // messages
    ] = await Promise.all([
      UserDBV2.findOne({ _id: receiverId })
        .populate("follower", "email username image _id")
        .populate("following", "email username image _id"),
      // TweetDBV2.find({ owner: id, type: { $in: ["tweet", "retweet"] } }).sort({
      //   createdDate: -1,
      // }),
    ]);

    // .select({ follower: 0, following: 0 })

    if (!user) {
      throw new Error("Not found");
    }

    // if (posts) {
    //   posts.forEach((element, i) => {
    //     posts[i].owner = user;
    //   });
    // }

    // const session = await getServerSession(context.req, context.res, authOptions)
    //
    // const followDB = await FollowDB.findOne({ owner: session.user.id }).populate("follower following")

    return {
      props: {
        receiver: JSON.parse(JSON.stringify(user)),
        // posts: JSON.parse(JSON.stringify(posts)),
      },
    };
  } catch (e) {
    console.log(e);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}

export default function Message({ receiver }) {
  const session = useSession();
  const [selectedID, setselectedID] = useState(receiver);

  useEffect(() => {
    async function requestPermission() {
      const permission = await Notification.requestPermission();
      const messaging = getMessaging();
      if (permission === "granted") {
        // Generate Token
        const token = await getToken(messaging, {
          vapidKey: process.env.FCM_VAPID_KEY,
        });

        try {
          const res = await fetch("/api/v2/users/token", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              _id: session.data.user._id,
              token,
            }),
          });

          const result = await res.json();
        } catch (error) {}
        // Send this token  to server ( db)
        //
        // send to the UserDBV2
      } else if (permission === "denied") {
        alert("You denied for the notification");
      }
    }

    if (session.data?.user._id) {
      requestPermission();
    }
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
        <MessageList setselectedID={setselectedID}></MessageList>
        {selectedID && <Messages _id={selectedID}></Messages>}
      </main>
      <style jsx>{`
        .body {
          width: 100%;
          height: 100vh;
          height: 100dvh;
          display: flex;
          overflow: hidden;
        }
        .left {
          margin-right: 1rem;
        }
      `}</style>
    </>
  );
}
