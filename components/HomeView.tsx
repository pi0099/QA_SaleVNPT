"use client";

import HotPromotionBanner from "@/components/HotPromotionBanner";
import AnimatedPricingSection from "@/components/AnimatedPricingSection";
import { useCms } from "@/components/cms/CmsProvider";
import { contact } from "@/lib/data";

function DisclaimerNotice({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-start gap-2.5 rounded-xl border border-slate-200 bg-white/90 px-3 py-2.5 text-left text-[13px] leading-5 text-slate-500 shadow-sm ${className}`}
    >
      <span
        aria-hidden="true"
        className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-3.5 w-3.5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 3L4.5 6V11.2C4.5 16.2 7.7 20.8 12 22C16.3 20.8 19.5 16.2 19.5 11.2V6L12 3Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.8 12.1L11.1 14.4L15.2 10.3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <p>
        Chúng tôi là nhân viên/đối tác hỗ trợ đăng ký dịch vụ VNPT. Website
        không phải trang chính thức của VNPT.
      </p>
    </div>
  );
}

export default function HomeView() {
  const { cms } = useCms();
  const { sections } = cms;

  return (
    <>
      <HotPromotionBanner />
      <div className="border-b border-slate-200 bg-gradient-to-b from-white via-[#f0f6ff] to-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-14">
          <section
            className="home-hero-banner relative overflow-hidden rounded-3xl bg-[#071a44] shadow-[0_24px_60px_-28px_rgba(15,23,42,0.45)] ring-1 ring-white/10"
            style={{
              backgroundImage: "url('/home-hero-banner.png')",
            }}
          >
            <div className="home-hero-overlay pointer-events-none absolute inset-0" />
            <div className="relative z-10 mx-auto grid max-w-6xl min-h-[360px] md:min-h-[420px] md:grid-cols-12 md:gap-6 lg:min-h-[440px]">
              <div className="flex flex-col justify-center px-6 py-10 sm:px-8 sm:py-12 md:col-span-7 md:px-10 md:py-14 lg:col-span-6">
                <p className="mb-3 inline-flex w-fit items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-100/95">
                  Hỗ trợ đăng ký dịch vụ
                </p>

                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/35 bg-gradient-to-r from-amber-500/25 to-yellow-500/15 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-amber-50 shadow-sm ring-1 ring-amber-400/25">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 shrink-0 text-amber-300"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 2l8 4v6c0 5.55-3.84 10.74-8 12-4.16-1.26-8-6.45-8-12V6l8-4zm0 2.18L6 7.03v4.84c0 4.54 3.07 8.84 6 9.97 2.93-1.13 6-5.43 6-9.97V7.03l-6-2.85zm-1 5.82h2v6h-2v-6zm0-4h2v2h-2V6z" />
                    </svg>
                    Lắp đặt trong 24h
                  </span>
                </div>

                <h1 className="home-hero-text-shadow text-balance text-[1.65rem] font-extrabold leading-[1.2] tracking-tight text-white sm:text-3xl md:text-[2rem] lg:text-4xl">
                  Tư vấn chính thức từ nhân viên VNPT - chọn gói phù hợp nhất
                </h1>
                <p className="home-hero-text-shadow mt-3 max-w-xl text-base leading-relaxed text-sky-100/95 sm:text-lg">
                  Hỗ trợ đăng ký nhanh - lắp đặt tận nơi trong 24h
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <a
                    href={contact.phone}
                    className="hero-main-cta inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-base font-bold text-white shadow-lg sm:w-auto"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-5 w-5 shrink-0"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>Gọi tôi để tư vấn miễn phí ngay</span>
                  </a>
                  {sections[0] ? (
                    <a
                      href={`#${sections[0].id}`}
                      className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full border border-white/35 bg-white/[0.07] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:border-white/55 hover:bg-white/[0.14] sm:w-auto"
                    >
                      Xem các gói cước
                    </a>
                  ) : null}
                </div>

                <ul className="mt-10 grid gap-3 sm:grid-cols-3 sm:gap-4">
                  <li className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5 backdrop-blur-[6px]">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-400/20 text-sky-200">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </span>
                    <span className="text-[13px] font-semibold leading-snug text-white sm:text-sm">
                      Tốc độ cao Ổn định
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5 backdrop-blur-[6px]">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-400/20 text-sky-200">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2l8 4v6c0 5.55-3.84 10.74-8 12-4.16-1.26-8-6.45-8-12V6l8-4z" />
                      </svg>
                    </span>
                    <span className="text-[13px] font-semibold leading-snug text-white sm:text-sm">
                      Chính thức từ VNPT
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5 backdrop-blur-[6px] sm:col-span-1">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-400/20 text-sky-200">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    <span className="text-[13px] font-semibold leading-snug text-white sm:text-sm">
                      Hỗ trợ 24/7 nhanh chóng
                    </span>
                  </li>
                </ul>
              </div>

              <div
                className="hidden md:block md:col-span-5 lg:col-span-6"
                aria-hidden="true"
              />
            </div>
          </section>
          <DisclaimerNotice className="mt-3" />
        </div>
      </div>

      {sections.map((section, index) => (
        <AnimatedPricingSection
          key={section.id}
          section={section}
          bgClassName={index % 2 === 0 ? "bg-slate-50" : "bg-white"}
        />
      ))}

      <div className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <DisclaimerNotice />
        </div>
      </div>
    </>
  );
}
