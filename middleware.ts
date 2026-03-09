import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Admin routes protection
    if (path.startsWith("/dashboard/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard/client", req.url));
    }

    // Client routes protection
    if (path.startsWith("/dashboard/client") && token?.role !== "client" && token?.role !== "admin") {
      // If admin tries to access client dashboard, maybe allow it or redirect to admin
      // For now, let's redirect to admin if they are not client
      if (token?.role === "admin") {
         return NextResponse.redirect(new URL("/dashboard/admin", req.url));
      }
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
