import { buildPageKeywordSuggestions } from "@/lib/seo-keyword-suggestions";

export const SEO_ADMIN_STORAGE_KEY = "vnpt_sale_seo_admin_v1";
export const TRAFFIC_STORAGE_KEY = "vnpt_sale_traffic_v1";

export type SeoKeywordItem = {
  id: string;
  keyword: string;
  tags: string[];
  intent: "informational" | "commercial" | "transactional" | "local";
  priority: "low" | "medium" | "high";
  targetUrl: string;
  status: "draft" | "active" | "paused";
  notes: string;
};

export type SeoGoogleConfig = {
  googleSearchConsoleUrl: string;
  googleAnalyticsId: string;
  googleTagManagerId: string;
  robotsPolicy: "index-follow" | "noindex" | "custom";
  customRobots: string;
  canonicalBaseUrl: string;
  ogImageUrl: string;
  schemaBusinessName: string;
  schemaPhone: string;
  schemaAreaServed: string;
};

export type GoogleAdCampaign = {
  id: string;
  name: string;
  channel: "search" | "display" | "youtube" | "performance-max";
  status: "draft" | "active" | "paused";
  dailyBudget: number;
  monthlyBudget: number;
  targetLocation: string;
  targetKeywords: string[];
  negativeKeywords: string[];
  conversionAction: string;
  finalUrl: string;
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
  revenue: number;
  notes: string;
};

export type GoogleAdsSettings = {
  enabled: boolean;
  customerId: string;
  conversionId: string;
  conversionLabel: string;
  remarketingTagEnabled: boolean;
  monthlyBudgetCap: number;
  targetCpa: number;
  targetRoas: number;
  campaigns: GoogleAdCampaign[];
};

export type SeoAdminPayload = {
  keywords: SeoKeywordItem[];
  google: SeoGoogleConfig;
  ads: GoogleAdsSettings;
};

export type TrafficEvent = {
  id: string;
  path: string;
  title: string;
  referrer: string;
  timestamp: string;
};

export type TrafficPayload = {
  events: TrafficEvent[];
};

export function createSeoAdminId(prefix: string): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
  }
  return `${prefix}-${Date.now().toString(36)}`;
}

export function getDefaultSeoAdminPayload(): SeoAdminPayload {
  return {
    keywords: buildPageKeywordSuggestions(),
    google: {
      googleSearchConsoleUrl: "",
      googleAnalyticsId: "",
      googleTagManagerId: "",
      robotsPolicy: "index-follow",
      customRobots: "",
      canonicalBaseUrl: "https://ketnoimanghcm.vn",
      ogImageUrl: "",
      schemaBusinessName: "Kết Nối Mạng HCM",
      schemaPhone: "0900 000 000",
      schemaAreaServed: "TP.HCM",
    },
    ads: {
      enabled: false,
      customerId: "",
      conversionId: "",
      conversionLabel: "",
      remarketingTagEnabled: false,
      monthlyBudgetCap: 10000000,
      targetCpa: 120000,
      targetRoas: 3,
      campaigns: [
        {
          id: "ad-search-wifi-vnpt",
          name: "Search - Lắp WiFi VNPT",
          channel: "search",
          status: "draft",
          dailyBudget: 300000,
          monthlyBudget: 9000000,
          targetLocation: "TP.HCM",
          targetKeywords: ["lắp wifi vnpt", "internet vnpt tphcm"],
          negativeKeywords: ["tuyển dụng", "miễn phí 100%"],
          conversionAction: "Lead Zalo / Phone",
          finalUrl: "/",
          impressions: 0,
          clicks: 0,
          conversions: 0,
          cost: 0,
          revenue: 0,
          notes: "Nhập số liệu từ Google Ads để theo dõi hiệu quả.",
        },
      ],
    },
  };
}

function normalizeStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((v) => String(v).trim()).filter(Boolean);
}

function parseSeoAdminPayload(raw: unknown): SeoAdminPayload | null {
  if (!raw || typeof raw !== "object") return null;
  const defaults = getDefaultSeoAdminPayload();
  const o = raw as Record<string, unknown>;
  const googleRaw =
    o.google && typeof o.google === "object"
      ? (o.google as Record<string, unknown>)
      : {};
  const adsRaw =
    o.ads && typeof o.ads === "object"
      ? (o.ads as Record<string, unknown>)
      : {};

  return {
    keywords: Array.isArray(o.keywords)
      ? o.keywords.map((item, index) => {
          const r = item as Record<string, unknown>;
          const intent = String(r.intent);
          const priority = String(r.priority);
          const status = String(r.status);
          return {
            id: String(r.id || `kw-${index}`),
            keyword: String(r.keyword ?? ""),
            tags: normalizeStringList(r.tags),
            intent:
              intent === "commercial" ||
              intent === "transactional" ||
              intent === "local"
                ? intent
                : "informational",
            priority:
              priority === "low" || priority === "high" ? priority : "medium",
            targetUrl: String(r.targetUrl ?? "/"),
            status:
              status === "draft" || status === "paused" ? status : "active",
            notes: String(r.notes ?? ""),
          };
        })
      : defaults.keywords,
    google: {
      ...defaults.google,
      googleSearchConsoleUrl: String(
        googleRaw.googleSearchConsoleUrl ?? defaults.google.googleSearchConsoleUrl,
      ),
      googleAnalyticsId: String(
        googleRaw.googleAnalyticsId ?? defaults.google.googleAnalyticsId,
      ),
      googleTagManagerId: String(
        googleRaw.googleTagManagerId ?? defaults.google.googleTagManagerId,
      ),
      robotsPolicy:
        googleRaw.robotsPolicy === "noindex" ||
        googleRaw.robotsPolicy === "custom"
          ? googleRaw.robotsPolicy
          : "index-follow",
      customRobots: String(googleRaw.customRobots ?? ""),
      canonicalBaseUrl: String(
        googleRaw.canonicalBaseUrl ?? defaults.google.canonicalBaseUrl,
      ),
      ogImageUrl: String(googleRaw.ogImageUrl ?? ""),
      schemaBusinessName: String(
        googleRaw.schemaBusinessName ?? defaults.google.schemaBusinessName,
      ),
      schemaPhone: String(googleRaw.schemaPhone ?? defaults.google.schemaPhone),
      schemaAreaServed: String(
        googleRaw.schemaAreaServed ?? defaults.google.schemaAreaServed,
      ),
    },
    ads: {
      ...defaults.ads,
      enabled: adsRaw.enabled === true,
      customerId: String(adsRaw.customerId ?? ""),
      conversionId: String(adsRaw.conversionId ?? ""),
      conversionLabel: String(adsRaw.conversionLabel ?? ""),
      remarketingTagEnabled: adsRaw.remarketingTagEnabled === true,
      monthlyBudgetCap: Number(adsRaw.monthlyBudgetCap ?? defaults.ads.monthlyBudgetCap),
      targetCpa: Number(adsRaw.targetCpa ?? defaults.ads.targetCpa),
      targetRoas: Number(adsRaw.targetRoas ?? defaults.ads.targetRoas),
      campaigns: Array.isArray(adsRaw.campaigns)
        ? adsRaw.campaigns.map((item, index) => {
            const r = item as Record<string, unknown>;
            const channel = String(r.channel);
            const status = String(r.status);
            return {
              id: String(r.id || `ad-${index}`),
              name: String(r.name ?? ""),
              channel:
                channel === "display" ||
                channel === "youtube" ||
                channel === "performance-max"
                  ? channel
                  : "search",
              status:
                status === "active" || status === "paused" ? status : "draft",
              dailyBudget: Number(r.dailyBudget ?? 0),
              monthlyBudget: Number(r.monthlyBudget ?? 0),
              targetLocation: String(r.targetLocation ?? ""),
              targetKeywords: normalizeStringList(r.targetKeywords),
              negativeKeywords: normalizeStringList(r.negativeKeywords),
              conversionAction: String(r.conversionAction ?? ""),
              finalUrl: String(r.finalUrl ?? "/"),
              impressions: Number(r.impressions ?? 0),
              clicks: Number(r.clicks ?? 0),
              conversions: Number(r.conversions ?? 0),
              cost: Number(r.cost ?? 0),
              revenue: Number(r.revenue ?? 0),
              notes: String(r.notes ?? ""),
            };
          })
        : defaults.ads.campaigns,
    },
  };
}

export function getSeoAdminPayload(): SeoAdminPayload {
  if (typeof window === "undefined") return getDefaultSeoAdminPayload();
  try {
    const raw = window.localStorage.getItem(SEO_ADMIN_STORAGE_KEY);
    if (!raw) return getDefaultSeoAdminPayload();
    return parseSeoAdminPayload(JSON.parse(raw) as unknown) ?? getDefaultSeoAdminPayload();
  } catch {
    return getDefaultSeoAdminPayload();
  }
}

export function saveSeoAdminPayload(payload: SeoAdminPayload): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SEO_ADMIN_STORAGE_KEY, JSON.stringify(payload));
}

export function getTrafficPayload(): TrafficPayload {
  if (typeof window === "undefined") return { events: [] };
  try {
    const raw = window.localStorage.getItem(TRAFFIC_STORAGE_KEY);
    if (!raw) return { events: [] };
    const parsed = JSON.parse(raw) as { events?: unknown };
    return {
      events: Array.isArray(parsed.events)
        ? parsed.events.map((item, index) => {
            const r = item as Record<string, unknown>;
            return {
              id: String(r.id || `pv-${index}`),
              path: String(r.path ?? "/"),
              title: String(r.title ?? ""),
              referrer: String(r.referrer ?? ""),
              timestamp: String(r.timestamp ?? new Date().toISOString()),
            };
          })
        : [],
    };
  } catch {
    return { events: [] };
  }
}

export function saveTrafficPayload(payload: TrafficPayload): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TRAFFIC_STORAGE_KEY, JSON.stringify(payload));
}

export function recordPageView(path: string, title: string, referrer: string): void {
  if (typeof window === "undefined" || path.startsWith("/admin")) return;
  const current = getTrafficPayload();
  const event: TrafficEvent = {
    id: createSeoAdminId("pv"),
    path,
    title,
    referrer,
    timestamp: new Date().toISOString(),
  };
  saveTrafficPayload({ events: [event, ...current.events].slice(0, 1000) });
}
