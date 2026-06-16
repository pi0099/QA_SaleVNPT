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
  return getLocalLandingPaths("sim-5g").map((item) => ({
    area: item.area,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { area: string };
}): Metadata {
  const service = getLocalService("sim-5g");
  const area = getLocalArea(params.area);
  if (!service || !area) return {};

  return {
    title: buildLocalLandingTitle(service, area),
    description: buildLocalLandingDescription(service, area),
    alternates: {
      canonical: `/sim-5g/${area.slug}`,
    },
  };
}

export default function Sim5gAreaPage({
  params,
}: {
  params: { area: string };
}) {
  if (!getLocalArea(params.area)) notFound();
  return <LocalServiceLanding serviceSlug="sim-5g" areaSlug={params.area} />;
}
