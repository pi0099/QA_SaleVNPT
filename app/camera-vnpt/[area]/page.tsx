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
  return getLocalLandingPaths("camera-vnpt").map((item) => ({
    area: item.area,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { area: string };
}): Metadata {
  const service = getLocalService("camera-vnpt");
  const area = getLocalArea(params.area);
  if (!service || !area) return {};

  return {
    title: buildLocalLandingTitle(service, area),
    description: buildLocalLandingDescription(service, area),
    alternates: {
      canonical: `/camera-vnpt/${area.slug}`,
    },
  };
}

export default function CameraVnptAreaPage({
  params,
}: {
  params: { area: string };
}) {
  if (!getLocalArea(params.area)) notFound();
  return <LocalServiceLanding serviceSlug="camera-vnpt" areaSlug={params.area} />;
}
