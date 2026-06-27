/** Khu vực phục vụ — dùng trên trang sản phẩm cho local SEO (không tạo trang riêng). */
import { simU1500KeywordTags } from "@/lib/content/sim-u1500-data";

export const hcmServiceAreaTags = [
  "TP.HCM",
  "Quận 12",
  "Gò Vấp",
  "Tân Bình",
  "Thủ Đức",
  "Bình Tân",
  "Hóc Môn",
  "Nội thành TP.HCM",
  "Ngoại thành TP.HCM",
] as const;

export const serviceAreaTagsBySlug: Record<string, string[]> = {
  "wifi-vnpt": [
    "Lắp WiFi TP.HCM",
    "Internet VNPT Quận 12",
    "WiFi nội thành",
    "WiFi ngoại thành",
    ...hcmServiceAreaTags,
  ],
  "internet-di-dong-vnpt": [
    "Combo WiFi + SIM TP.HCM",
    "Internet gia đình VNPT",
    ...hcmServiceAreaTags,
  ],
  "sim-5g-vnpt": [
    "SIM 5G VNPT TP.HCM",
    "SIM 4G VinaPhone",
    "eSIM VNPT",
    ...hcmServiceAreaTags,
  ],
  "camera-vnpt": [
    "Lắp camera TP.HCM",
    "Camera cloud VNPT",
    ...hcmServiceAreaTags,
  ],
  "sim-u1500-vinaphone": [
    ...simU1500KeywordTags,
    "SIM data 500GB TP.HCM",
    "SIM U1500 VinaPhone",
    "Đăng ký SIM U1500",
    ...hcmServiceAreaTags,
  ],
};

export function getServiceAreaTags(serviceSlug: string): string[] {
  const tags = serviceAreaTagsBySlug[serviceSlug];
  if (tags) return Array.from(new Set(tags));
  return [...hcmServiceAreaTags];
}
