import type { PostCategory } from "@/lib/content/types";

/** Maps blog category to primary service landing page for internal linking */
export const categoryServiceLink: Partial<
  Record<PostCategory, { href: string; label: string }>
> = {
  wifi: { href: "/wifi-vnpt", label: "Lắp WiFi VNPT TP.HCM" },
  "sim-5g": { href: "/sim-5g-vnpt", label: "SIM 5G / 4G VNPT" },
  camera: { href: "/camera-vnpt", label: "Lắp Camera VNPT" },
  troubleshooting: { href: "/wifi-vnpt", label: "Tư vấn WiFi VNPT" },
  tech: { href: "/wifi-vnpt", label: "Dịch vụ VNPT TP.HCM" },
};
