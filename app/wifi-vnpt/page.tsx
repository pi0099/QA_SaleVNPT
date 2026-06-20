import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Lap WiFi VNPT online tai TP.HCM | Tu van goi phu hop",
  description:
    "Dang ky WiFi VNPT online tai TP.HCM. Tu van goi Internet, WiFi Mesh, truyen hinh va lich lap dat nhanh theo khu vuc.",
  path: "/wifi-vnpt",
});

export default function WifiVnptLandingPage() {
  return <ProductLanding serviceSlug="wifi-vnpt" />;
}
