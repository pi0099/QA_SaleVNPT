import { buildDefaultCmsStore } from "@/lib/cms-store/defaults";
import { defaultHomepageBanners } from "@/lib/cms-store/banner-defaults";
import {
  readPersistedStore,
  writePersistedStore,
} from "@/lib/cms-store/persistence";
import { migrateCmsSections } from "@/lib/packages/helpers";
import type { CmsStore, HomepageBannerSlide } from "@/lib/cms-store/types";
import { site as defaultLegacySite } from "@/lib/data";

function normalizeHomepageBanners(
  banners: HomepageBannerSlide[] | undefined,
): HomepageBannerSlide[] {
  if (Array.isArray(banners) && banners.length > 0) {
    return banners;
  }
  return structuredClone(defaultHomepageBanners);
}

/** Sync legacy contact fields between siteSettings and legacySite */
function syncLegacyContact(store: CmsStore): CmsStore {
  const phone = store.siteSettings.phone || defaultLegacySite.phoneNumber;
  const zalo = store.siteSettings.zaloUrl || defaultLegacySite.zalo;
  const messenger =
    store.siteSettings.messengerUrl ?? defaultLegacySite.messenger ?? "";

  return {
    ...store,
    sections: migrateCmsSections(store.sections),
    homepageBanners: normalizeHomepageBanners(store.homepageBanners),
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

/** Always read fresh from persistence — no cross-request memory cache (serverless-safe). */
export async function readCmsStore(): Promise<CmsStore> {
  const persisted = await readPersistedStore();
  if (persisted) {
    return syncLegacyContact(persisted);
  }

  const defaults = buildDefaultCmsStore();
  try {
    await writeCmsStore(defaults, { skipMemory: true });
  } catch {
    // read-only filesystem (e.g. serverless without blob) — memory only
  }
  return defaults;
}

export async function writeCmsStore(
  store: CmsStore,
  opts?: { skipMemory?: boolean },
): Promise<void> {
  void opts;
  const payload: CmsStore = {
    ...syncLegacyContact(store),
    updatedAt: new Date().toISOString(),
  };
  await writePersistedStore(payload);
}

/** @deprecated no-op — reads are always fresh from persistence */
export function invalidateCmsStoreCache() {
  // kept for API compatibility
}

export async function updateCmsStore(
  updater: (store: CmsStore) => CmsStore,
): Promise<CmsStore> {
  const current = await readCmsStore();
  const next = updater(current);
  await writeCmsStore(next);
  return next;
}
