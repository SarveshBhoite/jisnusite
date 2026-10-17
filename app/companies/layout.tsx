import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Verified Business Directory | Jisnu Digital Solutions",
  description:
    "Discover verified local companies, manufacturers, and service providers across Pune and India on the Jisnu Digital business directory.",
  alternates: {
    canonical: "https://www.jisnudigital.com/companies",
  },
  openGraph: {
    title: "Verified Business Directory | Jisnu Digital Solutions",
    description:
      "Discover verified local companies, manufacturers, and service providers across Pune and India on the Jisnu Digital business directory.",
    url: "https://www.jisnudigital.com/companies",
    type: "website",
  },
};

export default function CompaniesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Companies", url: "/companies" }]} />
      {children}
    </>
  );
}
