import { NextResponse } from "next/server";
import { defaultSections, defaultSeo, site } from "@/lib/data";
import { siteSettings } from "@/data/siteSettings";

/** Public homepage CMS payload — packages always from lib/data.ts (production). */
export async function GET() {
  return NextResponse.json({
    sections: defaultSections,
    site,
    seo: defaultSeo,
    siteSettings: {
      siteName: siteSettings.siteName,
      tagline: siteSettings.tagline,
      consultantName: siteSettings.consultantName,
      serviceAreaText: siteSettings.serviceAreaText,
      disclaimer: siteSettings.disclaimer,
      primaryCtaText: "Gửi thông tin tư vấn",
      secondaryCtaText: "Gọi tư vấn miễn phí",
    },
    updatedAt: new Date().toISOString(),
  });
}

export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}
