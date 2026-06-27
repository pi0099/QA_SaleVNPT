"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCms } from "@/components/cms/CmsProvider";
import { defaultFooterColumns, defaultHeaderSlogan } from "@/lib/cms-store/footer-defaults";
import { defaultSiteSettings } from "@/lib/content/site-settings";
import { contactFromSite, siteHasPhone } from "@/lib/data";
import { trackLeadEvent } from "@/lib/tracking";

const productNavLinks = defaultFooterColumns[0]?.links ?? [];

export default function SiteHeader() {
  const { cms } = useCms();
  const pathname = usePathname();
  const contact = contactFromSite(cms.site);
  const slogan = cms.branding?.headerSlogan ?? defaultHeaderSlogan;
  const logo = cms.branding?.logo ?? defaultSiteSettings.logo;

  const navLinks = [
    ...productNavLinks.filter((l) => !l.href.includes("quan-12")),
    { label: "Blog", href: "/news" },
    { label: "Liên hệ", href: "/lien-he" },
  ];

  return (
    <header className="site-header-fpt sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="group flex min-w-0 shrink items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]"
            aria-label="Về trang chủ"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo}
              alt={defaultSiteSettings.siteName}
              width={200}
              height={40}
              className="h-8 w-auto shrink-0 sm:h-9"
            />
            <span className="hidden min-w-0 text-sm font-semibold leading-snug text-slate-600 sm:block lg:max-w-xs">
              {slogan}
            </span>
          </Link>

          <div className="flex shrink-0 items-center gap-2">
            {siteHasPhone(cms.site) ? (
              <a
                href={contact.phone}
                onClick={() =>
                  trackLeadEvent("phone_click", {
                    label: contact.phoneDisplay || "Header phone",
                    destination: contact.phone,
                  })
                }
                className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800 transition-colors hover:border-[#2563eb] hover:text-[#2563eb] md:inline-flex"
              >
                <span aria-hidden className="text-[#2563eb]">
                  ☎
                </span>
                {contact.phoneDisplay}
              </a>
            ) : null}
            <a
              href="#lead-form-home"
              className="inline-flex min-h-[40px] items-center justify-center rounded-lg bg-[#ea580c] px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#c2410c]"
            >
              Đăng ký ngay
            </a>
          </div>
        </div>
      </div>

      <nav
        className="mx-auto max-w-6xl overflow-x-auto px-4 sm:px-6"
        aria-label="Menu chính"
      >
        <ul className="flex min-w-max items-center gap-1 py-0">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname?.startsWith(`${link.href}/`);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`inline-flex shrink-0 items-center border-b-2 px-3 py-3 text-sm font-semibold transition-colors sm:px-4 ${
                    active
                      ? "border-[#2563eb] text-[#2563eb]"
                      : "border-transparent text-slate-600 hover:border-[#2563eb]/40 hover:text-[#2563eb]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
