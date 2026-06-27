import { promises as fs } from "fs";
import path from "path";
import { site as defaultLegacySite } from "@/lib/data";
import { buildDefaultCmsStore } from "@/lib/cms-store/defaults";
import { migrateCmsSections } from "@/lib/packages/helpers";
import type { CmsStore } from "@/lib/cms-store/types";

const STORE_PATH = path.join(process.cwd(), "data", "cms-store.json");

let memoryStore: CmsStore | null = null;

/** Sync legacy contact fields between siteSettings and legacySite */
function syncLegacyContact(store: CmsStore): CmsStore {
  const phone = store.siteSettings.phone || defaultLegacySite.phoneNumber;
  const zalo = store.siteSettings.zaloUrl || defaultLegacySite.zalo;
  const messenger =
    store.siteSettings.messengerUrl ?? defaultLegacySite.messenger ?? "";

  return {
    ...store,
    sections: migrateCmsSections(store.sections),
    legacySite: {
      phoneNumber: phone,
      zalo,
      messenger,
    },
    siteSettings: {
      ...store.siteSettings,
      phone,
      zaloUrl: zalo,
      messengerUrl: messenger,
    },
  };
}

export function getStorePath() {
  return STORE_PATH;
}

export async function readCmsStore(): Promise<CmsStore> {
  if (memoryStore) return memoryStore;

  try {
    await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
    const raw = await fs.readFile(STORE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as CmsStore;
    if (parsed?.version === 1) {
      memoryStore = syncLegacyContact(parsed);
      return memoryStore;
    }
  } catch {
    // fall through to default
  }

  const defaults = buildDefaultCmsStore();
  memoryStore = defaults;
  try {
    await writeCmsStore(defaults, { skipMemory: true });
  } catch {
    // read-only filesystem (e.g. serverless) — memory only
  }
  return memoryStore;
}

export async function writeCmsStore(
  store: CmsStore,
  opts?: { skipMemory?: boolean },
): Promise<void> {
  const payload: CmsStore = {
    ...syncLegacyContact(store),
    updatedAt: new Date().toISOString(),
  };
  if (!opts?.skipMemory) {
    memoryStore = payload;
  }
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(payload, null, 2), "utf-8");
}

/** Clear memory cache after external write */
export function invalidateCmsStoreCache() {
  memoryStore = null;
}

export async function updateCmsStore(
  updater: (store: CmsStore) => CmsStore,
): Promise<CmsStore> {
  const current = await readCmsStore();
  const next = updater(current);
  await writeCmsStore(next);
  return next;
}
