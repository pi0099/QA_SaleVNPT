"use client";

import { CmsProvider } from "@/components/cms/CmsProvider";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <CmsProvider>{children}</CmsProvider>;
}
