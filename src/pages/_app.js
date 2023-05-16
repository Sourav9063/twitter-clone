import "@/styles/globals.css";
import { app, firebaseConfig } from "@/helper/Firebase/FirebaseInit";
import { initializeApp } from "firebase/app";
import { getMessaging, isSupported } from "firebase/messaging";
import { useEffect } from "react";
import ProviderWrapper from "@/providers/ProviderWrapper";
export default function App({ Component, pageProps }) {
  useEffect(() => {
    const firebaseApp = initializeApp(firebaseConfig);
    const messaging = getMessaging(firebaseApp);
    return () => {};
  }, []);

  return (
    <ProviderWrapper pageProps={pageProps}>
      <Component {...pageProps} />
    </ProviderWrapper>
  );
}
