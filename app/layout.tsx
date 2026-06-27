import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { Providers } from "@/app/providers";
import { defaultSeo } from "@/lib/data";
import {
  buildLocalBusinessJsonLd,
  buildOrganizationJsonLd,
} from "@/lib/content/schema";
import { getSiteUrl } from "@/lib/seo";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

const siteUrl = getSiteUrl();
const googleSiteVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const gaId = process.env.NEXT_PUBLIC_GA_ID;
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: defaultSeo.title,
  description: defaultSeo.description,
  keywords: defaultSeo.keywords
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean),
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "/",
    siteName: "Ket Noi Mang HCM",
    title: defaultSeo.title,
    description: defaultSeo.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Dang ky WiFi VNPT, SIM 5G va Camera online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultSeo.title,
    description: defaultSeo.description,
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "/",
  },
  verification: googleSiteVerification
    ? {
        google: googleSiteVerification,
      }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalJsonLd = [buildOrganizationJsonLd(), buildLocalBusinessJsonLd()];

  return (
    <html lang="vi">
      <body className={`${inter.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalJsonLd) }}
        />
        {gtmId ? (
          <Script id="gtm-init" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        ) : null}
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        ) : null}
        {metaPixelId ? (
          <>
            <Script id="meta-pixel-init" strategy="afterInteractive">
              {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
            </Script>
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        ) : null}
        <Providers>
          <SiteHeader />
          <main>{children}</main>
          <Footer />
          <FloatingContact />
        </Providers>
      </body>
    </html>
  );
}
