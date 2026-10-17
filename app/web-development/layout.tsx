import type { Metadata } from "next";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Website Development Company in Pune | Custom Web Design | Jisnu Digital",
  description:
    "Custom website development in Pune. Fast, responsive, SEO-ready business websites, corporate web portals, and bespoke web apps by Jisnu Digital Solutions.",
  alternates: {
    canonical: "https://www.jisnudigital.com/web-development",
  },
  openGraph: {
    title: "Website Development Company in Pune | Custom Web Design | Jisnu Digital",
    description:
      "Custom website development in Pune. Fast, responsive, SEO-ready business websites, corporate web portals, and bespoke web apps by Jisnu Digital Solutions.",
    url: "https://www.jisnudigital.com/web-development",
    type: "website",
  },
};

export default function WebDevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Services", url: "/services" },
          { name: "Web Development", url: "/web-development" },
        ]}
      />
      <ServiceJsonLd
        name="Website Development Services in Pune"
        serviceType="Web Development"
        description="Professional website development in Pune, including high-speed corporate websites, custom web applications, e-commerce platforms, and SEO-friendly architectures."
        url="https://www.jisnudigital.com/web-development"
      />
      {children}
    </>
  );
}

