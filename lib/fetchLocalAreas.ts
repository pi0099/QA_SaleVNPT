import { localAreas } from "@/data/localAreas";
import type { LocalArea } from "@/lib/content/types";

export async function fetchLocalAreas(): Promise<LocalArea[]> {
  return localAreas.filter((a) => a.isActive);
}

export async function fetchLocalAreaBySlug(
  slug: string,
): Promise<LocalArea | undefined> {
  return localAreas.find((a) => a.slug === slug && a.hasDedicatedPage);
}

export async function getDedicatedLocalSlugs(): Promise<string[]> {
  return localAreas
    .filter((a) => a.isActive && a.hasDedicatedPage)
    .map((a) => a.slug);
}
