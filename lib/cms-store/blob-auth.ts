import type { PutCommandOptions } from "@vercel/blob";

/** Long-lived token — dùng khi chạy ngoài Vercel hoặc store chưa upgrade OIDC */
export function blobReadWriteToken(): string | undefined {
  return process.env.BLOB_READ_WRITE_TOKEN?.trim() || undefined;
}

export function blobStoreId(): string | undefined {
  return process.env.BLOB_STORE_ID?.trim() || undefined;
}

/** Vercel tự inject khi store đã connect + deploy (OIDC, khuyến nghị 2026+) */
export function hasBlobOidc(): boolean {
  return Boolean(blobStoreId());
}

/** Có thể đọc/ghi Blob qua @vercel/blob SDK */
export function canUseVercelBlob(): boolean {
  return Boolean(blobReadWriteToken()) || hasBlobOidc();
}

export function isVercelRuntime(): boolean {
  return process.env.VERCEL === "1";
}

/** Chỉ truyền `token` khi dùng legacy auth — OIDC dùng env tự động */
export function blobSdkOptions(): Pick<PutCommandOptions, "token" | "storeId"> {
  const token = blobReadWriteToken();
  if (token) return { token };
  const storeId = blobStoreId();
  if (storeId) return { storeId };
  return {};
}

/** CMS JSON thay đổi thường xuyên — cache tối thiểu (60s) để tránh đọc bản cũ */
export const CMS_BLOB_CACHE_MAX_AGE = 60;
