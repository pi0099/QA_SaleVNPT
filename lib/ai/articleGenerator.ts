import type { Post, PostCategory, ServiceFaq } from "@/lib/content/types";
import { slugifyVi } from "@/lib/cms-store/id";
import {
  buildPostFooter,
  defaultServiceLinks,
  estimateReadingTime,
} from "@/data/posts/helpers";
import type { ResearchResult, SearchIntent } from "@/lib/research/researchProvider";
import { mapGeneratorCategoryToPost } from "@/lib/research/researchProvider";
import { findBriefsForGeneration, TOPIC_BRIEFS } from "@/lib/research/topicBriefs";

export type ArticleTone = "helpful" | "professional" | "simple";

export type GenerateArticleInput = {
  research: ResearchResult;
  tone?: ArticleTone;
  targetServicePage?: string;
};

export type GeneratedArticle = {
  title: string;
  slug: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  ogTitle: string;
  ogDescription: string;
  facebookCaption: string;
  content: string;
  category: PostCategory;
  tags: string[];
  faqs: ServiceFaq[];
  sourceNotes: string;
  readingTime: number;
  relatedPostSlugs: string[];
};

const SERVICE_LINK_MAP: Record<string, { href: string; label: string }> = {
  "/wifi-vnpt": { href: "/wifi-vnpt", label: "Lắp WiFi VNPT tại nhà" },
  "/sim-5g-vnpt": { href: "/sim-5g-vnpt", label: "SIM 5G / eSIM VNPT" },
  "/camera-vnpt": { href: "/camera-vnpt", label: "Camera an ninh VNPT" },
  "/wifi-vnpt-quan-12": {
    href: "/wifi-vnpt-quan-12",
    label: "WiFi VNPT Quận 12",
  },
  "/internet-di-dong-vnpt": {
    href: "/internet-di-dong-vnpt",
    label: "Combo Internet + di động VNPT",
  },
};

function toneIntro(tone: ArticleTone): string {
  switch (tone) {
    case "professional":
      return "Bài viết dưới đây tổng hợp kinh nghiệm tư vấn thực tế";
    case "simple":
      return "Mình giải thích ngắn gọn, dễ hiểu";
    default:
      return "Tôi thường gặp câu hỏi này khi hỗ trợ khách tại TP.HCM";
  }
}

function expandPoint(point: string, keyword: string, tone: ArticleTone): string {
  const voice = tone === "simple" ? "Bạn" : "Quý khách";
  return `<p>${point}. ${voice} có thể nhắn Zalo để nhân viên VNPT hỗ trợ tư vấn kiểm tra hạ tầng theo địa chỉ tại TP.HCM — đặc biệt khu vực Quận 12, nhà phố, chung cư và văn phòng nhỏ. Chủ đề liên quan: <em>${keyword}</em>.</p>`;
}

function sectionForIntent(
  intent: SearchIntent,
  keyword: string,
  tone: ArticleTone,
): string {
  const blocks: Record<SearchIntent, string> = {
    informational: `<h2>Những điều cần biết trước khi quyết định</h2>
<p>${toneIntro(tone)} về "${keyword}". Website này hỗ trợ đăng ký dịch vụ VNPT khu vực TP.HCM, không phải cổng thông tin chính thức toàn quốc của VNPT.</p>
<h3>Đối tượng phù hợp</h3>
<p>Gia đình, chủ nhà trọ, cửa hàng nhỏ và văn phòng vài người tại Quận 12 và các quận nội thành. Nhu cầu thực tế khác nhau nên nên khảo sát trước khi chọn gói.</p>`,
    comparison: `<h2>So sánh nhanh các lựa chọn</h2>
<p>Khi tìm hiểu "${keyword}", nhiều khách chỉ nhìn giá tháng đầu. Tôi khuyên so sánh tổng chi phí 12 tháng, phí hòa mạng và thiết bị kèm theo.</p>
<h3>Khi nào nên chọn phương án cao hơn</h3>
<p>Nếu nhà đông thiết bị, kinh doanh online hoặc camera 24/7 — đầu tư băng thông và WiFi ổn định thường rẻ hơn sửa sự cố liên tục.</p>`,
    troubleshooting: `<h2>Chẩn đoán nhanh tại nhà</h2>
<p>Với vấn đề "${keyword}", hãy thử các bước an toàn trước: restart modem, test bằng dây LAN, giảm thiết bị tải nặng. Ghi lại thời điểm xảy ra để hỗ trợ chính xác hơn.</p>
<h3>Khi nào cần liên hệ kỹ thuật</h3>
<p>Nếu lặp lại nhiều lần trong ngày, mất mạng cả nhà dù đã restart, hoặc chỉ một khu vực yếu — có thể cần kiểm tra dây, modem hoặc bổ sung Mesh.</p>`,
    pricing: `<h2>Cách đọc giá đúng, tránh phát sinh</h2>
<p>Chủ đề "${keyword}" thường gắn với bảng giá thay đổi theo khuyến mãi. Luôn hỏi rõ phí hòa mạng, cam kết thời gian và thiết bị đi kèm.</p>
<h3>Mẹo tiết kiệm tại TP.HCM</h3>
<p>Chọn gói đúng nhu cầu thay vì gói cao nhất. Combo Internet + di động đôi khi rẻ hơn nếu cả nhà đã dùng VNPT.</p>`,
    local: `<h2>Bối cảnh tại Quận 12 và TP.HCM</h2>
<p>"${keyword}" tại khu vực nội thành thường có hạ tầng sẵn ở nhiều tuyến đường. Tôi hỗ trợ trực tiếp Quận 12 — gửi địa chỉ cụ thể để kiểm tra port cáp trước khi hẹn lắp.</p>
<h3>Nhà phố, chung cư, dãy trọ</h3>
<p>Mỗi loại nhà cần cách bố trí modem và Mesh khác nhau. Khảo sát miễn phí giúp tránh mua thừa thiết bị.</p>`,
  };
  return blocks[intent];
}

function buildFaqsFromResearch(research: ResearchResult): ServiceFaq[] {
  const questions = research.suggestedQuestions.slice(0, 5);
  while (questions.length < 5) {
    questions.push(`Còn thắc mắc về ${research.keyword}?`);
  }
  return questions.map((q, i) => ({
    question: q,
    answer: [
      `Với "${research.keyword}", tôi khuyên liên hệ tư vấn để kiểm tra theo địa chỉ cụ thể tại TP.HCM.`,
      research.keyPoints[i % research.keyPoints.length] ??
        "Nhân viên VNPT hỗ trợ tư vấn miễn phí qua Zalo hoặc form trên website.",
      research.cautions[0] ?? "Không cam kết chính sách chính thức — thông tin mang tính tham khảo.",
    ].join(" "),
  }));
}

function pickInternalLinks(targetPage?: string) {
  const primary = targetPage ? SERVICE_LINK_MAP[targetPage] : undefined;
  const links = primary
    ? [primary, ...defaultServiceLinks.filter((l) => l.href !== primary.href)]
    : defaultServiceLinks;
  return links.slice(0, 4);
}

function buildSourceNotes(research: ResearchResult): string {
  const lines = [
    "Draft generated from internal topic brief. External research not connected yet.",
  ];
  if (research.warning) lines.push(research.warning);
  if (research.sources.length > 0) {
    lines.push(
      "Reference URLs (not scraped): " +
        research.sources.map((s) => s.url).join(", "),
    );
  }
  if (research.briefId) lines.push(`Brief ID: ${research.briefId}`);
  lines.push("Key points used: " + research.keyPoints.join(" | "));
  return lines.join("\n");
}

function truncateMeta(text: string, max = 158): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return t.slice(0, max - 1).trimEnd() + "…";
}

export function generateArticle(input: GenerateArticleInput): GeneratedArticle {
  const { research, tone = "helpful", targetServicePage } = input;
  const brief = TOPIC_BRIEFS.find((b) => b.id === research.briefId);
  const title =
    brief?.titleHint ??
    research.keyword.charAt(0).toUpperCase() + research.keyword.slice(1);
  const slug = slugifyVi(title);
  const category = mapGeneratorCategoryToPost(research.category);
  const tags = brief?.tags ?? [research.keyword, "VNPT", "TP.HCM"];

  const bodyParts: string[] = [
    `<h1>${title}</h1>`,
    `<p>${toneIntro(tone)} khi khách hỏi về <strong>${research.keyword}</strong>. Tôi làm việc hỗ trợ đăng ký dịch vụ VNPT khu vực TP.HCM — đặc biệt Quận 12 — không đại diện cho website chính thức toàn quốc của VNPT.</p>`,
    sectionForIntent(research.intent, research.keyword, tone),
    `<h2>Điểm chính cần lưu ý</h2>`,
    ...research.keyPoints.map((p) => expandPoint(p, research.keyword, tone)),
  ];

  if (research.cautions.length > 0) {
    bodyParts.push(`<h2>Lưu ý quan trọng</h2><ul>`);
    research.cautions.forEach((c) => {
      bodyParts.push(`<li>${c}</li>`);
    });
    bodyParts.push(`</ul>`);
  }

  bodyParts.push(
    `<h2>Thực tế tại nhà phố, chung cư và văn phòng nhỏ</h2>`,
    `<p>Nhà phố 2–3 tầng ở Quận 12 thường cần cân nhắc vị trí modem hoặc Mesh, không chỉ tốc độ gói cước. Chung cư 60–80m² có thể đủ một modem nếu đặt giữa căn. Văn phòng 5 người nên ưu tiên dây LAN cho máy cố định và WiFi khách tách biệt.</p>`,
    `<h3>Kinh nghiệm tư vấn tại TP.HCM</h3>`,
    `<p>Qua nhiều lần hỗ trợ khách tại các quận nội thành, tôi thấy phần lớn sự cố không phải do gói cước quá thấp mà do WiFi chưa được bố trí hợp lý. Trước khi nâng gói, hãy thử đổi vị trí modem, giảm nhiễu từ lò vi sóng, và test speed bằng dây LAN để biết chính xác băng thông vào nhà.</p>`,
    `<p>Với chủ đề ${research.keyword}, điều quan trọng là xác nhận hạ tầng theo địa chỉ. Hai nhà cùng đường vẫn có thể khác tình trạng port cáp. Gửi số nhà, tên đường, phường — nhân viên VNPT hỗ trợ tư vấn sẽ phản hồi khả năng lắp đặt và gói phù hợp.</p>`,
    `<h3>Checklist trước khi đăng ký</h3>`,
    `<ul><li>Xác định số thiết bị và nhu cầu (học online, camera, bán hàng online)</li><li>So sánh tổng chi phí 12 tháng, không chỉ tháng khuyến mãi</li><li>Hỏi rõ phí hòa mạng và thiết bị kèm theo</li><li>Thống nhất thời gian có mặt khi kỹ thuật đến lắp</li><li>Lưu số hotline/Zalo tư vấn để hỗ trợ sau lắp đặt</li></ul>`,
    `<p>Nếu bạn đang tìm hiểu ${research.keyword}, gửi địa chỉ và nhu cầu — tôi phản hồi trong giờ hành chính và hẹn khảo sát khi cần. Website này giúp kết nối tư vấn đăng ký dịch vụ, không thay thế kênh chính thức toàn quốc của VNPT.</p>`,
  );

  const faqs = buildFaqsFromResearch(research);
  const internalLinks = pickInternalLinks(
    targetServicePage ?? brief?.targetServicePage,
  );
  const footer = buildPostFooter(faqs, internalLinks);
  const content = bodyParts.join("") + footer;

  const excerpt = truncateMeta(
    `Tư vấn ${research.keyword} tại TP.HCM: ${research.keyPoints[0] ?? ""} ${research.keyPoints[1] ?? ""}`,
    200,
  );

  const seoDescription = truncateMeta(
    `${research.keyword} — ${research.keyPoints.slice(0, 2).join(". ")}. Hỗ trợ tư vấn VNPT khu vực TP.HCM, Quận 12.`,
  );

  const ogTitle = truncateMeta(`${title} | Tư vấn VNPT TP.HCM`, 70);
  const ogDescription = seoDescription;

  const facebookCaption = `${title}\n\n${research.keyPoints[0]}\n\n📍 Hỗ trợ tư vấn đăng ký VNPT khu vực TP.HCM / Quận 12\n👉 Nhắn Zalo hoặc gửi form trên website\n\n#VNPT #WiFi #TPHCM`;

  return {
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
    sourceNotes: buildSourceNotes(research),
    readingTime: estimateReadingTime(content),
    relatedPostSlugs: [],
  };
}

export function generatedArticleToPost(
  article: GeneratedArticle,
  id: string,
): Post {
  const now = new Date().toISOString();
  return {
    id,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    content: article.content,
    category: article.category,
    tags: article.tags,
    seoTitle: article.seoTitle,
    seoDescription: article.seoDescription,
    ogTitle: article.ogTitle,
    ogDescription: article.ogDescription,
    facebookCaption: article.facebookCaption,
    readingTime: article.readingTime,
    publishedAt: now.slice(0, 10),
    status: "draft",
    faqs: article.faqs,
    relatedPostSlugs: article.relatedPostSlugs,
    isFeatured: false,
    sourceNotes: article.sourceNotes,
    generatedByAI: true,
    reviewedByAdmin: false,
    createdAt: now,
    updatedAt: now,
  };
}

export function seedDraftPostsFromBriefs(): Post[] {
  return TOPIC_BRIEFS.map((brief, index) => {
    const research = {
      keyword: brief.keyword,
      category: brief.category,
      intent: brief.intent,
      sources: [],
      keyPoints: brief.keyPoints,
      cautions: brief.cautions,
      suggestedQuestions: brief.suggestedQuestions,
      usedExternalResearch: false,
      briefId: brief.id,
    };
    const article = generateArticle({
      research,
      targetServicePage: brief.targetServicePage,
    });
    return generatedArticleToPost(article, `draft-seed-${index + 1}`);
  });
}

/** Resolve briefs not yet in existing slugs */
export function generateFromBriefs(
  category: ResearchResult["category"],
  count: number,
  existingSlugs: string[],
): Post[] {
  const briefs = findBriefsForGeneration(category, count).filter((b) => {
    const slug = slugifyVi(b.titleHint);
    return !existingSlugs.includes(slug);
  });
  return briefs.map((brief, i) => {
    const article = generateArticle({
      research: {
        keyword: brief.keyword,
        category: brief.category,
        intent: brief.intent,
        sources: [],
        keyPoints: brief.keyPoints,
        cautions: brief.cautions,
        suggestedQuestions: brief.suggestedQuestions,
        usedExternalResearch: false,
        briefId: brief.id,
      },
      targetServicePage: brief.targetServicePage,
    });
    return generatedArticleToPost(article, `draft-gen-${Date.now()}-${i}`);
  });
}
