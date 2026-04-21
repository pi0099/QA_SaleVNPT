"use client";

import { CmsProvider } from "@/components/cms/CmsProvider";
import SeoHead from "@/components/SeoHead";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CmsProvider>
      <SeoHead />
      {children}
    </CmsProvider>
  );
}
