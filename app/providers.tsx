"use client";

import { CmsProvider } from "@/components/cms/CmsProvider";
import SeoHead from "@/components/SeoHead";
import SeoAdminRuntime from "@/components/SeoAdminRuntime";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CmsProvider>
      <SeoHead />
      <SeoAdminRuntime />
      {children}
    </CmsProvider>
  );
}
