import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Digital Marketing & Web Development Services in Pune | Jisnu Digital",
  description:
    "From high-performance websites and mobile applications to SEO and digital marketing, Jisnu Digital delivers modern digital solutions designed to help businesses build a stronger online presence and achieve sustainable growth.",
  alternates: {
    canonical: "https://www.jisnudigital.com/services",
  },
  openGraph: {
    title: "Digital Marketing & Web Development Services in Pune | Jisnu Digital",
    description:
      "From high-performance websites and mobile applications to SEO and digital marketing, Jisnu Digital delivers modern digital solutions designed to help businesses build a stronger online presence and achieve sustainable growth.",
    url: "https://www.jisnudigital.com/services",
    type: "website",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Services", url: "/services" }]} />
      {children}
    </>
  );
}

