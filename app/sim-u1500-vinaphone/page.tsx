import type { Metadata } from "next";
import SimU1500LandingView from "@/components/SimU1500LandingView";
import { fetchLegacySite } from "@/lib/content";
import {
  buildBreadcrumbJsonLd,
  buildFaqPageJsonLd,
  buildProductJsonLd,
} from "@/lib/content/schema";
import {
  SIM_U1500_HERO_IMAGE,
  SIM_U1500_PATH,
  simU1500Faqs,
  simU1500Intro,
  simU1500MetaDescription,
  simU1500PageTitle,
  simU1500Price,
  simU1500SeoKeywords,
} from "@/lib/content/sim-u1500-data";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: simU1500PageTitle,
  description: simU1500MetaDescription,
  path: SIM_U1500_PATH,
  keywords: simU1500SeoKeywords,
  image: SIM_U1500_HERO_IMAGE,
  openGraphTitle: simU1500PageTitle,
  openGraphDescription: simU1500MetaDescription,
});

export default async function SimU1500VinaphonePage() {
  const legacySite = await fetchLegacySite();

  const jsonLd = [
    buildProductJsonLd({
      name: "SIM Data U1500 VinaPhone — 500GB/tháng",
      description: simU1500Intro.body,
      path: SIM_U1500_PATH,
      price: simU1500Price,
      image: SIM_U1500_HERO_IMAGE,
    }),
    buildFaqPageJsonLd(simU1500Faqs),
    buildBreadcrumbJsonLd([
      { name: "Trang chủ", path: "/" },
      { name: "SIM Data 500GB/Tháng", path: SIM_U1500_PATH },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SimU1500LandingView
        phoneNumber={legacySite.phoneNumber}
        zaloBaseUrl={legacySite.zalo}
      />
    </>
  );
}
