import '@/styles/globals.css'
import ModalProvider from '@/providers/ModalProvider'
import { SessionProvider } from 'next-auth/react'
import SelectedTweetProvider from '@/providers/SelectedTweet'
import LikedPostsProvider from '@/providers/LikedPosts'

export default function App({ Component, pageProps }) {

  return <SessionProvider session={pageProps.session} >
    {/* <ModalProvider> */}
    <SelectedTweetProvider>
      <LikedPostsProvider>
        <Component {...pageProps} />
      </LikedPostsProvider>
    </SelectedTweetProvider>
    {/* </ModalProvider> */}
  </SessionProvider>
}
