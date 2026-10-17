import type { Metadata } from "next";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "UI/UX Design Agency in Pune | Modern Web & App Design | Jisnu Digital",
  description:
    "Intuitive, modern UI/UX design services in Pune. Figma prototypes, design systems, ergonomic mobile interfaces, and conversion-focused user experiences.",
  alternates: {
    canonical: "https://www.jisnudigital.com/ui-ux-design",
  },
  openGraph: {
    title: "UI/UX Design Agency in Pune | Modern Web & App Design | Jisnu Digital",
    description:
      "Intuitive, modern UI/UX design services in Pune. Figma prototypes, design systems, ergonomic mobile interfaces, and conversion-focused user experiences.",
    url: "https://www.jisnudigital.com/ui-ux-design",
    type: "website",
  },
};

export default function UiUxDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Services", url: "/services" },
          { name: "UI/UX Design", url: "/ui-ux-design" },
        ]}
      />
      <ServiceJsonLd
        name="UI/UX Design Services in Pune"
        serviceType="User Interface and User Experience Design"
        description="User-centered UI/UX design, interactive wireframes, clickable Figma prototypes, comprehensive design system creation, and usability audits."
        url="https://www.jisnudigital.com/ui-ux-design"
      />
      {children}
    </>
  );
}
