import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageView from "@/components/ServicePageView";
import {
  fetchHomepageSections,
  fetchLegacySite,
  fetchPostsBySlugs,
  fetchServiceBySlug,
  getAllServiceSlugs,
} from "@/lib/content";
import {
  buildBreadcrumbJsonLd,
  buildFaqPageJsonLd,
  buildServiceJsonLd,
} from "@/lib/content/schema";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: { serviceSlug: string } };

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  return slugs.map((serviceSlug) => ({ serviceSlug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await fetchServiceBySlug(params.serviceSlug);
  if (!service) return {};
  return buildPageMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/${service.slug}`,
    openGraphTitle: service.seoTitle,
    openGraphDescription: service.seoDescription,
  });
}

export default async function ServicePage({ params }: Props) {
  const service = await fetchServiceBySlug(params.serviceSlug);
  if (!service) notFound();

  const [relatedPosts, sections, legacySite] = await Promise.all([
    fetchPostsBySlugs(service.relatedPostSlugs),
    fetchHomepageSections(),
    fetchLegacySite(),
  ]);

  const path = `/${service.slug}`;
  const jsonLd = [
    buildServiceJsonLd({
      name: service.title,
      description: service.shortDescription,
      path,
      serviceSlug: service.slug,
    }),
    buildFaqPageJsonLd(service.faqs),
    buildBreadcrumbJsonLd([
      { name: "Trang chủ", path: "/" },
      { name: service.title, path },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageView
        service={service}
        relatedPosts={relatedPosts}
        zaloBaseUrl={legacySite.zalo}
        sections={sections}
      />
    </>
  );
}
