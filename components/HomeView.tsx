"use client";

import HotPromotionBanner from "@/components/HotPromotionBanner";
import AnimatedPricingSection from "@/components/AnimatedPricingSection";
import { useCms } from "@/components/cms/CmsProvider";
import { contact } from "@/lib/data";

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
            <div className="absolute inset-0 bg-gradient-to-r from-[#071a44]/92 via-[#0b2a74]/72 to-transparent sm:from-[#071a44]/86 sm:via-[#0b2a74]/58" />
            <div className="relative z-10 flex min-h-[340px] items-center px-6 py-10 sm:px-8 sm:py-12 md:min-h-[420px] md:px-10">
              <div className="max-w-xl">
                <h1 className="text-balance text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                  Tư vấn chính thức từ nhân viên VNPT - chọn gói phù hợp nhất
                </h1>
                <p className="mt-4 text-base font-medium text-blue-100 sm:text-lg">
                  Hỗ trợ đăng ký nhanh - lắp đặt tận nơi trong 24h
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href={contact.phone}
                    className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#ef4444] px-6 py-3 text-base font-bold text-white shadow-[0_10px_28px_-14px_rgba(239,68,68,0.9)] transition-all duration-200 ease-out hover:brightness-105 sm:w-auto"
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
        </div>
      </div>

      {sections.map((section, index) => (
        <AnimatedPricingSection
          key={section.id}
          section={section}
          bgClassName={index % 2 === 0 ? "bg-slate-50" : "bg-white"}
        />
      ))}
    </>
  );
}
