"use client";

import { useState } from "react";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import Section from "@/components/Section";
import { faqsData } from "@/lib/content/faqs-data";
import { reviewSummary, testimonials } from "@/lib/content/testimonials";

function StarRow({ value, size = "md" }: { value: number; size?: "sm" | "md" }) {
  const cls = size === "sm" ? "text-sm" : "text-lg";
  return (
    <span className={`inline-flex text-amber-400 ${cls}`} aria-hidden>
      {"★".repeat(Math.round(value))}
      <span className="text-slate-200">{"★".repeat(5 - Math.round(value))}</span>
    </span>
  );
}

export default function HomeReviewsQaSection() {
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const faqItems = faqsData
    .filter((f) => f.isActive)
    .sort((a, b) => a.order - b.order)
    .map((f) => ({ question: f.question, answer: f.answer }));

  const maxBreakdown = Math.max(...reviewSummary.breakdown.map((b) => b.count), 1);

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setSubmitted(true);
  };

  return (
    <Section
      id="home-reviews-faq"
      title="Đánh giá & Hỏi đáp"
      subtitle="Phản hồi khách hàng và câu trả lời nhanh trước khi đăng ký."
      contentClassName="!mt-8"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Đánh giá trung bình
            </p>
            <div className="mt-3 flex flex-wrap items-end gap-4">
              <p className="text-5xl font-extrabold text-slate-900">
                {reviewSummary.average.toFixed(1)}
              </p>
              <div>
                <StarRow value={reviewSummary.average} />
                <p className="mt-1 text-sm text-slate-500">
                  {reviewSummary.total}+ lượt đánh giá tư vấn
                </p>
              </div>
            </div>
            <ul className="mt-6 space-y-2">
              {reviewSummary.breakdown.map((row) => (
                <li key={row.stars} className="flex items-center gap-3 text-sm">
                  <span className="w-8 shrink-0 font-medium text-slate-600">
                    {row.stars} ★
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-amber-400"
                      style={{ width: `${(row.count / maxBreakdown) * 100}%` }}
                    />
                  </div>
                  <span className="w-8 shrink-0 text-right text-slate-500">{row.count}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            {testimonials.map((t) => (
              <article
                key={t.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-bold text-slate-900">{t.name}</p>
                  <StarRow value={t.rating} size="sm" />
                </div>
                <p className="mt-1 text-xs font-medium text-[#2563eb]">
                  {t.service} · {t.area}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{t.comment}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Câu hỏi thường gặp</h3>
            <p className="mt-2 text-sm text-slate-600">
              Xem thêm tại trang{" "}
              <Link href="/faq" className="font-semibold text-[#2563eb] hover:underline">
                FAQ đầy đủ
              </Link>
              .
            </p>
            <div className="mt-4">
              <FaqAccordion items={faqItems.slice(0, 8)} />
            </div>
          </div>

          <div className="rounded-2xl border border-[#2563eb]/20 bg-blue-50/40 p-6">
            <h3 className="text-lg font-bold text-slate-900">Đặt câu hỏi</h3>
            <p className="mt-2 text-sm text-slate-600">
              Gửi câu hỏi — tôi trả lời qua Zalo hoặc điện thoại trong giờ hành chính.
            </p>
            {submitted ? (
              <p className="mt-4 rounded-xl bg-white px-4 py-3 text-sm font-medium text-emerald-700 shadow-sm">
                Cảm ơn bạn! Vui lòng tiếp tục tại form đăng ký bên dưới để tôi liên hệ nhanh hơn.
              </p>
            ) : (
              <form onSubmit={handleAsk} className="mt-4 space-y-3">
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={3}
                  placeholder="Ví dụ: Nhà tôi ở Quận 12, nên chọn gói 300Mbps hay 500Mbps?"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none ring-[#2563eb] focus:ring-2"
                  required
                />
                <button
                  type="submit"
                  className="inline-flex min-h-[44px] w-full items-center justify-center rounded-xl bg-[#2563eb] px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700 sm:w-auto"
                >
                  Gửi câu hỏi
                </button>
              </form>
            )}
            <a
              href="#lead-form-home"
              className="mt-4 inline-flex text-sm font-semibold text-[#2563eb] hover:underline"
            >
              Hoặc điền form đăng ký tư vấn →
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
