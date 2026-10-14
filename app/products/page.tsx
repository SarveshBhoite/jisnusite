"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Smartphone,
  Globe,
  Database,
  BarChart,
  ShieldCheck,
  Star,
  Search,
  Layers,
  Layout,
  ExternalLink,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  icon: any;
  features: string[];
  techStack: string[];
  badge?: string;
  href: string;
}

const products: Product[] = [
  {
    id: "my-jisnu-digitals",
    name: "My Jisnu Digitals",
    category: "Mobile Apps",
    tagline: "Smart employee attendance, daily task & workforce management app",
    description:
      "Our official Google Play Store mobile application for workforce operations. Track employee attendance with punch-in/punch-out, assign daily tasks, submit work reports, and manage leave requests in real-time.",
    icon: Smartphone,
    badge: "Play Store App",
    features: [
      "Real-time Geo Punch-In & Punch-Out attendance tracking",
      "Daily task assignment, progress monitoring & report submission",
      "Employee leave application, WFH requests & query ticketing",
      "Centralized admin management & attendance analytics",
    ],
    techStack: ["Android", "Google Play Store", "Mobile App", "Cloud Backend"],
    href: "https://play.google.com/store/apps/details?id=com.jisnu.employeeportal",
  },
  {
    id: "crm",
    name: "CRM System",
    category: "SaaS Solutions",
    tagline: "Centralized client & lead management platform",
    description:
      "Manage client leads, track sales pipelines, automate follow-ups, and generate business performance reports in one unified dashboard.",
    icon: BarChart,
    badge: "Popular",
    features: [
      "Automated lead capture from web forms & ads",
      "Role-based access control (Admin, Manager, Employee)",
      "Real-time pipeline analytics & revenue forecasting",
      "Custom invoice generator & payment status tracking",
    ],
    techStack: ["React", "TypeScript", "Express", "PostgreSQL", "Recharts"],
    href: "https://crm.jisnudigital.com/",
  },
  {
    id: "erp",
    name: "ERP System",
    category: "Enterprise Software",
    tagline: "Integrated enterprise resource planning suite",
    description:
      "Streamline operations, inventory, multi-warehouse logistics, financial reporting, and employee management in one robust platform.",
    icon: Database,
    badge: "Enterprise",
    features: [
      "Multi-warehouse inventory & stock sync",
      "Financial accounting & automated billing",
      "Supply chain tracking & purchase order automation",
      "Detailed custom reporting & role permissions",
    ],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Docker", "Tailwind CSS"],
    href: "/contact",
  },
  {
    id: "application",
    name: "Web & Mobile Applications",
    category: "Custom Software",
    tagline: "High-performance web and native mobile application suite",
    description:
      "Custom web platforms, mobile apps for Android & iOS, and scalable cloud solutions engineered specifically for your business workflow.",
    icon: Smartphone,
    badge: "Featured",
    features: [
      "Cross-platform iOS & Android mobile apps",
      "Sub-second Next.js web application rendering",
      "Real-time push notifications & live data sync",
      "Scalable API architecture & cloud hosting setup",
    ],
    techStack: ["Next.js", "React Native", "Node.js", "MongoDB"],
    href: "/web-development",
  },
  {
    id: "jisnu-ecommerce",
    name: "Jisnu Storefront Engine",
    category: "E-Commerce",
    tagline: "High-conversion headless e-commerce store solution",
    description:
      "A fast, modern e-commerce storefront template integrated with payment gateways, SKU inventory management, WhatsApp cart alerts, and dynamic product filtering.",
    icon: ShoppingBag,
    features: [
      "Sub-second page loading speed",
      "Integrated Razorpay, Stripe & UPI payment gateways",
      "Real-time order tracking & WhatsApp notifications",
      "SEO optimized product catalog & schema markup",
    ],
    techStack: ["Next.js", "React", "Node.js", "MongoDB", "Tailwind CSS"],
    href: "/ecommerce-development",
  },
  {
    id: "jisnu-cms",
    name: "Jisnu Dynamic CMS",
    category: "Web Applications",
    tagline: "Custom headless CMS for multi-brand content management",
    description:
      "Empower marketing teams to update site content, publish blogs, handle media assets, and manage SEO meta data without developer assistance.",
    icon: Layout,
    features: [
      "Visual page builder with drag-and-drop support",
      "Cloudinary media gallery with image auto-optimization",
      "Multi-author blog workflow with draft states",
      "Instant cache purging & CDN publishing",
    ],
    techStack: ["Next.js", "Headless CMS", "Cloudinary", "GraphQL"],
    href: "/web-development",
  },
  {
    id: "jisnu-marketing-hub",
    name: "Jisnu Marketing & SEO Automator",
    category: "Digital Marketing",
    tagline: "Automated SEO tracking & campaign analytics dashboard",
    description:
      "Track Google organic keyword rankings, monitor conversion funnels, manage social media ad spends, and measure ROI across channels.",
    icon: Zap,
    features: [
      "Automated rank tracker & Google Search Console sync",
      "Competitor audit & keyword gap finder",
      "Social media post scheduler & analytics",
      "Monthly white-label client PDF report generator",
    ],
    techStack: ["Python", "React", "Google Cloud", "Tailwind CSS"],
    href: "/seo-services",
  },
  {
    id: "jisnu-portal",
    name: "Jisnu Directory & Portal Engine",
    category: "Web Applications",
    tagline: "Scalable B2B business listing & directory platform",
    description:
      "Complete solution for localized company directories, listing management, verified business reviews, location search, and lead generation.",
    icon: Globe,
    badge: "Featured",
    features: [
      "Location & category based elastic search",
      "Verified business profile claim flow",
      "Customer reviews & rating moderation system",
      "Direct quote request routing to listed vendors",
    ],
    techStack: ["Next.js", "Prisma", "PostgreSQL", "Mapbox API"],
    href: "/companies",
  },
];

const categories = [
  "All",
  "E-Commerce",
  "SaaS Solutions",
  "Mobile Apps",
  "Web Applications",
  "Digital Marketing",
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="pt-28 pb-20 bg-slate-50 min-h-screen">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100/80 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-cyan-600" />
            Software Solutions & Products
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Powerful Digital Products Designed for{" "}
            <span className="text-cyan-600">Business Growth</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            Explore our suite of ready-to-deploy software products, custom web
            applications, e-commerce storefront engines, and digital tools tailored
            to scale your operation.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-slate-200">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, features, tech..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 placeholder:text-slate-400 bg-slate-50 border border-slate-100 outline-none focus:border-cyan-500 focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/20"
                    : "text-slate-600 bg-slate-100 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 max-w-lg mx-auto">
            <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No products found</h3>
            <p className="text-sm text-slate-500 mt-1">
              Try adjusting your search criteria or category filter.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-xl text-xs font-bold hover:bg-cyan-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const Icon = product.icon;
              return (
                <div
                  key={product.id}
                  id={product.id}
                  className="scroll-mt-28 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 border border-cyan-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      {product.badge && (
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide ${
                            product.id === "my-jisnu-digitals"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              : "bg-cyan-100 text-cyan-800"
                          }`}
                        >
                          {product.badge}
                        </span>
                      )}
                    </div>

                    <div className="text-xs font-bold uppercase tracking-wider text-cyan-600 mb-1">
                      {product.category}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-cyan-600 transition-colors mb-2">
                      <Link
                        href={product.href}
                        target={product.href.startsWith("http") ? "_blank" : undefined}
                        rel={product.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        {product.name}
                      </Link>
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mb-3 italic">
                      "{product.tagline}"
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                      {product.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2 mb-6">
                      {product.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-700 font-medium">
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100 mb-5">
                      {product.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-bold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* CTA Links */}
                    <div className="flex items-center justify-between gap-3">
                      <Link
                        href={product.href}
                        target={product.href.startsWith("http") ? "_blank" : undefined}
                        rel={product.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className={`flex-1 py-2.5 px-4 rounded-xl text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5 shadow-md ${
                          product.id === "my-jisnu-digitals"
                            ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20"
                            : "bg-cyan-600 hover:bg-cyan-700 shadow-cyan-600/10"
                        }`}
                      >
                        {product.id === "crm"
                          ? "Access CRM Portal"
                          : product.id === "my-jisnu-digitals"
                          ? "Get on Google Play"
                          : "Learn More"}{" "}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href="/contact"
                        className="py-2.5 px-4 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold transition-colors flex items-center justify-center gap-1"
                      >
                        Get Quote <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Custom Solution CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <span className="text-cyan-400 text-xs font-black uppercase tracking-widest mb-2 block">
              Bespoke Software Development
            </span>
            <h2 className="text-2xl sm:text-4xl font-black mb-4 tracking-tight">
              Need a Custom Product Built From Scratch?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-medium">
              We design, build, and deploy tailormade web platforms, SaaS tools, and enterprise applications engineered to solve your exact business needs.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                Schedule Product Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-xl font-bold text-sm transition-all"
              >
                View Development Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
