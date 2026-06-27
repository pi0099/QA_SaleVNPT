import type { ServiceFaq, SiteSettings } from "@/lib/content/types";
import { getSiteUrl } from "@/lib/seo";
import type { PackageSection } from "@/lib/data";
import { defaultSiteSettings } from "@/lib/content/site-settings";
import {
  getHomepageTierCards,
  getSectionServicePath,
  parsePriceNumber,
} from "@/lib/packages/helpers";
import { getServiceAreaTags } from "@/lib/content/service-area-tags";

export function buildOrganizationJsonLd(
  settings: Pick<SiteSettings, "siteName" | "tagline" | "phone"> = defaultSiteSettings,
) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.siteName,
    url: siteUrl,
    description: settings.tagline,
    telephone: settings.phone,
    areaServed: {
      "@type": "City",
      name: "TP.HCM",
    },
  };
}

export function buildLocalBusinessJsonLd(
  settings: Pick<
    SiteSettings,
    "consultantName" | "tagline" | "phone" | "addressText" | "serviceAreaText"
  > = defaultSiteSettings,
) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${settings.consultantName} — Tư vấn VNPT`,
    description: settings.tagline,
    url: siteUrl,
    telephone: settings.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: settings.addressText ?? "Quận 12, TP.HCM",
      addressRegion: "TP.HCM",
      addressCountry: "VN",
    },
    areaServed: settings.serviceAreaText,
  };
}

export function buildServiceJsonLd({
  name,
  description,
  path,
  serviceSlug,
}: {
  name: string;
  description: string;
  path: string;
  serviceSlug?: string;
}) {
  const siteUrl = getSiteUrl();
  const areaTags = serviceSlug ? getServiceAreaTags(serviceSlug) : ["TP.HCM"];
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "LocalBusiness",
      name: defaultSiteSettings.consultantName,
      telephone: defaultSiteSettings.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "TP.HCM",
        addressRegion: "TP.HCM",
        addressCountry: "VN",
      },
    },
    areaServed: [
      { "@type": "City", name: "Thành phố Hồ Chí Minh" },
      ...areaTags.slice(0, 8).map((tag) => ({
        "@type": "AdministrativeArea",
        name: tag,
      })),
    ],
    url: `${siteUrl}${path}`,
  };
}

export function buildFaqPageJsonLd(faqs: ServiceFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildBreadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function buildBlogPostingJsonLd({
  title,
  description,
  path,
  publishedAt,
  dateModified,
  image,
}: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  dateModified?: string;
  image?: string;
}) {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: publishedAt,
    dateModified: dateModified ?? publishedAt,
    url: pageUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    image: image ? `${siteUrl}${image}` : `${siteUrl}/opengraph-image`,
    author: {
      "@type": "Person",
      name: defaultSiteSettings.consultantName,
    },
    publisher: {
      "@type": "Organization",
      name: defaultSiteSettings.siteName,
      url: siteUrl,
    },
  };
}

export function buildProductJsonLd({
  name,
  description,
  path,
  price,
  priceCurrency = "VND",
  image,
}: {
  name: string;
  description: string;
  path: string;
  price: string;
  priceCurrency?: string;
  image?: string;
}) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: image ? `${siteUrl}${image}` : `${siteUrl}/sim-u1500-hero.png`,
    brand: {
      "@type": "Brand",
      name: "VinaPhone",
    },
    offers: {
      "@type": "Offer",
      url: `${siteUrl}${path}`,
      priceCurrency,
      price,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: defaultSiteSettings.siteName,
      },
    },
  };
}

export function buildBlogListJsonLd(postCount: number) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Tin tức công nghệ",
    url: `${siteUrl}/news`,
    description: "Tin tức WiFi, SIM 5G, Camera và khắc phục sự cố viễn thông.",
    numberOfItems: postCount,
  };
}

export function buildHomepageItemListJsonLd(sections: PackageSection[]) {
  const siteUrl = getSiteUrl();

  const items = sections.flatMap((section) => {
    const path = getSectionServicePath(section) ?? "/";
    return getHomepageTierCards(section).map((card, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: `${section.title} — ${card.title}`,
        description: card.speed,
        url: `${siteUrl}${path}`,
        offers: {
          "@type": "Offer",
          priceCurrency: "VND",
          price: parsePriceNumber(card.price),
          availability: "https://schema.org/InStock",
        },
      },
    }));
  });

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Gói cước VNPT nổi bật",
    itemListElement: items,
  };
}
