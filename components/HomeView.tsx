"use client";

import HotPromotionBanner from "@/components/HotPromotionBanner";
import AnimatedPricingSection from "@/components/AnimatedPricingSection";
import LeadForm from "@/components/LeadForm";
import TrustStrip from "@/components/TrustStrip";
import { useCms } from "@/components/cms/CmsProvider";
import {
  getSectionSeoIntro,
  getSectionServiceLink,
} from "@/lib/content/section-map";
import { contactFromSite, siteHasPhone } from "@/lib/data";
import { trackLeadEvent } from "@/lib/tracking";

function DisclaimerNotice({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-start gap-2.5 rounded-xl border border-slate-200 bg-white/90 px-3 py-2.5 text-left text-[13px] leading-5 text-slate-500 shadow-sm ${className}`}
    >
      <span
        aria-hidden="true"
        className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3L4.5 6V11.2C4.5 16.2 7.7 20.8 12 22C16.3 20.8 19.5 16.2 19.5 11.2V6L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.8 12.1L11.1 14.4L15.2 10.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <p>
        Website tư vấn đăng ký dịch vụ của nhân viên VNPT khu vực Quận 12 và
        TP.HCM — không phải cổng thông tin chính thức toàn quốc của VNPT.
      </p>
    </div>
  );
}

export default function HomeView() {
  const { cms } = useCms();
  const { sections } = cms;
  const contact = contactFromSite(cms.site);

  return (
    <>
      <HotPromotionBanner />
      <div className="landing-hero-shell border-b border-sky-100/80">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-14">
          <section
            className="home-hero-banner relative overflow-hidden rounded-3xl bg-[#071a44] shadow-[0_24px_60px_-28px_rgba(15,23,42,0.45)] ring-1 ring-white/10"
            style={{ backgroundImage: "url('/home-hero-banner.svg')" }}
          >
            <div className="home-hero-overlay pointer-events-none absolute inset-0" />
            <div className="relative z-10 mx-auto grid max-w-6xl min-h-[360px] md:min-h-[420px] md:grid-cols-12 md:gap-6 lg:min-h-[440px]">
              <div className="flex flex-col justify-center px-6 py-10 sm:px-8 sm:py-12 md:col-span-7 md:px-10 md:py-14 lg:col-span-6">
                <p className="mb-3 inline-flex w-fit items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-100/95">
                  Nhân viên VNPT · Quận 12, TP.HCM
                </p>

                <h1 className="home-hero-text-shadow text-balance text-[1.65rem] font-extrabold leading-[1.2] tracking-tight text-white sm:text-3xl md:text-[2rem] lg:text-4xl">
                  Tư vấn đăng ký WiFi, SIM 5G, Camera VNPT tại TP.HCM
                </h1>
                <p className="home-hero-text-shadow mt-3 max-w-xl text-base leading-relaxed text-sky-100/95 sm:text-lg">
                  Nhân viên VNPT hỗ trợ tư vấn gói cước, kiểm tra hạ tầng và
                  đăng ký lắp đặt tận nơi khu vực Quận 12 và các quận nội thành.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  {siteHasPhone(cms.site) ? (
                    <a
                      href={contact.phone}
                      onClick={() =>
                        trackLeadEvent("phone_click", {
                          label: contact.phoneDisplay || "Hero phone",
                          destination: contact.phone,
                        })
                      }
                      className="hero-main-cta inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-base font-bold text-white shadow-lg sm:w-auto"
                    >
                      Gọi tư vấn miễn phí
                    </a>
                  ) : null}
                  {sections[0] ? (
                    <a
                      href={`#${sections[0].id}`}
                      onClick={() =>
                        trackLeadEvent("landing_cta_click", {
                          label: "Hero package list",
                          destination: `#${sections[0].id}`,
                        })
                      }
                      className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full border border-white/35 bg-white/[0.07] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/55 hover:bg-white/[0.14] sm:w-auto"
                    >
                      Xem các gói cước
                    </a>
                  ) : null}
                </div>
              </div>
              <div className="hidden md:block md:col-span-5 lg:col-span-6" aria-hidden="true" />
            </div>
          </section>
          <DisclaimerNotice className="mt-3" />
        </div>
      </div>

      <TrustStrip />

      {sections.map((section, index) => (
        <AnimatedPricingSection
          key={section.id}
          section={section}
          zaloBaseUrl={cms.site.zalo}
          bgClassName={index % 2 === 0 ? "pricing-section-bg" : "pricing-section-bg-alt"}
          seoIntro={getSectionSeoIntro(section.id)}
          servicePath={getSectionServiceLink(section.id)}
        />
      ))}

      <div id="lead-form-home" className="pricing-section-bg border-t border-sky-100/80">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Gửi thông tin nhận tư vấn
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Điền form bên cạnh, tôi sẽ liên hệ lại qua điện thoại hoặc Zalo
                trong thời gian sớm nhất. Hỗ trợ kiểm tra hạ tầng theo địa chỉ
                trước khi chốt gói.
              </p>
            </div>
            <LeadForm />
          </div>
        </div>
      </div>

      <div className="disclaimer-band border-t border-sky-100/80">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <DisclaimerNotice />
        </div>
      </div>
    </>
  );
}
