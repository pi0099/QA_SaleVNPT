import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  getAdminCredentials,
  getAdminSessionMaxAge,
  resolveJwtSecret,
  signAdminSession,
} from "@/lib/admin-auth";

type LoginBody = {
  username?: string;
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

  const username = String(body.username || "").trim();
  const password = String(body.password || "");

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

  if (username !== admin.username || password !== admin.password) {
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
