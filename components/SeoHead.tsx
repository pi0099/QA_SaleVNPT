"use client";

import { useCms } from "@/components/cms/CmsProvider";
import { defaultSeo } from "@/lib/data";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function setMetaByName(name: string, content: string) {
  if (typeof document === "undefined") return;
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Applies CMS SEO to the homepage only. Other routes keep their own metadata
 * so Google does not see duplicate titles/descriptions across URLs.
 */
export default function SeoHead() {
  const pathname = usePathname();
  const { cms } = useCms();
  const isHome = pathname === "/";

  const title = cms.seo.title.trim() || defaultSeo.title;
  const description = cms.seo.description.trim() || defaultSeo.description;
  const keywords = cms.seo.keywords.trim() || defaultSeo.keywords;

  useEffect(() => {
    if (!isHome) return;
    document.title = title;
    setMetaByName("description", description);
    setMetaByName("keywords", keywords);
  }, [isHome, title, description, keywords]);

  return null;
}
