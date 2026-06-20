import type { SeoKeywordItem } from "@/lib/seo-admin-storage";

export function normalizeKeywordKey(
  item: Pick<SeoKeywordItem, "keyword" | "targetUrl">,
) {
  return `${item.targetUrl.trim().toLowerCase()}::${item.keyword
    .trim()
    .toLowerCase()}`;
}

export function buildPageKeywordSuggestions(): SeoKeywordItem[] {
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
      targetUrl: "/sim-5g-vnpt",
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
      targetUrl: "/news",
      status: "active",
      notes: "Trang nội dung hỗ trợ topical authority.",
    },
  ];

  const localPages: SeoKeywordItem[] = [
    {
      id: "kw-page-wifi-quan-12",
      keyword: "lắp WiFi VNPT Quận 12",
      tags: ["wifi", "quan-12", "hcm", "local-seo"],
      intent: "local",
      priority: "high",
      targetUrl: "/wifi-vnpt-quan-12",
      status: "active",
      notes: "Local page chính — Quận 12.",
    },
  ];

  return [...staticPages, ...localPages];
}
