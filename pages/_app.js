import '@/styles/globals.css'
import ModalProvider from '@/providers/ModalProvider'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps }) {

  return <SessionProvider session={pageProps.session} >
    {/* <ModalProvider> */}
    <Component {...pageProps} />
    {/* </ModalProvider> */}
  </SessionProvider>
}
