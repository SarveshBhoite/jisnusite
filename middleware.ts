import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { resolveModuleFromPath } from "@/lib/employee-permissions";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;
    const role = token?.role;

    if (path.startsWith("/dashboard/admin")) {
      if (role === "admin") return;

      if (role === "employee") {
        const module = resolveModuleFromPath(path);
        if (!module) {
          return NextResponse.redirect(new URL("/dashboard/employee", req.url));
        }

        const permissions = Array.isArray(token?.permissions) ? token.permissions : [];
        const current = permissions.find((item: any) => item?.module === module);
        if (current?.canView) return;

        return NextResponse.redirect(new URL("/dashboard/employee", req.url));
      }

      return NextResponse.redirect(new URL("/dashboard/client", req.url));
    }

    if (path.startsWith("/dashboard/employee")) {
      if (role === "employee") return;
      if (role === "admin") {
        return NextResponse.redirect(new URL("/dashboard/admin", req.url));
      }
      if (role === "client") {
        return NextResponse.redirect(new URL("/dashboard/client", req.url));
      }
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (path.startsWith("/dashboard/client") && role !== "client" && role !== "admin") {
      if (role === "employee") {
        return NextResponse.redirect(new URL("/dashboard/employee", req.url));
      }
      if (role === "admin") {
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
