import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";

/**
 * JWT verification intentionally runs in Node (protected layout), not here.
 * Edge Middleware on Vercel may not receive secrets from `.env*` files — only a
 * cookie presence check avoids “login succeeds then bounce back to login”.
 */
export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const sessionCookie = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    if (!sessionCookie) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("next", `${pathname}${search}`);
      return NextResponse.redirect(loginUrl);
    }

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-admin-pathname", `${pathname}${search}`);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
