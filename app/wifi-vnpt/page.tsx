import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Lap WiFi VNPT online tai TP.HCM | Tu van goi phu hop",
  description:
    "Dang ky WiFi VNPT online tai TP.HCM. Tu van goi Internet, WiFi Mesh, truyen hinh va lich lap dat nhanh theo khu vuc.",
  alternates: {
    canonical: "/wifi-vnpt",
  },
};

export default function WifiVnptLandingPage() {
  return <ProductLanding serviceSlug="wifi-vnpt" />;
}
