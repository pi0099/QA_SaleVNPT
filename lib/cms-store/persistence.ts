import { promises as fs } from "fs";
import path from "path";
import { list, put } from "@vercel/blob";
import {
  blobSdkOptions,
  canUseVercelBlob,
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

async function readStoreFromBlob(): Promise<CmsStore | null> {
  if (!canUseVercelBlob()) return null;

  try {
    const { blobs } = await list({ prefix: "cms/", ...blobSdkOptions() });
    const hit =
      blobs.find((blob) => blob.pathname === BLOB_PATHNAME) ??
      blobs.find((blob) => blob.pathname.endsWith(STORE_FILENAME));
    if (!hit?.url) return null;

    const res = await fetch(hit.url, { cache: "no-store" });
    if (!res.ok) return null;
    const parsed = (await res.json()) as CmsStore;
    return parsed?.version === 1 ? parsed : null;
  } catch {
    return null;
  }
}

export async function readPersistedStore(): Promise<CmsStore | null> {
  const fromBlob = await readStoreFromBlob();
  if (fromBlob) return fromBlob;
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
