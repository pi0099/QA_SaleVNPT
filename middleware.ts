import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";

/**
 * JWT verification intentionally runs in Node (protected layout), not here.
 * Edge Middleware on Vercel may not receive secrets from `.env*` files — only a
 * cookie presence check avoids “login succeeds then bounce back to login”.
 */
export function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  const { pathname, search } = req.nextUrl;

  // Redirect apex → www (matches Vercel domain redirect, avoids duplicate URLs).
  if (host === "ketnoimanghcm.vn") {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.host = `www.${host}`;
    return NextResponse.redirect(redirectUrl, 308);
  }

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
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
