import type { Metadata } from "next";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Best SEO Services in Pune | Top SEO Agency | Jisnu Digital",
  description:
    "Rank #1 on Google with professional SEO services in Pune by Jisnu Digital. Technical SEO, on-page optimization, local GMB SEO, and high-authority link building.",
  alternates: {
    canonical: "https://www.jisnudigital.com/seo-services",
  },
  openGraph: {
    title: "Best SEO Services in Pune | Top SEO Agency | Jisnu Digital",
    description:
      "Rank #1 on Google with professional SEO services in Pune by Jisnu Digital. Technical SEO, on-page optimization, local GMB SEO, and high-authority link building.",
    url: "https://www.jisnudigital.com/seo-services",
    type: "website",
  },
};

export default function SeoServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Services", url: "/services" },
          { name: "SEO Services", url: "/seo-services" },
        ]}
      />
      <ServiceJsonLd
        name="SEO Services in Pune"
        serviceType="Search Engine Optimization"
        description="Comprehensive search engine optimization services including technical SEO audits, on-page optimization, high-authority link building, and local Google Business Profile optimization."
        url="https://www.jisnudigital.com/seo-services"
      />
      {children}
    </>
  );
}
