"use client";

import type { PriceZone } from "@/lib/data";

type SectionPricingTabsProps = {
  value: PriceZone;
  onChange: (zone: PriceZone) => void;
  id?: string;
};

export default function SectionPricingTabs({
  value,
  onChange,
  id = "section-pricing-zone",
}: SectionPricingTabsProps) {
  return (
    <div
      className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1 text-sm font-bold shadow-sm"
      role="tablist"
      aria-label="Khu vực áp dụng giá"
    >
      <button
        type="button"
        role="tab"
        id={`${id}-inner`}
        aria-selected={value === "inner"}
        aria-controls={`${id}-panel-inner`}
        onClick={() => onChange("inner")}
        className={`rounded-lg px-4 py-2 transition-colors ${
          value === "inner"
            ? "bg-white text-slate-900 shadow-sm"
            : "text-slate-500 hover:text-slate-800"
        }`}
      >
        Nội thành
      </button>
      <button
        type="button"
        role="tab"
        id={`${id}-outer`}
        aria-selected={value === "outer"}
        aria-controls={`${id}-panel-outer`}
        onClick={() => onChange("outer")}
        className={`rounded-lg px-4 py-2 transition-colors ${
          value === "outer"
            ? "bg-white text-slate-900 shadow-sm"
            : "text-slate-500 hover:text-slate-800"
        }`}
      >
        Ngoại thành
      </button>
    </div>
  );
}
