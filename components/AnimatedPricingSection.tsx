"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PricingCard from "@/components/PricingCard";
import Section from "@/components/Section";
import type { PackageSection } from "@/lib/data";

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
};

export default function AnimatedPricingSection({
  section,
  zaloBaseUrl,
  bgClassName,
}: AnimatedPricingSectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLUListElement | null>(null);
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
    setHasOverflow(scrollWidth > clientWidth + SCROLL_EDGE_EPS);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateOverflow();
    const ro = new ResizeObserver(() => {
      updateOverflow();
    });
    ro.observe(el);
    el.addEventListener("scroll", updateOverflow, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", updateOverflow);
    };
  }, [updateOverflow, section.cards.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const dragState = {
      active: false,
      pointerId: -1,
      startX: 0,
      startScrollLeft: 0,
    };

    const onWheel = (e: WheelEvent) => {
      const isVerticalIntent =
        !e.shiftKey && Math.abs(e.deltaY) >= Math.abs(e.deltaX);

      if (isVerticalIntent) {
        e.preventDefault();
        window.scrollBy({
          top: e.deltaY,
          left: 0,
          behavior: "auto",
        });
        return;
      }

      const { scrollLeft, scrollWidth, clientWidth } = el;
      const overflow = scrollWidth > clientWidth + SCROLL_EDGE_EPS;
      if (!overflow) return;

      const horizontalDelta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY)
          ? e.deltaX
          : e.shiftKey
            ? e.deltaY
            : 0;
      const delta = horizontalDelta;
      if (delta === 0) return;

      const maxScrollLeft = scrollWidth - clientWidth;
      const atStart = scrollLeft <= SCROLL_EDGE_EPS;
      const atEnd = scrollLeft >= maxScrollLeft - SCROLL_EDGE_EPS;

      if (delta < 0 && atStart) return;
      if (delta > 0 && atEnd) return;

      e.preventDefault();
      el.scrollLeft = Math.min(
        maxScrollLeft,
        Math.max(0, scrollLeft + delta),
      );
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("a,button,input,textarea,select")) return;

      const { scrollWidth, clientWidth } = el;
      if (scrollWidth <= clientWidth + SCROLL_EDGE_EPS) return;

      dragState.active = true;
      dragState.pointerId = e.pointerId;
      dragState.startX = e.clientX;
      dragState.startScrollLeft = el.scrollLeft;
      setIsStripDragging(true);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragState.active || e.pointerId !== dragState.pointerId) return;
      el.scrollLeft = dragState.startScrollLeft - (e.clientX - dragState.startX);
    };

    const endDrag = (e: PointerEvent) => {
      if (!dragState.active || e.pointerId !== dragState.pointerId) return;
      dragState.active = false;
      dragState.pointerId = -1;
      setIsStripDragging(false);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
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
    const root = scrollRef.current;
    if (!root) return;
    const target = root.querySelector<HTMLElement>(
      `[data-pricing-card-id="${CSS.escape(firstPopularCardId)}"]`,
    );
    if (!target) return;
    const t = window.setTimeout(() => {
      target.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }, 280);
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
          <div className="relative min-w-0">
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
                className={`pricing-cards-strip flex [touch-action:pan-x_pan-y] gap-5 overflow-x-auto overflow-y-hidden overscroll-x-contain pt-12 pb-8 [-webkit-overflow-scrolling:touch] scroll-smooth scroll-pl-4 scroll-pr-4 snap-x snap-mandatory sm:gap-6 md:pt-16 md:pb-10 ${
                  hasOverflow
                    ? isStripDragging
                      ? "cursor-grabbing select-none"
                      : "cursor-grab"
                    : ""
                }`}
              >
              {section.cards.map((card, cardIndex) => (
                <li
                  key={card.id}
                  data-pricing-card-id={card.id}
                  className={`pricing-card-reveal flex w-[min(100%,20rem)] shrink-0 snap-center sm:w-[min(100%,22rem)] ${
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
