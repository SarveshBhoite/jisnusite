"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Globe,
  Smartphone,
  TrendingUp,
  Megaphone,
  Palette,
  ShoppingCart,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Zap,
  Sparkles,
  ArrowUpRight,
  Layers,
  ChevronDown,
  Rocket,
  ShieldCheck,
  Target,
  BarChart3,
  Users,
  HelpCircle,
} from "lucide-react";

const servicesData = [
  {
    id: "web-development",
    number: "01",
    title: "Web Development",
    slug: "web-development",
    link: "/services/web-development",
    icon: Globe,
    tagline:
      "Build fast, responsive, and SEO-friendly websites that create a strong digital presence and turn visitors into long-term customers.",
    capabilities: [
      "Business Website Development",
      "Corporate Web Portals",
      "Custom Web Applications",
      "Responsive Web Design",
      "SEO-Friendly Code Standards",
      "Speed & Performance Optimization",
    ],
  },
  {
    id: "mobile-app-development",
    number: "02",
    title: "Mobile App Development",
    slug: "mobile-app-development",
    link: "/services/mobile-app-development",
    icon: Smartphone,
    tagline:
      "Develop scalable, high-performance Android and iOS mobile applications engineered to deliver seamless user experiences across modern devices.",
    capabilities: [
      "Android App Development",
      "iOS App Development",
      "Cross-Platform Apps (React Native/Flutter)",
      "Custom Mobile Solutions",
      "API & Backend Integration",
      "App UI/UX Engineering",
    ],
  },
  {
    id: "seo-services",
    number: "03",
    title: "SEO Services",
    slug: "seo-services",
    link: "/services/seo-services",
    icon: TrendingUp,
    tagline:
      "Boost search visibility, attract qualified organic traffic, and secure top rankings on Google with data-backed search engine optimization.",
    capabilities: [
      "Technical SEO Audits",
      "On-Page & Off-Page SEO",
      "Local SEO & Google Maps Ranking",
      "High-Intent Keyword Research",
      "Content Strategy & Optimization",
      "Rank Tracking & Analytics",
    ],
  },
  {
    id: "digital-marketing",
    number: "04",
    title: "Digital Marketing",
    slug: "digital-marketing",
    link: "/services/digital-marketing",
    icon: Megaphone,
    tagline:
      "Reach the right target audience and generate high-converting leads through strategic, performance-driven digital marketing campaigns.",
    capabilities: [
      "Social Media Marketing (SMM)",
      "Google Pay-Per-Click (PPC) Ads",
      "Meta Ads (Facebook & Instagram)",
      "Lead Generation Campaigns",
      "Content Marketing Strategy",
      "ROI & Conversion Rate Optimization",
    ],
  },
  {
    id: "ui-ux-design",
    number: "05",
    title: "UI/UX Design",
    slug: "ui-ux-design",
    link: "/services/ui-ux-design",
    icon: Palette,
    tagline:
      "Craft modern, visually stunning, and intuitive user interfaces that elevate brand perception, usability, and customer engagement.",
    capabilities: [
      "Website & Web App UI/UX",
      "Mobile Application Interface Design",
      "Interactive Wireframing & Prototyping",
      "User Journey & Persona Mapping",
      "Design Systems & Brand Styleguides",
      "Conversion-Centered UX Research",
    ],
  },
  {
    id: "ecommerce-development",
    number: "06",
    title: "E-Commerce Development",
    slug: "ecommerce-development",
    link: "/services/ecommerce-development",
    icon: ShoppingCart,
    tagline:
      "Build secure, fast, and feature-rich online stores equipped with friction-free checkout flows and integrated payment gateways to maximize sales.",
    capabilities: [
      "Custom E-Commerce Storefronts",
      "Dynamic Product Catalog Management",
      "Frictionless Shopping Cart & Checkout",
      "UPI, Card & Razorpay Gateways",
      "Order Tracking & Inventory Sync",
      "Mobile-Optimized Shopping Experience",
    ],
  },
];

const growthPillars = [
  {
    icon: Target,
    title: "Targeted Customer Acquisition",
    desc: "We combine technical SEO, Google PPC, and social media advertising to put your business directly in front of active buyers seeking your products and services.",
  },
  {
    icon: Rocket,
    title: "High-Converting Digital Assets",
    desc: "Our web and mobile development solutions are engineered from the ground up for speed, security, and conversion rate optimization to turn clicks into clients.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven ROI Strategies",
    desc: "Every campaign and design decision is backed by analytics and transparent performance metrics, ensuring maximum ROI for your digital marketing budget.",
  },
  {
    icon: ShieldCheck,
    title: "Scalable Technology & Security",
    desc: "We build digital platforms using modern, future-proof tech stacks (Next.js, React, Node.js, MongoDB) that scale effortlessly as your enterprise expands.",
  },
  {
    icon: Users,
    title: "Dedicated Support & Growth Partnership",
    desc: "Our engagement extends far beyond launch. We provide continuous technical maintenance, security updates, and growth strategies to keep your brand leading.",
  },
];

const faqList = [
  {
    question: "What digital services does Jisnu Digital provide?",
    answer:
      "Jisnu Digital offers end-to-end digital engineering and marketing solutions, including Custom Web Development, Mobile App Development (Android & iOS), Search Engine Optimization (SEO), Performance Digital Marketing (PPC & Meta Ads), UI/UX Design, and E-Commerce Development.",
  },
  {
    question: "How do your services help my business grow online?",
    answer:
      "We build high-speed, conversion-optimized websites and mobile apps, combined with targeted search and social advertising strategies. Our focus is on bringing qualified traffic to your business, elevating brand authority, and optimizing user journeys to generate measurable leads and sales growth.",
  },
  {
    question: "Do you build custom websites tailored to specific industry needs?",
    answer:
      "Yes! We construct fully custom websites and web applications tailored specifically to your brand identity, business model, and functional requirements—whether you need a corporate portal, healthcare site, real estate listing engine, or custom SaaS platform.",
  },
  {
    question: "How long does a web or app development project take to complete?",
    answer:
      "Standard business websites generally take 2 to 4 weeks from strategy to final launch. Custom web applications, mobile apps, or enterprise e-commerce platforms typically take 4 to 8 weeks depending on custom feature sets and scope.",
  },
  {
    question: "Will my website be mobile-responsive and SEO-friendly?",
    answer:
      "Absolutely. Every solution engineered by Jisnu Digital follows strict mobile-first responsive guidelines, clean HTML markup, fast page loading optimization, and technical SEO schema foundations for top search engine indexation.",
  },
  {
    question: "Do you provide post-launch support and ongoing maintenance?",
    answer:
      "Yes, we provide ongoing post-launch maintenance, regular security upgrades, server speed monitoring, content updates, and continuous digital marketing optimization to support your long-term business success.",
  },
];

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="bg-gradient-to-b from-cyan-50/70 via-slate-50 to-blue-50/50 text-slate-900 min-h-screen relative overflow-hidden">
      {/* ========================================================================= */}
      {/* 1. HERO / MAIN KEY SECTION (50% VIEWPORT HEIGHT - TRANSPARENT TECH IMAGE BACKGROUND) */}
      {/* ========================================================================= */}
      <section className="min-h-[50vh] flex items-center justify-center pt-32 pb-14 md:pt-36 md:pb-16 bg-slate-900 text-white relative overflow-hidden">
        {/* Background Tech Image with Opacity & Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 mix-blend-luminosity scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80')`
          }}
        />

        {/* Semi-Transparent Dark & Cyan Gradient Layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/75 to-slate-900/95 backdrop-blur-[2px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full bg-cyan-500/15 blur-[140px] rounded-full pointer-events-none" />

        {/* Subtle Tech Grid Lines Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 my-auto">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.15] mb-4">
            Digital Marketing Services in Pune |{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Web Development & SEO
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-6">
            Explore professional digital marketing, web development, SEO, mobile app, UI/UX and e-commerce services in Pune to grow your online presence and business.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-7 py-3 rounded-xl shadow-lg shadow-cyan-600/30 transition-all hover:scale-[1.02] active:scale-95 text-sm"
            >
              <span>Get Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#animated-services"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-7 py-3 rounded-xl transition-all text-sm backdrop-blur-md"
            >
              <span>Explore Services</span>
              <ChevronDown className="w-4 h-4 text-cyan-300" />
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. ANIMATED SERVICES CARDS SECTION */}
      {/* ========================================================================= */}
      <section id="animated-services" className="py-20 relative bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.id}
                  className="group relative bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200/90 p-8 shadow-sm hover:shadow-2xl hover:border-cyan-400/80 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Top Subtle Hover Background Gradient Glow */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Header: Icon & Service Number */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-100 text-cyan-700 flex items-center justify-center group-hover:bg-cyan-700 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-xs">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-3xl font-black text-slate-300 group-hover:text-cyan-600/30 transition-colors font-mono tracking-tighter">
                        {service.number}
                      </span>
                    </div>

                    {/* Service Name / Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 group-hover:text-cyan-700 transition-colors">
                      {service.title}
                    </h3>

                    {/* Tagline / Short Description */}
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {service.tagline}
                    </p>

                    {/* Key Capabilities Pills */}
                    <div className="space-y-2.5 pt-4 border-t border-slate-100 mb-8">
                      <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5 mb-3">
                        <Layers className="w-3.5 h-3.5 text-cyan-700" />
                        Capabilities Include:
                      </span>
                      <div className="grid grid-cols-1 gap-2">
                        {service.capabilities.slice(0, 4).map((cap, cIdx) => (
                          <div
                            key={cIdx}
                            className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 group-hover:border-cyan-100 group-hover:bg-cyan-50/40 transition-colors"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                            <span className="truncate">{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Learn More Button */}
                  <div className="pt-2">
                    <Link
                      href={service.link}
                      className="w-full inline-flex items-center justify-between bg-slate-900 hover:bg-cyan-700 text-white font-bold px-5 py-3.5 rounded-xl shadow-sm transition-all duration-300 group/btn"
                    >
                      <span className="text-sm">Learn More</span>
                      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center group-hover/btn:bg-white/20 transition-colors">
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. HOW WE HELP YOU GROW SECTION (SEO-FRIENDLY TEXT + 5 CARDS) */}
      {/* ========================================================================= */}
      <section className="py-24 bg-white/70 backdrop-blur-sm border-y border-slate-200/70 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-cyan-700 font-bold text-xs uppercase tracking-widest block mb-3">
              GROWTH ACCELERATION
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-6">
              How We Help You Grow
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-4">
              At Jisnu Digital, we believe digital growth is not accidental—it is engineered. In today&apos;s hyper-competitive digital market, simply having an online presence is no longer enough. We provide professional <strong>web development services in Pune</strong>, targeted <strong>SEO services in Pune</strong>, and performance-driven <strong>digital marketing solutions</strong> that work together to strengthen your online presence, attract the right audience, and support sustainable business growth.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {growthPillars.map((pillar, idx) => {
              const PillarIcon = pillar.icon;
              return (
                <div
                  key={idx}
                  className={`bg-white/90 p-8 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-cyan-300 transition-all ${idx === 4 ? "sm:col-span-2 lg:col-span-1" : ""
                    }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 text-cyan-700 flex items-center justify-center mb-6">
                    <PillarIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{pillar.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FAQ SECTION */}
      {/* ========================================================================= */}
      <section className="py-24 relative bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 text-cyan-700 flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-6 h-6" />
            </div>
            <span className="text-cyan-700 font-bold text-xs uppercase tracking-widest block mb-2">
              GOT QUESTIONS?
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Find transparent answers about our digital service offerings, execution process, timelines, and post-launch support.
            </p>
          </div>

          <div className="space-y-4">
            {faqList.map((faq, idx) => {
              const isOpen = openFaq === idx;

              return (
                <div
                  key={idx}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-cyan-700 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-cyan-700 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FINAL CALL TO ACTION (CTA) */}
      {/* ========================================================================= */}
      <section className="py-20 relative bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-10 sm:p-16 text-center overflow-hidden shadow-2xl border border-slate-800">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 flex items-center justify-center mx-auto mb-6">
                <Zap className="w-7 h-7 text-amber-400 animate-pulse" />
              </div>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-6">
                Ready to Accelerate Your Digital Growth?
              </h2>

              <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
                Let’s collaborate to build modern web engineering and digital marketing campaigns designed specifically for your target audience.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-95"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-8 py-4 rounded-xl transition-all"
                >
                  <span>Get Free Consultation</span>
                  <ArrowUpRight className="w-5 h-5 text-cyan-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}