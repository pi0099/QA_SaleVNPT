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
  openGraphType = "website",
  openGraphTitle,
  openGraphDescription,
  image,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[] | string;
  openGraphType?: "website" | "article";
  openGraphTitle?: string;
  openGraphDescription?: string;
  image?: string;
}): Metadata {
  const canonical = canonicalPath(path);
  const keywordList =
    typeof keywords === "string"
      ? keywords
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean)
      : keywords;

  const ogTitle = openGraphTitle ?? title;
  const ogDescription = openGraphDescription ?? description;
  const ogImage = image ?? "/opengraph-image";

  return {
    title,
    description,
    ...(keywordList?.length ? { keywords: keywordList } : {}),
    alternates: {
      canonical,
    },
    openGraph: {
      type: openGraphType,
      locale: "vi_VN",
      url: canonical,
      title: ogTitle,
      description: ogDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
    },
  };
}

/** Blog post metadata — article OG type, optional custom OG fields */
export function buildBlogPostMetadata(post: {
  seoTitle: string;
  seoDescription: string;
  slug: string;
  ogTitle?: string;
  ogDescription?: string;
  featuredImage?: string;
  tags?: string[];
}): Metadata {
  return buildPageMetadata({
    title: post.seoTitle,
    description: post.seoDescription,
    path: `/news/${post.slug}`,
    keywords: post.tags,
    openGraphType: "article",
    openGraphTitle: post.ogTitle ?? post.seoTitle,
    openGraphDescription: post.ogDescription ?? post.seoDescription,
    image: post.featuredImage,
  });
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
