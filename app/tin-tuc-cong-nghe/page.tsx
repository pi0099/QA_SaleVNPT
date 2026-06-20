import type { Metadata } from "next";
import TechNewsView from "@/components/TechNewsView";
import { buildPageMetadata, getSiteUrl } from "@/lib/seo";
import { techNewsArticles } from "@/lib/tech-news";

const siteUrl = getSiteUrl();

export const metadata: Metadata = buildPageMetadata({
  title: "Tin Tức Công Nghệ — WiFi, 5G/6G, SIM, Internet vệ tinh",
  description:
    "Cập nhật tin tức công nghệ viễn thông mới nhất: mạng di động 5G/6G, WiFi 7, eSIM/iSIM và internet vệ tinh LEO trên toàn thế giới.",
  path: "/tin-tuc-cong-nghe",
  keywords: [
    "tin tức công nghệ",
    "5G",
    "6G",
    "WiFi 7",
    "eSIM",
    "internet vệ tinh",
    "Starlink",
    "viễn thông",
  ],
});

function buildTechNewsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Tin Tức Công Nghệ",
    url: `${siteUrl}/tin-tuc-cong-nghe`,
    description:
      "Tin tức công nghệ viễn thông: 5G/6G, WiFi, SIM và internet vệ tinh.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: techNewsArticles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}/tin-tuc-cong-nghe#${article.slug}`,
        name: article.title,
      })),
    },
  };
}

export default function TinTucCongNghePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildTechNewsJsonLd()),
        }}
      />
      <TechNewsView />
    </>
  );
}
