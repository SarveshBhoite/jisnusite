import type { Metadata } from "next";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "E-Commerce Website Development in Pune | Online Stores | Jisnu Digital",
  description:
    "Build high-converting e-commerce websites in Pune. Custom Next.js storefronts, Shopify, WooCommerce, secure payment gateway integrations, and inventory tools.",
  alternates: {
    canonical: "https://www.jisnudigital.com/ecommerce-development",
  },
  openGraph: {
    title: "E-Commerce Website Development in Pune | Online Stores | Jisnu Digital",
    description:
      "Build high-converting e-commerce websites in Pune. Custom Next.js storefronts, Shopify, WooCommerce, secure payment gateway integrations, and inventory tools.",
    url: "https://www.jisnudigital.com/ecommerce-development",
    type: "website",
  },
};

export default function EcommerceDevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Services", url: "/services" },
          { name: "E-Commerce Development", url: "/ecommerce-development" },
        ]}
      />
      <ServiceJsonLd
        name="E-Commerce Website Development Services in Pune"
        serviceType="E-Commerce Development"
        description="Custom online store development, Shopify, WooCommerce, Next.js headless storefronts, UPI and Razorpay payment gateway integration, and multi-channel inventory management."
        url="https://www.jisnudigital.com/ecommerce-development"
      />
      {children}
    </>
  );
}
