import type {
  ResearchParams,
  ResearchProvider,
  ResearchResult,
} from "@/lib/research/researchProvider";
import {
  briefToResearchResult,
  findBriefByKeyword,
  findBriefsForGeneration,
} from "@/lib/research/topicBriefs";

const INTERNAL_BRIEF_NOTE =
  "Draft generated from internal topic brief. External research not connected yet.";

/**
 * Phase 1 provider — uses predefined topic briefs only.
 * Does NOT fetch or scrape external URLs.
 */
export class MockResearchProvider implements ResearchProvider {
  async researchTopic(params: ResearchParams): Promise<ResearchResult> {
    const { keyword, category, manualSourceUrls = [] } = params;

    const brief =
      findBriefByKeyword(keyword) ??
      findBriefsForGeneration(category, 1, keyword)[0];

    const result = briefToResearchResult(brief, manualSourceUrls);

    const sourceNotesParts = [INTERNAL_BRIEF_NOTE];
    if (manualSourceUrls.length > 0) {
      sourceNotesParts.push(
        `Admin reference URLs (not scraped): ${manualSourceUrls.join(", ")}`,
      );
    }

    return {
      ...result,
      keyword: keyword.trim() || brief.keyword,
      category: params.category,
      intent: params.intent,
      warning:
        manualSourceUrls.length > 0
          ? "External research is not connected. URLs stored as references only — no text copied."
          : "External research is not connected. Draft uses internal topic brief only.",
    };
  }
}

export async function researchMultipleTopics(
  params: ResearchParams & { count?: number },
): Promise<ResearchResult[]> {
  const provider = new MockResearchProvider();
  const count = params.count ?? 1;

  if (params.keyword.trim()) {
    const one = await provider.researchTopic(params);
    if (count <= 1) return [one];
    const briefs = findBriefsForGeneration(params.category, count, params.keyword);
    const results: ResearchResult[] = [one];
    for (let i = 1; i < briefs.length; i++) {
      results.push(
        briefToResearchResult(briefs[i], params.manualSourceUrls ?? []),
      );
    }
    return results.slice(0, count);
  }

  const briefs = findBriefsForGeneration(
    params.category,
    count,
    params.keyword,
  );
  return Promise.all(
    briefs.map((brief) =>
      provider.researchTopic({
        ...params,
        keyword: brief.keyword,
      }),
    ),
  );
}

export const mockResearchProvider = new MockResearchProvider();
