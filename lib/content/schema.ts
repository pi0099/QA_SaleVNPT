import { getSiteUrl } from "@/lib/seo";
import type { ServiceFaq } from "@/lib/content/types";
import { defaultSiteSettings } from "@/lib/content/site-settings";

export function buildOrganizationJsonLd() {
  const siteUrl = getSiteUrl();
  const settings = defaultSiteSettings;
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

export function buildLocalBusinessJsonLd() {
  const siteUrl = getSiteUrl();
  const settings = defaultSiteSettings;
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
}: {
  name: string;
  description: string;
  path: string;
}) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "LocalBusiness",
      name: defaultSiteSettings.consultantName,
      telephone: defaultSiteSettings.phone,
    },
    areaServed: {
      "@type": "City",
      name: "TP.HCM",
    },
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
