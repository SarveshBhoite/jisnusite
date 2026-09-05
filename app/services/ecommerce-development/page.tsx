"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Code2,
  CreditCard,
  Package,
  Zap,
  ShieldCheck,
  Smartphone,
  BarChart,
  Layout,
} from "lucide-react";

const detailedServices = [
  {
    id: "custom-storefronts",
    number: "01",
    title: "Custom E-Commerce Storefronts",
    subtitle: "High-performance online stores built with Next.js, Shopify, and modern web tech.",
    description:
      "Engineered for speed, conversion, and seamless product browsing. We build custom e-commerce storefronts tailored to your brand identity, featuring instant product search, dynamic filtering, high-resolution product galleries, and optimized page load times.",
    details: [
      "Custom Next.js & headless e-commerce frontend development",
      "Shopify & WooCommerce custom theme & plugin integration",
      "High-speed product page rendering & image CDN optimization",
      "Dynamic product filtering, variant swatches & search auto-complete",
      "SEO-friendly category structure & rich snippets schema",
    ],
  },
  {
    id: "payment-gateway",
    number: "02",
    title: "Payment Gateway & UPI Integration",
    subtitle: "Secure payment processing supporting Razorpay, Paytm, Stripe, UPI, & Net Banking.",
    description:
      "Deliver frictionless payment experiences for Indian and global shoppers. We integrate secure multi-currency payment gateways supporting UPI instant checkout, credit/debit cards, Net Banking, EMI options, and Cash on Delivery (COD).",
    details: [
      "Razorpay, Stripe, Paytm & PhonePe payment gateway integration",
      "Instant UPI QR code & Intent flow payment processing",
      "Multi-currency & global credit card processing support",
      "Automated payment failure recovery & refund webhook processing",
      "Cash on Delivery (COD) order verification & pin code check",
    ],
  },
  {
    id: "catalog-inventory",
    number: "03",
    title: "Product Catalog & Inventory System",
    subtitle: "Real-time stock tracking, automated order fulfillment, and ERP sync.",
    description:
      "Manage thousands of product SKUs effort-lessly. We implement robust inventory management systems, multi-warehouse stock synchronization, automated order status tracking, and seamless integration with third-party ERPs and shipping providers.",
    details: [
      "Bulk product import/export & SKU inventory management",
      "Real-time low-stock alerts & automated backorder controls",
      "Shipping courier API integration (Shiprocket, Delhivery, BlueDart)",
      "Automated PDF invoice & shipping label generation",
      "ERP & CRM inventory synchronization (Tally, Zoho, SAP)",
    ],
  },
  {
    id: "mobile-commerce",
    number: "04",
    title: "Mobile E-Commerce (M-Commerce)",
    subtitle: "Mobile-first shopping experiences optimized for speed and touch checkout.",
    description:
      "Over 70% of online shopping happens on mobile devices. We design touch-optimized mobile shopping interfaces, progressive web app (PWA) offline access, and 1-click mobile checkout funnels that maximize mobile conversion rates.",
    details: [
      "Mobile-first responsive UX & touch-optimized product galleries",
      "Progressive Web App (PWA) setup for app-like speed",
      "1-click mobile checkout & autofill address forms",
      "Instant mobile push notifications for flash sales & order status",
      "Sub-second mobile page load speed optimization",
    ],
  },
  {
    id: "security-checkout",
    number: "05",
    title: "Secure Checkout & PCI-DSS Compliance",
    subtitle: "End-to-end SSL encryption, secure user auth, and fraud prevention.",
    description:
      "Protect your customer transactions and build buying trust. We implement SSL encryption, PCI-DSS compliant payment processing, secure user account authentication, and automated fraud detection to prevent chargebacks.",
    details: [
      "PCI-DSS compliant payment flow architecture",
      "End-to-end SSL encryption & secure tokenization",
      "Customer account creation, social login & guest checkout",
      "Automated fraud detection & suspicious transaction alerts",
      "GDPR & Indian DPDP Act data privacy compliance",
    ],
  },
  {
    id: "sales-optimization",
    number: "06",
    title: "E-Commerce Analytics & Sales Optimization",
    subtitle: "Abandoned cart recovery, upsell triggers, and conversion rate optimization.",
    description:
      "Recover lost revenue and increase Average Order Value (AOV). We implement automated WhatsApp & email abandoned cart reminders, personalized product recommendations, post-purchase cross-sells, and GA4 e-commerce tracking.",
    details: [
      "Automated WhatsApp & Email abandoned cart recovery sequences",
      "Personalized product recommendation engine & cross-sell popups",
      "Discount coupon, bundle offer & loyalty point system engine",
      "GA4 Enhanced E-Commerce funnel & checkout drop-off analytics",
      "Conversion Rate Optimization (CRO) heatmaps & A/B testing",
    ],
  },
];

const otherServices = [
  { title: "Web Development", link: "/services/web-development" },
  { title: "Mobile App Development", link: "/services/mobile-app-development" },
  { title: "SEO Services", link: "/services/seo-services" },
  { title: "Digital Marketing", link: "/services/digital-marketing" },
  { title: "UI/UX Design", link: "/services/ui-ux-design" },
];

export default function EcommerceDevelopmentPage() {
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
            backgroundImage: `url('https://images.unsplash.com/photo-1556742049-0a67568d0d9f?auto=format&fit=crop&w=2000&q=80')`,
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
              E-Commerce Development Company in{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
                Pune
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-md md:text-lg leading-relaxed">
              Build scalable, secure, and fast-loading online stores engineered to streamline shopping and maximize sales in Pune.
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
              Our E-Commerce Development Services
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Select any capability on the left to view detailed technical deliverables, architecture, and specs.
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
                    <span>Platform Architecture</span>
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
                    <span>Key Platform Deliverables</span>
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
              Why Choose Jisnu Digital for E-Commerce Development?
            </h2>
            <p className="text-slate-600 text-base">
              We build fast, secure e-commerce platforms engineered to turn traffic into sales and recurring customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">High-Speed Storefront Performance</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Sub-second page loading and instant product filter search engineered with Next.js and headless technology.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Frictionless UPI & Card Checkout</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Seamless payment integration for UPI QR, Google Pay, Razorpay, Cards, and Cash on Delivery (COD).
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">PCI-DSS Compliant Data Security</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  End-to-end SSL encryption, secure user tokenization, and active anti-fraud transaction protection.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
                <BarChart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Automated Cart Recovery & Analytics</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Automated WhatsApp & Email cart recovery messages designed to increase conversion rates and AOV.
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
