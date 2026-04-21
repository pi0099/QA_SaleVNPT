import {
  defaultSections,
  defaultSeo,
  site as defaultSite,
  type PackageCard,
  type PackageSection,
  type SeoSettings,
  type SiteSettings,
} from "@/lib/data";

export const CMS_STORAGE_KEY = "vnpt_sale_cms_v1";

export type CmsPayload = {
  sections: PackageSection[];
  site: SiteSettings;
  seo: SeoSettings;
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
  return {
    id,
    title: String(raw.title ?? ""),
    price: String(raw.price ?? ""),
    speed: legacySpeed,
    features: Array.isArray(raw.features)
      ? raw.features.map((f) => String(f))
      : [],
    promotion: String(raw.promotion ?? ""),
    variant: raw.variant === "orange" ? "orange" : "blue",
    isPopular: raw.isPopular === true,
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
  return {
    id,
    title: String(raw.title ?? ""),
    cards: ensureSinglePopular(
      cardsRaw.map((c, i) => normalizeCard(c as Record<string, unknown>, i)),
    ),
  };
}

function parsePayload(raw: unknown): CmsPayload | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const sectionsRaw = o.sections;
  if (!Array.isArray(sectionsRaw)) return null;
  const siteRaw = o.site;
  const site: SiteSettings =
    siteRaw && typeof siteRaw === "object"
      ? {
          name: String((siteRaw as Record<string, unknown>).name ?? defaultSite.name),
          heroTitle: String(
            (siteRaw as Record<string, unknown>).heroTitle ?? defaultSite.heroTitle,
          ),
          heroSubtitle: String(
            (siteRaw as Record<string, unknown>).heroSubtitle ??
              defaultSite.heroSubtitle,
          ),
        }
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
    sections: structuredClone(defaultSections),
    site: { ...defaultSite },
    seo: { ...defaultSeo },
  };
}

export function getCmsPayload(): CmsPayload {
  const stored = loadCmsFromStorage();
  if (stored) return stored;
  return getDefaultCmsPayload();
}
