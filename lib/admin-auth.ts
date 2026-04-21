import type { NextRequest } from "next/server";

export const ADMIN_SESSION_COOKIE = "vnpt_admin_session";
const ADMIN_SESSION_DURATION_SECONDS = 60 * 60 * 12; // 12 hours

type AdminJwtPayload = {
  email: string;
  role: "admin";
};

type JwtClaims = AdminJwtPayload & {
  sub: string;
  iat: number;
  exp: number;
};

function getJwtSecret(): string {
  return (
    process.env.ADMIN_AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "dev-only-change-me-admin-auth-secret"
  );
}

function encodeBase64Url(input: string | Uint8Array): string {
  const bytes = typeof input === "string" ? new TextEncoder().encode(input) : input;
  let base64 = "";

  if (typeof btoa === "function") {
    let binary = "";
    for (let i = 0; i < bytes.length; i += 1) {
      binary += String.fromCharCode(bytes[i]);
    }
    base64 = btoa(binary);
  } else {
    base64 = Buffer.from(bytes).toString("base64");
  }

  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeBase64Url(base64url: string): Uint8Array {
  const padded = base64url.replace(/-/g, "+").replace(/_/g, "/");
  const padLength = (4 - (padded.length % 4)) % 4;
  const normalized = padded + "=".repeat(padLength);
  if (typeof atob === "function") {
    const binary = atob(normalized);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }
  return new Uint8Array(Buffer.from(normalized, "base64"));
}

async function signHmac(input: string): Promise<Uint8Array> {
  const secretBytes = new TextEncoder().encode(getJwtSecret());
  const secretBuffer = secretBytes.buffer.slice(
    secretBytes.byteOffset,
    secretBytes.byteOffset + secretBytes.byteLength,
  ) as ArrayBuffer;
  const key = await crypto.subtle.importKey(
    "raw",
    secretBuffer,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(input),
  );
  return new Uint8Array(signature);
}

function safeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a[i] ^ b[i];
  }
  return diff === 0;
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
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "HS256", typ: "JWT" };
  const payload: JwtClaims = {
    email,
    role: "admin",
    sub: email,
    iat: now,
    exp: now + ADMIN_SESSION_DURATION_SECONDS,
  };
  const encodedHeader = encodeBase64Url(JSON.stringify(header));
  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const signature = await signHmac(unsignedToken);
  return `${unsignedToken}.${encodeBase64Url(signature)}`;
}

export async function verifyAdminSession(
  token: string,
): Promise<AdminJwtPayload | null> {
  try {
    const [encodedHeader, encodedPayload, encodedSignature] = token.split(".");
    if (!encodedHeader || !encodedPayload || !encodedSignature) return null;

    const unsignedToken = `${encodedHeader}.${encodedPayload}`;
    const actualSignature = decodeBase64Url(encodedSignature);
    const expectedSignature = await signHmac(unsignedToken);
    if (!safeEqual(actualSignature, expectedSignature)) return null;

    const payloadJson = new TextDecoder().decode(decodeBase64Url(encodedPayload));
    const payload = JSON.parse(payloadJson) as Partial<JwtClaims>;
    const now = Math.floor(Date.now() / 1000);
    if (typeof payload.exp !== "number" || payload.exp <= now) return null;

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
