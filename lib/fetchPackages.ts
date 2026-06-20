import { packageSections } from "@/data/packages";
import type { PackageSection } from "@/lib/data";

/** Production homepage/service package sections — always from lib/data.ts */
export async function fetchPackageSections(): Promise<PackageSection[]> {
  return packageSections;
}

/** @deprecated alias */
export const fetchHomepageSections = fetchPackageSections;
