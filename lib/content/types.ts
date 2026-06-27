export type PostCategory =
  | "wifi"
  | "sim-5g"
  | "camera"
  | "troubleshooting"
  | "tech";

export type SiteSettings = {
  siteName: string;
  tagline: string;
  phone: string;
  zaloUrl: string;
  messengerUrl: string;
  consultantName: string;
  serviceAreaText: string;
  disclaimer: string;
  addressText?: string;
  ogImage: string;
  logo: string;
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type Service = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  longContent: string;
  seoTitle: string;
  seoDescription: string;
  heroImage?: string;
  category: string;
  isActive: boolean;
  order: number;
  faqs: ServiceFaq[];
  relatedPostSlugs: string[];
  /** CMS section id on homepage for pricing cards */
  sectionId?: string;
  /** HTML block: who should use this service */
  suitableForHtml?: string;
  /** HTML block: registration / install steps */
  registrationHtml?: string;
};

export type Package = {
  id: string;
  serviceId: string;
  name: string;
  price: string;
  originalPrice?: string;
  speed: string;
  dataLimit?: string;
  features: string[];
  highlightText?: string;
  isFeatured: boolean;
  ctaText: string;
  order: number;
  isActive: boolean;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: PostCategory;
  tags: string[];
  featuredImage?: string;
  seoTitle: string;
  seoDescription: string;
  ogTitle?: string;
  ogDescription?: string;
  facebookCaption?: string;
  readingTime: number;
  publishedAt: string;
  status: "draft" | "published";
  faqs?: ServiceFaq[];
  relatedPostSlugs: string[];
  isFeatured: boolean;
  /** Admin-only notes — not shown publicly unless enabled */
  sourceNotes?: string;
  generatedByAI?: boolean;
  reviewedByAdmin?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  category: string;
  serviceSlug?: string;
  order: number;
  isActive: boolean;
};

export type LocalArea = {
  id: string;
  name: string;
  slug: string;
  serviceType: string;
  seoTitle: string;
  seoDescription: string;
  content: string;
  isActive: boolean;
  hasDedicatedPage: boolean;
  faqs: ServiceFaq[];
  relatedPostSlugs: string[];
  suitableForHtml?: string;
  registrationHtml?: string;
};

export type FetchPostsParams = {
  category?: PostCategory | "all";
  page?: number;
  search?: string;
  limit?: number;
};

export type FetchPostsResult = {
  posts: Post[];
  total: number;
  page: number;
  totalPages: number;
};
