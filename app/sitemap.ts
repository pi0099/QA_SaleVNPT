import type { MetadataRoute } from "next";
import { getAllServiceSlugs, getDedicatedLocalSlugs } from "@/lib/content";
import { getAllPublishedPosts } from "@/lib/blog/mergePosts";
import { getSiteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();

  const [publishedPosts, serviceSlugs, localSlugs] = await Promise.all([
    getAllPublishedPosts(),
    getAllServiceSlugs(),
    getDedicatedLocalSlugs(),
  ]);

  const staticRoutes = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/news", priority: 0.75, changeFrequency: "daily" as const },
    { path: "/faq", priority: 0.8, changeFrequency: "monthly" as const },
  ];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${base}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const serviceEntries = serviceSlugs.map((slug) => ({
    url: `${base}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: slug.includes("quan-12") ? 0.82 : 0.88,
  }));

  const localEntries = localSlugs
    .filter((slug) => !serviceSlugs.includes(slug))
    .map((slug) => ({
      url: `${base}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  /** Published posts only — drafts never included */
  const newsEntries = publishedPosts.map((post) => ({
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
