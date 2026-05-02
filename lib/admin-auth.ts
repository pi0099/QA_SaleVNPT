import type { NextRequest } from "next/server";

export const ADMIN_SESSION_COOKIE = "vnpt_admin_session";
const ADMIN_SESSION_DURATION_SECONDS = 60 * 60 * 12; // 12 hours

type AdminJwtPayload = {
  username: string;
  role: "admin";
};

type JwtClaims = {
  username?: string;
  /** @deprecated legacy token field */
  email?: string;
  role: "admin";
  sub: string;
  iat: number;
  exp: number;
};

function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

/** BOM / accidental whitespace when pasting env vars (e.g. Vercel dashboard). */
export function normalizeAdminCredential(value: string): string {
  return value.replace(/^\uFEFF/, "").trim();
}

/**
 * Production: chỉ ADMIN_AUTH_SECRET (bắt buộc).
 * Development: ADMIN_AUTH_SECRET → NEXTAUTH_SECRET → fallback cố định (không dùng production).
 */
export function resolveJwtSecret(): string | null {
  const explicit = normalizeAdminCredential(
    process.env.ADMIN_AUTH_SECRET ?? "",
  );
  if (explicit) return explicit;
  if (isProduction()) return null;
  const nextAuth = normalizeAdminCredential(process.env.NEXTAUTH_SECRET ?? "");
  return (
    nextAuth ||
    "dev-only-change-me-admin-auth-secret"
  );
}

function requireJwtSecretForSigning(): string {
  const secret = resolveJwtSecret();
  if (!secret) {
    throw new Error(
      "ADMIN_AUTH_SECRET is required in production. Add it to your environment variables.",
    );
  }
  return secret;
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

async function signHmac(secret: string, input: string): Promise<Uint8Array> {
  const secretBytes = new TextEncoder().encode(secret);
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

/**
 * Production: bắt buộc ADMIN_USERNAME và ADMIN_PASSWORD trong env (không hardcode).
 * Development: có thể dùng env hoặc fallback admin / 123456.
 */
export function getAdminCredentials(): {
  username: string;
  password: string;
} | null {
  if (isProduction()) {
    const username = normalizeAdminCredential(
      process.env.ADMIN_USERNAME ?? "",
    );
    const passwordRaw = process.env.ADMIN_PASSWORD;
    const password =
      typeof passwordRaw === "string"
        ? normalizeAdminCredential(passwordRaw)
        : passwordRaw;
    if (!username || password === undefined || password === "") {
      return null;
    }
    return { username, password };
  }

  const envUser = normalizeAdminCredential(process.env.ADMIN_USERNAME ?? "");
  const legacyEmail = normalizeAdminCredential(process.env.ADMIN_EMAIL ?? "");
  const username =
    envUser ||
    (legacyEmail ? legacyEmail.split("@")[0] || legacyEmail : "") ||
    "admin";
  const devPassRaw = process.env.ADMIN_PASSWORD;
  const devPassword =
    devPassRaw !== undefined && devPassRaw !== ""
      ? normalizeAdminCredential(devPassRaw)
      : "123456";
  return {
    username,
    password: devPassword,
  };
}

/** True when production env đủ để đăng nhập admin và ký JWT. */
export function isAdminEnvConfigured(): boolean {
  if (!isProduction()) return true;
  const pass = process.env.ADMIN_PASSWORD;
  const passOk =
    typeof pass === "string" && normalizeAdminCredential(pass) !== "";
  return Boolean(
    resolveJwtSecret() &&
      normalizeAdminCredential(process.env.ADMIN_USERNAME ?? "") &&
      passOk,
  );
}

/** So khớp username không phân biệt hoa thường (tránh lệch so với env trên Vercel). */
export function adminUsernameMatches(
  inputUsername: string,
  configuredUsername: string,
): boolean {
  const a = normalizeAdminCredential(inputUsername);
  const b = normalizeAdminCredential(configuredUsername);
  return (
    a.localeCompare(b, undefined, {
      sensitivity: "base",
    }) === 0
  );
}

export function getAdminSessionMaxAge() {
  return ADMIN_SESSION_DURATION_SECONDS;
}

export async function signAdminSession(username: string) {
  const secret = requireJwtSecretForSigning();
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "HS256", typ: "JWT" };
  const payload: JwtClaims = {
    username,
    role: "admin",
    sub: username,
    iat: now,
    exp: now + ADMIN_SESSION_DURATION_SECONDS,
  };
  const encodedHeader = encodeBase64Url(JSON.stringify(header));
  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const signature = await signHmac(secret, unsignedToken);
  return `${unsignedToken}.${encodeBase64Url(signature)}`;
}

export async function verifyAdminSession(
  token: string,
): Promise<AdminJwtPayload | null> {
  try {
    const secret = resolveJwtSecret();
    if (!secret) return null;

    const [encodedHeader, encodedPayload, encodedSignature] = token.split(".");
    if (!encodedHeader || !encodedPayload || !encodedSignature) return null;

    const unsignedToken = `${encodedHeader}.${encodedPayload}`;
    const actualSignature = decodeBase64Url(encodedSignature);
    const expectedSignature = await signHmac(secret, unsignedToken);
    if (!safeEqual(actualSignature, expectedSignature)) return null;

    const payloadJson = new TextDecoder().decode(decodeBase64Url(encodedPayload));
    const payload = JSON.parse(payloadJson) as Partial<JwtClaims>;
    const now = Math.floor(Date.now() / 1000);
    if (typeof payload.exp !== "number" || payload.exp <= now) return null;

    if (payload.role !== "admin") return null;

    const username =
      typeof payload.username === "string"
        ? payload.username
        : typeof payload.email === "string"
          ? payload.email
          : null;
    if (!username) return null;

    return {
      username,
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
