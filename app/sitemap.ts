import type { MetadataRoute } from "next";
import { getAllServiceSlugs } from "@/lib/content";
import { getAllPublishedPosts } from "@/lib/blog/mergePosts";
import {
  marketingLandingPaths,
  serviceSitemapPriority,
  sitemapIds,
  staticSitemapPaths,
} from "@/lib/sitemap-config";
import { getSiteUrl } from "@/lib/seo";

export async function generateSitemaps() {
  return [{ id: sitemapIds.pages }, { id: sitemapIds.news }];
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();

  if (id === sitemapIds.news) {
    const publishedPosts = await getAllPublishedPosts();
    return publishedPosts.map((post) => ({
      url: `${base}/news/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.65,
    }));
  }

  const serviceSlugs = await getAllServiceSlugs();

  const staticEntries: MetadataRoute.Sitemap = [
    ...staticSitemapPaths,
    ...marketingLandingPaths,
  ].map((route) => ({
    url: `${base}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const seen = new Set(staticEntries.map((entry) => entry.url));

  const serviceEntries: MetadataRoute.Sitemap = serviceSlugs
    .map((slug) => ({
      url: `${base}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: serviceSitemapPriority[slug] ?? 0.88,
    }))
    .filter((entry) => {
      if (seen.has(entry.url)) return false;
      seen.add(entry.url);
      return true;
    });

  return [...staticEntries, ...serviceEntries];
}
