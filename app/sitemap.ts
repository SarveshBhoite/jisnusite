import type { MetadataRoute } from "next";

const PUBLIC_ROUTES = [
  "",
  "/about",
  "/services",
  "/web-development",
  "/seo-services",
  "/digital-marketing",
  "/ui-ux-design",
  "/mobile-app-development",
  "/ecommerce-development",
  "/products",
  "/portfolio",
  "/companies/list-your-company",
  "/categories",
  "/blog",
  "/contact",
  "/cart",
  "/site-map",
  "/privacy-policy",
];

function getBaseUrl() {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL;
  if (envUrl && !envUrl.includes("localhost")) {
    return envUrl.replace(/\/$/, "");
  }
  if (process.env.NODE_ENV === "production") {
    return "https://www.jisnudigital.com";
  }
  return (envUrl || "https://www.jisnudigital.com").replace(/\/$/, "");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const now = new Date();

  return PUBLIC_ROUTES.map((route) => {
    let priority = 0.7;
    let changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "weekly";

    if (route === "") {
      priority = 1.0;
      changeFrequency = "daily";
    } else if (route === "/contact") {
      priority = 0.8;
      changeFrequency = "monthly";
    } else if (
      route.startsWith("/services") ||
      route === "/web-development" ||
      route === "/seo-services" ||
      route === "/digital-marketing"
    ) {
      priority = 0.9;
      changeFrequency = "weekly";
    }

    return {
      url: `${baseUrl}${route}`,
      lastModified: now,
      changeFrequency,
      priority,
    };
  });
}
