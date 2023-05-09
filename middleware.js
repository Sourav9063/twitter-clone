import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized(params) {},
  },
});

export const config = {
  matcher: ["/profile/:id", "/posts/*", "/message*"],
};
