import {
  defaultSeo,
  enrichedDefaultSections,
  site as defaultLegacySite,
} from "@/lib/data";
import { defaultSiteSettings } from "@/lib/content/site-settings";
import {
  defaultCopyrightText,
  defaultDesignByText,
  defaultDesignByUrl,
  defaultFooterColumns,
  defaultHeaderSlogan,
} from "@/lib/cms-store/footer-defaults";
import { faqs } from "@/data/faqs";
import { extraFaqs } from "@/data/faqs-extra";
import { localAreas } from "@/data/localAreas";
import { posts } from "@/data/posts";
import { postsDrafts } from "@/data/posts-drafts";
import { docxBatch01Drafts } from "@/data/blog-drafts/batch-01";
import { services } from "@/data/services";
import { postCategoryLabels } from "@/lib/content/blog-images";
import type { PostCategory } from "@/lib/content/types";
import type {
  CmsStore,
  ExtendedSiteSettings,
  PostCategoryDef,
} from "@/lib/cms-store/types";
import { defaultHomepageBanners } from "@/lib/cms-store/banner-defaults";

function buildExtendedSiteSettings(): ExtendedSiteSettings {
  return {
    ...defaultSiteSettings,
    email: "",
    primaryCtaText: "Gửi thông tin tư vấn",
    secondaryCtaText: "Gọi tư vấn miễn phí",
    footerContent: defaultSiteSettings.disclaimer,
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID ?? "",
    googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
    facebookPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
    phone: defaultLegacySite.phoneNumber,
    zaloUrl: defaultLegacySite.zalo,
    messengerUrl: defaultLegacySite.messenger ?? "",
    headerSlogan: defaultHeaderSlogan,
    copyrightText: defaultCopyrightText,
    designByText: defaultDesignByText,
    designByUrl: defaultDesignByUrl,
    footerColumns: structuredClone(defaultFooterColumns),
  };
}

function buildPostCategories(): PostCategoryDef[] {
  return (Object.keys(postCategoryLabels) as PostCategory[]).map((id, index) => ({
    id,
    name: postCategoryLabels[id],
    slug: id,
    description: postCategoryLabels[id],
    isActive: true,
    order: index,
  }));
}

/** 5th service: WiFi Quận 12 local page */
function buildServicesWithLocal() {
  return [...services];
}

function buildFaqs() {
  const merged = [
    ...faqs,
    ...extraFaqs.map((f, i) => ({
      id: `faq-extra-${i + 1}`,
      question: f.question,
      answer: f.answer,
      category: f.category,
      serviceSlug: f.serviceSlug,
      order: faqs.length + i + 1,
      isActive: true,
    })),
  ];
  return merged;
}

export function buildDefaultCmsStore(): CmsStore {
  const siteSettings = buildExtendedSiteSettings();
  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    siteSettings,
    legacySite: { ...defaultLegacySite },
    homepageSeo: { ...defaultSeo },
    sections: structuredClone(enrichedDefaultSections),
    homepageBanners: structuredClone(defaultHomepageBanners),
    services: buildServicesWithLocal(),
    posts: [
      ...structuredClone(posts),
      ...structuredClone(postsDrafts),
      ...structuredClone(docxBatch01Drafts),
    ],
    postCategories: buildPostCategories(),
    faqs: buildFaqs(),
    localAreas: structuredClone(localAreas),
    leads: [],
  };
}
