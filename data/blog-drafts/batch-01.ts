import { generateDocxBriefBatch } from "@/lib/ai/docxArticleGenerator";
import { posts } from "@/data/posts";

/** Batch 1: DOCX briefs #1–#5 — all draft, not published */
export const docxBatch01Drafts = generateDocxBriefBatch(
  1,
  5,
  posts.filter((p) => p.status === "published").map((p) => p.slug),
  posts.map((p) => p.title),
);
