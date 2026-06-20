"use client";

import Link from "next/link";
import { useState } from "react";
import {
  formatNewsDate,
  techNewsCategoryIcons,
  techNewsCategoryLabels,
  type TechNewsArticle,
} from "@/lib/tech-news";

type NewsArticleCardProps = {
  article: TechNewsArticle;
};

export default function NewsArticleCard({ article }: NewsArticleCardProps) {
  const [expanded, setExpanded] = useState(false);
  const categoryLabel = techNewsCategoryLabels[article.category];
  const categoryIcon = techNewsCategoryIcons[article.category];

  return (
    <article
      id={article.slug}
      className="flex h-full flex-col overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md scroll-mt-28"
    >
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
            <span aria-hidden="true">{categoryIcon}</span>
            {categoryLabel}
          </span>
          <time
            dateTime={article.publishedAt}
            className="text-xs text-slate-500"
          >
            {formatNewsDate(article.publishedAt)}
          </time>
          <span className="text-xs text-slate-400">
            · {article.readMinutes} phút đọc
          </span>
        </div>

        <h3 className="text-lg font-bold leading-snug text-slate-900">
          {article.title}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
          {expanded ? null : article.excerpt}
        </p>

        {expanded ? (
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700">
            {article.content.split("\n\n").map((paragraph, i) => (
              <p key={`${article.id}-p-${i}`}>{paragraph}</p>
            ))}
            {article.source ? (
              <p className="text-xs text-slate-500">
                Nguồn tham khảo: {article.source}
              </p>
            ) : null}
            {article.relatedLinks?.length ? (
              <div className="rounded-xl border border-blue-100 bg-blue-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                  Gợi ý liên quan
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {article.relatedLinks.map((link) => (
                    <Link
                      key={`${article.id}-${link.href}`}
                      href={link.href}
                      className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#2563eb] shadow-sm ring-1 ring-blue-100 transition-colors hover:bg-blue-600 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-semibold text-[#2563eb] transition-colors hover:text-[#1d4ed8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]"
          aria-expanded={expanded}
        >
          {expanded ? "Thu gọn" : "Đọc thêm"}
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </article>
  );
}
