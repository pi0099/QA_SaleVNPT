import { homepageSeo, legacySite, siteSettings } from "@/data/siteSettings";
import type { SiteSettings } from "@/lib/content/types";

export async function fetchSiteSettings(): Promise<SiteSettings> {
  return siteSettings;
}

export async function fetchLegacySite() {
  return legacySite;
}

export async function fetchHomepageSeo() {
  return homepageSeo;
}
