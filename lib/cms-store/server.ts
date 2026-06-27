import { buildDefaultCmsStore } from "@/lib/cms-store/defaults";
import {
  readPersistedStore,
  writePersistedStore,
} from "@/lib/cms-store/persistence";
import { migrateCmsSections } from "@/lib/packages/helpers";
import type { CmsStore } from "@/lib/cms-store/types";
import { site as defaultLegacySite } from "@/lib/data";

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

export { getStorePath } from "@/lib/cms-store/persistence";

export async function readCmsStore(): Promise<CmsStore> {
  if (memoryStore) return memoryStore;

  const persisted = await readPersistedStore();
  if (persisted) {
    memoryStore = syncLegacyContact(persisted);
    return memoryStore;
  }

  const defaults = buildDefaultCmsStore();
  memoryStore = defaults;
  try {
    await writeCmsStore(defaults, { skipMemory: true });
  } catch {
    // read-only filesystem (e.g. serverless without blob) — memory only
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
  await writePersistedStore(payload);
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
