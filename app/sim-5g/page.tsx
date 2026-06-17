import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Dang ky SIM 5G VNPT online | Tu van goi data phu hop",
  description:
    "Tu van va dang ky SIM 5G VNPT online. Goi data, eSIM, SIM vat ly cho hoc tap, lam viec, livestream va di chuyen.",
  alternates: {
    canonical: "/sim-5g",
  },
};

export default function Sim5gLandingPage() {
  return <ProductLanding serviceSlug="sim-5g" />;
}
