import type { MetadataRoute } from "next";
import { robotsDisallowPaths } from "@/lib/sitemap-config";
import { getSiteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: robotsDisallowPaths,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: robotsDisallowPaths,
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
