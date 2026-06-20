import { promises as fs } from "fs";
import path from "path";
import {
  defaultSections,
  defaultSeo,
  site as defaultLegacySite,
} from "@/lib/data";
import { buildDefaultCmsStore } from "@/lib/cms-store/defaults";
import type { CmsStore } from "@/lib/cms-store/types";

const STORE_PATH = path.join(process.cwd(), "data", "cms-store.json");

let memoryStore: CmsStore | null = null;

/** Always pin production packages & contact from lib/data.ts */
function applyProductionDefaults(store: CmsStore): CmsStore {
  const s = store.siteSettings;
  return {
    ...store,
    sections: structuredClone(defaultSections),
    homepageSeo: { ...defaultSeo },
    legacySite: {
      phoneNumber: defaultLegacySite.phoneNumber,
      zalo: defaultLegacySite.zalo,
      messenger: defaultLegacySite.messenger ?? "",
    },
    siteSettings: {
      ...s,
      phone: defaultLegacySite.phoneNumber,
      zaloUrl: defaultLegacySite.zalo,
      messengerUrl: defaultLegacySite.messenger ?? "",
    },
  };
}

function syncLegacyContact(store: CmsStore): CmsStore {
  return applyProductionDefaults(store);
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
