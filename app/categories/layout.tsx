import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Business Categories Directory | Jisnu Digital Solutions",
  description:
    "Explore our comprehensive business directory by category: Real Estate, Manufacturing, Healthcare, Education, Hospitality, and more.",
  alternates: {
    canonical: "https://www.jisnudigital.com/categories",
  },
  openGraph: {
    title: "Business Categories Directory | Jisnu Digital Solutions",
    description:
      "Explore our comprehensive business directory by category: Real Estate, Manufacturing, Healthcare, Education, Hospitality, and more.",
    url: "https://www.jisnudigital.com/categories",
    type: "website",
  },
};

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Categories", url: "/categories" }]} />
      {children}
    </>
  );
}
