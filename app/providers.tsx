"use client";

import { CmsProvider } from "@/components/cms/CmsProvider";
import SeoAdminRuntime from "@/components/SeoAdminRuntime";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CmsProvider>
      <SeoAdminRuntime />
      {children}
    </CmsProvider>
  );
}
