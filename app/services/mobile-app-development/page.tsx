"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Smartphone,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Code2,
  Cpu,
  Layers,
  Zap,
  ShieldCheck,
  RefreshCw,
  Layout,
  Lock,
} from "lucide-react";

const detailedServices = [
  {
    id: "native-android-ios",
    number: "01",
    title: "Native iOS & Android App Development",
    subtitle: "High-performance native apps built with Swift and Kotlin for platform perfection.",
    description:
      "We engineer native iOS and Android applications tailored specifically for Apple and Google mobile ecosystems. Our team leverages platform-native languages and tools to maximize execution speed, achieve smooth 60fps rendering, access device hardware seamlessly, and ensure strict adherence to Apple Human Interface Guidelines and Google Material Design.",
    details: [
      "Native Swift (iOS) & Kotlin (Android) codebase architecture",
      "Apple Human Interface & Google Material design implementation",
      "Direct hardware access (Camera, GPS, Bluetooth, Biometrics)",
      "Optimized memory management & battery efficiency tuning",
      "Full App Store & Google Play Store submission & approval management",
    ],
  },
  {
    id: "cross-platform",
    number: "02",
    title: "Cross-Platform App Development",
    subtitle: "Single codebase, multi-platform deployment using Flutter and React Native.",
    description:
      "Accelerate your time-to-market and streamline development budgets with cross-platform mobile frameworks. We build enterprise applications using React Native and Flutter that deliver true native look-and-feel across both iOS and Android platforms without sacrificing speed or scalability.",
    details: [
      "React Native & Flutter application architecture",
      "90%+ shared codebase across iOS & Android devices",
      "Hot reload & rapid feature iteration cycles",
      "Custom native bridge modules for hardware APIs",
      "Unified UI component system & design token synchronization",
    ],
  },
  {
    id: "mobile-ui-ux",
    number: "03",
    title: "Mobile UI/UX Design & Prototyping",
    subtitle: "Intuitive touch-first interfaces designed for maximum user engagement.",
    description:
      "Mobile applications require ergonomic touch design, fluid gestures, and instant visual feedback. We design touch-first interfaces that simplify user navigation, eliminate cognitive friction, and drive high daily active user (DAU) retention rates.",
    details: [
      "Interactive wireframes & clickable Figma prototypes",
      "Ergonomic thumb-zone navigation & gesture patterns",
      "Dark mode & dynamic system color theme support",
      "Micro-interactions & tactile gesture animations",
      "User usability testing & rapid feedback integration",
    ],
  },
  {
    id: "api-cloud-backend",
    number: "04",
    title: "API & Cloud Backend Integration",
    subtitle: "Secure RESTful APIs, real-time WebSockets, and scalable cloud databases.",
    description:
      "Connect your mobile app to a powerful cloud infrastructure. We engineer custom REST and GraphQL APIs, integrate real-time push notifications, configure WebSockets for live data updates, and connect secure cloud databases like AWS, Firebase, and MongoDB.",
    details: [
      "RESTful & GraphQL API development & integration",
      "Real-time push notifications (FCM & APNs)",
      "Offline data sync & local SQLite/Realm database caching",
      "Third-party payment gateway (Razorpay, Stripe, UPI) & SDK integrations",
      "Scalable cloud server deployment on AWS, GCP & Firebase",
    ],
  },
  {
    id: "app-security-compliance",
    number: "05",
    title: "Mobile App Security & Encryption",
    subtitle: "Enterprise-grade data encryption, biometric auth, and security compliance.",
    description:
      "Protect user data and maintain enterprise-grade security standards. We implement end-to-end data encryption, OAuth 2.0 authentication, biometric login (FaceID / TouchID), secure token storage, and vulnerability mitigation to prevent unauthorized access.",
    details: [
      "OAuth 2.0, JWT & Biometric (Face ID / Touch ID) authentication",
      "AES-256 data encryption & SSL certificate pinning",
      "Keychain & Android Keystore secure token management",
      "OWASP mobile top 10 security compliance audit",
      "App obfuscation & anti-tampering protection",
    ],
  },
  {
    id: "app-maintenance-support",
    number: "06",
    title: "App Maintenance & OS Upgrades",
    subtitle: "Continuous performance monitoring, bug fixes, and annual OS updates.",
    description:
      "Ensure your mobile application stays modern and functional across new iOS and Android OS releases. We provide proactive server monitoring, crash analytics tracking, performance tuning, and timely feature rollouts to maintain top App Store ratings.",
    details: [
      "Proactive crash analytics & error tracking (Crashlytics)",
      "Annual iOS & Android OS version compatibility updates",
      "Server performance tuning & database optimization",
      "Store listing optimization & policy compliance monitoring",
      "Dedicated SLA maintenance & emergency technical support",
    ],
  },
];

const otherServices = [
  { title: "Web Development", link: "/services/web-development" },
  { title: "SEO Services", link: "/services/seo-services" },
  { title: "Digital Marketing", link: "/services/digital-marketing" },
  { title: "UI/UX Design", link: "/services/ui-ux-design" },
  { title: "E-Commerce Development", link: "/services/ecommerce-development" },
];

export default function MobileAppDevelopmentPage() {
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
            backgroundImage: `url('https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=2000&q=80')`,
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
              Mobile App Development Company in{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
                Pune
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-md md:text-lg leading-relaxed">
              Build fast, native and cross-platform Android & iOS applications with professional mobile app development services in Pune.
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
              Our Mobile App Development Services
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
                    <span>Technical Architecture</span>
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
                    <span>Key Engineering Deliverables</span>
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
              Why Choose Jisnu Digital for Mobile App Development?
            </h2>
            <p className="text-slate-600 text-base">
              We build mobile applications optimized for rapid onboarding, high performance, and long-term scalability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Native & Cross-Platform Expertise</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Deep engineering experience across iOS (Swift), Android (Kotlin), Flutter, and React Native codebases.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
                <Layout className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Touch-First Interface Ergonomics</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Intuitive mobile UI design tailored for touch interactions, gesture navigation, and low cognitive friction.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">60 FPS Speed & Offline Sync</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Optimized memory usage, fluid 60fps animations, and offline SQLite caching for reliable connectivity.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Store Approval & Full Support</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Guaranteed App Store and Google Play Store publication with post-launch SLA maintenance.
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
