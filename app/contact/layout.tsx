import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Jisnu Digital Solutions",
  description:
    "Get in touch with Jisnu Digital Solutions in Pune. Contact our expert team for digital marketing, SEO, web development, and branding inquiries or project consultations.",
  alternates: {
    canonical: "https://www.jisnudigital.com/contact",
  },
  openGraph: {
    title: "Contact Us | Jisnu Digital Solutions",
    description:
      "Get in touch with Jisnu Digital Solutions in Pune. Contact our expert team for digital marketing, SEO, web development, and branding inquiries.",
    url: "https://www.jisnudigital.com/contact",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
