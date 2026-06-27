"use client";

import HeroProductCarousel from "@/components/HeroProductCarousel";
import HomeProductSection from "@/components/HomeProductSection";
import HomeFaqSection from "@/components/HomeFaqSection";
import LeadForm from "@/components/LeadForm";
import { useCms } from "@/components/cms/CmsProvider";
import { resolveHomepageBannerEntries } from "@/lib/packages/helpers";
import type { PackageSection } from "@/lib/data";
import type { HomepageBannerSlide } from "@/lib/cms-store/types";

type HomeViewProps = {
  /** Server-provided sections for initial SEO render */
  initialSections?: PackageSection[];
  initialBanners?: HomepageBannerSlide[];
};

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

export default function HomeView({ initialSections, initialBanners }: HomeViewProps) {
  const { cms } = useCms();
  const sections = cms.sections.length ? cms.sections : (initialSections ?? []);
  const banners =
    cms.homepageBanners?.length
      ? cms.homepageBanners
      : (initialBanners ?? []);
  const bannerEntries = resolveHomepageBannerEntries(sections, banners);

  return (
    <>
      <HeroProductCarousel products={bannerEntries} />

      {sections.map((section, index) => (
        <HomeProductSection
          key={section.id}
          section={section}
          zaloBaseUrl={cms.site.zalo}
          bgClassName={index % 2 === 0 ? "pricing-section-bg" : "pricing-section-bg-alt"}
        />
      ))}

      <HomeFaqSection />

      <div id="lead-form-home" className="scroll-mt-36 pricing-section-bg border-t border-sky-100/80 md:scroll-mt-40">
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
