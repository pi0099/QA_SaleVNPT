import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import { buildFaqJsonLd, faqItems } from "@/lib/faq";
import { localAreas, localServices } from "@/lib/local-seo";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ketnoimanghcm.vn";

export const metadata: Metadata = {
  title: "FAQ lắp WiFi VNPT, SIM 5G, Camera | Hỏi đáp nhanh",
  description:
    "Giải đáp các câu hỏi thường gặp khi đăng ký WiFi VNPT, phí hòa mạng, thời gian lắp đặt, SIM 5G và gói camera.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqJsonLd(siteUrl)),
        }}
      />
      <div className="border-b border-slate-200 bg-gradient-to-b from-white via-[#f0f6ff] to-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex items-center rounded-full border border-[#2563eb]/20 bg-[#2563eb]/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#2563eb]">
              Hỏi đáp nhanh
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              FAQ lắp WiFi VNPT, SIM 5G và Camera
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Tổng hợp các câu hỏi thường gặp để khách hàng hiểu rõ thời gian
              lắp đặt, phí hòa mạng, giấy tờ cần chuẩn bị và cách chọn gói phù
              hợp.
            </p>
          </div>
        </div>
      </div>

      <Section
        title="Câu hỏi thường gặp"
        subtitle="Nội dung được đánh dấu FAQ schema để Google có thể hiểu rõ hơn."
        contentClassName="!mt-8"
      >
        <div className="space-y-4">
          {faqItems.map((item) => (
            <article
              key={item.question}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h2 className="text-lg font-bold text-slate-900">
                {item.question}
              </h2>
              <p className="mt-2 leading-relaxed text-slate-600">
                {item.answer}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <h2 className="text-lg font-bold text-slate-900">
            Cần tư vấn gói phù hợp?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Xem nhanh bảng giá WiFi VNPT, SIM 5G và các gói Camera đang có trên
            trang chủ.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/wifi-vnpt"
              className="rounded-full bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Xem gói WiFi VNPT
            </Link>
            <Link
              href="/sim-5g"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-[#2563eb] hover:text-[#2563eb]"
            >
              Xem gói SIM 5G
            </Link>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Dịch vụ theo khu vực
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Các landing page theo dịch vụ và khu vực trọng điểm tại TP.HCM.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {localServices.flatMap((service) =>
              localAreas.slice(0, 6).map((area) => (
                <Link
                  key={`${service.slug}-${area.slug}`}
                  href={`/${service.slug}/${area.slug}`}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#2563eb] hover:text-[#2563eb]"
                >
                  {service.shortLabel} {area.name}
                </Link>
              )),
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
