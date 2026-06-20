import { site as legacySite, defaultSeo } from "@/lib/data";
import type { SiteSettings } from "@/lib/content/types";

/** Static site branding — phone/Zalo synced from production lib/data.site */
export const siteSettings: SiteSettings = {
  siteName: "Tư vấn đăng ký VNPT TP.HCM",
  tagline:
    "Nhân viên VNPT hỗ trợ tư vấn gói cước, kiểm tra hạ tầng và đăng ký lắp đặt tận nơi",
  phone: legacySite.phoneNumber,
  zaloUrl: legacySite.zalo,
  messengerUrl: legacySite.messenger ?? "",
  consultantName: "Nhân viên VNPT",
  serviceAreaText: "Quận 12 và các quận nội thành TP.HCM",
  disclaimer:
    "Website tư vấn đăng ký dịch vụ, không phải cổng thông tin chính thức toàn quốc của VNPT.",
  addressText: "Khu vực Quận 12, TP.HCM",
  ogImage: "/opengraph-image",
  logo: "/logo.svg",
};

export { legacySite, defaultSeo as homepageSeo };
