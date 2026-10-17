import type { Metadata } from "next";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Digital Marketing Services in Pune | Meta & Google Ads | Jisnu Digital",
  description:
    "Scale your business with expert digital marketing services in Pune. High-ROI Meta Ads, Google PPC campaigns, social media marketing, and lead generation funnels.",
  alternates: {
    canonical: "https://www.jisnudigital.com/digital-marketing",
  },
  openGraph: {
    title: "Digital Marketing Services in Pune | Meta & Google Ads | Jisnu Digital",
    description:
      "Scale your business with expert digital marketing services in Pune. High-ROI Meta Ads, Google PPC campaigns, social media marketing, and lead generation funnels.",
    url: "https://www.jisnudigital.com/digital-marketing",
    type: "website",
  },
};

export default function DigitalMarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Services", url: "/services" },
          { name: "Digital Marketing", url: "/digital-marketing" },
        ]}
      />
      <ServiceJsonLd
        name="Digital Marketing Services in Pune"
        serviceType="Digital Marketing & Performance Advertising"
        description="Full-service digital marketing agency in Pune offering performance marketing, Meta Ads, Google Ads PPC, social media marketing (SMM), and conversion-optimized lead generation funnels."
        url="https://www.jisnudigital.com/digital-marketing"
      />
      {children}
    </>
  );
}
