import type { FooterColumn } from "@/lib/cms-store/types";

export const defaultFooterColumns: FooterColumn[] = [
  {
    title: "Sản phẩm",
    links: [
      { label: "WiFi VNPT", href: "/wifi-vnpt" },
      { label: "Internet + Di động", href: "/internet-di-dong-vnpt" },
      { label: "SIM 5G VNPT", href: "/sim-5g-vnpt" },
      { label: "SIM U1500 500GB", href: "/sim-u1500-vinaphone" },
      { label: "Camera VNPT", href: "/camera-vnpt" },
    ],
  },
  {
    title: "Nội dung",
    links: [
      { label: "Blog", href: "/news" },
      { label: "FAQ", href: "/faq" },
      { label: "Liên hệ", href: "/lien-he" },
    ],
  },
  {
    title: "Khu vực",
    links: [
      { label: "WiFi TP.HCM", href: "/wifi-vnpt#khu-vuc-phuc-vu" },
      { label: "Trang chủ", href: "/" },
    ],
  },
];

export const defaultHeaderSlogan =
  "HCM - Tư vấn các sản phẩm VNPT cùng các khuyến mãi mới nhất, rẻ nhất, phù hợp nhất với bạn";

/** Previous default — migrate persisted CMS copies on read */
export const legacyHeaderSlogan =
  "Tư vấn & lắp đặt tận nơi — Quận 12, TP.HCM";

export const defaultCopyrightText =
  "Copyright © Ket Noi Mang HCM. All rights reserved.";

export const defaultDesignByText = "QUYEN TECH";
export const defaultDesignByUrl = "https://quyentech.com";
