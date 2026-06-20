import { posts as staticPosts } from "@/data/posts";
import type { Post } from "@/lib/content/types";

/** Published posts: static production baseline + admin-published from cms-store */
export async function getAllPublishedPosts(): Promise<Post[]> {
  const baseline = staticPosts.filter((p) => p.status === "published");
  const baselineSlugs = new Set(baseline.map((p) => p.slug));

  try {
    const { readCmsStore } = await import("@/lib/cms-store/server");
    const store = await readCmsStore();
    const fromStore = store.posts.filter(
      (p) => p.status === "published" && !baselineSlugs.has(p.slug),
    );
    return [...baseline, ...fromStore];
  } catch {
    return baseline;
  }
}

export async function getPublishedPostBySlug(
  slug: string,
): Promise<Post | undefined> {
  const all = await getAllPublishedPosts();
  return all.find((p) => p.slug === slug);
}
