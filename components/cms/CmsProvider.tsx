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
  getCmsPayload,
  type CmsPayload,
} from "@/lib/cms-storage";

type CmsContextValue = {
  cms: CmsPayload;
  reload: () => void;
};

const CmsContext = createContext<CmsContextValue | null>(null);

export function CmsProvider({ children }: { children: ReactNode }) {
  const [cms, setCms] = useState<CmsPayload>(() => getCmsPayload());

  const reload = useCallback(() => {
    setCms(getCmsPayload());
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === null || e.key === CMS_STORAGE_KEY) reload();
    };
    const onCustom = () => reload();
    window.addEventListener("storage", onStorage);
    window.addEventListener("vnpt-cms-update", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("vnpt-cms-update", onCustom);
    };
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
