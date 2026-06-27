"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PricingCard from "@/components/PricingCard";
import Section from "@/components/Section";
import type { PackageSection } from "@/lib/data";
import { trackLeadEvent } from "@/lib/tracking";

const SCROLL_EDGE_EPS = 4;

function StripScrollHintPill({ direction }: { direction: "left" | "right" }) {
  return (
    <div className="flex h-9 w-11 shrink-0 items-center justify-center rounded-full bg-slate-500/80 shadow-sm backdrop-blur-[2px]">
      <svg
        className="h-6 w-6 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {direction === "left" ? (
          <path d="M15 18l-6-6 6-6" />
        ) : (
          <path d="M9 18l6-6-6-6" />
        )}
      </svg>
    </div>
  );
}

type AnimatedPricingSectionProps = {
  section: PackageSection;
  zaloBaseUrl: string;
  bgClassName: string;
  seoIntro?: string;
  servicePath?: string;
};

export default function AnimatedPricingSection({
  section,
  zaloBaseUrl,
  bgClassName,
  seoIntro,
  servicePath,
}: AnimatedPricingSectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const zoneRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLUListElement | null>(null);
  const hasOverflowRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [isStripDragging, setIsStripDragging] = useState(false);

  const firstPopularCardId = useMemo(() => {
    const hit = section.cards.find((c) => c.isPopular);
    return hit?.id ?? section.cards[0]?.id ?? null;
  }, [section.cards]);

  const updateOverflow = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollWidth, clientWidth } = el;
    const next = scrollWidth > clientWidth + SCROLL_EDGE_EPS;
    if (next === hasOverflowRef.current) return;
    hasOverflowRef.current = next;
    setHasOverflow(next);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateOverflow();
    const ro = new ResizeObserver(() => {
      updateOverflow();
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
    };
  }, [updateOverflow, section.cards.length]);

  useEffect(() => {
    const strip = scrollRef.current;
    const zone = zoneRef.current;
    if (!strip || !zone) return;

    const dragState = {
      active: false,
      pointerId: -1,
      startX: 0,
      startScrollLeft: 0,
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("a,button,input,textarea,select")) return;

      const { scrollWidth, clientWidth } = strip;
      if (scrollWidth <= clientWidth + SCROLL_EDGE_EPS) return;

      dragState.active = true;
      dragState.pointerId = e.pointerId;
      dragState.startX = e.clientX;
      dragState.startScrollLeft = strip.scrollLeft;
      strip.setPointerCapture(e.pointerId);
      setIsStripDragging(true);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragState.active || e.pointerId !== dragState.pointerId) return;
      strip.scrollLeft = dragState.startScrollLeft - (e.clientX - dragState.startX);
    };

    const endDrag = (e: PointerEvent) => {
      if (!dragState.active || e.pointerId !== dragState.pointerId) return;
      dragState.active = false;
      dragState.pointerId = -1;
      if (strip.hasPointerCapture(e.pointerId)) {
        strip.releasePointerCapture(e.pointerId);
      }
      setIsStripDragging(false);
    };

    strip.addEventListener("pointerdown", onPointerDown);
    strip.addEventListener("pointermove", onPointerMove);
    strip.addEventListener("pointerup", endDrag);
    strip.addEventListener("pointercancel", endDrag);

    const onWheel = (e: WheelEvent) => {
      const isVerticalIntent =
        !e.shiftKey && Math.abs(e.deltaY) >= Math.abs(e.deltaX);
      if (!isVerticalIntent) return;

      const { scrollWidth, clientWidth } = strip;
      if (scrollWidth <= clientWidth + SCROLL_EDGE_EPS) return;

      e.preventDefault();
      e.stopPropagation();
      window.scrollBy({ top: e.deltaY, left: 0, behavior: "auto" });
    };

    zone.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      strip.removeEventListener("pointerdown", onPointerDown);
      strip.removeEventListener("pointermove", onPointerMove);
      strip.removeEventListener("pointerup", endDrag);
      strip.removeEventListener("pointercancel", endDrag);
      zone.removeEventListener("wheel", onWheel);
      dragState.active = false;
      dragState.pointerId = -1;
    };
  }, [section.cards.length]);

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

  useEffect(() => {
    if (!isVisible || !firstPopularCardId) return;
    if (window.matchMedia("(min-width: 768px)").matches) return;
    const root = scrollRef.current;
    if (!root) return;
    const target = root.querySelector<HTMLElement>(
      `[data-pricing-card-id="${CSS.escape(firstPopularCardId)}"]`,
    );
    if (!target) return;
    const t = window.setTimeout(() => {
      target.scrollIntoView({
        behavior: "auto",
        inline: "center",
        block: "nearest",
      });
    }, 320);
    return () => window.clearTimeout(t);
  }, [isVisible, firstPopularCardId]);

  return (
    <div ref={sectionRef} className={bgClassName}>
      <Section
        id={section.id}
        title={section.title}
        subtitle={section.slogan?.trim() || undefined}
        titleClassName={`pricing-title-reveal ${
          isVisible ? "pricing-title-reveal-visible" : ""
        }`}
      >
        {seoIntro ? (
          <p className="mb-6 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
            {seoIntro}
          </p>
        ) : null}
        {servicePath ? (
          <div className="mb-6 flex flex-wrap gap-3">
            <a
              href="#lead-form-home"
              onClick={() =>
                trackLeadEvent("landing_cta_click", {
                  label: `Register ${section.id}`,
                  destination: "#lead-form-home",
                })
              }
              className="inline-flex min-h-[44px] items-center rounded-full bg-[#2563eb] px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
            >
              Đăng ký tư vấn
            </a>
            <Link
              href={servicePath}
              className="inline-flex min-h-[44px] items-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 hover:border-[#2563eb] hover:text-[#2563eb]"
            >
              Xem chi tiết
            </Link>
          </div>
        ) : null}
        <div>
          {hasOverflow ? (
            <p className="mb-2 flex items-center gap-1.5 text-xs text-slate-500 md:mb-3">
              <svg
                aria-hidden
                className="h-3.5 w-3.5 shrink-0 opacity-70"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 12H17M7 12l3-3M7 12l3 3M17 12l-3-3M17 12l-3 3" />
              </svg>
              <span>Vuốt ngang để xem thêm gói cước nhé.</span>
            </p>
          ) : null}
          <div ref={zoneRef} className="pricing-cards-zone relative min-w-0">
            {hasOverflow ? (
              <>
                <div
                  className="pricing-strip-scroll-hint pointer-events-none absolute left-2 top-1/2 z-[8] -translate-y-1/2"
                  aria-hidden
                >
                  <StripScrollHintPill direction="left" />
                </div>
                <div
                  className="pricing-strip-scroll-hint pointer-events-none absolute right-2 top-1/2 z-[8] -translate-y-1/2"
                  aria-hidden
                >
                  <StripScrollHintPill direction="right" />
                </div>
              </>
            ) : null}
              <ul
                ref={scrollRef}
                className={`pricing-cards-strip flex gap-5 overflow-x-auto overflow-y-hidden overscroll-x-contain pt-12 pb-8 scroll-pl-4 scroll-pr-4 snap-x snap-proximity sm:gap-6 md:pt-16 md:pb-10 ${
                  hasOverflow
                    ? isStripDragging
                      ? "pricing-cards-strip-dragging cursor-grabbing select-none"
                      : "cursor-grab"
                    : ""
                }`}
              >
              {section.cards.map((card, cardIndex) => (
                <li
                  key={card.id}
                  data-pricing-card-id={card.id}
                  className={`pricing-card-reveal flex w-[min(100%,21rem)] shrink-0 snap-center sm:w-[min(100%,24rem)] ${
                    isVisible ? "pricing-card-reveal-visible" : ""
                  }`}
                  style={{
                    transitionDelay: `${120 + cardIndex * 120}ms`,
                  }}
                >
                  <PricingCard
                    card={card}
                    recommended={card.isPopular}
                    zaloBaseUrl={zaloBaseUrl}
                    serviceDetailHref={servicePath}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
}
