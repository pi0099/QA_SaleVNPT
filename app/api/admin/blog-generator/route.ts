import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/admin-auth";
import {
  generateArticle,
  generatedArticleToPost,
  type ArticleTone,
} from "@/lib/ai/articleGenerator";
import { runSeoChecklist } from "@/lib/blog/seoChecklist";
import { cmsId } from "@/lib/cms-store/id";
import { readCmsStore, updateCmsStore } from "@/lib/cms-store/server";
import type {
  GeneratorCategory,
  SearchIntent,
} from "@/lib/research/researchProvider";
import { researchMultipleTopics } from "@/lib/research/mockResearchProvider";

type GenerateBody = {
  keyword?: string;
  category?: GeneratorCategory;
  searchIntent?: SearchIntent;
  targetServicePage?: string;
  count?: number;
  tone?: ArticleTone;
  manualSourceUrls?: string[];
  save?: boolean;
};

export async function POST(req: NextRequest) {
  const session = await getAdminSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as GenerateBody;
    const category = body.category ?? "wifi-vnpt";
    const searchIntent = body.searchIntent ?? "informational";
    const count = Math.min(Math.max(body.count ?? 1, 1), 5);
    const tone = body.tone ?? "helpful";
    const keyword = body.keyword?.trim() ?? "";
    const manualSourceUrls = (body.manualSourceUrls ?? []).filter(Boolean);

    const researchResults = await researchMultipleTopics({
      keyword,
      category,
      intent: searchIntent,
      manualSourceUrls,
      count,
    });

    const store = await readCmsStore();
    const existingSlugs = store.posts.map((p) => p.slug);
    const existingTitles = store.posts.map((p) => p.title);

    const previews = researchResults.map((research) => {
      const article = generateArticle({
        research,
        tone,
        targetServicePage: body.targetServicePage,
      });
      const seoCheck = runSeoChecklist(article, existingSlugs, existingTitles);
      const post = generatedArticleToPost(article, cmsId("post"));
      return { article, seoCheck, post, researchWarning: research.warning };
    });

    const warning =
      previews[0]?.researchWarning ??
      "External research is not connected. Draft uses internal topic brief only.";

    if (body.save) {
      const newPosts = previews.map((p) => p.post);
      const deduped = newPosts.filter(
        (p) => !existingSlugs.includes(p.slug),
      );
      if (deduped.length > 0) {
        await updateCmsStore((s) => ({
          ...s,
          posts: [...deduped, ...s.posts],
        }));
      }
      return NextResponse.json({
        warning,
        saved: deduped.length,
        skipped: newPosts.length - deduped.length,
        previews,
      });
    }

    return NextResponse.json({ warning, previews });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Generation failed" },
      { status: 500 },
    );
  }
}
