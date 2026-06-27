import { readCmsStore } from "@/lib/cms-store/server";
import { defaultSeo, site as defaultLegacySite } from "@/lib/data";
import { defaultSiteSettings } from "@/lib/content/site-settings";
import type { SiteSettings } from "@/lib/content/types";

export async function fetchSiteSettings(): Promise<SiteSettings & {
  headerSlogan?: string;
  footerColumns?: import("@/lib/cms-store/types").FooterColumn[];
  copyrightText?: string;
  designByText?: string;
  designByUrl?: string;
}> {
  try {
    const store = await readCmsStore();
    return store.siteSettings;
  } catch {
    return defaultSiteSettings;
  }
}

export async function fetchLegacySite() {
  try {
    const store = await readCmsStore();
    return store.legacySite;
  } catch {
    return defaultLegacySite;
  }
}

export async function fetchHomepageSeo() {
  try {
    const store = await readCmsStore();
    return store.homepageSeo;
  } catch {
    return defaultSeo;
  }
}

export async function fetchCmsStore() {
  return readCmsStore();
}
