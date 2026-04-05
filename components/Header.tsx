"use client";

import Image from "next/image";
import Link from "next/link";
import { useCms } from "@/components/cms/CmsProvider";

export default function Header() {
  const { cms } = useCms();
  const { site, sections } = cms;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image
            src="/logo.png"
            alt="VNPT"
            width={48}
            height={48}
            className="h-10 w-auto shrink-0 sm:h-12"
            priority
          />
          <span className="truncate text-base font-bold tracking-tight text-slate-900 sm:text-lg">
            {site.name}
          </span>
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
    </header>
  );
}
