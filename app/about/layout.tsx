import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "About Us | Best Digital Marketing Agency in Pune | Jisnu Digital",
  description:
    "Learn about Jisnu Digital Solutions, Pune's premier digital marketing and web development agency. Helping businesses grow with SEO, ads, websites, and mobile apps.",
  alternates: {
    canonical: "https://www.jisnudigital.com/about",
  },
  openGraph: {
    title: "About Us | Best Digital Marketing Agency in Pune | Jisnu Digital",
    description:
      "Learn about Jisnu Digital Solutions, Pune's premier digital marketing and web development agency. Helping businesses grow with SEO, ads, websites, and mobile apps.",
    url: "https://www.jisnudigital.com/about",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "About Us", url: "/about" }]} />
      {children}
    </>
  );
}
