"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Globe,
  Code2,
  Cpu,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  Zap,
  ChevronDown,
  Layout,
  Smartphone,
  ShieldCheck,
  Search,
  Check,
  Loader2,
  Sparkles,
} from "lucide-react";

const detailedServices = [
  {
    id: "business-websites",
    number: "01",
    title: "Business Website Development",
    subtitle: "Establish brand trust, present your services clearly, and convert qualified visitors into inquiries.",
    description:
      "A professional business website serves as the digital front door to your enterprise. At Jisnu Digital, we build custom business websites that clearly communicate your company's value proposition, showcase your services, and establish instant credibility with prospective clients. Our team ensures your site is equipped with intuitive navigation, prominent call-to-action touchpoints, fast loading speeds, and integrated inquiry forms.",
    details: [
      "Custom UI/UX layout crafted specifically around your brand guidelines and color identity.",
      "Conversion-focused contact forms, WhatsApp click-to-chat, and direct call integrations.",
      "Fully responsive engineering guaranteeing seamless viewing across desktop, tablet, and mobile devices.",
      "On-page technical SEO foundations including structured data schema and clean HTML markup.",
      "Google Business Profile map integration and local search optimization.",
    ],
  },
  {
    id: "corporate-websites",
    number: "02",
    title: "Corporate Website Development",
    subtitle: "Scalable enterprise web portals designed for multi-department organizations and corporate brands.",
    description:
      "Large corporate organizations require robust, multi-page web architectures capable of presenting complex corporate information, investor updates, service portfolios, and career portals smoothly. We build corporate websites structured around logical content hierarchies, enterprise-grade data security, role-based content access, and high-performance server hosting to ensure maximum uptime and corporate authority.",
    details: [
      "Multi-level content hierarchy designed for intuitive navigation through complex organization structures.",
      "Corporate governance, leadership, news, press release, and career portal modules.",
      "SSL certificate implementation, data encryption, and server-level security hardening.",
      "Third-party CRM, ERP, and marketing automation software integrations.",
      "Analytics tracking configuration for monitoring user engagement and key conversions.",
    ],
  },
  {
    id: "custom-web-apps",
    number: "03",
    title: "Custom Web Application Development",
    subtitle: "Bespoke SaaS platforms, client portals, and web software built around your unique business workflows.",
    description:
      "Off-the-shelf software often fails to address unique business operations. Our custom web application development services deliver bespoke web software engineered specifically for your internal workflows, client management systems, SaaS products, or automated data processing needs. Utilizing modern tech stacks like Next.js, React, Node.js, and MongoDB, we build secure, high-speed web apps built to scale.",
    details: [
      "Tailored database architecture and RESTful API development for fast data processing.",
      "Secure user authentication workflows including JWT, OAuth, and multi-factor authentication.",
      "Interactive administrative dashboards with real-time reporting and analytics charts.",
      "Automated email notifications, invoice generation, and PDF report creation.",
      "Cloud deployment on AWS, Vercel, or custom server infrastructure with high availability.",
    ],
  },
  {
    id: "ecommerce-development",
    number: "04",
    title: "E-Commerce Development",
    subtitle: "High-converting online shopping platforms with seamless checkout and secure payment integrations.",
    description:
      "Growing an online retail business requires a fast, dependable, and secure e-commerce platform that provides customers with a frictionless buying experience. We build custom e-commerce stores featuring easy product search, detailed product pages, intuitive cart management, and seamless integrations with popular Indian and global payment gateways including Razorpay, Stripe, and UPI.",
    details: [
      "Custom product catalog management supporting variants, categories, and inventory tracking.",
      "Secure, friction-free checkout workflows engineered to minimize cart abandonment rates.",
      "Integration with payment gateways supporting Credit/Debit Cards, Net Banking, and UPI.",
      "Customer account management, order history tracking, and shipping status updates.",
      "Mobile-first m-commerce optimization ensuring smooth smartphone purchasing experiences.",
    ],
  },
  {
    id: "cms-development",
    number: "05",
    title: "CMS Development & Custom Dashboards",
    subtitle: "Empower your marketing team to manage and publish website content easily without writing code.",
    description:
      "Keeping your website updated with fresh content, news, blogs, and product details should not require developer intervention every time. We build flexible Content Management Systems (CMS) using custom WordPress, Headless CMS platforms, or custom admin control panels that allow non-technical staff to create, edit, and publish web content seamlessly.",
    details: [
      "Custom WordPress theme development tailored to your visual identity without bloated plugins.",
      "Headless CMS solutions (Strapi, Sanity) paired with Next.js frontend for maximum speed and security.",
      "Drag-and-drop content block editors for effortless page creation and editing.",
      "Built-in SEO metadata fields allowing your team to update titles, meta descriptions, and alt tags.",
      "Multi-user permission levels for content creators, editors, and administrators.",
    ],
  },
  {
    id: "website-redesign",
    number: "06",
    title: "Website Redesign & Optimization",
    subtitle: "Modernize outdated sites with improved UI/UX, faster loading speeds, and modern mobile responsiveness.",
    description:
      "An outdated website with slow loading times and poor mobile usability can significantly hurt your brand reputation and search engine rankings. Our website redesign and optimization services transform legacy websites into fast, modern, search-engine-friendly digital platforms while carefully preserving your existing search engine indexation and backlink authority.",
    details: [
      "Comprehensive UI/UX design refresh aligned with current modern web standards.",
      "Code refactoring and script optimization to achieve high Core Web Vitals scores.",
      "Full mobile-first responsive restructuring for perfect smartphone display.",
      "SEO URL mapping and 301 redirect management to protect existing organic rankings.",
      "Security audit and removal of outdated, vulnerable third-party code libraries.",
    ],
  },
];



const websiteCategories = [
  {
    title: "Business Websites",
    desc: "Professional online presence for local businesses, consultants, and service providers looking to build online trust and acquire leads.",
  },
  {
    title: "Corporate Portals",
    desc: "Enterprise web platforms for multi-department organizations requiring structured content management and corporate communications.",
  },
  {
    title: "Educational Websites",
    desc: "Interactive portals for schools, academies, and institutes featuring course directories, admission forms, and student information.",
  },
  {
    title: "Healthcare Websites",
    desc: "Patient-friendly, accessible websites for clinics, diagnostic centers, and hospitals with appointment booking capabilities.",
  },
  {
    title: "Real Estate Websites",
    desc: "Feature-rich property listing websites with location filtering, image galleries, floor plans, and direct agent inquiry forms.",
  },
  {
    title: "E-Commerce Stores",
    desc: "Conversion-optimized digital storefronts equipped with secure checkout flows, product catalog management, and payment gateways.",
  },
  {
    title: "Portfolio Websites",
    desc: "Visually creative portfolio websites designed to showcase architecture, design agencies, photography, and creative work.",
  },
  {
    title: "Custom Web Applications",
    desc: "Custom SaaS applications, internal management portals, and workflow tools built to streamline complex business operations.",
  },
];

const whyUsPillars = [
  {
    title: "SEO-Friendly Code Foundation",
    desc: "We build websites using clean, semantic HTML5 tags, structured schema markup, and optimized metadata fields. This provides search engine crawlers with clear signals about your business, helping your pages rank higher in organic search results.",
  },
  {
    title: "Mobile-First Responsive Engineering",
    desc: "With mobile devices driving over 60% of web traffic, every site we build is engineered from the mobile viewport up. We test across screen resolutions to ensure your site displays perfectly on smartphones, tablets, laptops, and wide monitors.",
  },
  {
    title: "Speed & Performance Optimization",
    desc: "Slow websites lose visitors. We optimize code, compress media assets, utilize browser caching, and implement efficient server rendering to achieve fast load speeds and top Core Web Vitals performance scores.",
  },
  {
    title: "Scalable Backend Architecture",
    desc: "Whether you expect 100 or 100,000 visitors, our code architectures are built to scale seamlessly. We write clean, modular code that allows easy future updates, new feature additions, and cloud server scaling.",
  },
  {
    title: "User-Centric UI/UX Design",
    desc: "We focus on human-centered design principles. Our layouts feature clear typography, intuitive navigation structures, and strategically placed call-to-action buttons that guide visitors naturally toward making an inquiry or purchase.",
  },
  {
    title: "Dedicated Post-Launch Support",
    desc: "Our engagement does not end at deployment. We provide comprehensive post-launch technical assistance, regular software updates, security patches, performance monitoring, and content update support.",
  },
];

const processPhases = [
  {
    step: "01",
    title: "Discovery & Requirements Gathering",
    desc: "We begin with a detailed consultation to understand your business objectives, target audience, brand guidelines, functional requirements, and competitive landscape.",
  },
  {
    step: "02",
    title: "Architecture & Wireframe Planning",
    desc: "Our team maps out the site architecture, page hierarchies, database schema, tech stack, and structural wireframes to establish a clear project roadmap.",
  },
  {
    step: "03",
    title: "UI/UX Interface Design",
    desc: "We design custom visual mockups and interactive component prototypes that reflect your brand identity while prioritizing visual clarity and user experience.",
  },
  {
    step: "04",
    title: "Frontend & Backend Development",
    desc: "Our developers write clean, modular frontend code and build secure backend API endpoints, database connections, and CMS integrations.",
  },
  {
    step: "05",
    title: "Rigorous Quality Assurance Testing",
    desc: "We conduct comprehensive testing across cross-browser environments, mobile devices, security protocols, form submissions, and page load speeds.",
  },
  {
    step: "06",
    title: "Production Deployment & Launch",
    desc: "We deploy your web application to production servers, configure SSL encryption, setup domain routing, and submit your site to Google Search Console.",
  },
  {
    step: "07",
    title: "Ongoing Maintenance & Support",
    desc: "We deliver continuous post-launch support including security patches, regular server backups, performance monitoring, and ongoing updates.",
  },
];

const faqsList = [
  {
    q: "How much does website development cost in Pune?",
    a: "Website development cost depends on the project scope, page count, design complexity, custom features, and third-party integrations required. A straightforward business website is very affordable, whereas custom web applications, SaaS platforms, or large e-commerce stores vary based on custom technical requirements. We provide transparent, itemized quotes following our initial consultation.",
  },
  {
    q: "How long does it take to build a custom website?",
    a: "A standard business or corporate website typically takes between 2 to 4 weeks from discovery to final launch. More complex projects such as e-commerce platforms or custom web applications usually require 4 to 8 weeks to complete design, backend development, and quality assurance testing.",
  },
  {
    q: "Will my website be mobile-friendly and responsive?",
    a: "Yes. Every website developed by Jisnu Digital is fully responsive and engineered with a mobile-first approach. Your site will automatically adapt to fit smartphone screens, tablets, laptops, and desktop monitors seamlessly.",
  },
  {
    q: "Do you build SEO-friendly websites?",
    a: "Yes. We build all websites with technical SEO foundations including clean semantic HTML markup, fast page load speeds, structured schema data, optimized meta tags, mobile responsiveness, and clean URL paths to ensure search engine crawlers can index your content easily.",
  },
  {
    q: "Can I update content on my website after it is built?",
    a: "Yes. We can integrate an easy-to-use Content Management System (CMS) such as WordPress or a custom admin dashboard that allows your team to edit text, upload blog posts, add new services, and update imagery without needing technical coding skills.",
  },
  {
    q: "Do you offer e-commerce website development with payment gateways?",
    a: "Yes. We specialize in building secure e-commerce storefronts integrated with popular Indian and global payment gateways including Razorpay, Stripe, Paytm, and UPI, alongside automated order management and shipping tracking tools.",
  },
  {
    q: "Do you provide ongoing website maintenance and support after launch?",
    a: "Yes. We offer reliable ongoing maintenance packages covering software updates, security patches, regular backups, server monitoring, speed enhancements, and technical troubleshooting to keep your website running smoothly.",
  },
];

export default function WebDevelopmentWhitePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [projects, setProjects] = useState<any[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [activeServiceId, setActiveServiceId] = useState(detailedServices[0].id);

  const activeService =
    detailedServices.find((s) => s.id === activeServiceId) || detailedServices[0];

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch("/api/admin/portfolio", { cache: "no-store" });
        const data = await res.json();
        const actualData = Array.isArray(data) ? data : data.data || [];
        const webDevProjects = actualData.filter(
          (p: any) =>
            p.category === "Web Development" ||
            p.serviceName?.toLowerCase().includes("web")
        );
        setProjects(webDevProjects.length > 0 ? webDevProjects : []);
      } catch (err) {
        console.error("Portfolio fetch error:", err);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchPortfolio();
  }, []);

  return (
    <main className="bg-slate-50 text-slate-900 min-h-screen relative">
      
      {/* ===== HERO HEADER (50% VIEWPORT HEIGHT WITH BACKGROUND) ===== */}
      <section className="min-h-[50vh] flex items-center justify-center pt-28 pb-12 md:pt-36 md:pb-16 bg-slate-900 text-white relative overflow-hidden">
        {/* Background Tech Image with Opacity & Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 mix-blend-luminosity scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=2000&q=80')`
          }}
        />

        {/* Semi-Transparent Dark & Blue Gradient Layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/75 to-slate-900/95 backdrop-blur-[2px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full bg-blue-500/15 blur-[140px] rounded-full pointer-events-none" />

        {/* Subtle Tech Grid Lines Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto relative z-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.15] mb-6">
              Web Development Company in{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
                Pune
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-md md:text-lg leading-relaxed">
              Build fast, responsive and SEO-friendly websites with professional web development services in Pune. 
            </p>
          </div>
        </div>
      </section>


      {/* ===== INTERACTIVE SERVICES SHOWCASE (LEFT SELECTION - RIGHT FULL ANIMATED DESCRIPTION) ===== */}
      <section id="services-list" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-blue-600 font-bold text-xs uppercase tracking-widest block mb-3">
              WHAT WE OFFER
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Our Web Development Services
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
          
          <div className="max-w-3xl mb-16 text-center mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
              Why Choose Jisnu Digital for Web Development?
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              We focus on delivering high-performing web platforms engineered for search engine visibility, rapid loading speed, intuitive user interaction, and seamless long-term scalability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyUsPillars.map((pillar, pIdx) => (
              <div key={pIdx} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{pillar.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ===== SEO & TECHNICAL PERFORMANCE ===== */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7">
              <span className="text-blue-600 font-bold text-xs uppercase tracking-widest block mb-3">
                TECHNICAL SEO & SPEED FOUNDATIONS
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-6">
                SEO-Friendly & High-Performance Web Development
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                A visually pleasing website is ineffective if search engines cannot crawl it properly or users abandon pages due to slow load speeds. We build websites with technical SEO best practices embedded directly into the codebase.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed">
                From semantic HTML5 layout structures and Core Web Vitals performance optimization to structured schema tags and XML sitemaps, our technical engineering ensures your web presence has a strong organic search foundation.
              </p>
            </div>

            <div className="lg:col-span-5 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Core Performance Pillars:</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Semantic HTML5 Markup & Heading Hierarchy</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Mobile-First Responsive Layout Engineering</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Image Compression & Next-Gen Format Delivery</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Structured Data Schema Markup Integration</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Technical Crawlability & XML Sitemap Setup</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== FEATURED PROJECTS ===== */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-blue-600 font-bold text-xs uppercase tracking-widest block mb-3">
                FEATURED WORK
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Our Web Development Projects
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 mt-4 md:mt-0 transition-colors"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loadingProjects ? (
            <div className="py-12 text-center text-slate-500">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600 mb-2" />
              <span>Loading projects...</span>
            </div>
          ) : projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.slice(0, 3).map((item) => (
                <div
                  key={item._id}
                  className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-sm"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-slate-200">
                    <img
                      src={item.image || "/project-placeholder.jpg"}
                      alt={item.companyName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] font-bold uppercase text-blue-600 block mb-1">
                      {item.category || "Web Development"}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.companyName}</h3>
                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 mb-4">
                      {item.description || item.serviceName}
                    </p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800"
                    >
                      <span>Inquire Similar Project</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 text-sm">
              Explore our extensive portfolio of verified web development client projects on our dedicated <Link href="/portfolio" className="text-blue-600 underline font-bold">Portfolio Page</Link>.
            </div>
          )}

        </div>
      </section>

      {/* ===== FREQUENTLY ASKED QUESTIONS ===== */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Clear answers regarding pricing, timelines, technical SEO, and post-launch support.
            </p>
          </div>

          <div className="space-y-4">
            {faqsList.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    <span className="text-base sm:text-lg">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-blue-600 transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ===== FINAL CTA SECTION & SIBLING NAVIGATION ===== */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-400/30 text-blue-300 flex items-center justify-center mx-auto mb-6">
            <Zap className="w-7 h-7 text-amber-400 animate-pulse" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6">
            Ready to Build Your Website?
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Tell us about your project requirements and our engineering team will help you plan the right web development solution for your business.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-95"
            >
              <span>Get Free Consultation</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold px-8 py-4 rounded-xl transition-all hover:text-white"
            >
              <span>Start Your Project</span>
              <ArrowUpRight className="w-5 h-5 text-blue-400" />
            </Link>
          </div>

          {/* Internal Sibling Links */}
          <div className="mt-16 pt-12 border-t border-slate-800 flex flex-wrap justify-center gap-3 text-xs">
            <span className="text-slate-400 font-bold self-center mr-2">Explore Other Services:</span>
            <Link href="/services/seo-services" className="px-3.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:border-blue-400/40 transition-colors">
              SEO Services
            </Link>
            <Link href="/services/mobile-app-development" className="px-3.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:border-blue-400/40 transition-colors">
              Mobile App Development
            </Link>
            <Link href="/services/digital-marketing" className="px-3.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:border-blue-400/40 transition-colors">
              Digital Marketing
            </Link>
            <Link href="/services/ui-ux-design" className="px-3.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:border-blue-400/40 transition-colors">
              UI/UX Design
            </Link>
            <Link href="/services/ecommerce-development" className="px-3.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:border-blue-400/40 transition-colors">
              E-Commerce Development
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}
