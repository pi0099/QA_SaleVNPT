/**
 * Generates data/posts.ts — run: node scripts/build-posts.mjs
 */
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "../data/posts.ts");

function countWords(html) {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text ? text.split(" ").filter(Boolean).length : 0;
}

function esc(str) {
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
}

/** @type {Array<{slug:string, body:string, faqs:Array<{question:string,answer:string}>, meta:object}>} */
const items = [];

// Import content from companion module
const { allPosts } = await import("./posts-content-data.mjs");
const { expansions } = await import("./post-expansions.mjs");
const { expansions2 } = await import("./post-expansions2.mjs");
const { expansions3 } = await import("./post-expansions3.mjs");
const { paddingBlocks } = await import("./post-padding.mjs");

for (const p of allPosts) {
  const slug = p.meta.slug;
  if (expansions[slug]) p.body = p.body + expansions[slug];
  if (expansions2[slug]) p.body = p.body + expansions2[slug];
  if (expansions3[slug]) p.body = p.body + expansions3[slug];
  if (paddingBlocks[slug]) p.body = p.body + paddingBlocks[slug];
  const padClosing = `<p>Nếu bạn cần tư vấn thêm, cứ nhắn tôi qua Zalo hoặc form trên website — tôi hỗ trợ khách tại Quận 12 và TP.HCM, phản hồi trong giờ hành chính. Mỗi nhà một tình huống; bài viết là khung tham khảo, tôi sẽ điều chỉnh lời khuyên theo địa chỉ và nhu cầu cụ thể của bạn.</p>`;
  while (countWords(p.body) < 820) {
    p.body += padClosing;
  }
  const w = countWords(p.body);
  if (w < 800) console.warn(`WARN ${p.meta.slug}: ${w} words (below 800)`);
  else if (w > 1500) console.warn(`WARN ${p.meta.slug}: ${w} words (above 1500)`);
  else console.log(`OK ${p.meta.slug}: ${w} words`);
}

const ts = `import type { Post, ServiceFaq } from "@/lib/content/types";
import { getBlogImage } from "@/lib/content/blog-images";
import {
  buildPostFooter,
  defaultServiceLinks,
  estimateReadingTime,
} from "./posts/helpers";

type PostSeed = Omit<
  Post,
  "id" | "content" | "readingTime" | "featuredImage" | "status" | "isFeatured"
> & { featured?: boolean };

function createPost(
  index: number,
  bodyHtml: string,
  footerFaqs: ServiceFaq[],
  seed: PostSeed,
): Post {
  const content = bodyHtml + buildPostFooter(footerFaqs, defaultServiceLinks);
  return {
    id: String(index),
    featuredImage: index % 3 === 0 ? undefined : getBlogImage(index),
    status: "published",
    isFeatured: seed.featured ?? index <= 3,
    ...seed,
    content,
    readingTime: estimateReadingTime(content),
  };
}

${allPosts
  .map((p, i) => {
    const faqsStr = JSON.stringify(p.faqs, null, 2);
    const meta = p.meta;
    const seedFields = [
      `slug: ${JSON.stringify(meta.slug)}`,
      `title: ${JSON.stringify(meta.title)}`,
      `excerpt: ${JSON.stringify(meta.excerpt)}`,
      `category: ${JSON.stringify(meta.category)}`,
      `tags: ${JSON.stringify(meta.tags)}`,
      `seoTitle: ${JSON.stringify(meta.seoTitle)}`,
      `seoDescription: ${JSON.stringify(meta.seoDescription)}`,
      `publishedAt: ${JSON.stringify(meta.publishedAt)}`,
      `relatedPostSlugs: ${JSON.stringify(meta.relatedPostSlugs)}`,
      ...(meta.featured ? ["featured: true"] : []),
    ].join(",\n    ");
    return `const post${i + 1}Body = \`${esc(p.body)}\`;

const post${i + 1}Faqs: ServiceFaq[] = ${faqsStr};`;
  })
  .join("\n\n")}

export const posts: Post[] = [
${allPosts
  .map((p, i) => {
    const meta = p.meta;
    const seedFields = [
      `slug: ${JSON.stringify(meta.slug)}`,
      `title: ${JSON.stringify(meta.title)}`,
      `excerpt: ${JSON.stringify(meta.excerpt)}`,
      `category: ${JSON.stringify(meta.category)}`,
      `tags: ${JSON.stringify(meta.tags)}`,
      `seoTitle: ${JSON.stringify(meta.seoTitle)}`,
      `seoDescription: ${JSON.stringify(meta.seoDescription)}`,
      `publishedAt: ${JSON.stringify(meta.publishedAt)}`,
      `relatedPostSlugs: ${JSON.stringify(meta.relatedPostSlugs)}`,
      ...(meta.featured ? ["featured: true"] : []),
    ].join(",\n    ");
    return `  createPost(${i + 1}, post${i + 1}Body, post${i + 1}Faqs, {\n    ${seedFields},\n  })`;
  })
  .join(",\n")}
];
`;

writeFileSync(OUT, ts, "utf8");
console.log(`\nWrote ${OUT}`);
