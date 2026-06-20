"use client";

import { useCms } from "@/components/cms/CmsProvider";
import { contactFromSite, siteHasPhone, siteHasZalo } from "@/lib/data";
import { trackLeadEvent } from "@/lib/tracking";

type CtaBoxProps = {
  title?: string;
  description?: string;
  className?: string;
};

export default function CtaBox({
  title = "Cần tư vấn gói phù hợp?",
  description = "Gọi điện hoặc nhắn Zalo để được hỗ trợ nhanh tại Quận 12 và TP.HCM.",
  className = "",
}: CtaBoxProps) {
  const { cms } = useCms();
  const contact = contactFromSite(cms.site);

  return (
    <div
      className={`rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-sky-50 p-5 sm:p-6 ${className}`}
    >
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {siteHasPhone(cms.site) ? (
          <a
            href={contact.phone}
            onClick={() =>
              trackLeadEvent("phone_click", {
                label: "CTA box phone",
                destination: contact.phone,
              })
            }
            className="inline-flex min-h-[44px] items-center rounded-full bg-[#2563eb] px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
          >
            Gọi tư vấn
          </a>
        ) : null}
        {siteHasZalo(cms.site) ? (
          <a
            href={contact.zalo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackLeadEvent("zalo_click", {
                label: "CTA box zalo",
                destination: contact.zalo,
              })
            }
            className="inline-flex min-h-[44px] items-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 hover:border-[#2563eb] hover:text-[#2563eb]"
          >
            Nhắn Zalo
          </a>
        ) : null}
      </div>
    </div>
  );
}
