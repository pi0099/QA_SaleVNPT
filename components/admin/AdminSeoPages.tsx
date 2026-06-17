"use client";

import { useEffect, useMemo, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { localAreas, localServices } from "@/lib/local-seo";
import {
  createSeoAdminId,
  getDefaultSeoAdminPayload,
  getSeoAdminPayload,
  getTrafficPayload,
  saveSeoAdminPayload,
  type GoogleAdCampaign,
  type SeoAdminPayload,
  type SeoKeywordItem,
} from "@/lib/seo-admin-storage";

const inputClass =
  "mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2563eb]";
const labelClass = "text-sm font-medium text-slate-700";

function parseLines(value: string): string[] {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseTags(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatVnd(value: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

function percent(value: number): string {
  return `${(Number.isFinite(value) ? value : 0).toFixed(2)}%`;
}

function normalizeKeywordKey(item: Pick<SeoKeywordItem, "keyword" | "targetUrl">) {
  return `${item.targetUrl.trim().toLowerCase()}::${item.keyword
    .trim()
    .toLowerCase()}`;
}

function buildPageKeywordSuggestions(): SeoKeywordItem[] {
  const staticPages: SeoKeywordItem[] = [
    {
      id: "kw-page-home",
      keyword: "đăng ký WiFi VNPT online",
      tags: ["wifi", "vnpt", "dang-ky-online", "hcm"],
      intent: "transactional",
      priority: "high",
      targetUrl: "/",
      status: "active",
      notes: "Keyword chính cho homepage bán online.",
    },
    {
      id: "kw-page-wifi-vnpt",
      keyword: "lắp WiFi VNPT TP.HCM",
      tags: ["wifi", "vnpt", "internet", "hcm"],
      intent: "transactional",
      priority: "high",
      targetUrl: "/wifi-vnpt",
      status: "active",
      notes: "Landing page sản phẩm cho ads và SEO.",
    },
    {
      id: "kw-page-sim-5g",
      keyword: "đăng ký SIM 5G VNPT online",
      tags: ["sim", "5g", "data", "vnpt"],
      intent: "transactional",
      priority: "high",
      targetUrl: "/sim-5g",
      status: "active",
      notes: "Landing page SIM/data cho ads và SEO.",
    },
    {
      id: "kw-page-camera-vnpt",
      keyword: "lắp Camera VNPT online",
      tags: ["camera", "vnpt", "cloud", "hcm"],
      intent: "transactional",
      priority: "high",
      targetUrl: "/camera-vnpt",
      status: "active",
      notes: "Landing page camera cho ads và SEO.",
    },
    {
      id: "kw-page-faq",
      keyword: "câu hỏi thường gặp lắp WiFi VNPT",
      tags: ["faq", "wifi", "vnpt", "ho-tro"],
      intent: "informational",
      priority: "medium",
      targetUrl: "/faq",
      status: "active",
      notes: "Trang hỗ trợ tăng trust và FAQ schema.",
    },
    {
      id: "kw-page-tech-news",
      keyword: "tin tức công nghệ viễn thông",
      tags: ["tin-tuc", "cong-nghe", "vien-thong", "5g"],
      intent: "informational",
      priority: "low",
      targetUrl: "/tin-tuc-cong-nghe",
      status: "active",
      notes: "Trang nội dung hỗ trợ topical authority.",
    },
  ];

  const localPages = localServices.flatMap((service) =>
    localAreas.map((area) => ({
      id: `kw-page-${service.slug}-${area.slug}`,
      keyword: `${service.primaryKeyword} ${area.name}`,
      tags: [service.slug, area.slug, "hcm", "local-seo"],
      intent: "local" as const,
      priority: "medium" as const,
      targetUrl: `/${service.slug}/${area.slug}`,
      status: "active" as const,
      notes: `Keyword local SEO cho ${service.shortLabel} tại ${area.name}.`,
    })),
  );

  return [...staticPages, ...localPages];
}

function useSeoAdminDraft() {
  const [draft, setDraft] = useState<SeoAdminPayload>(() =>
    getDefaultSeoAdminPayload(),
  );
  const [loaded, setLoaded] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    if (loaded) return;
    setDraft(getSeoAdminPayload());
    setLoaded(true);
  }, [loaded]);

  const save = () => {
    saveSeoAdminPayload(draft);
    setSavedAt(new Date().toLocaleTimeString("vi-VN"));
  };

  return { draft, setDraft, save, savedAt };
}

function SaveBar({
  onSave,
  savedAt,
}: {
  onSave: () => void;
  savedAt: string | null;
}) {
  return (
    <div className="sticky bottom-4 z-10 mt-6 flex flex-wrap items-center justify-end gap-3 rounded-xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur">
      {savedAt ? (
        <span className="text-sm font-medium text-green-700">
          Đã lưu lúc {savedAt}
        </span>
      ) : null}
      <button
        type="button"
        onClick={onSave}
        className="rounded-lg bg-[#2563eb] px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
      >
        Lưu cấu hình
      </button>
    </div>
  );
}

function KeywordEditor({
  item,
  onChange,
  onDelete,
}: {
  item: SeoKeywordItem;
  onChange: (next: SeoKeywordItem) => void;
  onDelete: () => void;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Keyword / Tag
          </p>
          <h3 className="text-base font-bold text-slate-900">
            {item.keyword || "Keyword mới"}
          </h3>
        </div>
        <button
          type="button"
          onClick={onDelete}
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
        >
          Xóa
        </button>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label>
          <span className={labelClass}>Keyword chính</span>
          <input
            value={item.keyword}
            onChange={(e) => onChange({ ...item, keyword: e.target.value })}
            className={inputClass}
            placeholder="VD: lắp wifi VNPT TPHCM"
          />
        </label>
        <label>
          <span className={labelClass}>Target URL</span>
          <input
            value={item.targetUrl}
            onChange={(e) => onChange({ ...item, targetUrl: e.target.value })}
            className={inputClass}
            placeholder="/wifi-vnpt"
          />
        </label>
        <label className="md:col-span-2">
          <span className={labelClass}>Tags (phân cách bằng dấu phẩy)</span>
          <input
            value={item.tags.join(", ")}
            onChange={(e) => onChange({ ...item, tags: parseTags(e.target.value) })}
            className={inputClass}
            placeholder="wifi, vnpt, hcm, lap-dat"
          />
        </label>
        <label>
          <span className={labelClass}>Search intent</span>
          <select
            value={item.intent}
            onChange={(e) =>
              onChange({
                ...item,
                intent: e.target.value as SeoKeywordItem["intent"],
              })
            }
            className={inputClass}
          >
            <option value="informational">Informational</option>
            <option value="commercial">Commercial</option>
            <option value="transactional">Transactional</option>
            <option value="local">Local</option>
          </select>
        </label>
        <label>
          <span className={labelClass}>Ưu tiên</span>
          <select
            value={item.priority}
            onChange={(e) =>
              onChange({
                ...item,
                priority: e.target.value as SeoKeywordItem["priority"],
              })
            }
            className={inputClass}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <label>
          <span className={labelClass}>Trạng thái</span>
          <select
            value={item.status}
            onChange={(e) =>
              onChange({
                ...item,
                status: e.target.value as SeoKeywordItem["status"],
              })
            }
            className={inputClass}
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
          </select>
        </label>
        <label className="md:col-span-2">
          <span className={labelClass}>Ghi chú</span>
          <textarea
            value={item.notes}
            onChange={(e) => onChange({ ...item, notes: e.target.value })}
            rows={3}
            className={inputClass}
          />
        </label>
      </div>
    </div>
  );
}

export function SeoKeywordsAdminPage() {
  const { draft, setDraft, save, savedAt } = useSeoAdminDraft();
  const [generatedCount, setGeneratedCount] = useState<number | null>(null);

  const addKeyword = () => {
    const item: SeoKeywordItem = {
      id: createSeoAdminId("kw"),
      keyword: "",
      tags: [],
      intent: "commercial",
      priority: "medium",
      targetUrl: "/",
      status: "draft",
      notes: "",
    };
    setDraft((current) => ({ ...current, keywords: [item, ...current.keywords] }));
    setGeneratedCount(null);
  };

  const generatePageKeywords = () => {
    const suggestions = buildPageKeywordSuggestions();
    setDraft((current) => {
      const existing = new Set(current.keywords.map(normalizeKeywordKey));
      const additions = suggestions.filter((item) => {
        const key = normalizeKeywordKey(item);
        if (existing.has(key)) return false;
        existing.add(key);
        return true;
      });
      setGeneratedCount(additions.length);
      return {
        ...current,
        keywords: [...additions, ...current.keywords],
      };
    });
  };

  const updateKeyword = (id: string, next: SeoKeywordItem) => {
    setDraft((current) => ({
      ...current,
      keywords: current.keywords.map((item) => (item.id === id ? next : item)),
    }));
  };

  const deleteKeyword = (id: string) => {
    setDraft((current) => ({
      ...current,
      keywords: current.keywords.filter((item) => item.id !== id),
    }));
  };

  return (
    <AdminShell
      title="SEO: Keyword, Tag & Google Config"
      subtitle="Quản lý keyword/tag, Search Console, Analytics, robots, canonical và schema."
    >
      <div className="space-y-6">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Keyword & Tag
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Dùng để gom nhóm nội dung, lên landing page và target Google Ads.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={generatePageKeywords}
                className="rounded-lg bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Generate theo trang
              </button>
              <button
                type="button"
                onClick={addKeyword}
                className="rounded-lg border border-dashed border-[#2563eb] bg-[#2563eb]/5 px-4 py-2 text-sm font-semibold text-[#2563eb] hover:bg-[#2563eb]/10"
              >
                + Thêm keyword
              </button>
            </div>
          </div>
          {generatedCount !== null ? (
            <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-800">
              {generatedCount > 0
                ? `Đã thêm ${generatedCount} keyword/tag mới theo các trang hiện có.`
                : "Không có keyword mới để thêm. Các trang hiện có đã có keyword/tag."}
            </div>
          ) : null}
        </div>

        {draft.keywords.map((item) => (
          <KeywordEditor
            key={item.id}
            item={item}
            onChange={(next) => updateKeyword(item.id, next)}
            onDelete={() => deleteKeyword(item.id)}
          />
        ))}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-bold text-slate-900">
            Google / Technical SEO
          </h2>
          <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900">
            <p className="font-semibold">Luu y truoc khi chay ads</p>
            <p className="mt-1">
              Cac truong trong admin hien luu tren trinh duyet. Tracking san
              pham can duoc cau hinh bang bien moi truong production:
              NEXT_PUBLIC_GA_ID, NEXT_PUBLIC_GTM_ID, NEXT_PUBLIC_META_PIXEL_ID
              va NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_SEND_TO.
            </p>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label>
              <span className={labelClass}>Google Search Console URL</span>
              <input
                value={draft.google.googleSearchConsoleUrl}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    google: {
                      ...d.google,
                      googleSearchConsoleUrl: e.target.value,
                    },
                  }))
                }
                className={inputClass}
                placeholder="https://search.google.com/search-console/..."
              />
            </label>
            <label>
              <span className={labelClass}>Google Analytics ID</span>
              <input
                value={draft.google.googleAnalyticsId}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    google: { ...d.google, googleAnalyticsId: e.target.value },
                  }))
                }
                className={inputClass}
                placeholder="G-XXXXXXXXXX"
              />
            </label>
            <label>
              <span className={labelClass}>Google Tag Manager ID</span>
              <input
                value={draft.google.googleTagManagerId}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    google: { ...d.google, googleTagManagerId: e.target.value },
                  }))
                }
                className={inputClass}
                placeholder="GTM-XXXXXXX"
              />
            </label>
            <label>
              <span className={labelClass}>Canonical Base URL</span>
              <input
                value={draft.google.canonicalBaseUrl}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    google: { ...d.google, canonicalBaseUrl: e.target.value },
                  }))
                }
                className={inputClass}
                placeholder="https://ketnoimanghcm.vn"
              />
            </label>
            <label>
              <span className={labelClass}>Robots policy</span>
              <select
                value={draft.google.robotsPolicy}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    google: {
                      ...d.google,
                      robotsPolicy: e.target.value as SeoAdminPayload["google"]["robotsPolicy"],
                    },
                  }))
                }
                className={inputClass}
              >
                <option value="index-follow">index, follow</option>
                <option value="noindex">noindex</option>
                <option value="custom">custom</option>
              </select>
            </label>
            <label>
              <span className={labelClass}>OG Image URL</span>
              <input
                value={draft.google.ogImageUrl}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    google: { ...d.google, ogImageUrl: e.target.value },
                  }))
                }
                className={inputClass}
              />
            </label>
            <label>
              <span className={labelClass}>Schema Business Name</span>
              <input
                value={draft.google.schemaBusinessName}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    google: { ...d.google, schemaBusinessName: e.target.value },
                  }))
                }
                className={inputClass}
              />
            </label>
            <label>
              <span className={labelClass}>Schema Phone</span>
              <input
                value={draft.google.schemaPhone}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    google: { ...d.google, schemaPhone: e.target.value },
                  }))
                }
                className={inputClass}
              />
            </label>
            <label>
              <span className={labelClass}>Schema Area Served</span>
              <input
                value={draft.google.schemaAreaServed}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    google: { ...d.google, schemaAreaServed: e.target.value },
                  }))
                }
                className={inputClass}
              />
            </label>
            <label className="md:col-span-2">
              <span className={labelClass}>Custom robots meta</span>
              <input
                value={draft.google.customRobots}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    google: { ...d.google, customRobots: e.target.value },
                  }))
                }
                className={inputClass}
                placeholder="VD: max-snippet:-1, max-image-preview:large"
              />
            </label>
          </div>
        </div>
        <SaveBar onSave={save} savedAt={savedAt} />
      </div>
    </AdminShell>
  );
}

export function TrafficAdminPage() {
  const [traffic, setTraffic] = useState(() => getTrafficPayload());

  const stats = useMemo(() => {
    const byPath = new Map<string, number>();
    const byDay = new Map<string, number>();
    for (const event of traffic.events) {
      byPath.set(event.path, (byPath.get(event.path) ?? 0) + 1);
      const day = event.timestamp.slice(0, 10);
      byDay.set(day, (byDay.get(day) ?? 0) + 1);
    }
    return {
      total: traffic.events.length,
      uniquePages: byPath.size,
      topPages: Array.from(byPath.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10),
      byDay: Array.from(byDay.entries()).sort((a, b) =>
        b[0].localeCompare(a[0]),
      ),
    };
  }, [traffic]);

  return (
    <AdminShell
      title="Lượt truy cập trang"
      subtitle="Theo dõi pageview được ghi local từ các trang public."
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Tổng lượt xem</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {stats.total}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Trang có traffic</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {stats.uniquePages}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Lượt xem hôm nay</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {
                traffic.events.filter((event) =>
                  event.timestamp.startsWith(new Date().toISOString().slice(0, 10)),
                ).length
              }
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-bold text-slate-900">Top pages</h2>
              <button
                type="button"
                onClick={() => setTraffic(getTrafficPayload())}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Refresh
              </button>
            </div>
            <div className="mt-4 space-y-3">
              {stats.topPages.map(([path, count]) => (
                <div
                  key={path}
                  className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2"
                >
                  <span className="min-w-0 truncate text-sm font-medium text-slate-700">
                    {path}
                  </span>
                  <span className="text-sm font-bold text-[#2563eb]">{count}</span>
                </div>
              ))}
              {stats.topPages.length === 0 ? (
                <p className="text-sm text-slate-500">
                  Chưa có dữ liệu. Truy cập trang public rồi refresh.
                </p>
              ) : null}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-bold text-slate-900">
              Lượt xem theo ngày
            </h2>
            <div className="mt-4 space-y-3">
              {stats.byDay.map(([day, count]) => (
                <div
                  key={day}
                  className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2"
                >
                  <span className="text-sm font-medium text-slate-700">{day}</span>
                  <span className="text-sm font-bold text-[#2563eb]">{count}</span>
                </div>
              ))}
              {stats.byDay.length === 0 ? (
                <p className="text-sm text-slate-500">Chưa có dữ liệu ngày.</p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-bold text-slate-900">
            Log truy cập gần nhất
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-xs uppercase text-slate-400">
                <tr>
                  <th className="py-2 pr-4">Thời gian</th>
                  <th className="py-2 pr-4">Trang</th>
                  <th className="py-2 pr-4">Referrer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {traffic.events.slice(0, 30).map((event) => (
                  <tr key={event.id}>
                    <td className="py-2 pr-4 text-slate-500">
                      {new Date(event.timestamp).toLocaleString("vi-VN")}
                    </td>
                    <td className="py-2 pr-4 font-medium text-slate-800">
                      {event.path}
                    </td>
                    <td className="py-2 pr-4 text-slate-500">
                      {event.referrer || "Direct"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

function CampaignEditor({
  campaign,
  onChange,
  onDelete,
}: {
  campaign: GoogleAdCampaign;
  onChange: (next: GoogleAdCampaign) => void;
  onDelete: () => void;
}) {
  const ctr = campaign.impressions ? (campaign.clicks / campaign.impressions) * 100 : 0;
  const cpc = campaign.clicks ? campaign.cost / campaign.clicks : 0;
  const cpa = campaign.conversions ? campaign.cost / campaign.conversions : 0;
  const roas = campaign.cost ? campaign.revenue / campaign.cost : 0;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Campaign
          </p>
          <h3 className="text-base font-bold text-slate-900">
            {campaign.name || "Campaign mới"}
          </h3>
        </div>
        <button
          type="button"
          onClick={onDelete}
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
        >
          Xóa
        </button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-4">
        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-xs text-slate-500">CTR</p>
          <p className="text-lg font-bold text-slate-900">{percent(ctr)}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-xs text-slate-500">CPC</p>
          <p className="text-lg font-bold text-slate-900">{formatVnd(cpc)}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-xs text-slate-500">CPA</p>
          <p className="text-lg font-bold text-slate-900">{formatVnd(cpa)}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-xs text-slate-500">ROAS</p>
          <p className="text-lg font-bold text-slate-900">{roas.toFixed(2)}x</p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label>
          <span className={labelClass}>Tên campaign</span>
          <input
            value={campaign.name}
            onChange={(e) => onChange({ ...campaign, name: e.target.value })}
            className={inputClass}
          />
        </label>
        <label>
          <span className={labelClass}>Channel</span>
          <select
            value={campaign.channel}
            onChange={(e) =>
              onChange({
                ...campaign,
                channel: e.target.value as GoogleAdCampaign["channel"],
              })
            }
            className={inputClass}
          >
            <option value="search">Search</option>
            <option value="display">Display</option>
            <option value="youtube">YouTube</option>
            <option value="performance-max">Performance Max</option>
          </select>
        </label>
        <label>
          <span className={labelClass}>Status</span>
          <select
            value={campaign.status}
            onChange={(e) =>
              onChange({
                ...campaign,
                status: e.target.value as GoogleAdCampaign["status"],
              })
            }
            className={inputClass}
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
          </select>
        </label>
        <label>
          <span className={labelClass}>Final URL</span>
          <input
            value={campaign.finalUrl}
            onChange={(e) => onChange({ ...campaign, finalUrl: e.target.value })}
            className={inputClass}
          />
        </label>
        <label>
          <span className={labelClass}>Daily budget</span>
          <input
            type="number"
            value={campaign.dailyBudget}
            onChange={(e) =>
              onChange({ ...campaign, dailyBudget: Number(e.target.value) })
            }
            className={inputClass}
          />
        </label>
        <label>
          <span className={labelClass}>Monthly budget</span>
          <input
            type="number"
            value={campaign.monthlyBudget}
            onChange={(e) =>
              onChange({ ...campaign, monthlyBudget: Number(e.target.value) })
            }
            className={inputClass}
          />
        </label>
        <label>
          <span className={labelClass}>Target location</span>
          <input
            value={campaign.targetLocation}
            onChange={(e) =>
              onChange({ ...campaign, targetLocation: e.target.value })
            }
            className={inputClass}
          />
        </label>
        <label>
          <span className={labelClass}>Conversion action</span>
          <input
            value={campaign.conversionAction}
            onChange={(e) =>
              onChange({ ...campaign, conversionAction: e.target.value })
            }
            className={inputClass}
          />
        </label>
        <label>
          <span className={labelClass}>Target keywords (mỗi dòng 1 keyword)</span>
          <textarea
            value={campaign.targetKeywords.join("\n")}
            onChange={(e) =>
              onChange({ ...campaign, targetKeywords: parseLines(e.target.value) })
            }
            rows={4}
            className={inputClass}
          />
        </label>
        <label>
          <span className={labelClass}>Negative keywords</span>
          <textarea
            value={campaign.negativeKeywords.join("\n")}
            onChange={(e) =>
              onChange({
                ...campaign,
                negativeKeywords: parseLines(e.target.value),
              })
            }
            rows={4}
            className={inputClass}
          />
        </label>
        <div className="grid gap-3 sm:grid-cols-2 md:col-span-2 lg:grid-cols-5">
          {(
            [
              ["impressions", "Impressions"],
              ["clicks", "Clicks"],
              ["conversions", "Conversions"],
              ["cost", "Cost"],
              ["revenue", "Revenue"],
            ] as const
          ).map(([key, label]) => (
            <label key={key}>
              <span className={labelClass}>{label}</span>
              <input
                type="number"
                value={campaign[key]}
                onChange={(e) =>
                  onChange({ ...campaign, [key]: Number(e.target.value) })
                }
                className={inputClass}
              />
            </label>
          ))}
        </div>
        <label className="md:col-span-2">
          <span className={labelClass}>Notes</span>
          <textarea
            value={campaign.notes}
            onChange={(e) => onChange({ ...campaign, notes: e.target.value })}
            rows={3}
            className={inputClass}
          />
        </label>
      </div>
    </div>
  );
}

export function GoogleAdsAdminPage() {
  const { draft, setDraft, save, savedAt } = useSeoAdminDraft();
  const totals = useMemo(() => {
    const campaigns = draft.ads.campaigns;
    const impressions = campaigns.reduce((sum, c) => sum + c.impressions, 0);
    const clicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);
    const conversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
    const cost = campaigns.reduce((sum, c) => sum + c.cost, 0);
    const revenue = campaigns.reduce((sum, c) => sum + c.revenue, 0);
    return {
      impressions,
      clicks,
      conversions,
      cost,
      revenue,
      ctr: impressions ? (clicks / impressions) * 100 : 0,
      cpa: conversions ? cost / conversions : 0,
      roas: cost ? revenue / cost : 0,
    };
  }, [draft.ads.campaigns]);

  const addCampaign = () => {
    const campaign: GoogleAdCampaign = {
      id: createSeoAdminId("ad"),
      name: "",
      channel: "search",
      status: "draft",
      dailyBudget: 0,
      monthlyBudget: 0,
      targetLocation: "TP.HCM",
      targetKeywords: [],
      negativeKeywords: [],
      conversionAction: "",
      finalUrl: "/",
      impressions: 0,
      clicks: 0,
      conversions: 0,
      cost: 0,
      revenue: 0,
      notes: "",
    };
    setDraft((current) => ({
      ...current,
      ads: { ...current.ads, campaigns: [campaign, ...current.ads.campaigns] },
    }));
  };

  const updateCampaign = (id: string, next: GoogleAdCampaign) => {
    setDraft((current) => ({
      ...current,
      ads: {
        ...current.ads,
        campaigns: current.ads.campaigns.map((c) => (c.id === id ? next : c)),
      },
    }));
  };

  const deleteCampaign = (id: string) => {
    setDraft((current) => ({
      ...current,
      ads: {
        ...current.ads,
        campaigns: current.ads.campaigns.filter((c) => c.id !== id),
      },
    }));
  };

  return (
    <AdminShell
      title="Google Ads"
      subtitle="Cấu hình tracking, budget, campaign và nhập số liệu hiệu quả quảng cáo."
    >
      <div className="space-y-6">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
              <input
                type="checkbox"
                checked={draft.ads.enabled}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    ads: { ...d.ads, enabled: e.target.checked },
                  }))
                }
                className="h-4 w-4 rounded border-slate-300 text-[#2563eb]"
              />
              <span className="text-sm font-semibold text-slate-800">
                Bật Google Ads tracking trên site
              </span>
            </label>
            <label className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
              <input
                type="checkbox"
                checked={draft.ads.remarketingTagEnabled}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    ads: { ...d.ads, remarketingTagEnabled: e.target.checked },
                  }))
                }
                className="h-4 w-4 rounded border-slate-300 text-[#2563eb]"
              />
              <span className="text-sm font-semibold text-slate-800">
                Bật remarketing tag
              </span>
            </label>
            <label>
              <span className={labelClass}>Google Ads Customer ID</span>
              <input
                value={draft.ads.customerId}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    ads: { ...d.ads, customerId: e.target.value },
                  }))
                }
                className={inputClass}
                placeholder="123-456-7890"
              />
            </label>
            <label>
              <span className={labelClass}>Conversion ID</span>
              <input
                value={draft.ads.conversionId}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    ads: { ...d.ads, conversionId: e.target.value },
                  }))
                }
                className={inputClass}
                placeholder="AW-XXXXXXXXXX"
              />
            </label>
            <label>
              <span className={labelClass}>Conversion Label</span>
              <input
                value={draft.ads.conversionLabel}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    ads: { ...d.ads, conversionLabel: e.target.value },
                  }))
                }
                className={inputClass}
              />
            </label>
            <label>
              <span className={labelClass}>Monthly budget cap</span>
              <input
                type="number"
                value={draft.ads.monthlyBudgetCap}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    ads: { ...d.ads, monthlyBudgetCap: Number(e.target.value) },
                  }))
                }
                className={inputClass}
              />
            </label>
            <label>
              <span className={labelClass}>Target CPA</span>
              <input
                type="number"
                value={draft.ads.targetCpa}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    ads: { ...d.ads, targetCpa: Number(e.target.value) },
                  }))
                }
                className={inputClass}
              />
            </label>
            <label>
              <span className={labelClass}>Target ROAS</span>
              <input
                type="number"
                step="0.1"
                value={draft.ads.targetRoas}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    ads: { ...d.ads, targetRoas: Number(e.target.value) },
                  }))
                }
                className={inputClass}
              />
            </label>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs text-slate-500">Impressions</p>
            <p className="text-2xl font-bold text-slate-900">
              {totals.impressions.toLocaleString("vi-VN")}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs text-slate-500">Clicks / CTR</p>
            <p className="text-2xl font-bold text-slate-900">
              {totals.clicks.toLocaleString("vi-VN")} · {percent(totals.ctr)}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs text-slate-500">Conversions</p>
            <p className="text-2xl font-bold text-slate-900">
              {totals.conversions.toLocaleString("vi-VN")}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs text-slate-500">Cost / CPA</p>
            <p className="text-2xl font-bold text-slate-900">
              {formatVnd(totals.cost)} · {formatVnd(totals.cpa)}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs text-slate-500">ROAS</p>
            <p className="text-2xl font-bold text-slate-900">
              {totals.roas.toFixed(2)}x
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Campaigns</h2>
            <p className="text-sm text-slate-500">
              Set budget, target, keyword và nhập số liệu từ Google Ads.
            </p>
          </div>
          <button
            type="button"
            onClick={addCampaign}
            className="rounded-lg border border-dashed border-[#2563eb] bg-[#2563eb]/5 px-4 py-2 text-sm font-semibold text-[#2563eb] hover:bg-[#2563eb]/10"
          >
            + Thêm campaign
          </button>
        </div>

        {draft.ads.campaigns.map((campaign) => (
          <CampaignEditor
            key={campaign.id}
            campaign={campaign}
            onChange={(next) => updateCampaign(campaign.id, next)}
            onDelete={() => deleteCampaign(campaign.id)}
          />
        ))}
        <SaveBar onSave={save} savedAt={savedAt} />
      </div>
    </AdminShell>
  );
}
