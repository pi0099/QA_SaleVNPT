import type { Metadata } from "next";
import type { ReactNode } from "react";
import { adminRobotsMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...adminRobotsMetadata,
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return children;
}
