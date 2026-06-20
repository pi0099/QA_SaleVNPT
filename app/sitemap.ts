import type { MetadataRoute } from "next";
import { getLocalLandingPaths } from "@/lib/local-seo";
import { getSiteUrl } from "@/lib/seo";

const routes = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/wifi-vnpt", priority: 0.9, changeFrequency: "weekly" },
  { path: "/sim-5g", priority: 0.85, changeFrequency: "weekly" },
  { path: "/camera-vnpt", priority: 0.8, changeFrequency: "weekly" },
  { path: "/tin-tuc-cong-nghe", priority: 0.75, changeFrequency: "daily" },
  { path: "/faq", priority: 0.8, changeFrequency: "monthly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const base = getSiteUrl();

  const staticRoutes = routes.map((route) => ({
    url: `${base}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const localRoutes = getLocalLandingPaths().map((route) => ({
    url: `${base}${route.path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.72,
  }));

  return [...staticRoutes, ...localRoutes];
}
