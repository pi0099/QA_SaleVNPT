import { faqsData } from "@/lib/content/faqs-data";
import { getSiteUrl } from "@/lib/seo";

export const faqItems = faqsData.map((f) => ({
  question: f.question,
  answer: f.answer,
}));

export function buildFaqJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
    url: `${siteUrl.replace(/\/$/, "")}/faq`,
  };
}

export { getSiteUrl };
