import Link from "next/link";
import ContentHtml from "@/components/ContentHtml";
import CtaBox from "@/components/CtaBox";
import FaqAccordion from "@/components/FaqAccordion";
import LeadForm from "@/components/LeadForm";
import ProductPricingGrid from "@/components/ProductPricingGrid";
import Section from "@/components/Section";
import ServiceBreadcrumbs from "@/components/ServiceBreadcrumbs";
import type { LocalArea, Post } from "@/lib/content/types";
import type { PackageSection } from "@/lib/data";
import { postCategoryLabels } from "@/lib/content/blog-images";

type LocalServicePageViewProps = {
  area: LocalArea;
  relatedPosts: Post[];
  zaloBaseUrl: string;
  sections: PackageSection[];
};

export default function LocalServicePageView({
  area,
  relatedPosts,
  zaloBaseUrl,
  sections,
}: LocalServicePageViewProps) {
  const section = sections.find((s) => s.id === "internet-gia-dinh");

  return (
    <>
      <div className="landing-hero-shell border-b border-sky-100/80">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <ServiceBreadcrumbs
            items={[
              { name: "Trang chủ", path: "/" },
              { name: "Lắp WiFi VNPT", path: "/wifi-vnpt" },
              { name: area.name },
            ]}
          />
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex items-center rounded-full border border-[#2563eb]/20 bg-[#2563eb]/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#2563eb]">
              WiFi VNPT {area.name}
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Lắp WiFi VNPT tại {area.name}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Nhân viên VNPT hỗ trợ tư vấn, kiểm tra hạ tầng theo địa chỉ và hẹn
              lắp đặt tận nơi tại {area.name}, TP.HCM.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#bang-gia"
                className="inline-flex min-h-[44px] items-center rounded-full bg-[#2563eb] px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
              >
                Xem bảng giá
              </a>
              <a
                href="#lead-form-local"
                className="inline-flex min-h-[44px] items-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 hover:border-[#2563eb] hover:text-[#2563eb]"
              >
                Đăng ký tư vấn
              </a>
            </div>
          </div>
        </div>
      </div>

      {section ? (
        <Section
          id="bang-gia"
          title="Bảng giá WiFi VNPT tại Quận 12"
          subtitle="Giá nội/ngoại thành — xác nhận theo địa chỉ cụ thể."
          contentClassName="!mt-8"
          className="pricing-section-bg border-t border-sky-100/80 scroll-mt-36 md:scroll-mt-40"
        >
          <ProductPricingGrid
            section={section}
            zaloBaseUrl={zaloBaseUrl}
            serviceDetailHref="/wifi-vnpt"
          />
        </Section>
      ) : null}

      {area.suitableForHtml ? (
        <Section
          title="Phù hợp với ai tại Quận 12?"
          contentClassName="!mt-8"
          className="border-t border-sky-100/80 bg-white"
        >
          <ContentHtml html={area.suitableForHtml} />
        </Section>
      ) : null}

      <Section
        title="Thông tin theo khu vực"
        contentClassName="!mt-8"
        className="border-t border-sky-100/80 bg-slate-50"
      >
        <ContentHtml html={area.content} />
      </Section>

      {area.registrationHtml ? (
        <Section
          title="Quy trình đăng ký tại Quận 12"
          contentClassName="!mt-8"
          className="border-t border-sky-100/80 bg-white"
        >
          <ContentHtml html={area.registrationHtml} />
        </Section>
      ) : null}

      <Section
        id="lead-form-local"
        title="Đăng ký tư vấn"
        contentClassName="!mt-8"
        className="border-t border-sky-100/80 bg-slate-50 scroll-mt-36 md:scroll-mt-40"
      >
        <div className="mx-auto max-w-xl">
          <LeadForm defaultNeed="WiFi" />
        </div>
      </Section>

      <Section
        title={`FAQ — WiFi VNPT ${area.name}`}
        contentClassName="!mt-8"
        className="border-t border-sky-100/80 bg-white"
      >
        <FaqAccordion items={area.faqs} />
      </Section>

      {relatedPosts.length > 0 ? (
        <Section
          title="Bài viết liên quan"
          contentClassName="!mt-8"
          className="border-t border-sky-100/80 bg-slate-50"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/news/${post.slug}`}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#2563eb]"
              >
                <p className="text-xs font-semibold uppercase text-[#2563eb]">
                  {postCategoryLabels[post.category]}
                </p>
                <h3 className="mt-2 font-bold text-slate-900">{post.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </Section>
      ) : null}

      <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <CtaBox title="Cần lắp WiFi tại Quận 12?" />
      </div>
    </>
  );
}
