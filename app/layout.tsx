import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import FloatingContact from "@/components/FloatingContact";
import { Providers } from "@/app/providers";
import { defaultSeo } from "@/lib/data";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ketnoimanghcm.vn";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: defaultSeo.title,
  description: defaultSeo.description,
  keywords: defaultSeo.keywords
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean),
  /** Google Search cần favicon PNG đủ lớn (≥48px), ưu tiên /icon.png trước favicon.ico */
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "1024x1024" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <Header />
          <main>{children}</main>
          <FloatingContact />
        </Providers>
      </body>
    </html>
  );
}
