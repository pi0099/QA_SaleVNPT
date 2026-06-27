"use client";

import { useState } from "react";
import PricingCard from "@/components/PricingCard";
import SectionPricingTabs from "@/components/SectionPricingTabs";
import type { PackageCard, PackageSection, PriceZone } from "@/lib/data";
import {
  sectionShowPricingTabs,
  sortCardsForDisplay,
} from "@/lib/packages/helpers";

type ProductPricingGridProps = {
  section: PackageSection;
  zaloBaseUrl: string;
  serviceDetailHref?: string;
};

export default function ProductPricingGrid({
  section,
  zaloBaseUrl,
  serviceDetailHref,
}: ProductPricingGridProps) {
  const [priceZone, setPriceZone] = useState<PriceZone>("outer");
  const showTabs = sectionShowPricingTabs(section);
  const cards = sortCardsForDisplay(section.cards);

  return (
    <>
      {showTabs ? (
        <div className="mb-8 flex justify-center">
          <SectionPricingTabs
            id={`${section.id}-service-zone`}
            value={priceZone}
            onChange={setPriceZone}
          />
        </div>
      ) : null}

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card: PackageCard) => (
          <li key={card.id}>
            <PricingCard
              card={card}
              recommended={card.isPopular}
              zaloBaseUrl={zaloBaseUrl}
              priceZone={showTabs ? priceZone : undefined}
              hideZoneToggle={showTabs}
              serviceDetailHref={serviceDetailHref}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
