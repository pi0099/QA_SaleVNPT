import Link from "next/link";
import Section from "@/components/Section";
import {
  buildLocalServiceJsonLd,
  getLocalArea,
  getLocalService,
  localAreas,
  localServices,
  type LocalServiceSlug,
} from "@/lib/local-seo";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ketnoimanghcm.vn";

export default function LocalServiceLanding({
  serviceSlug,
  areaSlug,
}: {
  serviceSlug: LocalServiceSlug;
  areaSlug: string;
}) {
  const service = getLocalService(serviceSlug);
  const area = getLocalArea(areaSlug);

  if (!service || !area) return null;

  const relatedServices = localServices.filter((item) => item.slug !== service.slug);
  const nearbyAreas = area.nearby
    .map((slug) => localAreas.find((item) => item.slug === slug))
    .filter(Boolean);
  const jsonLd = buildLocalServiceJsonLd({ service, area, siteUrl });

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
              Dịch vụ theo khu vực
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              {service.label} {area.headlineName}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {service.description} Riêng tại {area.name}, nhu cầu phổ biến là{" "}
              {area.demand}.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={service.homeAnchor}
                className="rounded-full bg-[#2563eb] px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-blue-700"
              >
                {service.ctaLabel}
              </Link>
              <Link
                href="/faq"
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:border-[#2563eb] hover:text-[#2563eb]"
              >
                Xem FAQ lắp đặt
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Section
        title={`Tư vấn ${service.shortLabel} tại ${area.name}`}
        subtitle={`Nội dung được tối ưu riêng cho ${area.localAngle}.`}
        contentClassName="!mt-8"
      >
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="leading-relaxed text-slate-700">
              Khi đăng ký {service.shortLabel} tại {area.name}, điểm quan trọng
              không chỉ là giá gói mà còn là hạ tầng ở từng tuyến đường, số thiết
              bị sử dụng và cách bố trí nhà hoặc cửa hàng. Khu vực này có đặc
              thù {area.localAngle}, nên việc tư vấn đúng ngay từ đầu giúp hạn
              chế đổi gói, đổi vị trí modem hoặc phát sinh thiết bị bổ sung.
            </p>
            <p className="leading-relaxed text-slate-700">
              Các khu vực thường cần hỗ trợ gồm {area.neighborhoods.join(", ")}.
              Với những địa điểm đông thiết bị hoặc có nhu cầu kinh doanh, nên
              nói rõ số người dùng, diện tích và mục đích chính để được gợi ý
              gói phù hợp hơn.
            </p>
            <p className="leading-relaxed text-slate-700">
              {service.serviceSpecificAdvice}
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">
                Nên kiểm tra trước khi đăng ký
              </h2>
              <ul className="mt-4 space-y-3">
                {service.highlights.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-slate-700">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2563eb]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
              <h2 className="text-lg font-bold text-slate-900">
                Vấn đề hay gặp
              </h2>
              <ul className="mt-4 space-y-3">
                {service.painPoints.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-slate-700">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Liên kết nội bộ liên quan"
        subtitle="Các trang liên quan giúp khách chọn đúng dịch vụ và giúp Google hiểu cấu trúc site."
        contentClassName="!mt-8"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {relatedServices.map((item) => (
            <Link
              key={item.slug}
              href={`/${item.slug}/${area.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#2563eb] hover:shadow-md"
            >
              <h2 className="text-base font-bold text-slate-900">
                {item.shortLabel} tại {area.name}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
            </Link>
          ))}
          <Link
            href="/tin-tuc-cong-nghe"
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#2563eb] hover:shadow-md"
          >
            <h2 className="text-base font-bold text-slate-900">
              Bài viết xử lý sự cố
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Xem hướng dẫn WiFi chậm, 4G chập chờn, eSIM lỗi, camera mất kết
              nối và WiFi Mesh yếu.
            </p>
          </Link>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-bold text-slate-900">
            Khu vực gần {area.name}
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {nearbyAreas.map((nearby) =>
              nearby ? (
                <Link
                  key={nearby.slug}
                  href={`/${service.slug}/${nearby.slug}`}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-[#2563eb] hover:text-[#2563eb]"
                >
                  {service.shortLabel} {nearby.name}
                </Link>
              ) : null,
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
