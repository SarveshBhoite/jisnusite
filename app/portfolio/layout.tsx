import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies | Proven Results | Jisnu Digital",
  description:
    "Explore proven client results, performance marketing case studies, mobile apps, and custom web development delivered by Jisnu Digital Solutions in Pune.",
  alternates: {
    canonical: "https://www.jisnudigital.com/portfolio",
  },
  openGraph: {
    title: "Portfolio & Case Studies | Proven Results | Jisnu Digital",
    description:
      "Explore proven client results, performance marketing case studies, mobile apps, and custom web development delivered by Jisnu Digital Solutions in Pune.",
    url: "https://www.jisnudigital.com/portfolio",
    type: "website",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Portfolio", url: "/portfolio" }]} />
      {children}
    </>
  );
}
