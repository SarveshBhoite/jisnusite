import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Products & Software Solutions | Jisnu Digital Solutions",
  description:
    "Explore enterprise tools and software built by Jisnu Digital, including My Jisnu Digitals workforce attendance mobile app, CRM, and ERP systems.",
  alternates: {
    canonical: "https://www.jisnudigital.com/products",
  },
  openGraph: {
    title: "Products & Software Solutions | Jisnu Digital Solutions",
    description:
      "Explore enterprise tools and software built by Jisnu Digital, including My Jisnu Digitals workforce attendance mobile app, CRM, and ERP systems.",
    url: "https://www.jisnudigital.com/products",
    type: "website",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Products", url: "/products" }]} />
      {children}
    </>
  );
}
