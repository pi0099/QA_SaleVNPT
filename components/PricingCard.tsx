"use client";

import { useMemo, useState } from "react";
import { getZaloRegisterUrl, type PackageCard as PackageCardType } from "@/lib/data";
import { trackLeadEvent } from "@/lib/tracking";

type PricingCardProps = {
  card: PackageCardType;
  recommended?: boolean;
  zaloBaseUrl: string;
};

const headerClass: Record<PackageCardType["variant"], string> = {
  blue: "text-[#1d4ed8]",
  orange: "text-[#c2410c]",
};

const buttonClass: Record<PackageCardType["variant"], string> = {
  blue: "bg-[#2563eb] hover:bg-[#3b82f6] focus-visible:ring-[#2563eb]",
  orange: "bg-[#ea580c] hover:bg-[#f97316] focus-visible:ring-[#ea580c]",
};

const speedAccentClass: Record<PackageCardType["variant"], string> = {
  blue: "text-[#1e40af]",
  orange: "text-[#b45309]",
};

export default function PricingCard({
  card,
  recommended = false,
  zaloBaseUrl,
}: PricingCardProps) {
  const outer = (card.priceOuterCity ?? "").trim();
  const hasDualPricing = outer.length > 0;
  const [priceZone, setPriceZone] = useState<"inner" | "outer">(
    hasDualPricing ? "outer" : "inner",
  );

  const displayPrice = hasDualPricing
    ? priceZone === "inner"
      ? card.price
      : outer
    : card.price;

  const registerHref = useMemo(
    () =>
      getZaloRegisterUrl(
        card.title,
        zaloBaseUrl,
        hasDualPricing ? { priceZone } : undefined,
      ),
    [card.title, zaloBaseUrl, hasDualPricing, priceZone],
  );
  const showRegister = registerHref.length > 0;
  const features = card.features.filter((line) => line.trim().length > 0).slice(0, 5);

  return (
    <article
      className={`pricing-card-interactive relative flex h-full w-full flex-col overflow-hidden rounded-[18px] border bg-white shadow-sm transition-all duration-300 ease-out active:opacity-95 ${
        recommended
          ? "pricing-card-recommended scale-[1.05] border-[#f97316] shadow-[0_16px_38px_-22px_rgba(249,115,22,0.9)]"
          : "border-slate-200"
      }`}
    >
      <div className="px-6 pb-2 pt-6 text-center">
        {recommended ? (
          <div className="mb-2 flex justify-end">
            <span className="inline-flex rounded-full bg-[#f97316] px-3 py-1 text-xs font-bold text-white shadow-sm">
              🔥 Phổ biến nhất
            </span>
          </div>
        ) : null}
        <p
          className={`text-sm font-semibold uppercase tracking-[0.18em] ${headerClass[card.variant]}`}
        >
          {card.title}
        </p>
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6 pt-1">
        {hasDualPricing ? (
          <div className="mb-3 flex justify-center">
            <div
              className="inline-flex rounded-full border border-slate-200 bg-slate-100/90 p-0.5 text-xs font-semibold shadow-inner"
              role="group"
              aria-label="Khu vực áp dụng giá"
            >
              <button
                type="button"
                onClick={() => setPriceZone("inner")}
                className={`rounded-full px-3 py-1.5 transition-colors ${
                  priceZone === "inner"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Nội thành
              </button>
              <button
                type="button"
                onClick={() => setPriceZone("outer")}
                className={`rounded-full px-3 py-1.5 transition-colors ${
                  priceZone === "outer"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Ngoại thành
              </button>
            </div>
          </div>
        ) : null}
        <p className="text-center text-slate-900">
          <span className="text-4xl font-extrabold leading-none md:text-[2.5rem]">
            {displayPrice}
          </span>
          <span className="ml-1 text-base font-semibold">đ</span>
          <span className="ml-2 text-sm font-medium text-slate-600">/tháng</span>
        </p>

        <div className="mt-6 border-t border-slate-200 pt-5">
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
            Download / Upload
          </p>
          <p
            className={`mt-1 text-center text-base font-extrabold ${speedAccentClass[card.variant]}`}
          >
            {card.speed}
          </p>
        </div>

        <ul className="mt-5 flex-1 space-y-3 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-4">
          {features.map((line, i) => (
            <li
              key={`${card.id}-feat-${i}`}
              className="flex items-start gap-2.5 text-sm leading-snug text-slate-700"
            >
              <span
                aria-hidden="true"
                className="pricing-feature-icon mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"
              >
                ✓
              </span>
              <span>{line}</span>
            </li>
          ))}
          {features.length === 0 ? (
            <li className="text-sm text-slate-500">Thong tin dang cap nhat.</li>
          ) : null}
        </ul>

        <p className="mt-4 text-center text-sm font-semibold text-[#dc2626]">
          {card.promotion}
        </p>

        {showRegister ? (
          <a
            href={registerHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackLeadEvent("package_register_click", {
                label: card.title,
                destination: registerHref,
              })
            }
            className={`pricing-cta-interactive mt-5 inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center rounded-xl px-4 py-3 text-center text-base font-bold text-white shadow-sm ring-offset-2 transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 active:opacity-95 ${buttonClass[card.variant]}`}
          >
            Đăng ký ngay
          </a>
        ) : null}
      </div>
    </article>
  );
}
