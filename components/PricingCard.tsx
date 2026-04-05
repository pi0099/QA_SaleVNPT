import { getZaloRegisterUrl, type PackageCard as PackageCardType } from "@/lib/data";

type PricingCardProps = {
  card: PackageCardType;
};

const headerClass: Record<PackageCardType["variant"], string> = {
  blue: "bg-[#2563eb]",
  orange: "bg-[#ea580c]",
};

const buttonClass: Record<PackageCardType["variant"], string> = {
  blue: "bg-[#2563eb] hover:bg-[#1d4ed8]",
  orange: "bg-[#ea580c] hover:bg-[#c2410c]",
};

export default function PricingCard({ card }: PricingCardProps) {
  const registerHref = getZaloRegisterUrl(card.title);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition-shadow duration-200 hover:shadow-xl">
      <div
        className={`px-5 py-4 text-center text-lg font-bold uppercase tracking-wide text-white ${headerClass[card.variant]}`}
      >
        {card.title}
      </div>

      <div className="flex flex-1 flex-col px-5 pb-6 pt-5">
        <p className="text-center">
          <span className="text-3xl font-extrabold leading-none text-[#ea580c] md:text-[2rem]">
            {card.price}
          </span>
          <span className="ml-1 text-base font-semibold text-slate-800">
            {" "}
            Vnđ/tháng
          </span>
        </p>

        <div className="mt-5 space-y-1 border-t border-slate-100 pt-5">
          <p className="text-center text-xs font-medium uppercase tracking-wide text-slate-500">
            Download / Upload
          </p>
          <p className="text-center text-base font-bold text-slate-900">
            {card.speed}
          </p>
        </div>

        <ul className="mt-5 flex-1 space-y-3 rounded-lg bg-slate-50 px-4 py-4">
          {card.features
            .filter((line) => line.trim().length > 0)
            .map((line, i) => (
              <li
                key={`${card.id}-feat-${i}`}
                className="flex gap-2 text-sm leading-snug text-slate-700"
              >
                <span className="mt-0.5 shrink-0 font-bold text-[#ea580c]">
                  »
                </span>
                <span>{line}</span>
              </li>
            ))}
        </ul>

        <p className="mt-4 text-center text-sm font-semibold text-red-600">
          {card.promotion}
        </p>

        <a
          href={registerHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-6 flex min-h-[48px] w-full items-center justify-center rounded-xl px-4 py-3 text-center text-base font-bold uppercase tracking-wide text-white shadow-sm transition-colors ${buttonClass[card.variant]}`}
        >
          ĐĂNG KÝ NGAY
        </a>
      </div>
    </article>
  );
}
