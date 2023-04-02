import { withAuth } from "next-auth/middleware";

// export { default } from "next-auth/middleware";

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized(params) {
      console.log(params);
    },
  },
});

export const config = { matcher: ["/profile/:id", "/posts/:postid*"] };
