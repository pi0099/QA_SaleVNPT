"use client";

import { useCms } from "@/components/cms/CmsProvider";
import { contactFromSite } from "@/lib/data";

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export default function FloatingContact() {
  const { cms } = useCms();
  const contact = contactFromSite(cms.site);

  return (
    <div
      className="fixed bottom-6 right-4 z-50 flex flex-col items-center gap-3 sm:bottom-8 sm:right-6"
      role="complementary"
      aria-label="Liên hệ nhanh"
    >
      <a
        href={contact.zalo}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 shrink-0 overflow-hidden rounded-2xl shadow-lg ring-2 ring-white/90 transition-transform hover:scale-105 hover:ring-[#0068FF]/35 active:scale-95"
        aria-label="Chat Zalo"
      >
        <img
          src="/zalo-icon.png"
          alt=""
          width={56}
          height={56}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          aria-hidden
        />
      </a>
      <a
        href={contact.phone}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#dc2626] text-white shadow-lg ring-2 ring-white/80 transition-transform hover:scale-105 active:scale-95"
        aria-label={`Gọi ${contact.phoneDisplay}`}
      >
        <PhoneIcon className="h-7 w-7" />
      </a>
    </div>
  );
}
