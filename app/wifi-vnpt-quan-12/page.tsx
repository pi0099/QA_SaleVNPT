import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocalServicePageView from "@/components/LocalServicePageView";
import {
  fetchHomepageSections,
  fetchLegacySite,
  fetchLocalAreaBySlug,
  fetchPostsBySlugs,
} from "@/lib/content";
import {
  buildBreadcrumbJsonLd,
  buildFaqPageJsonLd,
  buildServiceJsonLd,
} from "@/lib/content/schema";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const area = await fetchLocalAreaBySlug("wifi-vnpt-quan-12");
  if (!area) return {};
  return buildPageMetadata({
    title: area.seoTitle,
    description: area.seoDescription,
    path: "/wifi-vnpt-quan-12",
  });
}

export default async function WifiVnptQuan12Page() {
  const area = await fetchLocalAreaBySlug("wifi-vnpt-quan-12");
  if (!area) notFound();

  const [relatedPosts, sections, legacySite] = await Promise.all([
    fetchPostsBySlugs(area.relatedPostSlugs),
    fetchHomepageSections(),
    fetchLegacySite(),
  ]);

  const path = "/wifi-vnpt-quan-12";
  const jsonLd = [
    buildServiceJsonLd({
      name: `Lắp WiFi VNPT ${area.name}`,
      description: area.seoDescription,
      path,
    }),
    buildFaqPageJsonLd(area.faqs),
    buildBreadcrumbJsonLd([
      { name: "Trang chủ", path: "/" },
      { name: "WiFi VNPT", path: "/wifi-vnpt" },
      { name: area.name, path },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LocalServicePageView
        area={area}
        relatedPosts={relatedPosts}
        zaloBaseUrl={legacySite.zalo}
        sections={sections}
      />
    </>
  );
}
