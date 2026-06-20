import { seedDraftPostsFromBriefs } from "@/lib/ai/articleGenerator";

/**
 * 20 AI-generated draft posts — NOT published.
 * Separate from production posts in data/posts.ts.
 */
export const postsDrafts = seedDraftPostsFromBriefs();
