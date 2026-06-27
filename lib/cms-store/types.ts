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
  /** Slogan bán hàng cạnh logo header */
  headerSlogan?: string;
  copyrightText?: string;
  designByText?: string;
  designByUrl?: string;
  footerColumns?: FooterColumn[];
};

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
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

/** Một slide banner carousel trang chủ */
export type HomepageBannerSlide = {
  id: string;
  /** ID gói cước — dùng để lấy tên, link trang sản phẩm */
  cardId: string;
  /** ID section chứa gói */
  sectionId: string;
  /** URL ảnh banner (public hoặc Blob) */
  imageUrl: string;
  sortOrder?: number;
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
  /** Banner carousel trang chủ — quản lý tại Admin → Trang chủ & Banner */
  homepageBanners: HomepageBannerSlide[];
  services: Service[];
  posts: Post[];
  postCategories: PostCategoryDef[];
  faqs: Faq[];
  localAreas: LocalArea[];
  leads: Lead[];
};

export type { ServiceFaq };
