"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  getSeoAdminPayload,
  recordPageView,
} from "@/lib/seo-admin-storage";

function injectScript(id: string, src: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function injectInlineScript(id: string, content: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.text = content;
  document.head.appendChild(script);
}

export default function SeoAdminRuntime() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;
    recordPageView(pathname, document.title, document.referrer);
  }, [pathname]);

  useEffect(() => {
    const config = getSeoAdminPayload();
    const gtmId = config.google.googleTagManagerId.trim();
    const gaId = config.google.googleAnalyticsId.trim();
    const conversionId = config.ads.conversionId.trim();

    if (gtmId) {
      injectInlineScript(
        "seo-admin-gtm-init",
        `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`,
      );
    }

    if (gaId) {
      injectScript(
        "seo-admin-gtag-js",
        `https://www.googletagmanager.com/gtag/js?id=${gaId}`,
      );
      injectInlineScript(
        "seo-admin-gtag-init",
        `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`,
      );
    }

    if (config.ads.enabled && conversionId) {
      injectScript(
        "seo-admin-ads-gtag-js",
        `https://www.googletagmanager.com/gtag/js?id=${conversionId}`,
      );
      injectInlineScript(
        "seo-admin-ads-init",
        `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${conversionId}');`,
      );
    }
  }, []);

  return null;
}
