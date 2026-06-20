import type { PostCategory } from "@/lib/content/types";

export type SearchIntent =
  | "informational"
  | "comparison"
  | "troubleshooting"
  | "pricing"
  | "local";

export type GeneratorCategory =
  | "wifi-vnpt"
  | "sim-5g"
  | "camera"
  | "troubleshooting"
  | "internet-gia-dinh";

export type ResearchSource = {
  url: string;
  title: string;
  snippet?: string;
  /** Admin-pasted URL — content not scraped */
  referenceOnly?: boolean;
};

export type ResearchParams = {
  keyword: string;
  category: GeneratorCategory;
  intent: SearchIntent;
  manualSourceUrls?: string[];
};

export type ResearchResult = {
  keyword: string;
  category: GeneratorCategory;
  intent: SearchIntent;
  sources: ResearchSource[];
  keyPoints: string[];
  cautions: string[];
  suggestedQuestions: string[];
  /** false when using internal topic brief only */
  usedExternalResearch: boolean;
  warning?: string;
  briefId?: string;
};

export interface ResearchProvider {
  researchTopic(params: ResearchParams): Promise<ResearchResult>;
}

export function mapGeneratorCategoryToPost(
  category: GeneratorCategory,
): PostCategory {
  switch (category) {
    case "sim-5g":
      return "sim-5g";
    case "camera":
      return "camera";
    case "troubleshooting":
      return "troubleshooting";
    case "internet-gia-dinh":
    case "wifi-vnpt":
    default:
      return "wifi";
  }
}
