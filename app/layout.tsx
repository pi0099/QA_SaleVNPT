import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import FloatingContact from "@/components/FloatingContact";
import { Providers } from "@/app/providers";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "VNPT / FPT Telecom — WiFi tốc độ cao",
  description:
    "Lắp WiFi tốc độ cao, SIM 4G, Camera — giá rõ ràng, lắp nhanh trong 24h.",
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
