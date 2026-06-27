"use client";

import Link from "next/link";
import { useCms } from "@/components/cms/CmsProvider";
import { defaultSiteSettings } from "@/lib/content/site-settings";
import { contactFromSite, siteHasPhone } from "@/lib/data";
import { trackLeadEvent } from "@/lib/tracking";

const sectionBubbleHint: Record<string, string> = {
  "internet-gia-dinh": "WiFi gia đình — xem bảng giá",
  "internet-di-dong": "Combo Internet + di động",
  "goi-5g-data": "Gói data 5G lớn",
  "goi-5g-combo": "Combo 5G tiết kiệm",
  "sim-4g": "SIM 4G / 5G VNPT",
  camera: "Camera an ninh VNPT",
};

const extraBubbles = [
  { href: "/sim-u1500-vinaphone", label: "SIM U1500 500GB giá rẻ" },
  { href: "#home-reviews-faq", label: "Đánh giá & hỏi đáp" },
  { href: "#lead-form-home", label: "Đăng ký tư vấn nhanh" },
];

const categoryTabClass =
  "inline-flex shrink-0 items-center border-b-2 border-transparent px-3 py-3 text-sm font-semibold text-slate-600 transition-colors hover:border-[#2563eb]/40 hover:text-[#2563eb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] sm:px-4";

export default function SiteNav() {
  const { cms } = useCms();
  const { sections } = cms;
  const contact = contactFromSite(cms.site);

  const bubbles = [
    ...sections.map((section) => ({
      href: `/#${section.id}`,
      label: sectionBubbleHint[section.id] ?? section.title,
    })),
    ...extraBubbles,
  ];

  return (
    <header className="site-header-fpt sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="group inline-flex shrink-0 items-center rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]"
            aria-label={`${defaultSiteSettings.siteName} — Về trang chủ`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={defaultSiteSettings.logo}
              alt="Kết Nối Mạng HCM"
              width={260}
              height={48}
              className="h-9 w-auto transition-opacity duration-200 group-hover:opacity-90 sm:h-10"
            />
          </Link>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {siteHasPhone(cms.site) ? (
              <a
                href={contact.phone}
                onClick={() =>
                  trackLeadEvent("phone_click", {
                    label: contact.phoneDisplay || "Header phone",
                    destination: contact.phone,
                  })
                }
                className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800 transition-colors hover:border-[#2563eb] hover:text-[#2563eb] sm:inline-flex"
              >
                <span aria-hidden className="text-[#2563eb]">
                  ☎
                </span>
                {contact.phoneDisplay}
              </a>
            ) : null}
            <a
              href="#lead-form-home"
              className="inline-flex min-h-[40px] items-center justify-center rounded-lg bg-[#ea580c] px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#c2410c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ea580c]"
            >
              Đăng ký ngay
            </a>
          </div>
        </div>
      </div>

      <nav
        className="site-nav-scroll border-b border-slate-100 bg-white"
        aria-label="Danh mục dịch vụ"
      >
        <div className="mx-auto flex max-w-6xl gap-0 overflow-x-auto px-4 sm:px-6">
          {sections.map((section) => (
            <a key={section.id} href={`/#${section.id}`} className={categoryTabClass}>
              {section.title}
            </a>
          ))}
          <Link href="/news" className={categoryTabClass}>
            Tin tức
          </Link>
          <Link href="/faq" className={categoryTabClass}>
            FAQ
          </Link>
        </div>
      </nav>

      <div className="site-nav-bubbles bg-gradient-to-r from-slate-50 via-blue-50/60 to-slate-50">
        <div
          className="site-nav-scroll mx-auto max-w-6xl"
          aria-label="Cuộn nhanh tới mục"
        >
          <div className="flex w-max min-w-full gap-3 px-4 py-3 sm:w-auto sm:min-w-0 sm:flex-wrap sm:px-6 sm:py-3.5">
            {bubbles.map((bubble) => (
              <a
                key={bubble.href}
                href={bubble.href}
                className="nav-scroll-bubble group inline-flex shrink-0 snap-start items-center gap-2 rounded-2xl border border-slate-200/90 bg-white px-4 py-2.5 text-[13px] font-semibold text-slate-700 shadow-sm transition-all hover:border-[#2563eb]/50 hover:text-[#2563eb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] sm:text-sm"
              >
                <span
                  aria-hidden
                  className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2563eb]/10 text-xs text-[#2563eb]"
                >
                  💬
                </span>
                <span>{bubble.label}</span>
                <span
                  aria-hidden
                  className="text-slate-400 transition-transform group-hover:translate-y-0.5 group-hover:text-[#2563eb]"
                >
                  ↓
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
