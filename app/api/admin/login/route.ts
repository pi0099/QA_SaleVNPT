import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  adminUsernameMatches,
  getAdminCredentials,
  getAdminSessionMaxAge,
  normalizeAdminCredential,
  resolveJwtSecret,
  signAdminSession,
} from "@/lib/admin-auth";

type LoginBody = {
  username?: string;
  /** Legacy: điền email thay username vẫn được (lấy phần trước @ nếu trùng env). */
  email?: string;
  password?: string;
};

export async function POST(req: Request) {
  let body: LoginBody = {};
  try {
    body = (await req.json()) as LoginBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const rawLogin =
    String(body.username || "").trim() ||
    String(body.email || "").trim();
  const username = normalizeAdminCredential(rawLogin);
  const password = normalizeAdminCredential(String(body.password || ""));

  const usernameCandidates = username.includes("@")
    ? Array.from(
        new Set([
          normalizeAdminCredential(username.split("@")[0] || ""),
          username,
        ]),
      ).filter(Boolean)
    : [username];

  if (!resolveJwtSecret()) {
    return NextResponse.json(
      {
        error:
          "Thiếu ADMIN_AUTH_SECRET trên máy chủ. Thêm biến này trong Environment Variables.",
      },
      { status: 503 },
    );
  }

  const admin = getAdminCredentials();
  if (!admin) {
    return NextResponse.json(
      {
        error:
          "Thiếu ADMIN_USERNAME hoặc ADMIN_PASSWORD trên máy chủ. Kiểm tra Environment Variables.",
      },
      { status: 503 },
    );
  }

  const usernameOk = usernameCandidates.some((u) =>
    adminUsernameMatches(u, admin.username),
  );
  if (!usernameOk || password !== admin.password) {
    return NextResponse.json(
      { error: "Tên đăng nhập hoặc mật khẩu không đúng." },
      { status: 401 },
    );
  }

  let token: string;
  try {
    token = await signAdminSession(admin.username);
  } catch {
    return NextResponse.json(
      {
        error:
          "Không thể tạo phiên đăng nhập. Kiểm tra ADMIN_AUTH_SECRET và redeploy.",
      },
      { status: 503 },
    );
  }
  const response = NextResponse.json({ ok: true, role: "admin" });
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: getAdminSessionMaxAge(),
  });
  return response;
}
