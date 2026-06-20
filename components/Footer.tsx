"use client";

import Link from "next/link";
import { defaultSiteSettings } from "@/lib/content/site-settings";
import { supportedAreaNames } from "@/lib/content/local-areas-data";
import { useCms } from "@/components/cms/CmsProvider";
import { contactFromSite, siteHasPhone } from "@/lib/data";

const serviceLinks = [
  { href: "/wifi-vnpt", label: "WiFi VNPT" },
  { href: "/internet-di-dong-vnpt", label: "Internet + Di động" },
  { href: "/sim-5g-vnpt", label: "SIM 5G VNPT" },
  { href: "/camera-vnpt", label: "Camera VNPT" },
  { href: "/wifi-vnpt-quan-12", label: "WiFi Quận 12" },
  { href: "/faq", label: "FAQ" },
  { href: "/news", label: "Tin tức" },
];

export default function Footer() {
  const { cms } = useCms();
  const contact = contactFromSite(cms.site);

  return (
    <footer className="border-t border-slate-200 bg-slate-50/90">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-bold text-slate-900">
              Tư vấn đăng ký dịch vụ VNPT khu vực Quận 12 và TP.HCM
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
              <span className="font-semibold">Khu vực phục vụ:</span>{" "}
              {defaultSiteSettings.serviceAreaText}
            </p>
          </div>

          <div>
            <p className="font-bold text-slate-900">Liên kết nội bộ</p>
            <ul className="mt-3 space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
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

          <div>
            <p className="font-bold text-slate-900">Khu vực hỗ trợ</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {supportedAreaNames.join(", ")}
            </p>
            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              {defaultSiteSettings.disclaimer}
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-4 text-center text-[13px] text-slate-500">
          <p>
            Designed &amp; Developed by{" "}
            <a
              href="https://quyentech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-slate-700 underline decoration-slate-300 underline-offset-2 hover:text-sky-700"
            >
              QUYEN TECH
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
