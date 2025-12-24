"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function Home() {
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
                Jisnu Digital Solutions helps businesses establish a strong digital presence
                through thoughtfully designed websites, scalable technology, and
                result-driven digital strategies.
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
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* About Text */}
            <div className="space-y-6 max-w-xl">
              <h2 className="font-display text-3xl md:text-4xl font-semibold">
                About Jisnu Digital Solutions
              </h2>

              <p className="text-muted-foreground leading-relaxed">
                Jisnu Digital Solutions is a digital services company focused on
                building reliable, scalable, and visually clear digital products.
                We work closely with businesses to understand their goals and
                translate them into effective digital solutions.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Our approach combines design thinking, modern development practices,
                and data-driven strategies to ensure long-term value rather than
                short-term hype.
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
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-2xl mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Our Services
            </h2>
            <p className="text-muted-foreground">
              End-to-end digital services designed to help businesses grow,
              scale, and stand out online.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Website Design & Development",
                desc: "High-performance websites built with modern technologies, optimized for speed, SEO, and conversions.",
              },
              {
                title: "UI / UX & Brand Design",
                desc: "Clean, user-focused interfaces and visual systems that communicate trust and clarity.",
              },
              {
                title: "Digital Marketing & SEO",
                desc: "Data-driven strategies to increase visibility, engagement, and measurable growth.",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="p-8 rounded-xl border border-border hover:border-primary/40 transition"
              >
                <h3 className="font-display text-xl font-semibold mb-3">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link href="/services">
              <button className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                View all services <ArrowRight className="w-4 h-4" />
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
            <Link href="/portfolio" className="text-sm text-primary hover:underline">
              View portfolio
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-[16/10] rounded-xl bg-background border border-border overflow-hidden"
              >
                <Image
                  src="/project-placeholder.jpg"
                  alt="Project"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
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
                  Key principles for building products that grow with your business.
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
            Tell us about your project and we’ll help you turn your ideas
            into a powerful digital product.
          </p>
          <Link href="/contact">
            <button className="inline-flex items-center gap-2 px-7 py-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition">
              Contact Us <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>

    </main>
  )
}
