export type DocxTopicBrief = {
  num: string;
  category: string;
  slug: string;
  title: string;
  keyword: string;
  intent: string;
  brief: string;
  targetLink: string;
  image: string;
  fbCaption: string;
};

export type DocxBriefBatchResult = {
  batchNumber: number;
  briefNums: number[];
  posts: import("@/lib/content/types").Post[];
};
