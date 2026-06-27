"use client";

import { useCallback, useEffect, useState } from "react";
import { useCms } from "@/components/cms/CmsProvider";
import { getZaloRegisterUrl, siteHasZalo } from "@/lib/data";
import type { HomepageBannerEntry } from "@/lib/packages/helpers";
import { trackLeadEvent } from "@/lib/tracking";

type HeroProductCarouselProps = {
  products: HomepageBannerEntry[];
};

const HERO_BANNER_BG = "#071a44";

function HeroBannerImage({
  imageUrl,
  alt,
  priority,
}: {
  imageUrl: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageUrl}
      alt={alt}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      className="home-hero-banner-img"
    />
  );
}

export default function HeroProductCarousel({ products }: HeroProductCarouselProps) {
  const { cms } = useCms();
  const [activeIndex, setActiveIndex] = useState(0);
  const count = products.length;

  const goTo = useCallback(
    (index: number) => {
      if (count === 0) return;
      setActiveIndex(((index % count) + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (count <= 1) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const timer = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % count);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [count]);

  if (count === 0) {
    return (
      <section className="landing-hero-shell border-b border-sky-100/80">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="rounded-3xl bg-[#071a44] px-6 py-14 text-center text-white sm:px-10">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Tư vấn đăng ký WiFi, SIM 5G, Camera VNPT tại TP.HCM
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-sky-100/95">
              Nhân viên VNPT hỗ trợ tư vấn gói cước, kiểm tra hạ tầng và đăng ký lắp đặt tận nơi.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const { card: product, imageUrl, bannerId } = products[activeIndex];
  const zaloHref = siteHasZalo(cms.site)
    ? getZaloRegisterUrl(product.title, cms.site.zalo)
    : "";

  return (
    <section
      className="landing-hero-shell border-b border-sky-100/80"
      aria-label="Banner trang chủ"
    >
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="overflow-hidden rounded-3xl shadow-[0_24px_60px_-28px_rgba(15,23,42,0.45)] ring-1 ring-slate-200/80">
          <div
            className="home-hero-banner flex min-h-[200px] items-center justify-center px-3 py-4 sm:min-h-[240px] sm:px-6 sm:py-6"
            style={{ backgroundColor: HERO_BANNER_BG }}
          >
            {imageUrl ? (
              <HeroBannerImage
                key={bannerId}
                imageUrl={imageUrl}
                alt={`Banner ${product.title}`}
                priority={activeIndex === 0}
              />
            ) : null}

            {activeIndex === 0 ? (
              <h1 className="sr-only">{product.title} — gói VNPT nổi bật</h1>
            ) : (
              <h2 className="sr-only">{product.title}</h2>
            )}
          </div>

          <div className="hero-cta-bar flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/90 bg-gradient-to-r from-slate-50 via-white to-sky-50 px-4 py-3.5 sm:px-6 sm:py-4">
            <p className="text-sm font-medium text-slate-600">
              {product.title}
              <span className="hidden text-slate-400 sm:inline"> · Tư vấn &amp; đăng ký qua Zalo</span>
            </p>

            <div className="flex flex-wrap items-center gap-3">
              {count > 1 ? (
                <div className="flex items-center gap-2" aria-label="Chọn slide banner">
                  {products.map((entry, i) => (
                    <button
                      key={entry.bannerId}
                      type="button"
                      aria-label={`Xem ${entry.card.title}`}
                      aria-current={i === activeIndex ? "true" : undefined}
                      onClick={() => goTo(i)}
                      className={`h-2 rounded-full transition-all ${
                        i === activeIndex
                          ? "w-7 bg-[#2563eb]"
                          : "w-2 bg-slate-300 hover:bg-slate-400"
                      }`}
                    />
                  ))}
                </div>
              ) : null}

              {zaloHref ? (
                <a
                  href={zaloHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackLeadEvent("package_register_click", {
                      label: product.title,
                      destination: zaloHref,
                    })
                  }
                  className="hero-main-cta inline-flex min-h-[44px] items-center justify-center rounded-full px-7 py-2.5 text-sm font-bold text-white shadow-md sm:min-h-[48px] sm:px-8 sm:text-base"
                >
                  Đăng ký
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
