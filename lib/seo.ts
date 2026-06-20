import type { Metadata } from "next";

export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ketnoimanghcm.vn"
  ).replace(/\/$/, "");
}

/** Normalize path for canonical URLs (no trailing slash except root). */
export function canonicalPath(path: string): string {
  if (!path || path === "/") return "/";
  const withLeading = path.startsWith("/") ? path : `/${path}`;
  return withLeading.replace(/\/+$/, "");
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[] | string;
}): Metadata {
  const canonical = canonicalPath(path);
  const keywordList =
    typeof keywords === "string"
      ? keywords
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean)
      : keywords;

  return {
    title,
    description,
    ...(keywordList?.length ? { keywords: keywordList } : {}),
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      locale: "vi_VN",
      url: canonical,
      title,
      description,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export const adminRobotsMetadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};
