import type { MetadataRoute } from "next";
import { defaultSeo } from "@/lib/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: defaultSeo.title,
    short_name: "VNPT Hỗ trợ",
    description: defaultSeo.description,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#0c4a6e",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
