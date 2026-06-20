"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Post, PostCategory } from "@/lib/content/types";
import { postCategoryLabels } from "@/lib/content/blog-images";

type NewsListViewProps = {
  initialPosts: Post[];
  totalPages: number;
  currentPage: number;
  currentCategory: PostCategory | "all";
  currentSearch: string;
};

function PostCardPlaceholder({ category }: { category: PostCategory }) {
  const gradients: Record<PostCategory, string> = {
    wifi: "from-blue-400 to-cyan-400",
    "sim-5g": "from-indigo-400 to-purple-400",
    camera: "from-slate-500 to-slate-700",
    troubleshooting: "from-amber-400 to-orange-500",
    tech: "from-emerald-400 to-teal-500",
  };

  return (
    <div
      className={`flex h-40 items-center justify-center rounded-t-2xl bg-gradient-to-br ${gradients[category]} text-4xl text-white/90`}
      aria-hidden
    >
      {category === "wifi" ? "📶" : category === "sim-5g" ? "📱" : category === "camera" ? "📷" : category === "troubleshooting" ? "🛠️" : "🛰️"}
    </div>
  );
}

function buildNewsUrl(params: {
  category?: string;
  page?: number;
  search?: string;
}) {
  const sp = new URLSearchParams();
  if (params.category && params.category !== "all") sp.set("category", params.category);
  if (params.page && params.page > 1) sp.set("page", String(params.page));
  if (params.search) sp.set("q", params.search);
  const qs = sp.toString();
  return qs ? `/news?${qs}` : "/news";
}

export default function NewsListView({
  initialPosts,
  totalPages,
  currentPage,
  currentCategory,
  currentSearch,
}: NewsListViewProps) {
  const [search, setSearch] = useState(currentSearch);

  const categories = useMemo(
    () => [
      { id: "all" as const, label: "Tất cả" },
      ...Object.entries(postCategoryLabels).map(([id, label]) => ({
        id: id as PostCategory,
        label,
      })),
    ],
    [],
  );

  return (
    <>
      <div className="landing-hero-shell border-b border-sky-100/80">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Tin tức công nghệ
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
            WiFi, SIM 5G, Camera và mẹo khắc phục sự cố — nội dung tư vấn thực tế cho khách hàng VNPT tại TP.HCM.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={buildNewsUrl({ category: cat.id, search: currentSearch })}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold transition ${
                  currentCategory === cat.id
                    ? "border-[#2563eb] bg-[#2563eb] text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-[#2563eb]"
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
          <form
            action="/news"
            method="get"
            className="flex w-full gap-2 sm:max-w-xs"
          >
            {currentCategory !== "all" ? (
              <input type="hidden" name="category" value={currentCategory} />
            ) : null}
            <input
              name="q"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm bài viết..."
              className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm outline-none focus:border-[#2563eb]"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-white"
            >
              Tìm
            </button>
          </form>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {initialPosts.map((post) => (
            <article
              key={post.slug}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
            >
              {post.featuredImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  loading="lazy"
                  width={400}
                  height={160}
                  className="h-40 w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <PostCardPlaceholder category={post.category} />
              )}
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-[#2563eb]">
                    {postCategoryLabels[post.category]}
                  </span>
                  <span>·</span>
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString("vi-VN")}
                  </time>
                  <span>·</span>
                  <span>{post.readingTime} phút đọc</span>
                </div>
                <h2 className="mt-2 text-lg font-bold text-slate-900">
                  <Link href={`/news/${post.slug}`} className="hover:text-[#2563eb]">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>

        {initialPosts.length === 0 ? (
          <p className="py-12 text-center text-slate-500">
            Không tìm thấy bài viết phù hợp.
          </p>
        ) : null}

        {totalPages > 1 ? (
          <div className="mt-8 flex justify-center gap-2">
            {currentPage > 1 ? (
              <Link
                href={buildNewsUrl({
                  category: currentCategory,
                  page: currentPage - 1,
                  search: currentSearch,
                })}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold hover:border-[#2563eb]"
              >
                ← Trước
              </Link>
            ) : null}
            <span className="flex items-center px-3 text-sm text-slate-500">
              Trang {currentPage}/{totalPages}
            </span>
            {currentPage < totalPages ? (
              <Link
                href={buildNewsUrl({
                  category: currentCategory,
                  page: currentPage + 1,
                  search: currentSearch,
                })}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold hover:border-[#2563eb]"
              >
                Sau →
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </>
  );
}
