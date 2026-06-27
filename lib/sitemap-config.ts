/** Public marketing / landing pages included in sitemap (not CMS services). */
export const marketingLandingPaths = [
  {
    path: "/sim-u1500-vinaphone",
    priority: 0.95,
    changeFrequency: "weekly" as const,
  },
] as const;

export const staticSitemapPaths = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/news", priority: 0.75, changeFrequency: "daily" as const },
  { path: "/faq", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/lien-he", priority: 0.85, changeFrequency: "monthly" as const },
] as const;

/** Service slugs → sitemap priority (default 0.88 when omitted). */
export const serviceSitemapPriority: Record<string, number> = {
  "wifi-vnpt": 0.9,
  "sim-5g-vnpt": 0.89,
  "internet-di-dong-vnpt": 0.88,
  "camera-vnpt": 0.88,
};

/** Paths blocked from indexing (redirects, admin, API, legacy duplicates). */
export const robotsDisallowPaths = [
  "/admin/",
  "/api/",
  "/_next/",
  "/tin-tuc-cong-nghe",
  "/wifi-vnpt-quan-12",
  "/sim-5g",
] as const;

/** Child sitemap ids — /sitemap/[id].xml */
export const sitemapIds = {
  pages: 0,
  news: 1,
} as const;

export type SitemapId = (typeof sitemapIds)[keyof typeof sitemapIds];

export function sitemapChildUrl(base: string, id: SitemapId): string {
  return `${base}/sitemap/${id}.xml`;
}
