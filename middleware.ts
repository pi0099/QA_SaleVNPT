import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";

const legacyRedirects: Record<string, string> = {
  "/sim-5g": "/sim-5g-vnpt",
  "/tin-tuc-cong-nghe": "/news",
};

/** Old local area URLs → service page or Quận 12 local page */
function legacyAreaRedirect(pathname: string): string | null {
  const match = pathname.match(/^\/(wifi-vnpt|sim-5g|camera-vnpt)\/([^/]+)$/);
  if (!match) return null;
  const [, service, area] = match;
  if (service === "wifi-vnpt" && area === "quan-12") {
    return "/wifi-vnpt-quan-12";
  }
  if (service === "sim-5g") return "/sim-5g-vnpt";
  if (service === "wifi-vnpt") return "/wifi-vnpt";
  if (service === "camera-vnpt") return "/camera-vnpt";
  return null;
}

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  const { pathname, search } = req.nextUrl;

  if (host === "ketnoimanghcm.vn") {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.host = `www.${host}`;
    return NextResponse.redirect(redirectUrl, 308);
  }

  const legacyTarget = legacyRedirects[pathname];
  if (legacyTarget) {
    return NextResponse.redirect(new URL(legacyTarget, req.url), 308);
  }

  const areaTarget = legacyAreaRedirect(pathname);
  if (areaTarget) {
    return NextResponse.redirect(new URL(areaTarget, req.url), 308);
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
