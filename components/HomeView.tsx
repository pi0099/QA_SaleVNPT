"use client";

import HotPromotionBanner from "@/components/HotPromotionBanner";
import AnimatedPricingSection from "@/components/AnimatedPricingSection";
import { useCms } from "@/components/cms/CmsProvider";

export default function HomeView() {
  const { cms } = useCms();
  const { sections, site } = cms;

  return (
    <>
      <HotPromotionBanner />
      <div className="border-b border-slate-200 bg-gradient-to-b from-white via-[#f0f6ff] to-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
          <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            {site.heroTitle}
          </h1>
          <p className="mt-5 max-w-2xl text-xl font-medium text-slate-700 sm:text-2xl">
            {site.heroSubtitle}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            {sections[0] ? (
              <a
                href={`#${sections[0].id}`}
                className="inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-xl bg-[#2563eb] px-8 py-3 text-base font-bold text-white shadow-md transition-opacity hover:opacity-95"
              >
                Xem gói đầu tiên
              </a>
            ) : null}
            {sections[1] ? (
              <a
                href={`#${sections[1].id}`}
                className="inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-xl border-2 border-[#2563eb] bg-white px-8 py-3 text-base font-bold text-[#2563eb] transition-colors hover:bg-slate-50"
              >
                {sections[1].title}
              </a>
            ) : null}
          </div>
        </div>
      </div>

      {sections.map((section, index) => (
        <AnimatedPricingSection
          key={section.id}
          section={section}
          bgClassName={index % 2 === 0 ? "bg-slate-50" : "bg-white"}
        />
      ))}
    </>
  );
}
