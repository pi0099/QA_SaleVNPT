import type { SiteSettings as LegacySiteContact } from "@/lib/data";
import type { CmsStore } from "@/lib/cms-store/types";

/** Contact fields for public site — always from siteSettings (source of truth). */
export function buildPublicSiteContact(store: CmsStore): LegacySiteContact {
  return {
    phoneNumber: store.siteSettings.phone?.trim() || "",
    zalo: store.siteSettings.zaloUrl?.trim() || "",
    messenger: store.siteSettings.messengerUrl?.trim() ?? "",
  };
}
