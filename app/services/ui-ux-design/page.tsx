"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Palette,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Code2,
  Layout,
  Layers,
  Sparkles,
  Eye,
  Smartphone,
  Figma,
  Zap,
} from "lucide-react";

const detailedServices = [
  {
    id: "ui-design",
    number: "01",
    title: "User Interface (UI) Design",
    subtitle: "Modern, pixel-perfect visual designs aligned with brand identity and component consistency.",
    description:
      "Transform complex ideas into clean, beautiful visual interfaces. We design modern UI aesthetics for web and mobile applications using curated typography, harmonious HSL color palettes, high-contrast layouts, and sleek micro-interactions.",
    details: [
      "Custom web & mobile user interface layout design",
      "Tailored color palette selection & accessibility contrast audit",
      "Modern typography hierarchy & typographic scale definition",
      "Micro-animations & interactive state component styling",
      "Pixel-perfect, high-resolution design asset export",
    ],
  },
  {
    id: "ux-research",
    number: "02",
    title: "User Experience (UX) Research & Wireframing",
    subtitle: "Data-driven user flow mapping, low-fidelity wireframes, and friction reduction.",
    description:
      "Great interfaces start with understanding user behavior. We perform user research, map out intuitive site architecture, create low-fidelity wireframes, and streamline multi-step user flows to eliminate usability bottlenecks.",
    details: [
      "User persona development & journey mapping",
      "Information architecture & site tree planning",
      "Low-fidelity wireframing for rapid concept validation",
      "Task-flow optimization & reduction of user friction",
      "Usability heuristics compliance audit",
    ],
  },
  {
    id: "mobile-web-interface",
    number: "03",
    title: "Mobile & Responsive Web Design",
    subtitle: "Fluid responsive layouts engineered for seamless desktop, tablet, and mobile touch UX.",
    description:
      "Deliver flawless user experiences across all screen sizes. We craft fluid responsive designs that automatically adapt to desktop displays, tablet orientation, and mobile thumb-zone interactions.",
    details: [
      "Mobile-first responsive design framework",
      "Ergonomic mobile thumb-zone interaction patterns",
      "Adaptive breakpoint layouts (Desktop, Tablet, Mobile)",
      "Touch-friendly gestures, swipe actions, and bottom sheets",
      "Cross-browser & cross-device visual rendering verification",
    ],
  },
  {
    id: "design-systems",
    number: "04",
    title: "Design Systems & Component Libraries",
    subtitle: "Scalable design tokens, reusable UI components, and brand documentation.",
    description:
      "Maintain brand consistency as your application scales. We create comprehensive design systems in Figma complete with atomic UI components, color variables, spacing tokens, button states, and form elements.",
    details: [
      "Figma design token architecture (Colors, Spacing, Shadows)",
      "Atomic UI component library (Buttons, Inputs, Cards, Modals)",
      "Interactive component variants & state definitions",
      "Design system documentation & usage guidelines",
      "Sync-ready tokens for React & Tailwind CSS integration",
    ],
  },
  {
    id: "conversion-ux",
    number: "05",
    title: "Conversion-Focused UX & Usability Testing",
    subtitle: "Strategic call-to-action placement and conversion rate optimization (CRO).",
    description:
      "Turn casual visitors into paying customers. We analyze user click paths, conduct A/B testing on CTA placement, eliminate form abandonment friction, and structure content layouts to maximize conversion rates.",
    details: [
      "Conversion Rate Optimization (CRO) UX audit",
      "Strategic CTA placement & visual hierarchy enhancement",
      "Checkout & signup form friction reduction",
      "User session recording analysis & heatmaps review",
      "Usability user testing & feedback iteration loops",
    ],
  },
  {
    id: "figma-prototypes",
    number: "06",
    title: "Interactive Figma Prototypes & Handoff",
    subtitle: "Clickable high-fidelity prototypes allowing seamless developer handoff.",
    description:
      "Validate product concepts before writing a single line of code. We build interactive, clickable Figma prototypes that simulate real app behavior for stakeholder review and developer-friendly code handoff.",
    details: [
      "High-fidelity clickable Figma prototypes with page transitions",
      "Interactive micro-interactions, modal popups & dropdown states",
      "Structured Figma layer naming & clean frame organization",
      "Developer handoff files with CSS specifications & asset exports",
      "Frontend developer walk-through session & design review",
    ],
  },
];

const otherServices = [
  { title: "Web Development", link: "/services/web-development" },
  { title: "Mobile App Development", link: "/services/mobile-app-development" },
  { title: "SEO Services", link: "/services/seo-services" },
  { title: "Digital Marketing", link: "/services/digital-marketing" },
  { title: "E-Commerce Development", link: "/services/ecommerce-development" },
];

export default function UiUxDesignPage() {
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
            backgroundImage: `url('https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=2000&q=80')`,
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
              UI/UX Design Agency in{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
                Pune
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-md md:text-lg leading-relaxed">
              Craft intuitive user interfaces and effortless digital experiences for websites and mobile applications with UI/UX design services in Pune.
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
              Our UI/UX Design Services
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Select any capability on the left to view detailed design deliverables, technical architecture, and specs.
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
                    <span>Design Specifications</span>
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
                    <span>Key Design Deliverables</span>
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
              Why Choose Jisnu Digital for UI/UX Design?
            </h2>
            <p className="text-slate-600 text-base">
              We bridge user empathy with high-end visual design to build products that deliver high user engagement and retention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
                <Palette className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Modern Aesthetic Excellence</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Pixel-perfect interfaces featuring modern typography, rich color palettes, and glassmorphism styling.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">User Research-Driven Architecture</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  In-depth wireframing and user journey mapping designed to eliminate navigation friction points.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
                <Figma className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Scalable Figma Component Systems</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Structured design tokens, variant components, and organized layers ready for clean developer handoff.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Focus on Conversion Rates</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Strategic CTA placement, clear visual hierarchy, and optimized checkout user flows for higher conversion.
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
