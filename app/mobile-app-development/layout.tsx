import type { Metadata } from "next";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Mobile App Development Company in Pune | Android & iOS | Jisnu Digital",
  description:
    "Custom iOS and Android mobile app development in Pune. High-performance native Swift/Kotlin and cross-platform Flutter and React Native apps by Jisnu Digital.",
  alternates: {
    canonical: "https://www.jisnudigital.com/mobile-app-development",
  },
  openGraph: {
    title: "Mobile App Development Company in Pune | Android & iOS | Jisnu Digital",
    description:
      "Custom iOS and Android mobile app development in Pune. High-performance native Swift/Kotlin and cross-platform Flutter and React Native apps by Jisnu Digital.",
    url: "https://www.jisnudigital.com/mobile-app-development",
    type: "website",
  },
};

export default function MobileAppDevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Services", url: "/services" },
          { name: "Mobile App Development", url: "/mobile-app-development" },
        ]}
      />
      <ServiceJsonLd
        name="Mobile App Development Services in Pune"
        serviceType="Mobile Application Development"
        description="End-to-end mobile app engineering in Pune for iOS and Android platforms, including Flutter, React Native, native Kotlin/Swift, and app store deployment."
        url="https://www.jisnudigital.com/mobile-app-development"
      />
      {children}
    </>
  );
}
