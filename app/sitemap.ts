import type { MetadataRoute } from "next";
import { getAllServiceSlugs, getDedicatedLocalSlugs } from "@/lib/content";
import { getAllPublishedPosts } from "@/lib/blog/mergePosts";
import {
  marketingLandingPaths,
  staticSitemapPaths,
} from "@/lib/sitemap-config";
import { getSiteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();

  const [publishedPosts, serviceSlugs, localSlugs] = await Promise.all([
    getAllPublishedPosts(),
    getAllServiceSlugs(),
    getDedicatedLocalSlugs(),
  ]);

  const staticEntries: MetadataRoute.Sitemap = [
    ...staticSitemapPaths,
    ...marketingLandingPaths,
  ].map((route) => ({
    url: `${base}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const seen = new Set(staticEntries.map((e) => e.url));

  const serviceEntries: MetadataRoute.Sitemap = serviceSlugs
    .map((slug) => ({
      url: `${base}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: slug.includes("quan-12") ? 0.82 : 0.88,
    }))
    .filter((entry) => {
      if (seen.has(entry.url)) return false;
      seen.add(entry.url);
      return true;
    });

  const localEntries: MetadataRoute.Sitemap = localSlugs
    .filter((slug) => !serviceSlugs.includes(slug))
    .map((slug) => ({
      url: `${base}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
    .filter((entry) => {
      if (seen.has(entry.url)) return false;
      seen.add(entry.url);
      return true;
    });

  const newsEntries: MetadataRoute.Sitemap = publishedPosts.map((post) => ({
    url: `${base}/news/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  return [
    ...staticEntries,
    ...serviceEntries,
    ...localEntries,
    ...newsEntries,
  ];
}
