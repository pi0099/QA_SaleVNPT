"use client";

import Link from "next/link";
import { useCms } from "@/components/cms/CmsProvider";

export default function Header() {
  const { cms } = useCms();
  const { sections } = cms;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <img
            src="/logo-support.svg"
            alt="VNPT Support - Ho tro dang ky dich vu"
            className="h-11 w-auto shrink-0 sm:h-12"
            loading="eager"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src.endsWith("/logo.png")) return;
              target.src = "/logo.png";
            }}
          />
        </Link>

        <nav
          className="flex w-full flex-wrap justify-end gap-2 sm:w-auto sm:gap-3"
          aria-label="Mục chính"
        >
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="inline-flex min-h-[44px] max-w-[10rem] items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-[#2563eb] hover:text-[#2563eb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] sm:max-w-none"
            >
              <span className="truncate">{section.title}</span>
            </a>
          ))}
        </nav>
      </div>
      <div className="trust-strip-in border-t border-sky-100/80 bg-gradient-to-r from-[#eef5ff] via-[#f6faff] to-white shadow-[inset_0_-1px_0_0_rgba(148,163,184,0.2)]">
        <div className="mx-auto flex min-h-[46px] max-w-6xl items-center gap-2.5 px-3 py-2 sm:px-6">
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
          <div className="min-w-0 text-slate-700">
            <p className="trust-strip-main text-[13px] font-semibold leading-5 text-[#1e3a8a] sm:text-sm">
              Nhân viên VNPT hỗ trợ tư vấn &amp; đăng ký dịch vụ tận nơi
            </p>
            <p className="hidden text-[11px] leading-4 text-slate-600 sm:block sm:text-xs">
              Hỗ trợ nhanh chóng - Không mất phí - Không ràng buộc
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
