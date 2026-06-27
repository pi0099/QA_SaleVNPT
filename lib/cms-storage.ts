import {
  defaultSeo,
  enrichedDefaultSections,
  site as defaultSite,
  type HomepageTier,
  type PackageCard,
  type PackageSection,
  type SeoSettings,
  type SiteSettings,
} from "@/lib/data";
import type { FooterColumn, HomepageBannerSlide } from "@/lib/cms-store/types";
import {
  defaultFooterColumns,
  defaultHeaderSlogan,
  defaultCopyrightText,
  defaultDesignByText,
  defaultDesignByUrl,
} from "@/lib/cms-store/footer-defaults";
import { defaultHomepageBanners } from "@/lib/cms-store/banner-defaults";
import { defaultSiteSettings } from "@/lib/content/site-settings";

export const CMS_STORAGE_KEY = "vnpt_sale_cms_v1";

export type CmsBranding = {
  headerSlogan?: string;
  footerColumns?: FooterColumn[];
  copyrightText?: string;
  designByText?: string;
  designByUrl?: string;
  logo?: string;
};

export type CmsPayload = {
  sections: PackageSection[];
  homepageBanners: HomepageBannerSlide[];
  site: SiteSettings;
  seo: SeoSettings;
  branding?: CmsBranding;
};

function slugId(prefix: string): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
  }
  return `${prefix}-${Date.now().toString(36)}`;
}

export function createSectionId(): string {
  return slugId("sec");
}

export function createCardId(): string {
  return slugId("card");
}

function normalizeCard(raw: Record<string, unknown>, index: number): PackageCard {
  const legacySpeed =
    (typeof raw.speedLine === "string" && raw.speedLine) ||
    (typeof raw.speed === "string" && raw.speed) ||
    "";
  const id =
    typeof raw.id === "string" && raw.id.length > 0
      ? raw.id
      : `card-${index}-${legacySpeed.slice(0, 6)}`;
  const outerRaw = raw.priceOuterCity;
  const priceOuterCity =
    typeof outerRaw === "string" && outerRaw.trim().length > 0
      ? String(outerRaw).trim()
      : undefined;

  return {
    id,
    title: String(raw.title ?? ""),
    price: String(raw.price ?? ""),
    priceOuterCity,
    speed: legacySpeed,
    features: Array.isArray(raw.features)
      ? raw.features.map((f) => String(f))
      : [],
    promotion: String(raw.promotion ?? ""),
    variant: raw.variant === "orange" ? "orange" : "blue",
    isPopular: raw.isPopular === true,
    ...(raw.homepageTier === "budget" ||
    raw.homepageTier === "balanced" ||
    raw.homepageTier === "premium"
      ? { homepageTier: raw.homepageTier as HomepageTier }
      : {}),
    ...(raw.isHero === true ? { isHero: true } : {}),
    ...(typeof raw.heroOrder === "number" ? { heroOrder: raw.heroOrder } : {}),
    ...(typeof raw.heroSubtitle === "string"
      ? { heroSubtitle: raw.heroSubtitle }
      : {}),
    ...(typeof raw.heroImageUrl === "string" && raw.heroImageUrl.trim()
      ? { heroImageUrl: raw.heroImageUrl.trim() }
      : {}),
    ...(typeof raw.heroLinkHref === "string" && raw.heroLinkHref.trim()
      ? { heroLinkHref: raw.heroLinkHref.trim() }
      : {}),
    ...(typeof raw.sortOrder === "number" ? { sortOrder: raw.sortOrder } : {}),
  };
}

function ensureSinglePopular(cards: PackageCard[]): PackageCard[] {
  let found = false;
  return cards.map((card) => {
    if (!card.isPopular) return card;
    if (found) return { ...card, isPopular: false };
    found = true;
    return card;
  });
}

function normalizeSection(raw: Record<string, unknown>, index: number): PackageSection {
  const id =
    typeof raw.id === "string" && raw.id.length > 0
      ? raw.id
      : `section-${index}`;
  const cardsRaw = Array.isArray(raw.cards) ? raw.cards : [];
  const sloganRaw = raw.slogan;
  const sloganTrimmed =
    typeof sloganRaw === "string" ? sloganRaw.trim() : "";
  const section: PackageSection = {
    id,
    title: String(raw.title ?? ""),
    cards: ensureSinglePopular(
      cardsRaw.map((c, i) => normalizeCard(c as Record<string, unknown>, i)),
    ),
  };
  if (sloganTrimmed.length > 0) {
    section.slogan = sloganTrimmed;
  }
  if (raw.pricingMode === "dual" || raw.pricingMode === "single") {
    section.pricingMode = raw.pricingMode;
  }
  if (typeof raw.homepageIntro === "string" && raw.homepageIntro.trim()) {
    section.homepageIntro = raw.homepageIntro.trim();
  }
  if (typeof raw.serviceSlug === "string" && raw.serviceSlug.trim()) {
    section.serviceSlug = raw.serviceSlug.trim();
  }
  return section;
}

function parsePayload(raw: unknown): CmsPayload | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const sectionsRaw = o.sections;
  if (!Array.isArray(sectionsRaw)) return null;
  const siteRaw = o.site;
  const site: SiteSettings =
    siteRaw && typeof siteRaw === "object"
      ? (() => {
          const r = siteRaw as Record<string, unknown>;
          if ("phoneNumber" in r || "zalo" in r || "messenger" in r) {
            return {
              phoneNumber:
                "phoneNumber" in r
                  ? String(r.phoneNumber ?? "")
                  : defaultSite.phoneNumber,
              zalo:
                "zalo" in r ? String(r.zalo ?? "") : defaultSite.zalo,
              messenger:
                "messenger" in r ? String(r.messenger ?? "") : "",
            };
          }
          /* Legacy site.name / hero* — không còn dùng trên UI; giữ mặc định liên hệ */
          return { ...defaultSite };
        })()
      : { ...defaultSite };

  const seoRaw = o.seo;
  const seo: SeoSettings =
    seoRaw && typeof seoRaw === "object"
      ? {
          title: String(
            (seoRaw as Record<string, unknown>).title ?? defaultSeo.title,
          ),
          description: String(
            (seoRaw as Record<string, unknown>).description ??
              defaultSeo.description,
          ),
          keywords: String(
            (seoRaw as Record<string, unknown>).keywords ??
              defaultSeo.keywords,
          ),
        }
      : { ...defaultSeo };

  return {
    sections: sectionsRaw.map((s, i) =>
      normalizeSection(s as Record<string, unknown>, i),
    ),
    homepageBanners: [],
    site,
    seo,
  };
}

export function loadCmsFromStorage(): CmsPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CMS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    return parsePayload(parsed);
  } catch {
    return null;
  }
}

export function saveCmsToStorage(payload: CmsPayload): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(payload));
}

export function getDefaultCmsPayload(): CmsPayload {
  return {
    sections: structuredClone(enrichedDefaultSections),
    homepageBanners: structuredClone(defaultHomepageBanners),
    site: { ...defaultSite },
    seo: { ...defaultSeo },
    branding: {
      headerSlogan: defaultHeaderSlogan,
      footerColumns: structuredClone(defaultFooterColumns),
      copyrightText: defaultCopyrightText,
      designByText: defaultDesignByText,
      designByUrl: defaultDesignByUrl,
      logo: defaultSiteSettings.logo,
    },
  };
}

export function getCmsPayload(): CmsPayload {
  const stored = loadCmsFromStorage();
  if (stored) return stored;
  return getDefaultCmsPayload();
}
