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
        <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8 sm:py-14 md:px-10 md:py-16">
          <section
            className="home-hero-banner relative overflow-hidden rounded-3xl bg-[#0f2a68]"
            style={{
              backgroundImage: "url('/home-hero-banner.png')",
            }}
          >
            <div className="home-hero-overlay absolute inset-0" />
            <div className="relative z-10 flex min-h-[340px] items-center px-6 py-10 sm:px-8 sm:py-12 md:min-h-[420px] md:px-10">
              <div className="home-hero-content-panel max-w-xl rounded-2xl p-4 sm:p-6">
                <h1 className="home-hero-text-shadow text-balance text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
                  Tư vấn chính thức từ nhân viên VNPT - chọn gói phù hợp nhất
                </h1>
                <p className="home-hero-text-shadow mt-3 text-base font-medium text-slate-100 sm:text-lg">
                  Hỗ trợ đăng ký nhanh - lắp đặt tận nơi trong 24h
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href={contact.phone}
                    className="hero-main-cta inline-flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-full px-6 py-3 text-base font-bold text-white sm:w-auto"
                  >
                    <span aria-hidden="true">📞</span>
                    <span>Gọi tôi để tư vấn miễn phí ngay</span>
                  </a>
                  {sections[0] ? (
                    <a
                      href={`#${sections[0].id}`}
                      className="inline-flex min-h-[50px] w-full items-center justify-center rounded-xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-[2px] transition-colors duration-200 hover:bg-white/20 sm:w-auto"
                    >
                      Xem các gói cước
                    </a>
                  ) : null}
                </div>
              </div>
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
