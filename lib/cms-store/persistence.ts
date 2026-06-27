import { promises as fs } from "fs";
import path from "path";
import { BlobNotFoundError, get, head, put } from "@vercel/blob";
import {
  blobSdkOptions,
  canUseVercelBlob,
  CMS_BLOB_CACHE_MAX_AGE,
  isVercelRuntime,
} from "@/lib/cms-store/blob-auth";
import type { CmsStore } from "@/lib/cms-store/types";

const STORE_FILENAME = "cms-store.json";
const STORE_PATH = path.join(process.cwd(), "data", STORE_FILENAME);
const BLOB_PATHNAME = "cms/cms-store.json";

export function getStorePath() {
  return STORE_PATH;
}

export function canPersistToBlob(): boolean {
  return canUseVercelBlob();
}

async function readStoreFromFile(): Promise<CmsStore | null> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as CmsStore;
    return parsed?.version === 1 ? parsed : null;
  } catch {
    return null;
  }
}

async function parseStoreJson(text: string): Promise<CmsStore | null> {
  try {
    const parsed = JSON.parse(text) as CmsStore;
    return parsed?.version === 1 ? parsed : null;
  } catch {
    return null;
  }
}

async function readStoreFromBlob(): Promise<CmsStore | null> {
  if (!canUseVercelBlob()) return null;

  const sdkOptions = blobSdkOptions();

  try {
    const result = await get(BLOB_PATHNAME, {
      access: "public",
      ...sdkOptions,
    });

    if (result?.statusCode === 200 && result.stream) {
      const text = await new Response(result.stream).text();
      const parsed = await parseStoreJson(text);
      if (parsed) return parsed;
    }
  } catch (error) {
    if (!(error instanceof BlobNotFoundError)) {
      console.error("[cms-store] blob get failed:", error);
    }
  }

  try {
    const meta = await head(BLOB_PATHNAME, sdkOptions);
    if (!meta?.url) return null;

    const res = await fetch(`${meta.url}?v=${meta.uploadedAt.getTime()}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return parseStoreJson(await res.text());
  } catch (error) {
    if (!(error instanceof BlobNotFoundError)) {
      console.error("[cms-store] blob head/fetch failed:", error);
    }
    return null;
  }
}

export async function readPersistedStore(): Promise<CmsStore | null> {
  if (canUseVercelBlob()) {
    const fromBlob = await readStoreFromBlob();
    if (fromBlob) return fromBlob;
    // Trên Vercel: không fallback file trong repo (luôn là bản cũ từ git)
    if (isVercelRuntime()) return null;
  }

  return readStoreFromFile();
}

async function writeStoreToFile(store: CmsStore): Promise<void> {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf-8");
}

async function writeStoreToBlob(store: CmsStore): Promise<void> {
  if (!canUseVercelBlob()) {
    throw new Error(
      "Chưa cấu hình Vercel Blob. Connect store qa-sale-vnpt-blob vào project và redeploy.",
    );
  }

  await put(BLOB_PATHNAME, JSON.stringify(store, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: CMS_BLOB_CACHE_MAX_AGE,
    ...blobSdkOptions(),
  });
}

export async function writePersistedStore(store: CmsStore): Promise<void> {
  let fileError: unknown;

  if (canUseVercelBlob()) {
    await writeStoreToBlob(store);
    try {
      await writeStoreToFile(store);
    } catch {
      // Local file optional when blob succeeds (e.g. Vercel read-only FS).
    }
    return;
  }

  try {
    await writeStoreToFile(store);
  } catch (error) {
    fileError = error;
  }

  if (fileError) {
    throw new Error(
      "Không ghi được CMS store. Trên Vercel: connect Blob store vào project (BLOB_STORE_ID) rồi redeploy.",
    );
  }
}
