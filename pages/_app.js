import '@/styles/globals.css'
import ModalProvider from '@/providers/ModalProvider'
export default function App({ Component, pageProps }) {
  return <ModalProvider>
    <Component {...pageProps} />
  </ModalProvider>
}
