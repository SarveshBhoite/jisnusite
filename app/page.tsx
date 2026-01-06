"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [services, setServices] = useState<any[]>([]);
  // 1. Portfolio state add ki
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Services aur Portfolio dono fetch kar rahe hain
        const [servRes, portRes] = await Promise.all([
          fetch("/api/admin/services", { cache: "no-store" }),
          fetch("/api/admin/portfolio", { cache: "no-store" })
        ]);

        const sData = await servRes.json();
        const pData = await portRes.json();

        setServices(sData.slice(0, 3));
        // 2. Sirf latest 4 projects uthayenge
        const cleanPort = Array.isArray(pData) ? pData : (pData.data || []);
        setPortfolio(cleanPort.slice(0, 4));
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <main>
      {/* ================= HERO ================= */}
      <section className="relative pt-28 md:pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <span className="inline-block text-sm font-medium text-primary">
                Digital solutions for growing businesses
              </span>

              <h1 className="font-display text-4xl md:text-5xl xl:text-6xl font-semibold leading-tight tracking-tight">
                We design & build
                <br />
                <span className="text-primary">digital experiences</span>
                <br />
                that grow brands
              </h1>

              <p className="text-base md:text-lg text-muted-foreground max-w-xl">
                Jisnu Digital Solutions helps businesses establish a strong
                digital presence through thoughtfully designed websites,
                scalable technology, and result-driven digital strategies.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/services">
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition">
                    View Services <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>

                <Link href="/portfolio">
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-border text-sm font-medium hover:bg-muted transition">
                    Our Work
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-border bg-muted">
                <Image
                  src="/hero-placeholder.jpg"
                  alt="Jisnu Digital Work"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRUST / STATS ================= */}
      <section className="border-y border-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { label: "Projects Delivered", value: "200+" },
              { label: "Client Retention", value: "95%" },
              { label: "Years of Experience", value: "8+" },
              { label: "Industries Served", value: "15+" },
            ].map((item, i) => (
              <div key={i}>
                <p className="font-display text-3xl font-semibold">
                  {item.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ABOUT COMPANY ================= */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* About Text */}
            <div className="space-y-6 max-w-xl">
              <h2 className="font-display text-3xl md:text-4xl font-semibold">
                About Jisnu Digital Solutions
              </h2>

              <p className="text-muted-foreground leading-relaxed">
                Jisnu Digital Solutions is a digital services company focused on
                building reliable, scalable, and visually clear digital
                products. We work closely with businesses to understand their
                goals and translate them into effective digital solutions.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Our approach combines design thinking, modern development
                practices, and data-driven strategies to ensure long-term value
                rather than short-term hype.
              </p>

              <Link href="/about">
                <button className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                  Learn more about us <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>

            {/* About Visual */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-border bg-muted">
                <Image
                  src="/about-placeholder.jpg"
                  alt="About Jisnu Digital"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-15 relative overflow-hidden">
        {/* Background Subtle Gradient Blobs */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-px w-8 bg-primary"></span>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">
                  Specializations
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-none uppercase italic">
                Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                  Services
                </span>
              </h2>
              <p className="mt-6 text-lg text-slate-500 max-w-lg leading-relaxed">
                Empowering brands with cutting-edge digital solutions tailored
                for scalable growth.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary/20" />
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((s, i) => (
                <div
                  key={s._id}
                  className="group relative p-10 rounded-[2.5rem] border border-slate-100 bg-white hover:border-primary/20 transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-2xl hover:shadow-primary/5"
                >
                  {/* Floating Icon */}
                  <div className="relative w-14 h-14 mb-8 rounded-2xl bg-slate-900 flex items-center justify-center text-white overflow-hidden group-hover:scale-110 transition-transform duration-500">
                    <span className="relative z-10 font-black text-xl italic">
                      {s.title.charAt(0)}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors uppercase italic">
                    {s.title}
                  </h3>

                  <p className="text-slate-800 text-sm leading-relaxed  whitespace-pre-wrap break-words">
                    {s.description ||
                      "Building robust digital infrastructures with cutting-edge tech stacks."}
                  </p>

                  <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                        Starting from
                      </span>
                      <span className="text-xl font-black text-slate-900">
                        ₹{s.discountPrice.toLocaleString()}
                      </span>
                    </div>

                    <Link href="/services">
                      <div className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform" />
                      </div>
                    </Link>
                  </div>

                  {/* Aesthetic Corner Sparkle */}
                  <Sparkles className="absolute top-6 right-6 w-4 h-4 text-slate-100 group-hover:text-primary/20 transition-colors" />
                </div>
              ))}
            </div>
          )}

          <div className="mt-20 flex justify-center">
            <Link href="/services">
              <button className="group relative px-10 py-5 bg-slate-900 text-white rounded-full font-black uppercase text-xs tracking-[0.2em] overflow-hidden transition-all hover:pr-14 active:scale-95">
                <span className="relative z-10">Explore All Services</span>
                <ArrowRight className="absolute right-6 opacity-0 group-hover:opacity-100 transition-all w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= PORTFOLIO ================= */}
     <section className="py-24 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-semibold">
              Selected Work
            </h2>
            <Link
              href="/portfolio"
              className="text-sm text-primary hover:underline"
            >
              View portfolio
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {loading ? (
              // Loading state placeholders
              [1, 2].map((i) => (
                <div key={i} className="aspect-[16/10] rounded-xl bg-background border border-border animate-pulse" />
              ))
            ) : portfolio.length > 0 ? (
              portfolio.map((project) => (
                <div key={project._id} className="group">
                  {/* Image Part - Above */}
                  <div className="aspect-[16/10] rounded-xl bg-background border border-border overflow-hidden relative shadow-sm">
                    <Image
                      src={project.image || "/project-placeholder.jpg"}
                      alt={project.companyName}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Details Part - Below */}
                  <div className="mt-5 px-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">
                      {project.category}
                    </p>
                    <h3 className="text-xl font-bold text-foreground italic uppercase">
                      {project.companyName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {project.serviceName}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground italic">No projects added yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* ================= BLOG ================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-3">
              Insights & Articles
            </h2>
            <p className="text-muted-foreground">
              Thoughts on design, development, and digital growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-border hover:border-primary/40 transition"
              >
                <p className="text-xs text-muted-foreground mb-2">
                  December 2024
                </p>
                <h3 className="font-display text-lg font-semibold mb-2">
                  Designing scalable digital products
                </h3>
                <p className="text-sm text-muted-foreground">
                  Key principles for building products that grow with your
                  business.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-5">
            Let’s build something meaningful
          </h2>
          <p className="text-muted-foreground mb-8">
            Tell us about your project and we’ll help you turn your ideas into a
            powerful digital product.
          </p>
          <Link href="/contact">
            <button className="inline-flex items-center gap-2 px-7 py-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition">
              Contact Us <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
