import type { Post, PostCategory, ServiceFaq } from "@/lib/content/types";
import { slugifyVi, cmsId } from "@/lib/cms-store/id";
import { estimateReadingTime } from "@/data/posts/helpers";
import type { DocxTopicBrief } from "@/lib/ai/docxBriefTypes";
import { DOCX_BRIEF_SOURCE_NOTE } from "@/lib/ai/loadDocxBriefs";
import { BATCH01_BODIES } from "@/lib/ai/docxContent/batch01Bodies";
import { runSeoChecklist } from "@/lib/blog/seoChecklist";
import type { GeneratedArticle } from "@/lib/ai/articleGenerator";
import { getDocxBriefBatch } from "@/lib/ai/loadDocxBriefs";

const BODY_BY_SLUG: Record<string, string> = {
  ...BATCH01_BODIES,
};

const CTA_BLOCK = `<h2>Cần tư vấn gói phù hợp?</h2>
<div class="post-cta-block">
<p>Cần tư vấn gói phù hợp?</p>
<p>Nhân viên VNPT hỗ trợ kiểm tra hạ tầng và tư vấn dịch vụ khu vực TP.HCM.</p>
<p>Liên hệ qua điện thoại hoặc Zalo để được hỗ trợ.</p>
<p><a href="/#dang-ky-tu-van">→ Gửi yêu cầu tư vấn</a></p>
</div>`;

const SERVICE_LINKS: Record<string, { href: string; label: string }> = {
  "/wifi-vnpt": { href: "/wifi-vnpt", label: "Lắp WiFi VNPT tại nhà" },
  "/internet-di-dong-vnpt": {
    href: "/internet-di-dong-vnpt",
    label: "Combo Internet + di động VNPT",
  },
  "/sim-5g-vnpt": { href: "/sim-5g-vnpt", label: "SIM 5G / eSIM VNPT" },
  "/camera-vnpt": { href: "/camera-vnpt", label: "Camera an ninh VNPT" },
  "/wifi-vnpt-quan-12": {
    href: "/wifi-vnpt-quan-12",
    label: "WiFi VNPT Quận 12",
  },
};

function mapCategory(raw: string): PostCategory {
  const c = raw.toLowerCase();
  if (c.includes("sim") || c.includes("5g") || c.includes("esim")) return "sim-5g";
  if (c.includes("camera")) return "camera";
  if (c.includes("khắc") || c.includes("sự cố") || c.includes("troubleshoot"))
    return "troubleshooting";
  return "wifi";
}

function truncateMeta(text: string, max: number): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return t.slice(0, max - 1).trimEnd() + "…";
}

function buildTags(brief: DocxTopicBrief): string[] {
  const base = [brief.keyword, "VNPT", "TP.HCM"];
  if (brief.category.toLowerCase().includes("wifi")) base.push("WiFi");
  return Array.from(new Set(base.map((t) => t.trim()).filter(Boolean))).slice(0, 6);
}

function buildFaqs(brief: DocxTopicBrief): ServiceFaq[] {
  const kw = brief.keyword;
  const cap = kw.charAt(0).toUpperCase() + kw.slice(1);
  return [
    {
      question: `${cap} tại Quận 12 có khác quận khác không?`,
      answer:
        "Hạ tầng và lịch kỹ thuật từng khu vực khác nhau. Nhân viên VNPT hỗ trợ tư vấn kiểm tra hạ tầng theo địa chỉ trước khi chốt — Quận 12 tôi hỗ trợ trực tiếp.",
    },
    {
      question: "Cần chuẩn bị gì trước khi đăng ký?",
      answer:
        "CMND/CCCD, số điện thoại liên hệ và địa chỉ lắp đặt chính xác. Nhà thuê nên có thông tin chủ nhà nếu cần thi công.",
    },
    {
      question: "Website này có phải VNPT chính thức không?",
      answer:
        "Không. Đây là kênh hỗ trợ đăng ký dịch vụ VNPT khu vực TP.HCM do nhân viên VNPT tư vấn, không phải cổng thông tin toàn quốc.",
    },
    {
      question: "Có thể tư vấn qua Zalo trước khi lắp không?",
      answer:
        "Có. Gửi địa chỉ và nhu cầu — tôi gợi ý gói phù hợp và giải thích các khoản phí trước khi đăng ký.",
    },
    {
      question: "Giá và gói cước có giống nhau mọi quận không?",
      answer:
        "TP.HCM chia mức giá nội/ngoại thành. Luôn xác nhận theo địa chỉ cụ thể thay vì tham khảo giá chung trên mạng.",
    },
  ];
}

function buildFaqHtml(faqs: ServiceFaq[]): string {
  const items = faqs
    .map(
      (f) =>
        `<details class="post-faq-item"><summary><strong>${f.question}</strong></summary><p>${f.answer}</p></details>`,
    )
    .join("");
  return `<h2>Câu hỏi thường gặp</h2><div class="post-faq-block">${items}</div>`;
}

function buildInternalLinksHtml(targetLink: string): string {
  const primary = SERVICE_LINKS[targetLink] ?? SERVICE_LINKS["/wifi-vnpt"];
  const others = Object.values(SERVICE_LINKS).filter(
    (l) => l.href !== primary.href,
  );
  const links = [primary, ...others.slice(0, 3)];
  const items = links
    .map((l) => `<li><a href="${l.href}">${l.label}</a></li>`)
    .join("");
  return `<h2>Dịch vụ liên quan</h2><ul class="post-internal-links">${items}</ul>`;
}

function buildRelatedSection(relatedSlugs: string[]): string {
  if (relatedSlugs.length === 0) return "";
  const items = relatedSlugs
    .map((s) => `<li><a href="/news/${s}">${s}</a></li>`)
    .join("");
  return `<h2>Bài viết liên quan</h2><ul class="post-related-links">${items}</ul>`;
}

export function generatePostFromDocxBrief(
  brief: DocxTopicBrief,
  opts?: {
    relatedPostSlugs?: string[];
    existingSlugs?: string[];
    existingTitles?: string[];
  },
): { post: Post; article: GeneratedArticle; seoCheck: ReturnType<typeof runSeoChecklist> } {
  const body = BODY_BY_SLUG[brief.slug];
  if (!body) {
    throw new Error(`No body content for brief slug: ${brief.slug}`);
  }

  const title = brief.title;
  const slug = brief.slug || slugifyVi(title);
  const category = mapCategory(brief.category);
  const tags = buildTags(brief);
  const faqs = buildFaqs(brief);
  const relatedPostSlugs = opts?.relatedPostSlugs ?? [];

  const content =
    `<h1>${title}</h1>` +
    body +
    buildFaqHtml(faqs) +
    CTA_BLOCK +
    buildInternalLinksHtml(brief.targetLink) +
    buildRelatedSection(relatedPostSlugs);

  const excerpt = truncateMeta(
    `${brief.brief} Hỗ trợ tư vấn đăng ký VNPT khu vực TP.HCM.`,
    200,
  );

  const seoDescription = truncateMeta(
    `${brief.keyword}: ${brief.brief.slice(0, 90)}. Nhân viên VNPT hỗ trợ tư vấn tại TP.HCM.`,
    158,
  );

  const ogTitle = truncateMeta(`${title} | Tư vấn VNPT TP.HCM`, 70);
  const ogDescription = seoDescription;
  const facebookCaption =
    brief.fbCaption ||
    `${title}\n\n📍 Tư vấn đăng ký VNPT khu vực TP.HCM\n👉 Nhắn Zalo hoặc gọi điện để được hỗ trợ`;

  const readingTime = estimateReadingTime(content);
  const now = new Date().toISOString();

  const article: GeneratedArticle = {
    title,
    slug,
    excerpt,
    seoTitle: truncateMeta(`${title} | TP.HCM`, 60),
    seoDescription,
    ogTitle,
    ogDescription,
    facebookCaption,
    content,
    category,
    tags,
    faqs,
    sourceNotes: `${DOCX_BRIEF_SOURCE_NOTE}\nBrief #${brief.num} | Intent: ${brief.intent}\nAngle: ${brief.brief}`,
    readingTime,
    relatedPostSlugs,
  };

  const seoCheck = runSeoChecklist(
    article,
    opts?.existingSlugs ?? [],
    opts?.existingTitles ?? [],
  );

  const post: Post = {
    id: cmsId(`docx-${brief.num}`),
    title,
    slug,
    excerpt,
    content,
    category,
    tags,
    featuredImage: undefined,
    seoTitle: article.seoTitle,
    seoDescription,
    ogTitle,
    ogDescription,
    facebookCaption,
    readingTime,
    publishedAt: now.slice(0, 10),
    status: "draft",
    faqs,
    relatedPostSlugs,
    isFeatured: false,
    sourceNotes: article.sourceNotes,
    generatedByAI: true,
    reviewedByAdmin: false,
    createdAt: now,
    updatedAt: now,
  };

  return { post, article, seoCheck };
}

export function generateDocxBriefBatch(
  startNum: number,
  count = 5,
  existingSlugs: string[] = [],
  existingTitles: string[] = [],
): Post[] {
  const briefs = getDocxBriefBatch(startNum, count);
  const slugsSoFar = [...existingSlugs];
  const titlesSoFar = [...existingTitles];
  const posts: Post[] = [];

  for (let i = 0; i < briefs.length; i++) {
    const related = briefs
      .filter((_, j) => j !== i)
      .map((b) => b.slug)
      .slice(0, 2);
    const { post } = generatePostFromDocxBrief(briefs[i], {
      relatedPostSlugs: related,
      existingSlugs: slugsSoFar,
      existingTitles: titlesSoFar,
    });
    posts.push(post);
    slugsSoFar.push(post.slug);
    titlesSoFar.push(post.title);
  }

  return posts;
}
