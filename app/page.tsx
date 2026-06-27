import type { Metadata } from "next";
import HomeView from "@/components/HomeView";
import { faqsData } from "@/lib/content/faqs-data";
import {
  buildFaqPageJsonLd,
  buildHomepageItemListJsonLd,
} from "@/lib/content/schema";
import { fetchHomepageSections, fetchHomepageSeo } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchHomepageSeo();
  return buildPageMetadata({
    title: seo.title,
    description: seo.description,
    path: "/",
    keywords: seo.keywords,
  });
}

export default async function Home() {
  const sections = await fetchHomepageSections();
  const faqItems = faqsData
    .filter((f) => f.isActive)
    .sort((a, b) => a.order - b.order)
    .slice(0, 8)
    .map((f) => ({ question: f.question, answer: f.answer }));

  const jsonLd = [
    buildHomepageItemListJsonLd(sections),
    buildFaqPageJsonLd(faqItems),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeView initialSections={sections} />
    </>
  );
}
