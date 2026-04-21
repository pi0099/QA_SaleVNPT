"use client";

import { useEffect, useMemo, useState } from "react";

type Promotion = {
  id: string;
  icon: string;
  text: string;
  cta: string;
  href: string;
  theme: "sunset" | "violet";
};

const promotions: Promotion[] = [
  {
    id: "promo-apr",
    icon: "🔥",
    text: "Giảm 50% tháng đầu - chỉ đến 30/04",
    cta: "Xem ưu đãi",
    href: "#wifi",
    theme: "sunset",
  },
  {
    id: "promo-bundle",
    icon: "⚡",
    text: "Đăng ký combo WiFi + Camera - tiết kiệm đến 300.000đ",
    cta: "Xem ưu đãi",
    href: "#camera",
    theme: "violet",
  },
  {
    id: "promo-sim",
    icon: "🔥",
    text: "Tặng 30GB data khi đăng ký SIM 4G online trong tháng này",
    cta: "Xem ưu đãi",
    href: "#sim-4g",
    theme: "sunset",
  },
];

function getThemeClass(theme: Promotion["theme"]): string {
  if (theme === "violet") {
    return "from-blue-600 via-indigo-600 to-purple-600";
  }
  return "from-orange-500 via-rose-500 to-red-600";
}

export default function HotPromotionBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePromotion = useMemo(
    () => promotions[activeIndex] ?? promotions[0],
    [activeIndex],
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % promotions.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="border-b border-white/20 bg-slate-950/95">
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
        <div
          className={`promo-glow relative overflow-hidden rounded-2xl bg-gradient-to-r ${getThemeClass(activePromotion.theme)} p-[1px] shadow-lg`}
        >
          <div className="relative rounded-2xl bg-slate-950/20 px-4 py-3 backdrop-blur-sm sm:px-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-xl"
                >
                  {activePromotion.icon}
                </span>
                <div className="overflow-hidden">
                  <p className="promo-marquee whitespace-nowrap text-sm font-semibold text-white sm:text-base">
                    {activePromotion.text}
                  </p>
                </div>
              </div>

              <a
                href={activePromotion.href}
                className="promo-cta inline-flex min-h-[44px] items-center justify-center rounded-xl bg-white px-5 py-2 text-sm font-bold text-slate-900 transition-transform duration-300 hover:scale-[1.03]"
              >
                {activePromotion.cta}
              </a>
            </div>

            <div className="mt-3 flex items-center justify-center gap-2 sm:justify-end">
              {promotions.map((promo, index) => (
                <button
                  key={promo.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Hiển thị ưu đãi ${index + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeIndex
                      ? "w-6 bg-white"
                      : "w-2.5 bg-white/45 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
