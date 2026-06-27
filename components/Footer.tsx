"use client";

import Link from "next/link";
import { useCms } from "@/components/cms/CmsProvider";
import {
  defaultCopyrightText,
  defaultDesignByText,
  defaultDesignByUrl,
  defaultFooterColumns,
} from "@/lib/cms-store/footer-defaults";
import type { FooterColumn } from "@/lib/cms-store/types";
import { defaultSiteSettings } from "@/lib/content/site-settings";
import { supportedAreaNames } from "@/lib/content/local-areas-data";
import { contactFromSite, siteHasPhone } from "@/lib/data";

export default function Footer() {
  const { cms } = useCms();
  const contact = contactFromSite(cms.site);
  const columns: FooterColumn[] =
    cms.branding?.footerColumns ?? defaultFooterColumns;
  const copyrightText =
    cms.branding?.copyrightText ?? defaultCopyrightText;
  const designByText = cms.branding?.designByText ?? defaultDesignByText;
  const designByUrl = cms.branding?.designByUrl ?? defaultDesignByUrl;

  return (
    <footer className="border-t border-slate-200 bg-slate-50/90">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="font-bold text-slate-900">
              {defaultSiteSettings.siteName}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {defaultSiteSettings.consultantName} — {defaultSiteSettings.tagline}
            </p>
            {siteHasPhone(cms.site) ? (
              <p className="mt-2 text-sm text-slate-700">
                <span className="font-semibold">Điện thoại:</span>{" "}
                <a href={contact.phone} className="text-[#2563eb] hover:underline">
                  {contact.phoneDisplay}
                </a>
              </p>
            ) : null}
            <p className="mt-1 text-sm text-slate-600">
              <span className="font-semibold">Khu vực:</span>{" "}
              {supportedAreaNames.slice(0, 6).join(", ")}
              {supportedAreaNames.length > 6 ? "…" : ""}
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-bold text-slate-900">{col.title}</p>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={`${col.title}-${link.href}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 hover:text-[#2563eb]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs leading-relaxed text-slate-500">
          {defaultSiteSettings.disclaimer}
        </p>

        <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-slate-200 pt-4 text-center text-[13px] text-slate-500 sm:flex-row sm:text-left">
          <p>{copyrightText}</p>
          <p>
            Design By{" "}
            <a
              href={designByUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-slate-700 underline decoration-slate-300 underline-offset-2 hover:text-sky-700"
            >
              {designByText}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
