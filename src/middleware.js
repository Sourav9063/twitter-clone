// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(function middleware(req) {}, {
//   callbacks: {
//     authorized({ req, token }) {
//     },
//   },
//   pages: {
//     signIn: "/?modal=signin",
//   },
// });

// export const config = {
//   matcher: ["/profile/", "/posts/", "/message"],
// };

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // if (req.nextUrl.pathname.startsWith("/message")) {
    //   return NextResponse.redirect(
    //     new URL("/profile/?id=64326d06498c08c135977357", req.url)
    //   );
    // }
  },
  {
    callbacks: {
      authorized({ req, token }) {
        return !!token;
      },
    },
    // pages: {
    //   // signIn: "/?modal=signin",
    // },
  }
);

export const config = {
  matcher: ["/profile/:path*", "/posts/:path*", "/message/:path*"],
};
