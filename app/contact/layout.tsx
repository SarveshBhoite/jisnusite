import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Contact Us | Digital Agency in Wakad, Pune | Jisnu Digital",
  description:
    "Get in touch with Jisnu Digital Solutions in Wakad, Pune. Contact our expert team for digital marketing, SEO, web development, and branding inquiries or project consultations.",
  alternates: {
    canonical: "https://www.jisnudigital.com/contact",
  },
  openGraph: {
    title: "Contact Us | Digital Agency in Wakad, Pune | Jisnu Digital",
    description:
      "Get in touch with Jisnu Digital Solutions in Wakad, Pune. Contact our expert team for digital marketing, SEO, web development, and branding inquiries.",
    url: "https://www.jisnudigital.com/contact",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Contact Us", url: "/contact" }]} />
      {children}
    </>
  );
}

