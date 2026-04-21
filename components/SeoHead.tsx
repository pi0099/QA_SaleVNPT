"use client";

import { useCms } from "@/components/cms/CmsProvider";
import { defaultSeo } from "@/lib/data";
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
 * Applies CMS SEO to document title and meta tags. Server-rendered HTML uses
 * layout defaults; this updates the live page after localStorage loads.
 */
export default function SeoHead() {
  const { cms } = useCms();

  const title = cms.seo.title.trim() || defaultSeo.title;
  const description = cms.seo.description.trim() || defaultSeo.description;
  const keywords = cms.seo.keywords.trim() || defaultSeo.keywords;

  useEffect(() => {
    document.title = title;
    setMetaByName("description", description);
    setMetaByName("keywords", keywords);
  }, [title, description, keywords]);

  return null;
}
