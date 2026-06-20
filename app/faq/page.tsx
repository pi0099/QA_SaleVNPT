import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import CtaBox from "@/components/CtaBox";
import { fetchFaqs } from "@/lib/content";
import {
  buildBreadcrumbJsonLd,
  buildFaqPageJsonLd,
} from "@/lib/content/schema";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "FAQ lắp WiFi VNPT, SIM 5G, Camera | Hỏi đáp nhanh",
  description:
    "Giải đáp các câu hỏi thường gặp khi đăng ký WiFi VNPT, phí hòa mạng, thời gian lắp đặt, SIM 5G và gói camera tại Quận 12, TP.HCM.",
  path: "/faq",
});

export default async function FaqPage() {
  const faqs = await fetchFaqs();

  const jsonLd = [
    buildFaqPageJsonLd(
      faqs.map((f) => ({ question: f.question, answer: f.answer })),
    ),
    buildBreadcrumbJsonLd([
      { name: "Trang chủ", path: "/" },
      { name: "FAQ", path: "/faq" },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="landing-hero-shell border-b border-sky-100/80">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex items-center rounded-full border border-[#2563eb]/20 bg-[#2563eb]/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#2563eb]">
              Hỏi đáp nhanh
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              FAQ — WiFi, SIM 5G, Camera VNPT
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Câu hỏi thường gặp khi đăng ký dịch vụ VNPT tại Quận 12 và TP.HCM.
              Nội dung có FAQ schema để Google hiểu rõ hơn.
            </p>
          </div>
        </div>
      </div>

      <Section
        title="Câu hỏi thường gặp"
        contentClassName="!mt-8"
      >
        <div className="space-y-4">
          {faqs.map((item) => (
            <article
              key={item.id}
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

        <div className="mt-8">
          <CtaBox />
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Dịch vụ theo khu vực
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Chỉ liên kết tới trang có nội dung thật — tránh thin content.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/wifi-vnpt-quan-12"
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-[#2563eb] hover:text-[#2563eb]"
            >
              WiFi VNPT Quận 12
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Cũng hỗ trợ tư vấn tại Gò Vấp, Hóc Môn, Tân Bình — liên hệ Zalo/Call
            để kiểm tra hạ tầng theo địa chỉ.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/wifi-vnpt"
            className="rounded-full bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            WiFi VNPT
          </Link>
          <Link
            href="/sim-5g-vnpt"
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-[#2563eb]"
          >
            SIM 5G VNPT
          </Link>
          <Link
            href="/camera-vnpt"
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-[#2563eb]"
          >
            Camera VNPT
          </Link>
          <Link
            href="/internet-di-dong-vnpt"
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-[#2563eb]"
          >
            Internet + Di động
          </Link>
        </div>
      </Section>
    </>
  );
}
