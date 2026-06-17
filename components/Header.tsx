"use client";

import Image from "next/image";
import Link from "next/link";
import { useCms } from "@/components/cms/CmsProvider";

export default function Header() {
  const { cms } = useCms();
  const { sections } = cms;
  const navLinkClass =
    "inline-flex min-h-[44px] max-w-[10rem] items-center justify-center rounded-full border border-sky-100 bg-white/75 px-4 text-sm font-semibold text-slate-700 shadow-sm shadow-sky-900/5 backdrop-blur transition-colors hover:border-[#2563eb]/60 hover:bg-blue-50/80 hover:text-[#2563eb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] sm:max-w-none";

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
          <span
            className="min-w-0 border-l border-sky-100 pl-3 sm:pl-4"
            aria-label="WiFi, SIM, Camera"
          >
            <span className="flex flex-wrap items-baseline gap-x-0.5 font-semibold leading-snug tracking-tight text-[13px] sm:text-sm md:text-[15px] lg:text-base">
              <span className="header-tagline-segment rounded-sm px-0.5 py-0.5 sm:px-1.5">
                <span
                  className="mr-1 inline-block text-[1.15em] leading-none opacity-[0.92]"
                  aria-hidden
                >
                  📶
                </span>
                <span className="header-tagline-gradient-text">WiFi</span>
              </span>
              <span className="header-tagline-sep translate-y-px text-[0.95em]" aria-hidden>
                •
              </span>
              <span className="header-tagline-segment rounded-sm px-0.5 py-0.5 sm:px-1.5">
                <span
                  className="mr-1 inline-block text-[1.15em] leading-none opacity-[0.92]"
                  aria-hidden
                >
                  📱
                </span>
                <span className="header-tagline-gradient-text">SIM</span>
              </span>
              <span className="header-tagline-sep translate-y-px text-[0.95em]" aria-hidden>
                •
              </span>
              <span className="header-tagline-segment rounded-sm px-0.5 py-0.5 sm:px-1.5">
                <span
                  className="mr-1 inline-block text-[1.15em] leading-none opacity-[0.92]"
                  aria-hidden
                >
                  📷
                </span>
                <span className="header-tagline-gradient-text">Camera</span>
              </span>
            </span>
          </span>
        </Link>

        <nav
          className="flex w-full flex-wrap justify-end gap-2 sm:w-auto sm:gap-3"
          aria-label="Mục chính"
        >
          <Link
            href="/tin-tuc-cong-nghe"
            className={navLinkClass}
          >
            <span className="truncate">Tin Tức Công Nghệ</span>
          </Link>
          <Link
            href="/faq"
            className={navLinkClass}
          >
            <span className="truncate">FAQ</span>
          </Link>
          {sections.map((section) => (
            <a
              key={section.id}
              href={`/#${section.id}`}
              className={navLinkClass}
            >
              <span className="truncate">{section.title}</span>
            </a>
          ))}
        </nav>
      </div>
      <div className="trust-strip-in border-t border-sky-100/80 bg-gradient-to-r from-blue-50/95 via-cyan-50/90 to-white/95 shadow-[inset_0_-1px_0_0_rgba(14,165,233,0.12)]">
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
