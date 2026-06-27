import FaqAccordion from "@/components/FaqAccordion";
import Section from "@/components/Section";
import { faqsData } from "@/lib/content/faqs-data";

export default function HomeFaqSection() {
  const faqItems = faqsData
    .filter((f) => f.isActive)
    .sort((a, b) => a.order - b.order)
    .slice(0, 8)
    .map((f) => ({ question: f.question, answer: f.answer }));

  return (
    <Section
      id="home-faq"
      title="Câu hỏi thường gặp"
      subtitle="Giải đáp nhanh về gói cước WiFi, SIM 5G và Camera VNPT tại TP.HCM."
      contentClassName="!mt-8"
      className="pricing-section-bg-alt border-t border-sky-100/80"
    >
      <FaqAccordion items={faqItems} />
    </Section>
  );
}
