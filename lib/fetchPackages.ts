import { readCmsStore } from "@/lib/cms-store/server";
import { enrichedDefaultSections } from "@/lib/data";
import type { PackageSection } from "@/lib/data";

/** Homepage/service package sections from CMS store */
export async function fetchPackageSections(): Promise<PackageSection[]> {
  try {
    const store = await readCmsStore();
    if (store.sections?.length) {
      return store.sections;
    }
  } catch {
    // fallback below
  }
  return enrichedDefaultSections;
}

/** @deprecated alias */
export const fetchHomepageSections = fetchPackageSections;
