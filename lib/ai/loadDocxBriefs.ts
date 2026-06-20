import docxBriefs from "@/data/docx-topic-briefs.json";
import type { DocxTopicBrief } from "@/lib/ai/docxBriefTypes";

export function loadDocxBriefs(): DocxTopicBrief[] {
  return docxBriefs as DocxTopicBrief[];
}

export function getDocxBriefByNum(num: number): DocxTopicBrief | undefined {
  return loadDocxBriefs().find((b) => b.num === String(num));
}

export function getDocxBriefBatch(
  startNum: number,
  count = 5,
): DocxTopicBrief[] {
  return loadDocxBriefs().filter((b) => {
    const n = Number(b.num);
    return n >= startNum && n < startNum + count;
  });
}

export const DOCX_BRIEF_SOURCE_NOTE =
  "Draft generated from VNPT_Blog_Topic_Briefs_100.docx (internal topic brief). External research not connected. Original Vietnamese content — not copied from web sources.";
