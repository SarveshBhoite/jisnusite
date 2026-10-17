import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "HTML Site Map | Jisnu Digital Solutions",
  description:
    "Browse an easy-to-navigate index of all services, pages, company directories, and resources on Jisnu Digital Solutions.",
  alternates: {
    canonical: "https://www.jisnudigital.com/site-map",
  },
  openGraph: {
    title: "HTML Site Map | Jisnu Digital Solutions",
    description:
      "Browse an easy-to-navigate index of all services, pages, company directories, and resources on Jisnu Digital Solutions.",
    url: "https://www.jisnudigital.com/site-map",
    type: "website",
  },
};

export default function SiteMapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Site Map", url: "/site-map" }]} />
      {children}
    </>
  );
}
