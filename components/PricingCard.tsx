"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  getZaloRegisterUrl,
  type HomepageTier,
  type PackageCard as PackageCardType,
  type PriceZone,
} from "@/lib/data";
import { TIER_LABELS } from "@/lib/packages/helpers";
import { trackLeadEvent } from "@/lib/tracking";

type PricingCardProps = {
  card: PackageCardType;
  recommended?: boolean;
  zaloBaseUrl: string;
  /** Link to service detail page — shows "Xem chi tiết" */
  serviceDetailHref?: string;
  /** Controlled zone from section-level tabs */
  priceZone?: PriceZone;
  /** Hide per-card zone toggle (section controls pricing) */
  hideZoneToggle?: boolean;
  /** Override tier badge label */
  tierLabel?: string;
  /** Show homepage tier badge */
  showTierBadge?: boolean;
};

const headerBandClass: Record<PackageCardType["variant"], string> = {
  blue: "fpt-card-header-blue bg-gradient-to-br from-[#1d4ed8] via-[#2563eb] to-[#3b82f6]",
  orange: "fpt-card-header-orange bg-gradient-to-br from-[#ea580c] via-[#f97316] to-[#fb923c]",
};

const buttonClass: Record<PackageCardType["variant"], string> = {
  blue: "bg-[#2563eb] hover:bg-[#1d4ed8] focus-visible:ring-[#2563eb]",
  orange: "bg-[#ea580c] hover:bg-[#c2410c] focus-visible:ring-[#ea580c]",
};

export default function PricingCard({
  card,
  recommended = false,
  zaloBaseUrl,
  serviceDetailHref,
  priceZone: controlledZone,
  hideZoneToggle = false,
  tierLabel,
  showTierBadge = false,
}: PricingCardProps) {
  const outer = (card.priceOuterCity ?? "").trim();
  const hasDualPricing = outer.length > 0;
  const [internalZone, setInternalZone] = useState<PriceZone>(
    hasDualPricing ? "outer" : "inner",
  );
  const priceZone = controlledZone ?? internalZone;

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
  const features = card.features.filter((line) => line.trim().length > 0).slice(0, 6);
  const showCardToggle = hasDualPricing && !hideZoneToggle && controlledZone == null;

  const badgeLabel =
    tierLabel ??
    (showTierBadge && card.homepageTier
      ? TIER_LABELS[card.homepageTier as HomepageTier]
      : undefined);

  return (
    <article
      className={`pricing-card-interactive fpt-pricing-card relative flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-white shadow-[0_8px_30px_-12px_rgba(15,23,42,0.25)] active:opacity-95 ${
        recommended
          ? "pricing-card-recommended border-[#f97316] ring-2 ring-[#f97316]/30"
          : "border-slate-200/90"
      }`}
    >
      <div
        className={`relative px-5 py-4 text-center text-white ${headerBandClass[card.variant]}`}
      >
        {badgeLabel ? (
          <span className="absolute left-3 top-3 inline-flex rounded-md bg-white/95 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-[#2563eb] shadow-sm">
            {badgeLabel}
          </span>
        ) : null}
        {recommended ? (
          <span className="absolute right-3 top-3 inline-flex rounded-md bg-white/95 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-[#ea580c] shadow-sm">
            Phổ biến
          </span>
        ) : null}
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
          Gói cước
        </p>
        <h3 className="mt-1 text-xl font-extrabold tracking-tight sm:text-2xl">
          {card.title}
        </h3>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        {showCardToggle ? (
          <div className="mb-3 flex justify-center">
            <div
              className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs font-bold"
              role="group"
              aria-label="Khu vực áp dụng giá"
            >
              <button
                type="button"
                onClick={() => setInternalZone("inner")}
                className={`rounded-md px-3 py-1.5 transition-colors ${
                  internalZone === "inner"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Nội thành
              </button>
              <button
                type="button"
                onClick={() => setInternalZone("outer")}
                className={`rounded-md px-3 py-1.5 transition-colors ${
                  internalZone === "outer"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Ngoại thành
              </button>
            </div>
          </div>
        ) : null}

        {hasDualPricing ? (
          <p className="sr-only">
            Giá nội thành {card.price} đ/tháng. Giá ngoại thành {outer} đ/tháng.
          </p>
        ) : null}

        <p className="text-center text-slate-900">
          <span className="text-[2rem] font-extrabold leading-none tracking-tight sm:text-[2.35rem]">
            {displayPrice}
          </span>
          <span className="ml-0.5 text-lg font-bold">đ</span>
          <span className="ml-1.5 text-sm font-medium text-slate-500">/tháng</span>
        </p>

        <div className="fpt-speed-box mx-auto mt-4 w-full max-w-[16rem] rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Tốc độ
          </p>
          <p className="mt-0.5 text-base font-extrabold text-slate-900">{card.speed}</p>
        </div>

        <ul className="mt-5 flex-1 space-y-2.5">
          {features.map((line, i) => (
            <li
              key={`${card.id}-feat-${i}`}
              className="flex items-start gap-2.5 text-sm leading-snug text-slate-700"
            >
              <span
                aria-hidden="true"
                className="pricing-feature-icon mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-emerald-600"
              >
                ✓
              </span>
              <span>{line}</span>
            </li>
          ))}
          {features.length === 0 ? (
            <li className="text-sm text-slate-500">Thông tin đang cập nhật.</li>
          ) : null}
        </ul>

        {card.promotion ? (
          <p className="pricing-card-note mt-4 rounded-lg bg-amber-50 px-3 py-2.5 text-center text-[11px] font-medium leading-relaxed text-amber-950/90">
            {card.promotion}
          </p>
        ) : null}

        <div className="mt-5 space-y-2.5">
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
              className={`pricing-cta-interactive inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center rounded-xl px-4 py-3 text-center text-base font-bold uppercase tracking-wide text-white shadow-md ring-offset-2 focus-visible:outline-none focus-visible:ring-2 active:opacity-95 ${buttonClass[card.variant]}`}
            >
              Đăng ký ngay
            </a>
          ) : null}
          {serviceDetailHref ? (
            <Link
              href={serviceDetailHref}
              className="inline-flex min-h-[44px] w-full items-center justify-center rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-center text-sm font-bold text-slate-700 transition-colors hover:border-[#2563eb] hover:text-[#2563eb]"
            >
              Xem chi tiết
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
