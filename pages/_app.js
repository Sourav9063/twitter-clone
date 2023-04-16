import "@/styles/globals.css";
import ModalProvider from "@/providers/ModalProvider";
import { SessionProvider } from "next-auth/react";
import SelectedTweetProvider from "@/providers/SelectedTweet";
import LikedPostsProvider from "@/providers/LikedPosts";
import RandomProvider from "@/providers/RandomProvider";
import FeedTweetsProvider from "@/providers/FeedTweetsProvider";
FeedTweetsProvider;
export default function App({ Component, pageProps }) {
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
