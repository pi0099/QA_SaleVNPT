import type { Metadata } from "next";
import TechNewsView from "@/components/TechNewsView";

export const metadata: Metadata = {
  title: "Tin Tức Công Nghệ — WiFi, 5G/6G, SIM, Internet vệ tinh",
  description:
    "Cập nhật tin tức công nghệ viễn thông mới nhất: mạng di động 5G/6G, WiFi 7, eSIM/iSIM và internet vệ tinh LEO trên toàn thế giới.",
  keywords: [
    "tin tức công nghệ",
    "5G",
    "6G",
    "WiFi 7",
    "eSIM",
    "internet vệ tinh",
    "Starlink",
    "viễn thông",
  ],
};

export default function TinTucCongNghePage() {
  return <TechNewsView />;
}
