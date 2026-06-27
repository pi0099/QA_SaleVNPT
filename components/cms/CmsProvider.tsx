"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CMS_STORAGE_KEY,
  getDefaultCmsPayload,
  type CmsPayload,
} from "@/lib/cms-storage";

type CmsContextValue = {
  cms: CmsPayload;
  reload: () => void;
};

const CmsContext = createContext<CmsContextValue | null>(null);

async function fetchPublicCms(): Promise<CmsPayload | null> {
  try {
    const res = await fetch("/api/content/public", { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      sections: data.sections,
      site: data.site,
      seo: data.seo,
      branding: {
        headerSlogan: data.siteSettings?.headerSlogan,
        footerColumns: data.siteSettings?.footerColumns,
        copyrightText: data.siteSettings?.copyrightText,
        designByText: data.siteSettings?.designByText,
        designByUrl: data.siteSettings?.designByUrl,
        logo: data.siteSettings?.logo,
      },
    };
  } catch {
    return null;
  }
}

export function CmsProvider({ children }: { children: ReactNode }) {
  const [cms, setCms] = useState<CmsPayload>(() => getDefaultCmsPayload());

  const reload = useCallback(async () => {
    const fromApi = await fetchPublicCms();
    if (fromApi) {
      setCms(fromApi);
      return;
    }
    if (typeof window !== "undefined") {
      try {
        const raw = window.localStorage.getItem(CMS_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as CmsPayload;
          setCms(parsed);
          return;
        }
      } catch {
        // ignore
      }
    }
    setCms(getDefaultCmsPayload());
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  useEffect(() => {
    const onCustom = () => {
      void reload();
    };
    window.addEventListener("vnpt-cms-update", onCustom);
    return () => window.removeEventListener("vnpt-cms-update", onCustom);
  }, [reload]);

  const value = useMemo(() => ({ cms, reload }), [cms, reload]);

  return (
    <CmsContext.Provider value={value}>{children}</CmsContext.Provider>
  );
}

export function useCms() {
  const ctx = useContext(CmsContext);
  if (!ctx) {
    throw new Error("useCms must be used within CmsProvider");
  }
  return ctx;
}

export function notifyCmsUpdated() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("vnpt-cms-update"));
}
