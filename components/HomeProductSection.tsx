"use client";

import { useState } from "react";
import Link from "next/link";
import PricingCard from "@/components/PricingCard";
import Section from "@/components/Section";
import SectionPricingTabs from "@/components/SectionPricingTabs";
import type { PackageSection, PriceZone } from "@/lib/data";
import {
  getHomepageTierCards,
  getSectionIntro,
  getSectionServicePath,
  sectionShowPricingTabs,
} from "@/lib/packages/helpers";

type HomeProductSectionProps = {
  section: PackageSection;
  zaloBaseUrl: string;
  bgClassName?: string;
};

export default function HomeProductSection({
  section,
  zaloBaseUrl,
  bgClassName = "pricing-section-bg",
}: HomeProductSectionProps) {
  const [priceZone, setPriceZone] = useState<PriceZone>("outer");
  const tierCards = getHomepageTierCards(section);
  const servicePath = getSectionServicePath(section);
  const intro = getSectionIntro(section);
  const showTabs = sectionShowPricingTabs(section);

  if (tierCards.length === 0) return null;

  return (
    <Section
      id={section.id}
      title={section.title}
      subtitle={section.slogan}
      className={`scroll-mt-36 border-t border-sky-100/80 md:scroll-mt-40 ${bgClassName}`}
      contentClassName="!mt-8"
    >
      {intro ? (
        <p className="mb-6 max-w-3xl text-base leading-relaxed text-slate-600">
          {intro}
        </p>
      ) : null}

      {showTabs ? (
        <div className="mb-8 flex justify-center">
          <SectionPricingTabs
            id={`${section.id}-zone`}
            value={priceZone}
            onChange={setPriceZone}
          />
        </div>
      ) : null}

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tierCards.map((card) => (
          <li key={card.id}>
            <PricingCard
              card={card}
              recommended={card.isPopular}
              zaloBaseUrl={zaloBaseUrl}
              priceZone={showTabs ? priceZone : undefined}
              hideZoneToggle={showTabs}
              showTierBadge
              serviceDetailHref={servicePath}
            />
          </li>
        ))}
      </ul>

      {servicePath ? (
        <p className="mt-8 text-center">
          <Link
            href={servicePath}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border-2 border-[#2563eb] bg-white px-6 py-2.5 text-sm font-bold text-[#2563eb] transition-colors hover:bg-[#2563eb] hover:text-white"
          >
            Xem thêm các gói khác
          </Link>
        </p>
      ) : null}
    </Section>
  );
}
