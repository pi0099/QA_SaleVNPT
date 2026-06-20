import { faqs } from "@/data/faqs";
import { extraFaqs } from "@/data/faqs-extra";
import type { Faq } from "@/lib/content/types";

function mergeFaqs(): Faq[] {
  const base = faqs.filter((f) => f.isActive);
  const extras: Faq[] = extraFaqs.map((f, i) => ({
    ...f,
    id: `faq-extra-${i + 1}`,
    order: base.length + i + 1,
    isActive: true,
  }));
  return [...base, ...extras].sort((a, b) => a.order - b.order);
}

export async function fetchFaqs(): Promise<Faq[]> {
  return mergeFaqs();
}

export async function fetchFaqsByServiceSlug(
  serviceSlug: string,
): Promise<Faq[]> {
  return mergeFaqs().filter((f) => f.serviceSlug === serviceSlug);
}
