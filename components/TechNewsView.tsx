"use client";

import { useMemo, useState } from "react";
import Section from "@/components/Section";
import NewsArticleCard from "@/components/NewsArticleCard";
import {
  techNewsArticles,
  techNewsCategoryIcons,
  techNewsCategoryLabels,
  type TechNewsCategory,
} from "@/lib/tech-news";

type FilterOption = "all" | TechNewsCategory;

const filterOptions: { value: FilterOption; label: string; icon?: string }[] = [
  { value: "all", label: "Tất cả" },
  {
    value: "troubleshooting",
    label: techNewsCategoryLabels.troubleshooting,
    icon: techNewsCategoryIcons.troubleshooting,
  },
  {
    value: "5g-6g",
    label: techNewsCategoryLabels["5g-6g"],
    icon: techNewsCategoryIcons["5g-6g"],
  },
  {
    value: "wifi",
    label: techNewsCategoryLabels.wifi,
    icon: techNewsCategoryIcons.wifi,
  },
  {
    value: "sim",
    label: techNewsCategoryLabels.sim,
    icon: techNewsCategoryIcons.sim,
  },
  {
    value: "satellite",
    label: techNewsCategoryLabels.satellite,
    icon: techNewsCategoryIcons.satellite,
  },
];

export default function TechNewsView() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");

  const filteredArticles = useMemo(() => {
    if (activeFilter === "all") return techNewsArticles;
    return techNewsArticles.filter((a) => a.category === activeFilter);
  }, [activeFilter]);

  return (
    <>
      <div className="border-b border-slate-200 bg-gradient-to-b from-white via-[#f0f6ff] to-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex items-center rounded-full border border-[#2563eb]/20 bg-[#2563eb]/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#2563eb]">
              Cập nhật mới nhất
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Tin Tức Công Nghệ
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Theo dõi xu hướng viễn thông toàn cầu: mạng di động 5G/6G, WiFi,
              SIM thông minh, internet vệ tinh và các cách xử lý sự cố kết nối
              thường gặp.
            </p>
          </div>
        </div>
      </div>

      <Section
        title="Bài viết nổi bật"
        subtitle={`${techNewsArticles.length} bài viết về công nghệ viễn thông và hướng dẫn khắc phục sự cố`}
        contentClassName="!mt-8"
      >
        <div
          className="mb-8 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Lọc theo chủ đề"
        >
          {filterOptions.map((option) => {
            const isActive = activeFilter === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(option.value)}
                className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] ${
                  isActive
                    ? "border-[#2563eb] bg-[#2563eb] text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-700 hover:border-[#2563eb] hover:text-[#2563eb]"
                }`}
              >
                {option.icon ? (
                  <span aria-hidden="true">{option.icon}</span>
                ) : null}
                {option.label}
              </button>
            );
          })}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <NewsArticleCard key={article.id} article={article} />
          ))}
        </div>

        {filteredArticles.length === 0 ? (
          <p className="text-center text-slate-500">
            Chưa có bài viết trong danh mục này.
          </p>
        ) : null}
      </Section>
    </>
  );
}
