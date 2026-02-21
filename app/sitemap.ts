import type { MetadataRoute } from "next";

const PUBLIC_ROUTES = [
  "",
  "/about",
  "/services",
  "/portfolio",
  "/companies",
  "/companies/list-your-company",
  "/categories",
  "/blog",
  "/contact",
  "/cart",
  "/login",
  "/logout",
  "/site-map",
];

function getBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXTAUTH_URL ||
    "http://localhost:3000"
  ).replace(/\/$/, "");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const now = new Date();

  return PUBLIC_ROUTES.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
