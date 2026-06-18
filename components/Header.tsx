"use client";

import Image from "next/image";
import Link from "next/link";
import { useCms } from "@/components/cms/CmsProvider";

export default function Header() {
  const { cms } = useCms();
  const { sections } = cms;
  const navLinkBaseClass =
    "inline-flex min-h-[42px] max-w-[10rem] items-center justify-center rounded-full border px-4 text-sm font-semibold shadow-sm backdrop-blur transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] sm:max-w-none";
  const navTintClasses = [
    "border-blue-100 bg-blue-50/80 text-blue-800 shadow-blue-900/5 hover:border-blue-300 hover:bg-blue-100/80",
    "border-cyan-100 bg-cyan-50/80 text-cyan-800 shadow-cyan-900/5 hover:border-cyan-300 hover:bg-cyan-100/80",
    "border-indigo-100 bg-indigo-50/75 text-indigo-800 shadow-indigo-900/5 hover:border-indigo-300 hover:bg-indigo-100/80",
    "border-emerald-100 bg-emerald-50/75 text-emerald-800 shadow-emerald-900/5 hover:border-emerald-300 hover:bg-emerald-100/80",
    "border-amber-100 bg-amber-50/75 text-amber-800 shadow-amber-900/5 hover:border-amber-300 hover:bg-amber-100/80",
    "border-sky-100 bg-sky-50/75 text-sky-800 shadow-sky-900/5 hover:border-sky-300 hover:bg-sky-100/80",
  ];
  const utilityLinkClass =
    "inline-flex min-h-[36px] items-center justify-center rounded-full border border-white/70 bg-white/70 px-4 text-sm font-semibold text-[#1e3a8a] shadow-sm shadow-blue-900/5 transition-colors hover:border-blue-200 hover:bg-white hover:text-[#2563eb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]";

  return (
    <header className="sticky top-0 z-40 border-b border-sky-100/80 bg-gradient-to-r from-white/95 via-sky-50/95 to-blue-50/95 shadow-[0_14px_36px_-30px_rgba(37,99,235,0.55)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 sm:gap-4"
        >
          <Image
            src="/logo-support.svg"
            alt="Logo hỗ trợ đăng ký dịch vụ viễn thông"
            className="h-12 w-auto shrink-0 sm:h-14"
            width={512}
            height={512}
            loading="eager"
            priority
          />
        </Link>

        <nav
          className="flex w-full flex-wrap justify-end gap-2 sm:w-auto sm:gap-3"
          aria-label="Mục chính"
        >
          {sections.map((section, index) => (
            <a
              key={section.id}
              href={`/#${section.id}`}
              className={`${navLinkBaseClass} ${
                navTintClasses[index % navTintClasses.length]
              }`}
            >
              <span className="truncate">{section.title}</span>
            </a>
          ))}
        </nav>
      </div>
      <div className="trust-strip-in border-t border-sky-100/80 bg-gradient-to-r from-blue-50/95 via-cyan-50/90 to-white/95 shadow-[inset_0_-1px_0_0_rgba(14,165,233,0.12)]">
        <div className="mx-auto flex min-h-[46px] max-w-6xl flex-wrap items-center justify-between gap-2.5 px-3 py-2 sm:px-6">
          <div className="flex min-w-0 items-center gap-2.5 text-slate-700">
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
            <div className="min-w-0">
              <p className="trust-strip-main text-[13px] font-semibold leading-5 text-[#1e3a8a] sm:text-sm">
                Nhân viên VNPT hỗ trợ tư vấn &amp; đăng ký dịch vụ tận nơi
              </p>
              <p className="hidden text-[11px] leading-4 text-slate-600 sm:block sm:text-xs">
                Hỗ trợ nhanh chóng - Không mất phí - Không ràng buộc
              </p>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <Link href="/tin-tuc-cong-nghe" className={utilityLinkClass}>
              <span className="truncate">Tin Tức Công Nghệ</span>
            </Link>
            <Link href="/faq" className={utilityLinkClass}>
              <span className="truncate">FAQ</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
