import { jwtVerify, SignJWT } from "jose";
import type { NextRequest } from "next/server";

export const ADMIN_SESSION_COOKIE = "vnpt_admin_session";
const ADMIN_SESSION_DURATION_SECONDS = 60 * 60 * 12; // 12 hours

type AdminJwtPayload = {
  email: string;
  role: "admin";
};

function getJwtSecret(): Uint8Array {
  const secret =
    process.env.ADMIN_AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "dev-only-change-me-admin-auth-secret";
  return new TextEncoder().encode(secret);
}

export function getAdminCredentials() {
  return {
    email: process.env.ADMIN_EMAIL || "admin@vnptsupport.local",
    password: process.env.ADMIN_PASSWORD || "123456",
  };
}

export function getAdminSessionMaxAge() {
  return ADMIN_SESSION_DURATION_SECONDS;
}

export async function signAdminSession(email: string) {
  return await new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(email)
    .setIssuedAt()
    .setExpirationTime(`${ADMIN_SESSION_DURATION_SECONDS}s`)
    .sign(getJwtSecret());
}

export async function verifyAdminSession(
  token: string,
): Promise<AdminJwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret(), {
      algorithms: ["HS256"],
    });

    if (payload.role !== "admin" || typeof payload.email !== "string") {
      return null;
    }

    return {
      email: payload.email,
      role: "admin",
    };
  } catch {
    return null;
  }
}

export async function getAdminSessionFromRequest(req: NextRequest) {
  const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;
  return await verifyAdminSession(token);
}
