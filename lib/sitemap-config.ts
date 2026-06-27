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

/** Legacy redirect — disallow in robots to avoid duplicate indexing with /news */
export const robotsDisallowPaths = ["/admin/", "/api/", "/tin-tuc-cong-nghe"];
