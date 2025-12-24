"use client"

import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"

const companies = [
  {
    id: "tech-startup-co",
    name: "TechStart Innovation",
    category: "Technology",
    image: "/modern-ecommerce-platform.jpg",
    description: "Leading fintech solutions provider transforming digital payments.",
    location: "San Francisco, CA",
  },
  {
    id: "fashion-hub",
    name: "Fashion Hub",
    category: "Retail",
    image: "/brand-identity-design.jpg",
    description: "Curated fashion marketplace connecting designers with customers.",
    location: "New York, NY",
  },
  {
    id: "health-wellness",
    name: "Health & Wellness Co",
    category: "Healthcare",
    image: "/mobile-application-design.jpg",
    description: "Digital health platform providing personalized wellness solutions.",
    location: "Boston, MA",
  },
  {
    id: "sustainable-future",
    name: "Sustainable Future",
    category: "Sustainability",
    image: "/analytics-dashboard-interface.jpg",
    description: "Eco-friendly products and solutions for sustainable living.",
    location: "Portland, OR",
  },
]

export default function CompaniesPage() {
  return (
    <main className="pt-24">

      {/* ===== HERO ===== */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="font-display text-5xl md:text-6xl font-semibold mb-6">
              Featured{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Companies
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Discover companies partnering with Jisnu Digital to build impactful
              digital products and solutions.
            </p>
          </div>
        </div>
      </section>

      {/* ===== LIST YOUR COMPANY CTA (PRIMARY ENTRY POINT) ===== */}
      <section className="py-12 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl font-semibold mb-2">
              Want to list your company?
            </h2>
            <p className="text-muted-foreground">
              Submit your company details. Once approved by our team, your company
              will be featured here.
            </p>
          </div>

          <Link href="/companies/list-your-company">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition">
              List Your Company
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>

      {/* ===== COMPANIES GRID ===== */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <Link
              key={company.id}
              href={`/companies/${company.id}`}
              className="group"
            >
              <article className="h-full rounded-2xl overflow-hidden border border-border bg-background hover:border-primary/40 transition hover:-translate-y-1">

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={company.image}
                    alt={company.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                      {company.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col h-full">
                  <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition">
                    {company.name}
                  </h3>

                  <p className="text-sm text-muted-foreground flex-grow mb-4">
                    {company.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground border-t border-border pt-4">
                    <MapPin className="w-4 h-4 text-primary" />
                    {company.location}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl font-semibold mb-4">
            Grow with Jisnu Digital
          </h2>
          <p className="text-muted-foreground mb-8">
            We collaborate with forward-thinking companies to build scalable,
            high-quality digital products.
          </p>

          <Link href="/companies/list-your-company">
            <button className="px-8 py-4 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition">
              List Your Company
            </button>
          </Link>
        </div>
      </section>

    </main>
  )
}
