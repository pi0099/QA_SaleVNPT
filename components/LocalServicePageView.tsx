import Link from "next/link";
import ContentHtml from "@/components/ContentHtml";
import CtaBox from "@/components/CtaBox";
import LeadForm from "@/components/LeadForm";
import PricingCard from "@/components/PricingCard";
import Section from "@/components/Section";
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
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex items-center rounded-full border border-[#2563eb]/20 bg-[#2563eb]/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#2563eb]">
              WiFi VNPT {area.name}
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Lắp WiFi VNPT tại {area.name}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Nhân viên VNPT hỗ trợ tư vấn, kiểm tra hạ tầng theo địa chỉ và hẹn lắp đặt tận nơi tại {area.name}, TP.HCM.
            </p>
          </div>
        </div>
      </div>

      {section ? (
        <Section title="Gói WiFi tham khảo tại Quận 12" contentClassName="!mt-8">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {section.cards.slice(0, 3).map((card) => (
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

      <Section title="Thông tin theo khu vực" contentClassName="!mt-8">
        <ContentHtml html={area.content} />
      </Section>

      <Section title="FAQ — WiFi VNPT Quận 12" contentClassName="!mt-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            {area.faqs.map((item) => (
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
          <LeadForm defaultNeed="WiFi" />
        </div>
      </Section>

      {relatedPosts.length > 0 ? (
        <Section title="Bài viết liên quan" contentClassName="!mt-8">
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
