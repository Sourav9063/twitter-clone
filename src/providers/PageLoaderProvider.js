import Loader from "@/components/common/loader/Loader";
import PageLoading from "@/components/pageLoading/PageLoading";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

import React from "react";

export const PageLoaderContext = createContext(null);

export default function PageLoaderProvider({ children }) {
  const [pageLoader, setPageLoader] = useState(false);
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeStart", (url) => {
      setPageLoader(true);
    });

    router.events.on("routeChangeComplete", (url) => {
      setPageLoader(false);
    });

    router.events.on("routeChangeError", (url) => {
      setPageLoader(false);
    });
    return () => {};
  }, [router]);

  return (
    <PageLoaderContext.Provider value={[pageLoader, setPageLoader]}>
      {children}
      {pageLoader && <PageLoaderComponent />}
    </PageLoaderContext.Provider>
  );
}

function PageLoaderComponent() {
  return (
    <div className="outer">
      <Loader size={75}></Loader>
      <style jsx>{`
        .outer {
          position: fixed;
          top: 0;
          left: 0;

          right: 0;
          bottom: 0;
           {
            /* background-color: rgba(0, 0, 0, 0.25); */
          }
          z-index: 100;
          display: grid;
          justify-content: center;
          align-items: center;
          animation: outerAnimation 0.3s ease-out forwards;
          overflow-y: scroll;
          animation: loading 1s ease forwards;
        }

        .outer::-webkit-scrollbar {
          display: none;
        }
        @keyframes loading {
          0% {
            backdrop-filter: blur(0px);
          }
          100% {
            backdrop-filter: blur(8px);
          }
        }

        .outer {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
