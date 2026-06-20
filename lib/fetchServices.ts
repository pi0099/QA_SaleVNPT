import { services } from "@/data/services";
import type { Service } from "@/lib/content/types";

export async function fetchServices(): Promise<Service[]> {
  return services.filter((s) => s.isActive).sort((a, b) => a.order - b.order);
}

export async function fetchServiceBySlug(
  slug: string,
): Promise<Service | undefined> {
  return services.find((s) => s.slug === slug && s.isActive);
}

export async function getAllServiceSlugs(): Promise<string[]> {
  return services.filter((s) => s.isActive).map((s) => s.slug);
}

export async function fetchServicePackages(serviceSlug: string) {
  const service = await fetchServiceBySlug(serviceSlug);
  if (!service?.sectionId) return [];
  const { fetchPackageSections } = await import("@/lib/fetchPackages");
  const sections = await fetchPackageSections();
  const section = sections.find((s) => s.id === service.sectionId);
  if (!section) return [];
  return section.cards.map((card, index) => ({
    id: card.id,
    serviceId: service.id,
    name: card.title,
    price: card.price,
    originalPrice: card.priceOuterCity,
    speed: card.speed,
    features: card.features,
    highlightText: card.promotion,
    isFeatured: card.isPopular,
    ctaText: "Đăng ký tư vấn",
    order: index,
    isActive: true,
  }));
}
