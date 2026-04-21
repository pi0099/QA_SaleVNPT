import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  getAdminCredentials,
  getAdminSessionMaxAge,
  signAdminSession,
} from "@/lib/admin-auth";

type LoginBody = {
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

  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  const admin = getAdminCredentials();

  if (email !== admin.email.toLowerCase() || password !== admin.password) {
    return NextResponse.json(
      { error: "Email hoặc mật khẩu không đúng." },
      { status: 401 },
    );
  }

  const token = await signAdminSession(admin.email);
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
