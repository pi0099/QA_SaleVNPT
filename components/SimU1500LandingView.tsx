"use client";

import Image from "next/image";
import FaqAccordion from "@/components/FaqAccordion";
import LeadForm from "@/components/LeadForm";
import ServiceAreaScope from "@/components/ServiceAreaScope";
import ServiceBreadcrumbs from "@/components/ServiceBreadcrumbs";
import { useCms } from "@/components/cms/CmsProvider";
import {
  SIM_U1500_HERO_IMAGE,
  SIM_U1500_PATH,
  simU1500CapacityUses,
  simU1500CostSaving,
  simU1500Faqs,
  simU1500FiberReplacementNote,
  simU1500FiberReplacementUses,
  simU1500Highlights,
  simU1500Intro,
  simU1500MonthlyPrice,
  simU1500SuitableFor,
  simU1500UsageNotes,
} from "@/lib/content/sim-u1500-data";
import { contactFromSite, getZaloRegisterUrl, siteHasPhone } from "@/lib/data";
import { trackLeadEvent } from "@/lib/tracking";

function CheckIcon() {
  return (
    <span aria-hidden className="text-lg leading-none">
      ✅
    </span>
  );
}

function ContentSection({
  children,
  className = "bg-white",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`border-b border-slate-100 py-10 sm:py-14 ${className}`}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

export default function SimU1500LandingView() {
  const { cms } = useCms();
  const contact = contactFromSite(cms.site);
  const zaloHref = getZaloRegisterUrl("SIM U1500 VinaPhone 500GB", cms.site.zalo);

  return (
    <article className="sim-u1500-landing">
      <div className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
          <ServiceBreadcrumbs
            items={[
              { name: "Trang chủ", path: "/" },
              { name: "SIM Data 500GB/Tháng", path: SIM_U1500_PATH },
            ]}
          />
        </div>
      </div>

      {/* Section 1 — Banner ảnh */}
      <section className="bg-[#001452]">
        <div className="mx-auto max-w-5xl px-0 sm:px-4 sm:py-4">
          <Image
            src={SIM_U1500_HERO_IMAGE}
            alt="SIM Data U1500 VinaPhone 500GB/tháng — Data tốc độ cao, trọn gói 12 tháng, giá ~91k/tháng"
            width={1200}
            height={675}
            priority
            className="h-auto w-full object-cover sm:rounded-2xl sm:shadow-2xl"
          />
        </div>
      </section>

      {/* Intro */}
      <ContentSection>
        <h1 className="text-balance text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">
          {simU1500Intro.title}
        </h1>
        <p className="mt-4 text-lg font-semibold text-slate-800">
          {simU1500Intro.subtitle}
        </p>
        <p className="mt-4 text-base leading-relaxed text-slate-700">
          {simU1500Intro.body}
        </p>
        <p className="mt-6 inline-flex rounded-full bg-amber-50 px-4 py-2 text-sm font-bold text-amber-900 ring-1 ring-amber-200">
          Khuyến mãi chỉ {simU1500MonthlyPrice}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {zaloHref ? (
            <a
              href={zaloHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackLeadEvent("package_register_click", {
                  label: "SIM U1500 landing",
                  destination: zaloHref,
                })
              }
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[#2563eb] px-6 py-3 text-sm font-bold text-white hover:bg-blue-700"
            >
              Đăng ký ngay
            </a>
          ) : null}
          {siteHasPhone(cms.site) ? (
            <a
              href={contact.phone}
              onClick={() =>
                trackLeadEvent("phone_click", {
                  label: "SIM U1500 landing",
                  destination: contact.phone,
                })
              }
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-slate-200 px-6 py-3 text-sm font-bold text-slate-800 hover:border-[#2563eb] hover:text-[#2563eb]"
            >
              Gọi {contact.phoneDisplay}
            </a>
          ) : null}
        </div>
      </ContentSection>

      {/* Vì sao nên chọn */}
      <ContentSection className="bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-900">Vì sao nên chọn U1500?</h2>

        <div className="mt-8">
          <h3 className="text-lg font-bold text-slate-900">
            <span aria-hidden>🚀 </span>
            Dung lượng cực lớn
          </h3>
          <p className="mt-2 text-slate-700">
            500GB mỗi tháng đáp ứng tốt các nhu cầu:
          </p>
          <ul className="mt-4 space-y-2">
            {simU1500CapacityUses.map((item) => (
              <li key={item} className="flex items-start gap-2 text-slate-700">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <hr className="my-8 border-slate-200" />

        <div>
          <h3 className="text-lg font-bold text-slate-900">
            <span aria-hidden>💰 </span>
            Chi phí tiết kiệm
          </h3>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            {simU1500CostSaving}
          </p>
        </div>
      </ContentSection>

      {/* Lưu ý */}
      <ContentSection>
        <h2 className="text-2xl font-bold text-slate-900">Lưu ý khi sử dụng</h2>
        <ul className="mt-6 space-y-3">
          {simU1500UsageNotes.map((note) => (
            <li key={note} className="flex items-start gap-2 text-slate-700">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
              <span>
                {note.includes("không cộng dồn") ? (
                  <>
                    Dung lượng còn dư{" "}
                    <strong>không cộng dồn</strong> sang tháng tiếp theo.
                  </>
                ) : (
                  note
                )}
              </span>
            </li>
          ))}
        </ul>
      </ContentSection>

      {/* Phù hợp với ai */}
      <ContentSection className="bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-900">Phù hợp với ai?</h2>
        <p className="mt-3 text-slate-700">U1500 đặc biệt phù hợp nếu bạn:</p>
        <ul className="mt-6 space-y-3">
          {simU1500SuitableFor.map((item) => (
            <li key={item} className="flex items-start gap-3 text-slate-800">
              <CheckIcon />
              <span className="font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </ContentSection>

      {/* Thay thế cáp quang */}
      <ContentSection>
        <h2 className="text-2xl font-bold text-slate-900">
          <span aria-hidden>📶 </span>
          Thay thế Internet cáp quang trong nhiều trường hợp
        </h2>
        <p className="mt-3 text-slate-700">U1500 rất phù hợp để:</p>
        <ul className="mt-6 space-y-2">
          {simU1500FiberReplacementUses.map((item) => (
            <li key={item} className="flex items-start gap-2 text-slate-700">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-base leading-relaxed text-slate-700">
          {simU1500FiberReplacementNote}
        </p>
      </ContentSection>

      {/* Ưu điểm + FAQ */}
      <ContentSection className="bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-900">Ưu điểm nổi bật</h2>
        <ul className="mt-6 space-y-3">
          {simU1500Highlights.map((item) => (
            <li key={item} className="flex items-start gap-3 text-slate-800">
              <CheckIcon />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <hr className="my-10 border-slate-200" />

        <h2 className="text-2xl font-bold text-slate-900">Câu hỏi thường gặp</h2>
        <div className="mt-6">
          <FaqAccordion items={simU1500Faqs} />
        </div>
      </ContentSection>

      <ServiceAreaScope serviceSlug="sim-u1500-vinaphone" className="bg-slate-50" />

      {/* Đăng ký */}
      <section
        id="sim-u1500-register"
        className="scroll-mt-36 bg-white py-12 md:scroll-mt-40 sm:py-16"
      >
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-slate-900">
            Đăng ký SIM Data 500GB/Tháng
          </h2>
          <p className="mt-3 text-center text-sm leading-relaxed text-slate-600">
            Điền form — tôi liên hệ xác nhận và giao SIM tận nơi. Gói U1500 trọn
            12 tháng, quy đổi chỉ {simU1500MonthlyPrice}.
          </p>
          <div className="mt-8">
            <LeadForm defaultNeed="SIM U1500 VinaPhone 500GB" />
          </div>
        </div>
      </section>
    </article>
  );
}
