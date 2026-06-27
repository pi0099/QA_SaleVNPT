import Link from "next/link";
import ContentHtml from "@/components/ContentHtml";
import CtaBox from "@/components/CtaBox";
import FaqAccordion from "@/components/FaqAccordion";
import LeadForm from "@/components/LeadForm";
import ProductPricingGrid from "@/components/ProductPricingGrid";
import Section from "@/components/Section";
import ServiceBreadcrumbs from "@/components/ServiceBreadcrumbs";
import ServiceAreaScope from "@/components/ServiceAreaScope";
import { getServicePricingSections } from "@/lib/content/service-sections";
import type { PackageSection } from "@/lib/data";
import type { Post, Service } from "@/lib/content/types";
import { postCategoryLabels } from "@/lib/content/blog-images";

type ServicePageViewProps = {
  service: Service;
  relatedPosts: Post[];
  zaloBaseUrl: string;
  sections: PackageSection[];
};

const needMap: Record<string, string> = {
  "wifi-vnpt": "WiFi",
  "internet-di-dong-vnpt": "Internet + Di động",
  "sim-5g-vnpt": "SIM 5G",
  "camera-vnpt": "Camera",
};

export default function ServicePageView({
  service,
  relatedPosts,
  zaloBaseUrl,
  sections,
}: ServicePageViewProps) {
  const pricingSections = getServicePricingSections(
    service.slug,
    service.sectionId,
    sections,
  );
  const servicePath = `/${service.slug}`;

  return (
    <>
      {/* Header gọn — H1 + mô tả ngắn */}
      <div className="landing-hero-shell border-b border-sky-100/80">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <ServiceBreadcrumbs
            items={[
              { name: "Trang chủ", path: "/" },
              { name: service.title },
            ]}
          />
          <article className="max-w-3xl">
            <p className="mb-3 inline-flex items-center rounded-full border border-[#2563eb]/20 bg-[#2563eb]/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#2563eb]">
              Tư vấn đăng ký VNPT · TP.HCM
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              {service.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {service.shortDescription}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#bang-gia"
                className="inline-flex min-h-[44px] items-center rounded-full bg-[#2563eb] px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
              >
                Xem bảng giá
              </a>
              <a
                href="#lead-form-service"
                className="inline-flex min-h-[44px] items-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 hover:border-[#2563eb] hover:text-[#2563eb]"
              >
                Đăng ký tư vấn
              </a>
            </div>
          </article>
        </div>
      </div>

      {/* Bảng giá — cards trên cùng */}
      {pricingSections.length > 0 ? (
        <div
          id="bang-gia"
          className="scroll-mt-36 border-t border-sky-100/80 md:scroll-mt-40"
        >
          {pricingSections.map((section, index) => (
            <Section
              key={section.id}
              title={
                pricingSections.length > 1
                  ? section.title
                  : "Bảng giá & gói cước"
              }
              subtitle="Giá tham khảo nội/ngoại thành TP.HCM — liên hệ xác nhận ưu đãi hiện tại."
              contentClassName="!mt-8"
              className={
                index % 2 === 0 ? "pricing-section-bg" : "pricing-section-bg-alt"
              }
            >
              <ProductPricingGrid
                section={section}
                zaloBaseUrl={zaloBaseUrl}
                serviceDetailHref={servicePath}
              />
            </Section>
          ))}
        </div>
      ) : null}

      {/* Mô tả chi tiết — phía dưới cards */}
      {/* Khu vực phục vụ — local SEO tags */}
      <ServiceAreaScope serviceSlug={service.slug} className="bg-slate-50" />

      <Section
        title={`${service.title} là gì?`}
        contentClassName="!mt-8"
        className="border-t border-sky-100/80 bg-white"
      >
        <div className="prose-service max-w-none text-slate-700">
          <ContentHtml html={service.longContent} />
        </div>
      </Section>

      {service.suitableForHtml ? (
        <Section
          title="Dịch vụ phù hợp với ai?"
          contentClassName="!mt-8"
          className="border-t border-sky-100/80 bg-slate-50"
        >
          <div className="prose-service max-w-none text-slate-700">
            <ContentHtml html={service.suitableForHtml} />
          </div>
        </Section>
      ) : null}

      {service.registrationHtml ? (
        <Section
          title="Quy trình đăng ký"
          subtitle="Các bước tư vấn và lắp đặt thông thường — thời gian có thể thay đổi theo địa chỉ."
          contentClassName="!mt-8"
          className="border-t border-sky-100/80 bg-white"
        >
          <div className="prose-service max-w-none text-slate-700">
            <ContentHtml html={service.registrationHtml} />
          </div>
        </Section>
      ) : null}

      <Section
        id="lead-form-service"
        title="Đăng ký tư vấn"
        subtitle="Điền form — tôi liên hệ lại qua điện thoại hoặc Zalo."
        contentClassName="!mt-8"
        className="border-t border-sky-100/80 bg-slate-50 scroll-mt-36 md:scroll-mt-40"
      >
        <div className="mx-auto max-w-xl">
          <LeadForm defaultNeed={needMap[service.slug] ?? "Chưa rõ"} />
        </div>
      </Section>

      <Section
        id="service-faq"
        title="Câu hỏi thường gặp"
        subtitle="Giải đáp nhanh trước khi đăng ký."
        contentClassName="!mt-8"
        className="border-t border-sky-100/80 bg-white"
      >
        <FaqAccordion items={service.faqs} />
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
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#2563eb] hover:shadow-md"
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
        <CtaBox />
      </div>
    </>
  );
}
