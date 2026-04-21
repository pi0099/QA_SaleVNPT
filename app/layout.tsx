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

export const metadata: Metadata = {
  title: defaultSeo.title,
  description: defaultSeo.description,
  keywords: defaultSeo.keywords
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean),
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
