"use client";

import Link from "next/link";
import { useCms } from "@/components/cms/CmsProvider";
import { defaultSiteSettings } from "@/lib/content/site-settings";

const navTintClasses = [
  "border-blue-100 bg-blue-50/80 text-blue-800 shadow-blue-900/5 hover:border-blue-300 hover:bg-blue-100/80",
  "border-cyan-100 bg-cyan-50/80 text-cyan-800 shadow-cyan-900/5 hover:border-cyan-300 hover:bg-cyan-100/80",
  "border-indigo-100 bg-indigo-50/75 text-indigo-800 shadow-indigo-900/5 hover:border-indigo-300 hover:bg-indigo-100/80",
  "border-emerald-100 bg-emerald-50/75 text-emerald-800 shadow-emerald-900/5 hover:border-emerald-300 hover:bg-emerald-100/80",
  "border-amber-100 bg-amber-50/75 text-amber-800 shadow-amber-900/5 hover:border-amber-300 hover:bg-amber-100/80",
  "border-sky-100 bg-sky-50/75 text-sky-800 shadow-sky-900/5 hover:border-sky-300 hover:bg-sky-100/80",
];

const navPillClass =
  "inline-flex min-h-[40px] shrink-0 snap-start items-center justify-center whitespace-nowrap rounded-full border px-3.5 text-[13px] font-semibold shadow-sm backdrop-blur transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] sm:min-h-[42px] sm:px-4 sm:text-sm";

const utilityPillClass =
  "inline-flex min-h-[40px] shrink-0 snap-start items-center justify-center whitespace-nowrap rounded-full border border-slate-200 bg-white px-3.5 text-[13px] font-semibold text-slate-700 shadow-sm transition-colors hover:border-[#2563eb] hover:text-[#2563eb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] sm:min-h-[42px] sm:px-4 sm:text-sm";

export default function SiteNav() {
  const { cms } = useCms();
  const { sections } = cms;

  return (
    <header className="sticky top-0 z-40 border-b border-sky-100/80 bg-gradient-to-r from-white/95 via-sky-50/95 to-blue-50/95 shadow-[0_14px_36px_-30px_rgba(37,99,235,0.55)] backdrop-blur-xl">
      <div className="border-b border-sky-100/70">
        <div className="mx-auto flex max-w-6xl items-center px-4 py-3 sm:px-6 sm:py-3.5">
          <Link
            href="/"
            className="group inline-flex shrink-0 items-center rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]"
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
        </div>
      </div>

      <div className="site-nav-shell border-b border-sky-100/70">
        <nav
          className="site-nav-scroll mx-auto max-w-6xl"
          aria-label="Mục chính"
        >
          <div className="flex w-max min-w-full gap-2 px-4 py-2.5 sm:w-auto sm:min-w-0 sm:flex-wrap sm:justify-end sm:px-6 sm:py-3">
            {sections.map((section, index) => (
              <a
                key={section.id}
                href={`/#${section.id}`}
                className={`${navPillClass} ${
                  navTintClasses[index % navTintClasses.length]
                }`}
              >
                {section.title}
              </a>
            ))}
            <Link href="/news" className={utilityPillClass}>
              Tin Tức Công Nghệ
            </Link>
            <Link href="/faq" className={utilityPillClass}>
              FAQ
            </Link>
          </div>
        </nav>
      </div>

      <div className="bg-gradient-to-r from-blue-50/95 via-cyan-50/90 to-white/95 shadow-[inset_0_-1px_0_0_rgba(14,165,233,0.12)]">
        <div className="mx-auto flex max-w-6xl items-center gap-2.5 px-4 py-2 sm:px-6 sm:py-2.5">
          <span
            aria-hidden="true"
            className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 3L4.5 6V11.2C4.5 16.2 7.7 20.8 12 22C16.3 20.8 19.5 16.2 19.5 11.2V6L12 3Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.8 12.1L11.1 14.4L15.2 10.3"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <p className="min-w-0 text-[13px] font-semibold leading-5 text-[#1e3a8a] sm:text-sm">
            Nhân viên VNPT hỗ trợ tư vấn &amp; đăng ký dịch vụ tận nơi
          </p>
        </div>
      </div>
    </header>
  );
}
