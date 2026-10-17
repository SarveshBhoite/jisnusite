import type { MetadataRoute } from "next";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/Blog";

const PRODUCTION_SITE_URL = "https://www.jisnudigital.com";

const STATIC_CANONICAL_ROUTES: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "", priority: 1.0, changeFrequency: "daily" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "weekly" },
  { path: "/web-development", priority: 0.9, changeFrequency: "weekly" },
  { path: "/seo-services", priority: 0.9, changeFrequency: "weekly" },
  { path: "/digital-marketing", priority: 0.9, changeFrequency: "weekly" },
  { path: "/ui-ux-design", priority: 0.9, changeFrequency: "weekly" },
  { path: "/mobile-app-development", priority: 0.9, changeFrequency: "weekly" },
  { path: "/ecommerce-development", priority: 0.9, changeFrequency: "weekly" },
  { path: "/portfolio", priority: 0.9, changeFrequency: "weekly" },
  { path: "/products", priority: 0.8, changeFrequency: "monthly" },
  { path: "/categories", priority: 0.8, changeFrequency: "weekly" },
  { path: "/companies", priority: 0.8, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.8, changeFrequency: "daily" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.5, changeFrequency: "yearly" },
  { path: "/site-map", priority: 0.6, changeFrequency: "monthly" },
  // Industry Solutions
  { path: "/industry/real-estate", priority: 0.8, changeFrequency: "monthly" },
  { path: "/industry/manufacturing", priority: 0.8, changeFrequency: "monthly" },
  { path: "/industry/education", priority: 0.8, changeFrequency: "monthly" },
  { path: "/industry/hotels-restaurants", priority: 0.8, changeFrequency: "monthly" },
];

function getBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl && envUrl.includes("jisnudigital.com")) {
    return envUrl.replace(/\/$/, "");
  }
  return PRODUCTION_SITE_URL;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const now = new Date();

  const entries: MetadataRoute.Sitemap = STATIC_CANONICAL_ROUTES.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Append dynamic published blog posts if available
  try {
    await dbConnect();
    const posts = await Blog.find({}, { slug: 1, updatedAt: 1 })
      .sort({ createdAt: -1 })
      .lean();

    if (Array.isArray(posts)) {
      for (const post of posts) {
        if (post?.slug) {
          entries.push({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: post.updatedAt ? new Date(post.updatedAt) : now,
            changeFrequency: "weekly",
            priority: 0.7,
          });
        }
      }
    }
  } catch (error) {
    // If DB is offline during build, static routes are still fully preserved
    console.warn("Sitemap: Dynamic blog generation skipped:", error);
  }

  return entries;
}

