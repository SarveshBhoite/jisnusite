"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Megaphone,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Code2,
  Target,
  Share2,
  LineChart,
  Mail,
  Zap,
  Users,
  ShieldCheck,
  Layout,
} from "lucide-react";

const detailedServices = [
  {
    id: "performance-ppc",
    number: "01",
    title: "Performance & Pay-Per-Click Advertising",
    subtitle: "Targeted Meta Ads (FB & Instagram) and Google PPC campaigns driving immediate ROI.",
    description:
      "Maximize your advertising budget with hyper-targeted paid campaigns. We design, launch, and optimize high-converting Meta Ads and Google Search & Display campaigns designed to capture intent-driven leads and deliver measurable return on ad spend (ROAS).",
    details: [
      "Google Search, Display & Performance Max ad setup",
      "Meta Ads (Facebook & Instagram) audience targeting",
      "Ad copy creation, A/B testing & creative design",
      "Retargeting & custom lookalike audience building",
      "Cost-Per-Acquisition (CPA) & ROAS performance tuning",
    ],
  },
  {
    id: "social-media-marketing",
    number: "02",
    title: "Social Media Marketing (SMM)",
    subtitle: "Strategic social content creation, community engagement, and brand building.",
    description:
      "Build a memorable brand presence across Instagram, LinkedIn, Facebook, and YouTube. We craft engaging social media content strategies, design visually stunning creatives, manage community interactions, and grow organic follower engagement.",
    details: [
      "Social media content calendar planning & strategy",
      "Custom graphic design, reels & video creative production",
      "Brand voice consistency & active community management",
      "Influencer partnership outreach & campaign management",
      "Monthly social metrics & engagement growth analytics",
    ],
  },
  {
    id: "lead-generation-funnels",
    number: "03",
    title: "Lead Generation & Conversion Funnels",
    subtitle: "Conversion-optimized landing pages and multi-stage lead capture funnels.",
    description:
      "Turn cold traffic into qualified sales inquiries. We build dedicated conversion landing pages, integrate automated lead capture forms, configure CRM tracking, and nurture leads through targeted follow-up workflows.",
    details: [
      "High-converting landing page design & copywriting",
      "Lead magnet creation & opt-in form integration",
      "Instant CRM (Salesforce, HubSpot, Zoho) lead sync",
      "A/B split testing on headline, CTA & form friction",
      "Automated SMS & WhatsApp instant lead notifications",
    ],
  },
  {
    id: "content-email-marketing",
    number: "04",
    title: "Content & Email Marketing Automation",
    subtitle: "Compelling brand copy, educational blogs, and automated email nurturing sequences.",
    description:
      "Nurture prospects and retain existing clients with strategic content marketing. We write authoritative blog articles, design newsletter templates, and build automated email drip campaigns that educate buyers and drive repeat sales.",
    details: [
      "SEO-friendly blog writing & thought leadership articles",
      "Automated email onboarding & drip sequence creation",
      "E-commerce cart recovery & promotional broadcast emails",
      "Email list segmentation & open-rate optimization",
      "Customer lifetime value (LTV) retention workflows",
    ],
  },
  {
    id: "brand-positioning",
    number: "05",
    title: "Brand Strategy & Market Positioning",
    subtitle: "Cohesive digital branding, value propositions, and market differentiation.",
    description:
      "Stand out in competitive digital markets. We craft authentic brand messaging, define core value propositions, build brand identity guidelines, and ensure multi-channel visual and tonal consistency across all customer touchpoints.",
    details: [
      "Brand identity guidelines & visual tone setup",
      "Competitor landscape audit & positioning strategy",
      "Value proposition refinement & core messaging frameworks",
      "Multi-channel marketing asset consistency audit",
      "Brand awareness campaign strategy & press releases",
    ],
  },
  {
    id: "campaign-analytics",
    number: "06",
    title: "Campaign Analytics & Cost Optimization",
    subtitle: "Data-backed ad optimization, cost-per-lead tracking, and ROI reporting.",
    description:
      "Eliminate wasted ad spend with real-time analytics monitoring. We track pixel conversions, monitor cost-per-lead (CPL) trends, optimize bidding strategies, and deliver transparent reporting dashboards so you always know your campaign ROI.",
    details: [
      "Meta Pixel, Google Tag Manager & Conversion API tracking",
      "Custom Looker Studio & GA4 analytics dashboard setup",
      "Cost-Per-Lead (CPL) & Cost-Per-Sale (CPS) auditing",
      "Channel attribution modeling & budget allocation",
      "Transparent bi-weekly strategy & performance reporting",
    ],
  },
];

const otherServices = [
  { title: "Web Development", link: "/services/web-development" },
  { title: "Mobile App Development", link: "/services/mobile-app-development" },
  { title: "SEO Services", link: "/services/seo-services" },
  { title: "UI/UX Design", link: "/services/ui-ux-design" },
  { title: "E-Commerce Development", link: "/services/ecommerce-development" },
];

export default function DigitalMarketingPage() {
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
            backgroundImage: `url('https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=2000&q=80')`,
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
              Digital Marketing Agency in{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
                Pune
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-md md:text-lg leading-relaxed">
              Drive customer acquisition, scale paid ad ROI, and grow your brand with outcome-focused digital marketing solutions in Pune.
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
              Our Digital Marketing Services
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Select any capability on the left to view detailed campaign deliverables, technical tactics, and specs.
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
                    <span>Marketing Strategy</span>
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
                    <span>Key Campaign Deliverables</span>
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
              Why Choose Jisnu Digital for Digital Marketing?
            </h2>
            <p className="text-slate-600 text-base">
              We combine creative ad messaging with data analytics to turn your ad spend into predictable revenue growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">High-Intent Lead Targeting</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Precision audience segmentation across Google Search and Meta Ads targeting ready-to-buy customers.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
                <LineChart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Transparent ROAS & CPA Tracking</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Real-time conversion reporting ensuring every ad dollar spent is tracked to qualified leads.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
                <Share2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Full-Funnel Campaign Management</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  End-to-end execution covering ad creatives, copy, landing pages, CRM integration, and email nurture.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Continuous A/B Optimization</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Proactive split testing of headlines, visual hooks, and offer angles to lower cost-per-lead continuously.
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
