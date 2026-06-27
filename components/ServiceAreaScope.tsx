import { getServiceAreaTags } from "@/lib/content/service-area-tags";

type ServiceAreaScopeProps = {
  serviceSlug: string;
  className?: string;
};

/**
 * Khu vực phục vụ — tag/pill cho local SEO (Google hiểu phạm vi TP.HCM).
 * Không link sang trang quận riêng.
 */
export default function ServiceAreaScope({
  serviceSlug,
  className = "",
}: ServiceAreaScopeProps) {
  const tags = getServiceAreaTags(serviceSlug);

  return (
    <section
      id="khu-vuc-phuc-vu"
      aria-labelledby="service-area-heading"
      className={`scroll-mt-36 border-t border-sky-100/80 py-10 md:scroll-mt-40 ${className}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2
          id="service-area-heading"
          className="text-lg font-bold text-slate-900 sm:text-xl"
        >
          Khu vực phục vụ tại TP.HCM
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
          Tư vấn và hỗ trợ lắp đặt tận nơi khu vực TP.HCM — ưu tiên Quận 12 và
          các quận nội/ngoại thành. Gửi địa chỉ để kiểm tra hạ tầng trước khi
          đăng ký.
        </p>
        <ul
          className="mt-5 flex flex-wrap gap-2"
          aria-label="Khu vực và từ khóa địa phương"
        >
          {tags.map((tag) => (
            <li key={tag}>
              <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700">
                #{tag.replace(/\s+/g, "")}
              </span>
            </li>
          ))}
        </ul>
        <p className="sr-only">
          Dịch vụ VNPT phục vụ Thành phố Hồ Chí Minh, bao gồm Quận 12, Gò Vấp,
          Tân Bình, Thủ Đức, Bình Tân, Hóc Môn và vùng nội thành, ngoại thành
          TP.HCM.
        </p>
      </div>
    </section>
  );
}
