"use client";

import { useCallback, useEffect, useState } from "react";
import { useCms } from "@/components/cms/CmsProvider";
import { getZaloRegisterUrl, siteHasZalo } from "@/lib/data";
import type { HomepageBannerEntry } from "@/lib/packages/helpers";
import { trackLeadEvent } from "@/lib/tracking";

type HeroProductCarouselProps = {
  products: HomepageBannerEntry[];
};

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
      className="absolute inset-0 h-full w-full object-cover object-center"
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
        <div className="home-hero-banner relative min-h-[280px] overflow-hidden rounded-3xl bg-[#071a44] shadow-[0_24px_60px_-28px_rgba(15,23,42,0.45)] ring-1 ring-white/10 sm:min-h-[340px] md:min-h-[400px]">
          {imageUrl ? (
            <HeroBannerImage
              key={bannerId}
              imageUrl={imageUrl}
              alt={`Banner ${product.title}`}
              priority={activeIndex === 0}
            />
          ) : null}

          <div className="home-hero-overlay pointer-events-none absolute inset-0 z-[1]" />

          {activeIndex === 0 ? (
            <h1 className="sr-only">{product.title} — gói VNPT nổi bật</h1>
          ) : (
            <h2 className="sr-only">{product.title}</h2>
          )}

          <div className="relative z-10 flex min-h-[280px] flex-col justify-end p-5 sm:min-h-[340px] sm:p-8 md:min-h-[400px]">
            {zaloHref ? (
              <div className="flex flex-wrap items-center gap-3">
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
                  className="hero-main-cta inline-flex min-h-[52px] items-center justify-center rounded-full px-8 py-3.5 text-base font-bold text-white shadow-lg"
                >
                  Đăng ký
                </a>
              </div>
            ) : null}

            {count > 1 ? (
              <div className="mt-4 flex items-center gap-2">
                {products.map((entry, i) => (
                  <button
                    key={entry.bannerId}
                    type="button"
                    aria-label={`Xem ${entry.card.title}`}
                    aria-current={i === activeIndex ? "true" : undefined}
                    onClick={() => goTo(i)}
                    className={`h-2.5 rounded-full transition-all ${
                      i === activeIndex
                        ? "w-8 bg-white"
                        : "w-2.5 bg-white/40 hover:bg-white/70"
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
