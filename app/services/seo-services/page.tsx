"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Code2,
  Search,
  MapPin,
  FileText,
  Link2,
  BarChart3,
  Globe,
  Zap,
  ShieldCheck,
  Layout,
} from "lucide-react";

const detailedServices = [
  {
    id: "on-page-seo",
    number: "01",
    title: "On-Page SEO Optimization",
    subtitle: "Keyword targeting, meta tag engineering, and content architecture optimization.",
    description:
      "On-page SEO forms the foundational core of search visibility. We optimize your page metadata, headings, internal link structures, URL slugs, image alt attributes, and content hierarchy to ensure Google algorithms accurately index and rank your pages for target search queries.",
    details: [
      "High-intent keyword integration & placement strategy",
      "Meta title & meta description optimization for higher CTR",
      "Semantic H1-H6 heading tag structure & readability styling",
      "Image alt attribute compression & Google Lens indexing",
      "Internal link architecture & URL canonicalization",
    ],
  },
  {
    id: "technical-seo",
    number: "02",
    title: "Technical SEO & Site Speed",
    subtitle: "Core Web Vitals tuning, crawl budget optimization, and indexation fixes.",
    description:
      "Ensure search engine spiders can efficiently crawl, parse, and index your website. We resolve critical technical bottlenecks including site speed latency, broken canonical tags, XML sitemap errors, robots.txt directives, and mobile usability issues.",
    details: [
      "Core Web Vitals (LCP, INP, CLS) speed optimization",
      "XML sitemap generation & robots.txt directives configuration",
      "Canonical tag implementation & duplicate content resolution",
      "Structured data & Schema.org JSON-LD microdata setup",
      "HTTPS SSL security & HTTP header performance tuning",
    ],
  },
  {
    id: "off-page-seo",
    number: "03",
    title: "Off-Page SEO & Authority Building",
    subtitle: "High-quality backlinks, brand citations, and domain authority expansion.",
    description:
      "Build domain authority and search engine trust through white-hat link acquisition strategies. We secure high-authority editorial backlinks, business directory listings, and brand press mentions to elevate your domain rating and organic competitiveness.",
    details: [
      "High-domain-authority (DA/DR) backlink acquisition",
      "Digital PR & editorial content placement in industry publications",
      "Brand mention tracking & unlinked citation recovery",
      "Competitor backlink gap analysis & targeted outreach",
      "Toxic backlink auditing & Google disavow file management",
    ],
  },
  {
    id: "local-seo-gmb",
    number: "04",
    title: "Local SEO & Google Business Profile",
    subtitle: "Dominate local map pack rankings and attract customer calls in Pune.",
    description:
      "Capture high-intent local buyers searching for services in Pune and regional markets. We optimize your Google Business Profile (GMB), build consistent NAP citations across local directories, collect customer reviews, and engineer localized geo-targeted landing pages.",
    details: [
      "Google Business Profile (GMB) claim, verification & optimization",
      "Local citation building across high-authority Indian business directories",
      "NAP (Name, Address, Phone) consistency audit & synchronization",
      "Local keyword targeting & geo-tagged landing pages",
      "Customer review generation & reputation management strategy",
    ],
  },
  {
    id: "ecommerce-seo",
    number: "05",
    title: "E-Commerce SEO Optimization",
    subtitle: "Product page rankings, category tree optimization, and shopping schema.",
    description:
      "Drive targeted organic buyers to your e-commerce storefront. We optimize product titles, rich product descriptions, category pagination, faceted filter search indexing, and Schema product markup (price, availability, rating) to capture transactional search traffic.",
    details: [
      "Product page metadata & transactional keyword targeting",
      "Faceted navigation & category crawl budget management",
      "Product Schema.org structured data (Price, Stock, Rating)",
      "E-commerce platform optimization (Shopify, WooCommerce, Next.js)",
      "Duplicate product URL canonicalization & site architecture",
    ],
  },
  {
    id: "seo-audit-reporting",
    number: "06",
    title: "SEO Audits & Monthly Analytics",
    subtitle: "Transparent keyword rank tracking, traffic insights, and ROI reports.",
    description:
      "Gain complete visibility into your organic search growth. We perform comprehensive monthly SEO audits, track real-time keyword ranking movements, analyze Google Search Console & GA4 traffic data, and provide executive reports measuring lead conversion ROI.",
    details: [
      "In-depth 50+ point technical SEO website audit & roadmap",
      "Google Analytics 4 (GA4) & Search Console integration",
      "Weekly keyword ranking & SERP position change tracking",
      "Organic conversion & goal completion performance analytics",
      "Transparent monthly executive reporting & strategic review call",
    ],
  },
];

const otherServices = [
  { title: "Web Development", link: "/services/web-development" },
  { title: "Mobile App Development", link: "/services/mobile-app-development" },
  { title: "Digital Marketing", link: "/services/digital-marketing" },
  { title: "UI/UX Design", link: "/services/ui-ux-design" },
  { title: "E-Commerce Development", link: "/services/ecommerce-development" },
];

export default function SeoServicesPage() {
  const [activeServiceId, setActiveServiceId] = useState(detailedServices[0].id);

  const activeService =
    detailedServices.find((s) => s.id === activeServiceId) || detailedServices[0];

  return (
    <main className="bg-slate-50 text-slate-900 min-h-screen relative">
      
      {/* ===== HERO HEADER (50% VIEWPORT HEIGHT WITH TECH BACKGROUND) ===== */}
      <section className="min-h-[50vh] flex items-center justify-center pt-28 pb-12 md:pt-36 md:pb-16 bg-slate-900 text-white relative overflow-hidden">
        {/* Background Tech Image with Opacity & Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 mix-blend-luminosity scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2000&q=80')`,
          }}
        />

        {/* Semi-Transparent Dark & Blue Gradient Layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/75 to-slate-900/95 backdrop-blur-[2px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full bg-cyan-500/15 blur-[140px] rounded-full pointer-events-none" />

        {/* Subtle Tech Grid Lines Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto relative z-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.15] mb-6">
              SEO Services Company in{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
                Pune
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-md md:text-lg leading-relaxed">
              Drive organic traffic, rank higher on Google search results, and generate qualified leads with professional SEO services in Pune.
            </p>
          </div>
        </div>
      </section>


      {/* ===== INTERACTIVE SERVICES SHOWCASE (50/50 EQUAL SPLIT) ===== */}
      <section id="services-list" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-cyan-700 font-bold text-xs uppercase tracking-widest block mb-3">
              WHAT WE OFFER
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Our Search Engine Optimization Services
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Select any capability on the left to view detailed engineering deliverables, technical architecture, and specs.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* LEFT SIDE: LIST OF SERVICES ONE BY ONE (50% WIDTH WITH MARGIN & PADDING) */}
            <div className="bg-slate-50/80 p-3 sm:p-4 rounded-3xl border border-slate-200/80 shadow-2xs space-y-3">
              {detailedServices.map((service) => {
                const isActive = service.id === activeServiceId;
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveServiceId(service.id)}
                    className={`w-full text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                      isActive
                        ? "bg-cyan-700 text-white border-cyan-700 shadow-xl shadow-cyan-700/25 scale-[1.01]"
                        : "bg-white hover:bg-cyan-50/70 text-slate-800 border-slate-200/90 hover:border-cyan-300 shadow-2xs"
                    }`}
                  >
                    <div className="flex items-start sm:items-center gap-4 sm:gap-5">
                      <span
                        className={`text-xl sm:text-2xl font-mono font-black shrink-0 mt-0.5 sm:mt-0 ${
                          isActive ? "text-white" : "text-slate-400 group-hover:text-cyan-700"
                        }`}
                      >
                        {service.number}
                      </span>
                      <div>
                        <h3 className="font-bold text-base sm:text-lg leading-snug">
                          {service.title}
                        </h3>
                        <p
                          className={`text-xs sm:text-sm mt-1 line-clamp-1 ${
                            isActive ? "text-cyan-100" : "text-slate-500"
                          }`}
                        >
                          {service.subtitle}
                        </p>
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-5 h-5 shrink-0 transition-transform duration-300 ml-3 ${
                        isActive
                          ? "text-white translate-x-1"
                          : "text-slate-400 group-hover:text-cyan-700 group-hover:translate-x-1"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* RIGHT SIDE: ANIMATED FULL DESCRIPTION PANEL (50% WIDTH) */}
            <div className="lg:sticky lg:top-28">
              <div
                key={activeService.id}
                className="bg-slate-50 border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden transition-all duration-500 animate-in fade-in slide-in-from-right-4"
              >
                {/* Accent Top Border Bar */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500" />

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-5xl font-mono font-black text-cyan-700/25">
                    {activeService.number}
                  </span>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-100/80 text-cyan-700 border border-cyan-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-700" />
                    <span>SEO Deliverables</span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                  {activeService.title}
                </h3>

                <p className="text-cyan-700 text-sm font-semibold mb-6">
                  {activeService.subtitle}
                </p>

                <p className="text-slate-600 text-base leading-relaxed mb-8">
                  {activeService.description}
                </p>

                {/* Engineering Deliverables */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-cyan-700" />
                    <span>Key SEO Deliverables</span>
                  </h4>

                  <div className="space-y-3">
                    {activeService.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-3 text-sm text-slate-700">
                        <CheckCircle2 className="w-4.5 h-4.5 text-cyan-700 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Link */}
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2.5 bg-cyan-700 hover:bg-cyan-800 text-white font-bold px-7 py-3.5 rounded-xl shadow-md shadow-cyan-700/20 transition-all hover:scale-[1.02] active:scale-95 text-sm"
                  >
                    <span>Inquire About {activeService.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ===== WHY CHOOSE JISNU DIGITAL ===== */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
              Why Choose Jisnu Digital for SEO Services?
            </h2>
            <p className="text-slate-600 text-base">
              We deliver ethical white-hat Search Engine Optimization aligned with Google guidelines to drive long-term organic growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Ethical White-Hat Methodology</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Strict adherence to Google Search Essentials (Webmaster Guidelines) for safe, penalty-free ranking growth.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Technical Core Web Vitals Audit</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Comprehensive performance auditing resolving speed bottlenecks, sitemap errors, and mobile usability issues.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Local Pune & Global SEO Reach</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Proven local Google Map Pack strategy combined with national and international search query targeting.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Transparent Monthly Analytics</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Clear, data-driven reporting tracking keyword rankings, organic traffic growth, and conversion ROI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ===== INTERNAL LINKING TO OTHER SERVICES ===== */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Explore Other Services</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {otherServices.map((s, i) => (
              <Link
                key={i}
                href={s.link}
                className="px-5 py-2.5 bg-slate-50 hover:bg-cyan-50 rounded-xl border border-slate-200 hover:border-cyan-300 text-sm font-semibold text-slate-700 hover:text-cyan-700 transition-all"
              >
                {s.title} →
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
