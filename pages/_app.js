import "@/styles/globals.css";
import ModalProvider from "@/providers/ModalProvider";
import { SessionProvider } from "next-auth/react";
import SelectedTweetProvider from "@/providers/SelectedTweet";
import LikedPostsProvider from "@/providers/LikedPosts";
import RandomProvider from "@/providers/RandomProvider";
import FeedTweetsProvider from "@/providers/FeedTweetsProvider";
import { app, firebaseConfig } from "@/helper/Firebase/FirebaseInit";
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { useEffect } from "react";

FeedTweetsProvider;
export default function App({ Component, pageProps }) {
  useEffect(() => {
    const firebaseApp = initializeApp(firebaseConfig);
    const messaging = getMessaging(firebaseApp);

    return () => {};
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      {/* <ModalProvider> */}
      <FeedTweetsProvider>
        <RandomProvider>
          <SelectedTweetProvider>
            <LikedPostsProvider>
              <Component {...pageProps} />
            </LikedPostsProvider>
          </SelectedTweetProvider>
        </RandomProvider>
      </FeedTweetsProvider>
      {/* </ModalProvider> */}
    </SessionProvider>
  );
}
