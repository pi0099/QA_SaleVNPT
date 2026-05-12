"use client";

import { useCms } from "@/components/cms/CmsProvider";
import { useCallback, useEffect, useMemo, useState } from "react";

const ROTATE_MS = 5000;

function LightningIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
    </svg>
  );
}

export default function HotPromotionBanner() {
  const { cms } = useCms();
  const slides = useMemo(
    () => cms.sections.filter((s) => (s.slogan ?? "").trim().length > 0),
    [cms.sections],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setActiveIndex((i) =>
      slides.length === 0 ? 0 : Math.min(i, slides.length - 1),
    );
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1 || paused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [slides.length, paused]);

  const active = slides[activeIndex];
  const slideCount = slides.length;

  const goTo = useCallback((index: number) => {
    if (slideCount === 0) return;
    setActiveIndex(((index % slideCount) + slideCount) % slideCount);
  }, [slideCount]);

  const onCarouselKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (slideCount <= 1) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(activeIndex - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(activeIndex + 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(slideCount - 1);
      }
    },
    [activeIndex, goTo, slideCount],
  );

  const scrollToActiveSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!active) return;
      e.preventDefault();
      const el = document.getElementById(active.id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      try {
        window.history.replaceState(null, "", `#${active.id}`);
      } catch {
        /* ignore */
      }
    },
    [active],
  );

  if (slideCount === 0 || !active) {
    return null;
  }

  return (
    <section className="border-b border-white/20 bg-slate-950/95">
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
        <div
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-[1px] shadow-lg ring-1 ring-white/10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Ưu đãi nổi bật"
            tabIndex={0}
            onKeyDown={onCarouselKeyDown}
            className="relative rounded-2xl bg-slate-950/25 px-4 py-3 outline-none backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:px-5"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="flex min-w-0 items-start gap-3 sm:items-center">
                <span
                  aria-hidden
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-amber-200 shadow-inner"
                >
                  <LightningIcon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-pretty text-sm font-semibold leading-snug text-white sm:text-base">
                    {(active.slogan ?? "").trim()}
                  </p>
                </div>
              </div>

              <a
                href={`#${active.id}`}
                onClick={scrollToActiveSection}
                className="promo-cta inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-xl bg-white px-5 py-2 text-sm font-bold text-slate-900 transition-transform duration-300 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Xem ưu đãi
              </a>
            </div>

            {slideCount > 1 ? (
              <div
                className="mt-3 flex items-center justify-center gap-2 sm:justify-end"
                aria-label="Chọn slide ưu đãi"
              >
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    aria-current={index === activeIndex ? "true" : undefined}
                    aria-label={`Ưu đãi ${index + 1} / ${slideCount}: ${slide.title}`}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      index === activeIndex
                        ? "w-6 bg-white"
                        : "w-2.5 bg-white/45 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
