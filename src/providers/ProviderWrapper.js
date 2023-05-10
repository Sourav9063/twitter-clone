import { SessionProvider } from "next-auth/react";
import React from "react";
import RecentMessageProvider from "./RecentMessageProvider";
import FeedTweetsProvider, { FeedTweetsContext } from "./FeedTweetsProvider";
import RandomProvider from "./RandomProvider";
import SelectedTweetProvider from "./SelectedTweet";
import LikedPostsProvider from "./LikedPosts";

export default function ProviderWrapper({ children, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <RecentMessageProvider>
        <FeedTweetsProvider>
          <RandomProvider>
            <SelectedTweetProvider>
              <LikedPostsProvider>{children}</LikedPostsProvider>
            </SelectedTweetProvider>
          </RandomProvider>
        </FeedTweetsProvider>
      </RecentMessageProvider>
    </SessionProvider>
  );
}

// <SessionProvider session={pageProps.session}>
//   <RecentMessageProvider>
//     <FeedTweetsProvider>
//       <RandomProvider>
//         <SelectedTweetProvider>
//           <LikedPostsProvider>
//             <Component {...pageProps} />
//           </LikedPostsProvider>
//         </SelectedTweetProvider>
//       </RandomProvider>
//     </FeedTweetsProvider>
//   </RecentMessageProvider>
// </SessionProvider>
