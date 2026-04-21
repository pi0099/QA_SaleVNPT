"use client";

import { useEffect, useRef, useState } from "react";
import PricingCard from "@/components/PricingCard";
import Section from "@/components/Section";
import type { PackageSection } from "@/lib/data";

type AnimatedPricingSectionProps = {
  section: PackageSection;
  bgClassName: string;
};

export default function AnimatedPricingSection({
  section,
  bgClassName,
}: AnimatedPricingSectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className={bgClassName}>
      <Section
        id={section.id}
        title={section.title}
        titleClassName={`pricing-title-reveal ${
          isVisible ? "pricing-title-reveal-visible" : ""
        }`}
      >
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {section.cards.map((card, cardIndex) => (
            <li
              key={card.id}
              className={`pricing-card-reveal flex ${
                isVisible ? "pricing-card-reveal-visible" : ""
              }`}
              style={{
                transitionDelay: `${120 + cardIndex * 120}ms`,
              }}
            >
              <PricingCard card={card} recommended={cardIndex === 1} />
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
