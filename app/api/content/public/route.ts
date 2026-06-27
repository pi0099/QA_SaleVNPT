import { NextResponse } from "next/server";
import { buildPublicSiteContact } from "@/lib/cms-store/public-contact";
import { readCmsStore } from "@/lib/cms-store/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_STORE_HEADERS = {
  "Cache-Control": "private, no-store, max-age=0, must-revalidate",
  "CDN-Cache-Control": "no-store",
  "Vercel-CDN-Cache-Control": "no-store",
};

/** Public homepage CMS payload from Blob/file store. */
export async function GET() {
  const store = await readCmsStore();
  const { homepageSeo, sections, siteSettings, homepageBanners } = store;
  const site = buildPublicSiteContact(store);

  return NextResponse.json(
    {
      sections,
      homepageBanners,
      site,
      seo: homepageSeo,
      siteSettings: {
        siteName: siteSettings.siteName,
        tagline: siteSettings.tagline,
        phone: siteSettings.phone,
        zaloUrl: siteSettings.zaloUrl,
        messengerUrl: siteSettings.messengerUrl,
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
    { headers: NO_STORE_HEADERS },
  );
}

export async function HEAD() {
  return new NextResponse(null, { status: 200, headers: NO_STORE_HEADERS });
}
