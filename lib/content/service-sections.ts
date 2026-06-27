/** Section ids shown on each service product page (pricing cards). */
export const servicePricingSectionIds: Record<string, string[]> = {
  "wifi-vnpt": ["internet-gia-dinh"],
  "internet-di-dong-vnpt": ["internet-di-dong"],
  "sim-5g-vnpt": ["goi-5g-data", "goi-5g-combo", "sim-4g"],
  "camera-vnpt": ["camera"],
};

export function getServicePricingSections(
  serviceSlug: string,
  primarySectionId: string | undefined,
  allSections: import("@/lib/data").PackageSection[],
): import("@/lib/data").PackageSection[] {
  const ids =
    servicePricingSectionIds[serviceSlug] ??
    (primarySectionId ? [primarySectionId] : []);

  return ids
    .map((id) => allSections.find((s) => s.id === id))
    .filter((s): s is import("@/lib/data").PackageSection => s != null);
}
