import { sectionServiceMap } from "@/lib/content/section-map";
import type {
  HomepageTier,
  PackageCard,
  PackageSection,
  PriceZone,
  SectionPricingMode,
} from "@/lib/data";

export const HOMEPAGE_TIER_ORDER: HomepageTier[] = [
  "budget",
  "balanced",
  "premium",
];

export const TIER_LABELS: Record<HomepageTier, string> = {
  budget: "Rẻ nhất",
  balanced: "Phù hợp nhất",
  premium: "Xịn nhất",
};

/** Default tier assignment by card id for seed data */
const DEFAULT_TIER_BY_CARD_ID: Record<string, HomepageTier> = {
  "inet-home-1": "budget",
  "inet-home-2": "balanced",
  "inet-home-3": "premium",
  "combo-home-sanh-2": "budget",
  "combo-home-dinh": "premium",
  "5g-yolo100m": "budget",
  "5g-soda125": "balanced",
  "5g-u1500": "premium",
  "5g-vd120m": "budget",
  "5g-d159v": "balanced",
  "5g-vip199": "premium",
  "sim-s": "budget",
  "sim-m": "balanced",
  "sim-l": "premium",
  "cam-home": "budget",
  "cam-pro": "premium",
};

const DEFAULT_HERO_CARD_IDS = [
  "5g-u1500",
  "inet-hometv-2",
  "combo-home-sanh-2",
  "5g-soda125",
  "5g-vd120m",
  "sim-m",
];

const DEFAULT_HERO_IMAGE_BY_CARD_ID: Record<string, string> = {
  "5g-u1500": "/sim-data-u1500-banner.png",
};

const DEFAULT_HERO_LINK_BY_CARD_ID: Record<string, string> = {
  "5g-u1500": "/sim-u1500-vinaphone",
};

const DEFAULT_SERVICE_SLUG: Record<string, string> = {
  "internet-gia-dinh": "wifi-vnpt",
  "internet-di-dong": "internet-di-dong-vnpt",
  "goi-5g-data": "sim-5g-vnpt",
  "goi-5g-combo": "sim-5g-vnpt",
  "sim-4g": "sim-5g-vnpt",
  camera: "camera-vnpt",
};

export function cardHasDualPricing(card: PackageCard): boolean {
  return (card.priceOuterCity ?? "").trim().length > 0;
}

export function sectionHasDualPricing(section: PackageSection): boolean {
  return section.cards.some(cardHasDualPricing);
}

export function resolveSectionPricingMode(
  section: PackageSection,
): SectionPricingMode {
  if (section.pricingMode === "single") return "single";
  if (section.pricingMode === "dual") return "dual";
  return sectionHasDualPricing(section) ? "dual" : "single";
}

export function sectionShowPricingTabs(section: PackageSection): boolean {
  return resolveSectionPricingMode(section) === "dual" && sectionHasDualPricing(section);
}

export function getSectionServicePath(section: PackageSection): string | undefined {
  const slug = section.serviceSlug ?? DEFAULT_SERVICE_SLUG[section.id];
  return slug ? `/${slug}` : sectionServiceMap[section.id]?.path;
}

export function getSectionIntro(section: PackageSection): string | undefined {
  return section.homepageIntro ?? sectionServiceMap[section.id]?.intro;
}

export function sortCardsForDisplay(cards: PackageCard[]): PackageCard[] {
  return [...cards].sort((a, b) => {
    const ao = a.sortOrder ?? 999;
    const bo = b.sortOrder ?? 999;
    if (ao !== bo) return ao - bo;
    return a.title.localeCompare(b.title, "vi");
  });
}

export function getHomepageTierCards(section: PackageSection): PackageCard[] {
  const byTier = new Map<HomepageTier, PackageCard>();
  for (const card of section.cards) {
    if (card.homepageTier) {
      byTier.set(card.homepageTier, card);
    }
  }
  return HOMEPAGE_TIER_ORDER.map((tier) => byTier.get(tier)).filter(
    (c): c is PackageCard => c != null,
  );
}

export function getHeroProducts(sections: PackageSection[]): PackageCard[] {
  return sections
    .flatMap((s) => s.cards)
    .filter((c) => c.isHero)
    .sort((a, b) => (a.heroOrder ?? 999) - (b.heroOrder ?? 999));
}

export type HeroProductEntry = {
  card: PackageCard;
  sectionId: string;
  href: string;
};

export function getHeroProductHref(
  card: PackageCard,
  section: PackageSection,
): string {
  if (card.heroLinkHref?.trim()) return card.heroLinkHref.trim();
  if (DEFAULT_HERO_LINK_BY_CARD_ID[card.id]) {
    return DEFAULT_HERO_LINK_BY_CARD_ID[card.id];
  }
  const slug = section.serviceSlug ?? DEFAULT_SERVICE_SLUG[section.id];
  return slug ? `/${slug}` : "#";
}

export function getHeroImageUrl(card: PackageCard): string | undefined {
  const custom = card.heroImageUrl?.trim();
  if (custom) return custom;
  return DEFAULT_HERO_IMAGE_BY_CARD_ID[card.id];
}

export function getHeroProductsWithSection(
  sections: PackageSection[],
): HeroProductEntry[] {
  return sections
    .flatMap((s) =>
      s.cards
        .filter((c) => c.isHero)
        .map((card) => ({
          card,
          sectionId: s.id,
          href: getHeroProductHref(card, s),
        })),
    )
    .sort(
      (a, b) =>
        (a.card.heroOrder ?? 999) - (b.card.heroOrder ?? 999),
    );
}

export function parsePriceNumber(price: string): number {
  const digits = price.replace(/\D/g, "");
  return digits ? parseInt(digits, 10) : 0;
}

export function getDisplayPrice(
  card: PackageCard,
  zone: PriceZone,
): string {
  if (zone === "outer" && cardHasDualPricing(card)) {
    return (card.priceOuterCity ?? card.price).trim();
  }
  return card.price;
}

export function enrichPackageCard(
  card: PackageCard,
  index: number,
): PackageCard {
  const tier = card.homepageTier ?? DEFAULT_TIER_BY_CARD_ID[card.id];
  const isHero = card.isHero ?? DEFAULT_HERO_CARD_IDS.includes(card.id);
  const heroOrder =
    card.heroOrder ??
    (isHero
      ? DEFAULT_HERO_CARD_IDS.indexOf(card.id) + 1 || index + 1
      : undefined);
  const heroImageUrl =
    card.heroImageUrl ?? DEFAULT_HERO_IMAGE_BY_CARD_ID[card.id];
  const heroLinkHref =
    card.heroLinkHref ?? DEFAULT_HERO_LINK_BY_CARD_ID[card.id];

  return {
    ...card,
    sortOrder: card.sortOrder ?? index,
    ...(tier ? { homepageTier: tier } : {}),
    ...(isHero ? { isHero: true, heroOrder } : {}),
    ...(heroImageUrl ? { heroImageUrl } : {}),
    ...(heroLinkHref ? { heroLinkHref } : {}),
  };
}

export function enrichPackageSection(section: PackageSection): PackageSection {
  const pricingMode: SectionPricingMode =
    section.pricingMode ??
    (sectionHasDualPricing(section) ? "dual" : "single");

  return {
    ...section,
    pricingMode,
    serviceSlug:
      section.serviceSlug ?? DEFAULT_SERVICE_SLUG[section.id],
    homepageIntro:
      section.homepageIntro ?? sectionServiceMap[section.id]?.intro,
    cards: section.cards.map((card, i) => enrichPackageCard(card, i)),
  };
}

export function enrichPackageSections(
  sections: PackageSection[],
): PackageSection[] {
  return sections.map(enrichPackageSection);
}

export function migrateCmsSections(
  sections: PackageSection[],
): PackageSection[] {
  return enrichPackageSections(sections);
}
