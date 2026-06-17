import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Lap Camera VNPT online | Tu van camera va luu cloud",
  description:
    "Tu van lap Camera VNPT online cho nha, cua hang va van phong. Goi y camera, luu cloud va goi Internet phu hop.",
  alternates: {
    canonical: "/camera-vnpt",
  },
};

export default function CameraVnptLandingPage() {
  return <ProductLanding serviceSlug="camera-vnpt" />;
}
