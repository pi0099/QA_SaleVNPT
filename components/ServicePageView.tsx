import Link from "next/link";
import ContentHtml from "@/components/ContentHtml";
import CtaBox from "@/components/CtaBox";
import LeadForm from "@/components/LeadForm";
import PricingCard from "@/components/PricingCard";
import Section from "@/components/Section";
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
  const section = service.sectionId
    ? sections.find((s) => s.id === service.sectionId)
    : undefined;

  return (
    <>
      <div className="landing-hero-shell border-b border-sky-100/80">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex items-center rounded-full border border-[#2563eb]/20 bg-[#2563eb]/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#2563eb]">
              Tư vấn đăng ký VNPT
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              {service.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {service.shortDescription}
            </p>
            <p className="mt-3 text-sm text-slate-500">
              Nhân viên VNPT hỗ trợ tư vấn tại Quận 12 và TP.HCM — không phải website chính thức toàn quốc.
            </p>
          </div>
        </div>
      </div>

      {section && section.cards.length > 0 ? (
        <Section
          title="Bảng giá tham khảo"
          subtitle="Giá có thể thay đổi theo thời điểm. Liên hệ để xác nhận ưu đãi hiện tại."
          contentClassName="!mt-8"
        >
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {section.cards.slice(0, 6).map((card) => (
              <li key={card.id}>
                <PricingCard
                  card={card}
                  recommended={card.isPopular}
                  zaloBaseUrl={zaloBaseUrl}
                />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section title="Thông tin chi tiết" contentClassName="!mt-8">
        <ContentHtml html={service.longContent} />
      </Section>

      <Section
        title="Câu hỏi thường gặp"
        subtitle="Giải đáp nhanh trước khi đăng ký."
        contentClassName="!mt-8"
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            {service.faqs.map((item) => (
              <article
                key={item.question}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h2 className="text-base font-bold text-slate-900">
                  {item.question}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
          <div>
            <LeadForm defaultNeed={needMap[service.slug] ?? "Chưa rõ"} />
          </div>
        </div>
      </Section>

      {relatedPosts.length > 0 ? (
        <Section
          title="Bài viết liên quan"
          contentClassName="!mt-8"
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
