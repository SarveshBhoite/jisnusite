import React from "react";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
        "@id": "https://www.jisnudigital.com/#organization",
        name: "Jisnu Digital Solutions Pvt. Ltd.",
        alternateName: ["Jisnu Digital", "Jisnu Digital Solutions"],
        url: "https://www.jisnudigital.com",
        logo: {
          "@type": "ImageObject",
          "@id": "https://www.jisnudigital.com/#logo",
          url: "https://www.jisnudigital.com/icon.jpeg",
          caption: "Jisnu Digital Solutions Logo",
        },
        image: "https://www.jisnudigital.com/icon.jpeg",
        description:
          "Best Digital Marketing Agency in Pune. Jisnu Digital Solutions Pvt. Ltd. offers SEO, Social Media Marketing, Google Ads, Mobile Apps, and Website development services.",
        telephone: "+917709936965",
        email: "info.jdsolutions2018@gmail.com",
        priceRange: "₹₹",
        address: {
          "@type": "PostalAddress",
          streetAddress:
            "Office No.545, 5th Floor, Solitaire Business Hub, opp. Ambience Hotel, Vishnu Dev Nagar, Wakad",
          addressLocality: "Pune",
          addressRegion: "Maharashtra",
          postalCode: "411057",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 18.5987,
          longitude: 73.7686,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "09:30",
            closes: "18:30",
          },
        ],
        sameAs: [
          "https://www.facebook.com/profile.php?id=61571480567573",
          "https://x.com/Jisnudigital018",
          "https://www.instagram.com/jisnu_digitalsolution_pvt_ltd/",
          "https://www.linkedin.com/company/jisnu-digital-solution-s-pvt-ltd/?viewAsMember=true",
          "https://wa.me/917709936965",
          "https://play.google.com/store/apps/details?id=com.jisnu.employeeportal",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://www.jisnudigital.com/#website",
        url: "https://www.jisnudigital.com",
        name: "Jisnu Digital Solutions",
        description: "Best Digital Marketing Agency in Pune",
        publisher: {
          "@id": "https://www.jisnudigital.com/#organization",
        },
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.jisnudigital.com",
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        item: item.url.startsWith("http")
          ? item.url
          : `https://www.jisnudigital.com${item.url.startsWith("/") ? "" : "/"}${item.url}`,
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceJsonLd({
  name,
  description,
  url,
  serviceType,
}: {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    serviceType: serviceType || name,
    provider: {
      "@type": "LocalBusiness",
      name: "Jisnu Digital Solutions Pvt. Ltd.",
      url: "https://www.jisnudigital.com",
      telephone: "+917709936965",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Office No.545, 5th Floor, Solitaire Business Hub, opp. Ambience Hotel, Vishnu Dev Nagar, Wakad",
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        postalCode: "411057",
        addressCountry: "IN",
      },
    },
    areaServed: {
      "@type": "City",
      name: "Pune",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
