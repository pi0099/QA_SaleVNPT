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
      id: "kw-page-sim-u1500",
      keyword: "sim U1500 VinaPhone 500GB",
      tags: ["sim", "u1500", "vinaphone", "500gb", "data"],
      intent: "transactional",
      priority: "high",
      targetUrl: "/sim-u1500-vinaphone",
      status: "active",
      notes: "Landing SIM Data U1500 — keyword chính.",
    },
    {
      id: "kw-page-sim-u1500-price",
      keyword: "sim data 500GB giá rẻ 91k",
      tags: ["sim", "u1500", "500gb", "gia-re", "91k"],
      intent: "commercial",
      priority: "high",
      targetUrl: "/sim-u1500-vinaphone",
      status: "active",
      notes: "Intent giá rẻ / so sánh chi phí.",
    },
    {
      id: "kw-page-sim-u1500-wifi",
      keyword: "sim phát wifi 500GB VinaPhone",
      tags: ["sim", "wifi", "4g", "5g", "modem", "500gb"],
      intent: "transactional",
      priority: "high",
      targetUrl: "/sim-u1500-vinaphone",
      status: "active",
      notes: "Use case phát WiFi / thay cáp quang.",
    },
    {
      id: "kw-page-sim-u1500-year",
      keyword: "sim VinaPhone trọn gói 1 năm 500GB",
      tags: ["sim", "vinaphone", "tron-goi", "12-thang", "360-ngay"],
      intent: "commercial",
      priority: "medium",
      targetUrl: "/sim-u1500-vinaphone",
      status: "active",
      notes: "Intent trọn gói / không nạp hàng tháng.",
    },
    {
      id: "kw-page-sim-u1500-camera",
      keyword: "sim data cho camera IP 24/7",
      tags: ["sim", "camera", "iot", "500gb", "u1500"],
      intent: "commercial",
      priority: "medium",
      targetUrl: "/sim-u1500-vinaphone",
      status: "active",
      notes: "Use case camera giám sát.",
    },
    {
      id: "kw-page-sim-u1500-hcm",
      keyword: "mua sim U1500 VinaPhone TP.HCM",
      tags: ["sim", "u1500", "hcm", "local-seo", "vinaphone"],
      intent: "local",
      priority: "high",
      targetUrl: "/sim-u1500-vinaphone",
      status: "active",
      notes: "Local intent TP.HCM.",
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
