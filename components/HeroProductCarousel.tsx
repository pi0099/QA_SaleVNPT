"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useCms } from "@/components/cms/CmsProvider";
import { contactFromSite, getZaloRegisterUrl, siteHasPhone } from "@/lib/data";
import type { HomepageBannerEntry } from "@/lib/packages/helpers";
import { getDisplayPrice } from "@/lib/packages/helpers";
import { trackLeadEvent } from "@/lib/tracking";

type HeroProductCarouselProps = {
  products: HomepageBannerEntry[];
};

export default function HeroProductCarousel({ products }: HeroProductCarouselProps) {
  const { cms } = useCms();
  const contact = contactFromSite(cms.site);
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

  const { card: product, sectionId, href, imageUrl } = products[activeIndex];
  const price = getDisplayPrice(product, "inner");
  const zaloHref = getZaloRegisterUrl(product.title, cms.site.zalo);

  return (
    <section
      className="landing-hero-shell border-b border-sky-100/80"
      aria-label="Sản phẩm chủ lực"
    >
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div
          className="home-hero-banner relative overflow-hidden rounded-3xl bg-[#071a44] shadow-[0_24px_60px_-28px_rgba(15,23,42,0.45)] ring-1 ring-white/10"
          style={{
            backgroundImage: imageUrl
              ? `linear-gradient(90deg, rgba(7,26,68,0.92) 0%, rgba(7,26,68,0.55) 45%, rgba(7,26,68,0.35) 100%), url('${imageUrl}')`
              : "url('/home-hero-banner.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {href && href !== "#" ? (
            <Link
              href={href}
              className="absolute inset-0 z-[1]"
              aria-label={`Xem chi tiết ${product.title}`}
            />
          ) : null}
          <div className="home-hero-overlay pointer-events-none absolute inset-0 z-[2]" />
          <div className="relative z-10 grid min-h-[360px] md:min-h-[400px] md:grid-cols-12">
            <div className="pointer-events-none flex flex-col justify-center px-6 py-10 sm:px-10 md:col-span-7">
              {activeIndex === 0 ? (
                <h1 className="home-hero-text-shadow text-balance text-[1.65rem] font-extrabold leading-[1.2] text-white sm:text-3xl lg:text-4xl">
                  {product.title} — gói VNPT nổi bật
                </h1>
              ) : (
                <h2 className="home-hero-text-shadow text-balance text-[1.65rem] font-extrabold leading-[1.2] text-white sm:text-3xl lg:text-4xl">
                  {product.title}
                </h2>
              )}
              <p className="home-hero-text-shadow mt-3 max-w-xl text-base leading-relaxed text-sky-100/95 sm:text-lg">
                {product.heroSubtitle ??
                  `${product.speed} · từ ${price}đ/tháng · tư vấn lắp đặt tận nơi TP.HCM`}
              </p>
            </div>
            <div className="flex flex-col justify-end px-6 pb-8 md:col-span-5 md:items-end md:px-10 md:pb-10">
              <div className="pointer-events-auto rounded-2xl border border-white/15 bg-white/10 p-5 text-white backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-sky-200">
                  Gói nổi bật
                </p>
                <p className="mt-1 text-2xl font-extrabold">{product.title}</p>
                <p className="mt-2 text-3xl font-extrabold">
                  {price}
                  <span className="text-lg font-bold">đ/tháng</span>
                </p>
                <p className="mt-1 text-sm text-sky-100/90">{product.speed}</p>
                {href && href !== "#" ? (
                  <Link
                    href={href}
                    className="mt-4 inline-flex text-sm font-semibold text-sky-100 underline decoration-white/40 underline-offset-4 hover:text-white"
                  >
                    Xem trang sản phẩm →
                  </Link>
                ) : null}
              </div>
              <div className="pointer-events-auto mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-end">
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
                    className="hero-main-cta inline-flex min-h-[52px] items-center justify-center rounded-full px-7 py-3.5 text-base font-bold text-white shadow-lg"
                  >
                    Đăng ký {product.title}
                  </a>
                ) : null}
                {siteHasPhone(cms.site) ? (
                  <a
                    href={contact.phone}
                    onClick={() =>
                      trackLeadEvent("phone_click", {
                        label: "Hero carousel phone",
                        destination: contact.phone,
                      })
                    }
                    className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/35 bg-white/[0.07] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/[0.14]"
                  >
                    Gọi tư vấn
                  </a>
                ) : null}
                <Link
                  href={`#${sectionId}`}
                  className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-sky-100 hover:border-white/40"
                >
                  Xem bảng giá
                </Link>
              </div>
              {count > 1 ? (
                <div className="pointer-events-auto mt-4 flex items-center gap-2 md:justify-end">
                  {products.map((entry, i) => (
                    <button
                      key={entry.card.id}
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
      </div>
    </section>
  );
}
