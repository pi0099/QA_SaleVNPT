import type { GeneratedArticle } from "@/lib/ai/articleGenerator";

export type SeoCheckItem = {
  id: string;
  label: string;
  passed: boolean;
  detail?: string;
};

export type SeoCheckResult = {
  passed: boolean;
  items: SeoCheckItem[];
  wordCount: number;
};

function countWords(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text ? text.split(" ").length : 0;
}

function countMatches(html: string, tag: string): number {
  const re = new RegExp(`<${tag}[\\s>]`, "gi");
  return (html.match(re) ?? []).length;
}

export function runSeoChecklist(
  article: GeneratedArticle,
  existingSlugs: string[] = [],
  existingTitles: string[] = [],
): SeoCheckResult {
  const wordCount = countWords(article.content);
  const h1Count = countMatches(article.content, "h1");
  const h2Count = countMatches(article.content, "h2");
  const keyword = article.title.toLowerCase();
  const intro = article.content.slice(0, 800).toLowerCase();

  const keywordInTitle = article.seoTitle.toLowerCase().includes(
    keyword.split(" ")[0],
  );
  const keywordInIntro = intro.includes(keyword.split(" ")[0]);
  const keywordInH2 = (article.content.match(/<h2[^>]*>(.*?)<\/h2>/gi) ?? [])
    .join(" ")
    .toLowerCase()
    .includes(keyword.split(" ")[0]);

  const items: SeoCheckItem[] = [
    {
      id: "h1",
      label: "Exactly one H1",
      passed: h1Count === 1,
      detail: `Found ${h1Count} H1`,
    },
    {
      id: "h2-density",
      label: "H2 every ~200–300 words",
      passed: h2Count >= Math.floor(wordCount / 350),
      detail: `${h2Count} H2, ${wordCount} words`,
    },
    {
      id: "keyword-title",
      label: "Keyword in SEO title",
      passed: keywordInTitle,
    },
    {
      id: "keyword-intro",
      label: "Keyword in intro",
      passed: keywordInIntro,
    },
    {
      id: "keyword-h2",
      label: "Keyword in at least one H2",
      passed: keywordInH2,
    },
    {
      id: "faq",
      label: "Has FAQ block",
      passed: article.content.includes("post-faq-block") && article.faqs.length >= 5,
      detail: `${article.faqs.length} FAQs`,
    },
    {
      id: "cta",
      label: "Has CTA block",
      passed: article.content.includes("post-cta-block"),
    },
    {
      id: "internal-links",
      label: "Has internal service links",
      passed: article.content.includes("post-internal-links"),
    },
    {
      id: "meta-length",
      label: "Meta description under 160 chars",
      passed: article.seoDescription.length <= 160,
      detail: `${article.seoDescription.length} chars`,
    },
    {
      id: "slug",
      label: "Slug readable (no diacritics)",
      passed: /^[a-z0-9-]+$/.test(article.slug) && article.slug.length > 3,
    },
    {
      id: "length",
      label: "Content 800–1500 words",
      passed: wordCount >= 800 && wordCount <= 1500,
      detail: `${wordCount} words`,
    },
    {
      id: "duplicate-slug",
      label: "No duplicate slug",
      passed: !existingSlugs.includes(article.slug),
    },
    {
      id: "duplicate-title",
      label: "No duplicate title",
      passed: !existingTitles.some(
        (t) => t.toLowerCase() === article.title.toLowerCase(),
      ),
    },
  ];

  return {
    passed: items.every((i) => i.passed),
    items,
    wordCount,
  };
}
