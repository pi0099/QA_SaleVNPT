"use client";

import { useCallback, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import {
  AdminError,
  AdminField,
  AdminToast,
  inputClass,
  selectClass,
  textareaClass,
} from "@/components/admin/cms/ui";
import type { Post } from "@/lib/content/types";
import type { SeoCheckResult } from "@/lib/blog/seoChecklist";
import type { GeneratedArticle } from "@/lib/ai/articleGenerator";
import type {
  GeneratorCategory,
  SearchIntent,
} from "@/lib/research/researchProvider";
import type { ArticleTone } from "@/lib/ai/articleGenerator";

type PreviewItem = {
  article: GeneratedArticle;
  seoCheck: SeoCheckResult;
  post: Post;
  researchWarning?: string;
};

const CATEGORIES: { value: GeneratorCategory; label: string }[] = [
  { value: "wifi-vnpt", label: "WiFi VNPT" },
  { value: "sim-5g", label: "SIM 5G / eSIM" },
  { value: "camera", label: "Camera" },
  { value: "troubleshooting", label: "Khắc phục sự cố" },
  { value: "internet-gia-dinh", label: "Internet gia đình" },
];

const INTENTS: { value: SearchIntent; label: string }[] = [
  { value: "informational", label: "Informational" },
  { value: "comparison", label: "Comparison" },
  { value: "troubleshooting", label: "Troubleshooting" },
  { value: "pricing", label: "Pricing" },
  { value: "local", label: "Local" },
];

const SERVICE_PAGES = [
  { value: "/wifi-vnpt", label: "WiFi VNPT" },
  { value: "/sim-5g-vnpt", label: "SIM 5G VNPT" },
  { value: "/camera-vnpt", label: "Camera VNPT" },
  { value: "/wifi-vnpt", label: "WiFi VNPT TP.HCM" },
  { value: "/internet-di-dong-vnpt", label: "Combo Internet + di động" },
];

const TONES: { value: ArticleTone; label: string }[] = [
  { value: "helpful", label: "Helpful" },
  { value: "professional", label: "Professional" },
  { value: "simple", label: "Simple" },
];

export default function AdminBlogGeneratorPage() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState<GeneratorCategory>("wifi-vnpt");
  const [searchIntent, setSearchIntent] = useState<SearchIntent>("informational");
  const [targetServicePage, setTargetServicePage] = useState("/wifi-vnpt");
  const [count, setCount] = useState(1);
  const [tone, setTone] = useState<ArticleTone>("helpful");
  const [manualUrls, setManualUrls] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [previews, setPreviews] = useState<PreviewItem[]>([]);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);

  const manualSourceUrls = manualUrls
    .split("\n")
    .map((u) => u.trim())
    .filter(Boolean);

  const runGenerate = useCallback(
    async (save: boolean) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/admin/blog-generator", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            keyword,
            category,
            searchIntent,
            targetServicePage,
            count,
            tone,
            manualSourceUrls,
            save,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Generation failed");
        setWarning(data.warning ?? null);
        setPreviews(data.previews ?? []);
        setExpandedIdx(0);
        if (save) {
          setToast(`Đã lưu ${data.saved} bài draft (${data.skipped} bỏ qua trùng slug)`);
          setTimeout(() => setToast(null), 4000);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Lỗi");
      } finally {
        setLoading(false);
      }
    },
    [
      keyword,
      category,
      searchIntent,
      targetServicePage,
      count,
      tone,
      manualSourceUrls,
    ],
  );

  return (
    <AdminShell
      title="Blog Generator"
      subtitle="Tạo bài viết draft từ topic brief — không auto-publish"
    >
      <AdminToast message={toast} />
      <AdminError message={error} />

      {warning && (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <strong>Lưu ý:</strong> {warning}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-bold text-slate-900">Cấu hình</h2>

          <AdminField label="Main keyword">
            <input
              className={inputClass}
              placeholder="VD: lắp wifi VNPT mất bao lâu"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </AdminField>

          <AdminField label="Category">
            <select
              className={selectClass}
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as GeneratorCategory)
              }
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </AdminField>

          <AdminField label="Search intent">
            <select
              className={selectClass}
              value={searchIntent}
              onChange={(e) =>
                setSearchIntent(e.target.value as SearchIntent)
              }
            >
              {INTENTS.map((i) => (
                <option key={i.value} value={i.value}>
                  {i.label}
                </option>
              ))}
            </select>
          </AdminField>

          <AdminField label="Target service page">
            <select
              className={selectClass}
              value={targetServicePage}
              onChange={(e) => setTargetServicePage(e.target.value)}
            >
              {SERVICE_PAGES.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </AdminField>

          <div className="grid grid-cols-2 gap-3">
            <AdminField label="Số bài draft">
              <input
                type="number"
                min={1}
                max={5}
                className={inputClass}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
              />
            </AdminField>
            <AdminField label="Tone">
              <select
                className={selectClass}
                value={tone}
                onChange={(e) => setTone(e.target.value as ArticleTone)}
              >
                {TONES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </AdminField>
          </div>

          <AdminField label="Manual source URLs (optional, 3–5)">
            <textarea
              className={textareaClass}
              rows={4}
              placeholder="https://...&#10;https://..."
              value={manualUrls}
              onChange={(e) => setManualUrls(e.target.value)}
            />
            <p className="mt-1 text-xs text-slate-500">
              URLs lưu vào sourceNotes — không scrape/copy nội dung.
            </p>
          </AdminField>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              disabled={loading}
              onClick={() => void runGenerate(false)}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              {loading ? "Đang tạo..." : "Preview draft"}
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => void runGenerate(true)}
              className="rounded-lg bg-[#2563eb] px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
            >
              {loading ? "Đang lưu..." : "Generate & save draft"}
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-bold text-slate-900">Hướng dẫn</h2>
          <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-slate-600">
            <li>Phase 1: dùng topic brief nội bộ — chưa kết nối research API.</li>
            <li>Tất cả bài tạo ra là <strong>draft</strong>, không auto-publish.</li>
            <li>Review tại News / Blog trước khi publish.</li>
            <li>Khi publish bài AI: bắt buộc tick checkbox review.</li>
            <li>Không copy nội dung từ nguồn ngoài — chỉ lưu URL tham khảo.</li>
          </ul>
        </div>
      </div>

      {previews.length > 0 && (
        <div className="mt-8 space-y-4">
          <h2 className="text-lg font-bold text-slate-900">
            Preview ({previews.length})
          </h2>
          {previews.map((item, idx) => (
            <PreviewCard
              key={item.post.id}
              item={item}
              open={expandedIdx === idx}
              onToggle={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
            />
          ))}
        </div>
      )}
    </AdminShell>
  );
}

function PreviewCard({
  item,
  open,
  onToggle,
}: {
  item: PreviewItem;
  open: boolean;
  onToggle: () => void;
}) {
  const { article, seoCheck } = item;
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <div>
          <p className="font-semibold text-slate-900">{article.title}</p>
          <p className="text-xs text-slate-500">
            /{article.slug} · {seoCheck.wordCount} từ · SEO{" "}
            {seoCheck.passed ? "✓" : "⚠"}
          </p>
        </div>
        <span className="text-slate-400">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="space-y-4 border-t border-slate-100 px-5 py-4 text-sm">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <p className="font-semibold text-slate-700">Excerpt</p>
              <p className="text-slate-600">{article.excerpt}</p>
            </div>
            <div>
              <p className="font-semibold text-slate-700">SEO</p>
              <p className="text-slate-600">{article.seoTitle}</p>
              <p className="text-xs text-slate-500">{article.seoDescription}</p>
            </div>
          </div>
          <div>
            <p className="font-semibold text-slate-700">OG / Facebook</p>
            <p className="text-slate-600">{article.ogTitle}</p>
            <pre className="mt-2 whitespace-pre-wrap rounded-lg bg-slate-50 p-3 text-xs">
              {article.facebookCaption}
            </pre>
          </div>
          <div>
            <p className="font-semibold text-slate-700">SEO checklist</p>
            <ul className="mt-1 grid gap-1 sm:grid-cols-2">
              {seoCheck.items.map((i) => (
                <li
                  key={i.id}
                  className={i.passed ? "text-emerald-700" : "text-amber-700"}
                >
                  {i.passed ? "✓" : "○"} {i.label}
                  {i.detail ? ` (${i.detail})` : ""}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-700">Source notes (admin only)</p>
            <pre className="mt-1 whitespace-pre-wrap rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
              {article.sourceNotes}
            </pre>
          </div>
          <div>
            <p className="font-semibold text-slate-700">Content preview</p>
            <div
              className="prose prose-sm mt-2 max-h-64 overflow-y-auto rounded-lg border border-slate-100 p-3"
              dangerouslySetInnerHTML={{ __html: article.content.slice(0, 3000) }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
