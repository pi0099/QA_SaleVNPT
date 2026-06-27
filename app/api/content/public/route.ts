import { NextResponse } from "next/server";
import { readCmsStore } from "@/lib/cms-store/server";

/** Public homepage CMS payload from file-backed store. */
export async function GET() {
  const store = await readCmsStore();
  const { legacySite, homepageSeo, sections, siteSettings, homepageBanners } =
    store;

  return NextResponse.json(
    {
      sections,
      homepageBanners,
      site: legacySite,
      seo: homepageSeo,
      siteSettings: {
        siteName: siteSettings.siteName,
        tagline: siteSettings.tagline,
        consultantName: siteSettings.consultantName,
        serviceAreaText: siteSettings.serviceAreaText,
        disclaimer: siteSettings.disclaimer,
        logo: siteSettings.logo,
        headerSlogan: siteSettings.headerSlogan,
        footerColumns: siteSettings.footerColumns,
        copyrightText: siteSettings.copyrightText,
        designByText: siteSettings.designByText,
        designByUrl: siteSettings.designByUrl,
        primaryCtaText: siteSettings.primaryCtaText,
        secondaryCtaText: siteSettings.secondaryCtaText,
      },
      updatedAt: store.updatedAt,
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}

export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}
