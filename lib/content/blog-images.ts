import type { PostCategory } from "@/lib/content/types";

export const postCategoryLabels: Record<PostCategory, string> = {
  wifi: "WiFi",
  "sim-5g": "SIM 5G / eSIM",
  camera: "Camera",
  troubleshooting: "Khắc phục sự cố",
  tech: "Công nghệ",
};

/** Reusable blog images — WebP placeholders, rotate by index */
export const blogImages = [
  "/blog/wifi-setup.webp",
  "/blog/sim-5g.webp",
  "/blog/camera-home.webp",
  "/blog/mesh-wifi.webp",
  "/blog/troubleshoot.webp",
  "/blog/internet-tech.webp",
  "/blog/modem-tips.webp",
  "/blog/esim-guide.webp",
  "/blog/speedtest.webp",
  "/blog/home-network.webp",
];

export function getBlogImage(index: number): string {
  return blogImages[index % blogImages.length];
}
