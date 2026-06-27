import type { MetadataRoute } from "next";
import {
  robotsDisallowPaths,
  sitemapChildUrl,
  sitemapIds,
} from "@/lib/sitemap-config";
import { getSiteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  const disallow = [...robotsDisallowPaths];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow,
      },
    ],
    sitemap: [
      `${base}/sitemap.xml`,
      sitemapChildUrl(base, sitemapIds.pages),
      sitemapChildUrl(base, sitemapIds.news),
    ],
    host: base,
  };
}
