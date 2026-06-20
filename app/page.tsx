import type { Metadata } from "next";
import HomeView from "@/components/HomeView";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Tư vấn đăng ký WiFi, SIM 5G, Camera VNPT tại TP.HCM",
  description:
    "Nhân viên VNPT hỗ trợ tư vấn gói cước, kiểm tra hạ tầng và lắp đặt tận nơi khu vực Quận 12 và nội thành TP.HCM.",
  path: "/",
});

export default function Home() {
  return <HomeView />;
}
