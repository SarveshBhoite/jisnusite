import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Digital Growth Blog & Marketing Insights | Jisnu Digital",
  description:
    "Read actionable guides and tips on SEO, digital marketing strategies, web technology, and online business growth from the Jisnu Digital team in Pune.",
  alternates: {
    canonical: "https://www.jisnudigital.com/blog",
  },
  openGraph: {
    title: "Digital Growth Blog & Marketing Insights | Jisnu Digital",
    description:
      "Read actionable guides and tips on SEO, digital marketing strategies, web technology, and online business growth from the Jisnu Digital team in Pune.",
    url: "https://www.jisnudigital.com/blog",
    type: "website",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Blog", url: "/blog" }]} />
      {children}
    </>
  );
}
