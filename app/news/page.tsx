import type { Metadata } from "next";
import NewsListView from "@/components/NewsListView";
import { fetchPosts, postCategoryLabels } from "@/lib/content";
import { buildBlogListJsonLd } from "@/lib/content/schema";
import type { PostCategory } from "@/lib/content/types";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Tin tức công nghệ — WiFi, SIM 5G, Camera VNPT",
  description:
    "Tin tức và hướng dẫn WiFi VNPT, SIM 5G, Camera và khắc phục sự cố — nội dung tư vấn thực tế tại TP.HCM.",
  path: "/news",
});

type Props = {
  searchParams: {
    category?: string;
    page?: string;
    q?: string;
  };
};

const validCategories = new Set(Object.keys(postCategoryLabels));

export default async function NewsPage({ searchParams }: Props) {
  const categoryParam = searchParams.category ?? "all";
  const category =
    categoryParam === "all" || validCategories.has(categoryParam)
      ? (categoryParam as PostCategory | "all")
      : "all";
  const page = Math.max(1, Number(searchParams.page) || 1);
  const search = searchParams.q ?? "";

  const result = await fetchPosts({ category, page, search, limit: 9 });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBlogListJsonLd(result.total)),
        }}
      />
      <NewsListView
        initialPosts={result.posts}
        totalPages={result.totalPages}
        currentPage={result.page}
        currentCategory={category}
        currentSearch={search}
      />
    </>
  );
}
