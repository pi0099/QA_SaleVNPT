import {
  sitemapChildUrl,
  sitemapIds,
} from "@/lib/sitemap-config";
import { getSiteUrl } from "@/lib/seo";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
  const base = getSiteUrl();
  const lastmod = new Date().toISOString();

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${sitemapChildUrl(base, sitemapIds.pages)}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${sitemapChildUrl(base, sitemapIds.news)}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
</sitemapindex>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
