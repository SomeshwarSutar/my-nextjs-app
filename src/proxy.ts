import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      // Only allow ADMIN or EDITOR roles into /admin
      return token?.role === "ADMIN" || token?.role === "EDITOR";
    },
  },
});

export const config = {
  matcher: ["/admin/:path*"],
};