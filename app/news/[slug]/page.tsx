import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsDetailView from "@/components/NewsDetailView";
import {
  fetchPostBySlug,
  fetchPostsBySlugs,
  getAllPostSlugs,
} from "@/lib/content";
import {
  buildBlogPostingJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqPageJsonLd,
} from "@/lib/content/schema";
import { buildBlogPostMetadata } from "@/lib/seo";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await fetchPostBySlug(params.slug);
  if (!post) return {};
  return buildBlogPostMetadata(post);
}

export default async function NewsDetailPage({ params }: Props) {
  const post = await fetchPostBySlug(params.slug);
  if (!post) notFound();

  const relatedPosts = await fetchPostsBySlugs(post.relatedPostSlugs);
  const path = `/news/${post.slug}`;

  const jsonLd = [
    buildBlogPostingJsonLd({
      title: post.title,
      description: post.excerpt,
      path,
      publishedAt: post.publishedAt,
      dateModified: post.updatedAt ?? post.publishedAt,
      image: post.featuredImage,
    }),
    buildBreadcrumbJsonLd([
      { name: "Trang chủ", path: "/" },
      { name: "Tin tức", path: "/news" },
      { name: post.title, path },
    ]),
    ...(post.faqs?.length ? [buildFaqPageJsonLd(post.faqs)] : []),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NewsDetailView post={post} relatedPosts={relatedPosts} />
    </>
  );
}
