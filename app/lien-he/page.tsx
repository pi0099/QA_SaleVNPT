import type { Metadata } from "next";
import ContactPageView from "@/components/ContactPageView";
import {
  buildBreadcrumbJsonLd,
  buildLocalBusinessJsonLd,
} from "@/lib/content/schema";
import { fetchLegacySite, fetchSiteSettings } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Liên hệ tư vấn VNPT — WiFi, SIM 5G, Camera TP.HCM",
  description:
    "Liên hệ nhân viên VNPT khu vực Quận 12 và TP.HCM để được tư vấn gói cước, kiểm tra hạ tầng và đăng ký lắp đặt tận nơi.",
  path: "/lien-he",
  keywords: [
    "lien he VNPT",
    "tu van WiFi VNPT",
    "dang ky VNPT TP.HCM",
    "hotline VNPT Quan 12",
  ],
});

export default async function ContactPage() {
  const [siteSettings, legacySite] = await Promise.all([
    fetchSiteSettings(),
    fetchLegacySite(),
  ]);

  const jsonLd = [
    buildLocalBusinessJsonLd(),
    buildBreadcrumbJsonLd([
      { name: "Trang chủ", path: "/" },
      { name: "Liên hệ", path: "/lien-he" },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactPageView
        siteSettings={siteSettings}
        zaloBaseUrl={legacySite.zalo}
        phoneNumber={legacySite.phoneNumber}
        messengerUrl={legacySite.messenger ?? ""}
      />
    </>
  );
}
