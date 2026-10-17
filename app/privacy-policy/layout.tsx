import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Privacy Policy | Jisnu Digital Solutions",
  description:
    "Learn how Jisnu Digital Solutions collects, handles, protects, and respects your privacy and personal data.",
  alternates: {
    canonical: "https://www.jisnudigital.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Jisnu Digital Solutions",
    description:
      "Learn how Jisnu Digital Solutions collects, handles, protects, and respects your privacy and personal data.",
    url: "https://www.jisnudigital.com/privacy-policy",
    type: "website",
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "Privacy Policy", url: "/privacy-policy" }]}
      />
      {children}
    </>
  );
}
