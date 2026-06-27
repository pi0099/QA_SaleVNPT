import { getAllServiceSlugs } from "@/lib/content";
import { getAllPublishedPosts } from "@/lib/blog/mergePosts";
import {
  marketingLandingPaths,
  serviceSitemapPriority,
  sitemapIds,
  staticSitemapPaths,
} from "@/lib/sitemap-config";
import { getSiteUrl } from "@/lib/seo";

export const dynamic = "force-static";
export const revalidate = 3600;

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function urlEntry(
  url: string,
  lastmod: string,
  changefreq: string,
  priority: number,
): string {
  return `<url>
  <loc>${xmlEscape(url)}</loc>
  <lastmod>${lastmod}</lastmod>
  <changefreq>${changefreq}</changefreq>
  <priority>${priority}</priority>
</url>`;
}

export function generateStaticParams() {
  return [
    { id: String(sitemapIds.pages) },
    { id: String(sitemapIds.news) },
  ];
}

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const base = getSiteUrl();
  const id = Number(params.id);
  let entries: string[] = [];

  if (id === sitemapIds.news) {
    const publishedPosts = await getAllPublishedPosts();
    entries = publishedPosts.map((post) =>
      urlEntry(
        `${base}/news/${post.slug}`,
        new Date(post.updatedAt ?? post.publishedAt).toISOString(),
        "weekly",
        0.65,
      ),
    );
  } else if (id === sitemapIds.pages) {
    const serviceSlugs = await getAllServiceSlugs();
    const now = new Date().toISOString();
    const seen = new Set<string>();

    const staticEntries = [...staticSitemapPaths, ...marketingLandingPaths]
      .map((route) => {
        const url = `${base}${route.path}`;
        seen.add(url);
        return urlEntry(url, now, route.changeFrequency, route.priority);
      });

    const serviceEntries = serviceSlugs
      .map((slug) => {
        const url = `${base}/${slug}`;
        if (seen.has(url)) return null;
        seen.add(url);
        return urlEntry(
          url,
          now,
          "weekly",
          serviceSitemapPriority[slug] ?? 0.88,
        );
      })
      .filter((entry): entry is string => entry != null);

    entries = [...staticEntries, ...serviceEntries];
  } else {
    return new Response("Not found", { status: 404 });
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
