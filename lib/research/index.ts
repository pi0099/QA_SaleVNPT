import type { ResearchProvider } from "@/lib/research/researchProvider";
import { mockResearchProvider } from "@/lib/research/mockResearchProvider";

/**
 * Returns active research provider.
 * Phase 2: swap when GOOGLE_CSE_KEY, TAVILY_API_KEY, etc. are configured.
 */
export function getResearchProvider(): ResearchProvider {
  // if (process.env.TAVILY_API_KEY) return new TavilyResearchProvider();
  // if (process.env.GOOGLE_CSE_KEY) return new GoogleCseResearchProvider();
  return mockResearchProvider;
}

export { mockResearchProvider } from "@/lib/research/mockResearchProvider";
export type {
  ResearchProvider,
  ResearchParams,
  ResearchResult,
  GeneratorCategory,
  SearchIntent,
} from "@/lib/research/researchProvider";
