import type { PackageSection, SeoSettings, SiteSettings as LegacySite } from "@/lib/data";
import type {
  Faq,
  LocalArea,
  Post,
  PostCategory,
  Service,
  ServiceFaq,
  SiteSettings,
} from "@/lib/content/types";

export type LeadStatus = "new" | "contacted" | "converted" | "lost";

export type Lead = {
  id: string;
  name: string;
  phone: string;
  address: string;
  needType: string;
  note: string;
  sourcePage: string;
  createdAt: string;
  status: LeadStatus;
  adminNote?: string;
};

export type ExtendedSiteSettings = SiteSettings & {
  email?: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  footerContent: string;
  facebookPixelId?: string;
  googleAnalyticsId?: string;
  googleSiteVerification?: string;
};

export type PostCategoryDef = {
  id: PostCategory;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  isActive: boolean;
  order: number;
};

/** Full CMS store — single source of truth (file-backed, Supabase-ready). */
export type CmsStore = {
  version: 1;
  updatedAt: string;
  siteSettings: ExtendedSiteSettings;
  /** Legacy homepage contact — synced with siteSettings phone/zalo */
  legacySite: LegacySite;
  homepageSeo: SeoSettings;
  sections: PackageSection[];
  services: Service[];
  posts: Post[];
  postCategories: PostCategoryDef[];
  faqs: Faq[];
  localAreas: LocalArea[];
  leads: Lead[];
};

export type { ServiceFaq };
