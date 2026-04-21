import { getZaloRegisterUrl, type PackageCard as PackageCardType } from "@/lib/data";

type PricingCardProps = {
  card: PackageCardType;
  recommended?: boolean;
};

const headerClass: Record<PackageCardType["variant"], string> = {
  blue: "text-[#1d4ed8]",
  orange: "text-[#c2410c]",
};

const buttonClass: Record<PackageCardType["variant"], string> = {
  blue: "bg-[#2563eb] hover:bg-[#3b82f6] focus-visible:ring-[#2563eb]",
  orange: "bg-[#ea580c] hover:bg-[#f97316] focus-visible:ring-[#ea580c]",
};

const speedAccentClass: Record<PackageCardType["variant"], string> = {
  blue: "text-[#1e40af]",
  orange: "text-[#b45309]",
};

export default function PricingCard({ card, recommended = false }: PricingCardProps) {
  const registerHref = getZaloRegisterUrl(card.title);
  const features = card.features.filter((line) => line.trim().length > 0).slice(0, 5);

  return (
    <article
      className={`pricing-card-interactive relative flex h-full w-full flex-col overflow-hidden rounded-[18px] border bg-white shadow-sm transition-all duration-300 ease-out active:opacity-95 ${
        recommended
          ? "pricing-card-recommended scale-[1.05] border-[#f97316] shadow-[0_16px_38px_-22px_rgba(249,115,22,0.9)]"
          : "border-slate-200"
      }`}
    >
      {recommended ? (
        <div className="absolute right-4 top-4 z-10 rounded-full bg-[#f97316] px-3 py-1 text-xs font-bold text-white shadow-sm">
          🔥 Phổ biến nhất
        </div>
      ) : null}

      <div className="px-6 pb-2 pt-6 text-center">
        <p
          className={`text-sm font-semibold uppercase tracking-[0.18em] ${headerClass[card.variant]}`}
        >
          {card.title}
        </p>
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6 pt-1">
        <p className="text-center text-slate-900">
          <span className="text-4xl font-extrabold leading-none md:text-[2.5rem]">
            {card.price}
          </span>
          <span className="ml-1 text-base font-semibold">đ</span>
          <span className="ml-2 text-sm font-medium text-slate-600">/tháng</span>
        </p>

        <div className="mt-6 border-t border-slate-200 pt-5">
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
            Download / Upload
          </p>
          <p
            className={`mt-1 text-center text-base font-extrabold ${speedAccentClass[card.variant]}`}
          >
            {card.speed}
          </p>
        </div>

        <ul className="mt-5 flex-1 space-y-3 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-4">
          {features.map((line, i) => (
            <li
              key={`${card.id}-feat-${i}`}
              className="flex items-start gap-2.5 text-sm leading-snug text-slate-700"
            >
              <span
                aria-hidden="true"
                className="pricing-feature-icon mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"
              >
                ✓
              </span>
              <span>{line}</span>
            </li>
          ))}
          {features.length === 0 ? (
            <li className="text-sm text-slate-500">Thong tin dang cap nhat.</li>
          ) : null}
        </ul>

        <p className="mt-4 text-center text-sm font-semibold text-[#dc2626]">
          {card.promotion}
        </p>

        <a
          href={registerHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`pricing-cta-interactive mt-5 inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center rounded-xl px-4 py-3 text-center text-base font-bold text-white shadow-sm ring-offset-2 transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 active:opacity-95 ${buttonClass[card.variant]}`}
        >
          Đăng ký ngay
        </a>
      </div>
    </article>
  );
}
