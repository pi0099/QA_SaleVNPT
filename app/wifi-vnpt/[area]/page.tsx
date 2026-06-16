import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocalServiceLanding from "@/components/LocalServiceLanding";
import {
  buildLocalLandingDescription,
  buildLocalLandingTitle,
  getLocalArea,
  getLocalLandingPaths,
  getLocalService,
} from "@/lib/local-seo";

export function generateStaticParams() {
  return getLocalLandingPaths("wifi-vnpt").map((item) => ({
    area: item.area,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { area: string };
}): Metadata {
  const service = getLocalService("wifi-vnpt");
  const area = getLocalArea(params.area);
  if (!service || !area) return {};

  return {
    title: buildLocalLandingTitle(service, area),
    description: buildLocalLandingDescription(service, area),
    alternates: {
      canonical: `/wifi-vnpt/${area.slug}`,
    },
  };
}

export default function WifiVnptAreaPage({
  params,
}: {
  params: { area: string };
}) {
  if (!getLocalArea(params.area)) notFound();
  return <LocalServiceLanding serviceSlug="wifi-vnpt" areaSlug={params.area} />;
}
