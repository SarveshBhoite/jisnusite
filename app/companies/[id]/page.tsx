"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight, MapPin, Globe, Award } from "lucide-react"
import { useParams } from "next/navigation"

const companiesData: Record<string, any> = {
  "tech-startup-co": {
    name: "TechStart Innovation",
    category: "Technology",
    location: "San Francisco, CA",
    founded: "2018",
    website: "techstart.io",
    logo: "/logo-placeholder.png",
    hero: "/modern-ecommerce-platform.jpg",
    overview:
      "TechStart Innovation builds modern fintech platforms that simplify digital payments for businesses worldwide.",
    mission:
      "To empower businesses with secure, scalable, and accessible financial technology.",
    achievements: [
      "Processed $2B+ in transactions",
      "Operating in 45+ countries",
      "Awarded Best Fintech Startup",
      "98% customer satisfaction",
    ],
    gallery: [
      "/modern-ecommerce-platform.jpg",
      "/analytics-dashboard-interface.jpg",
      "/brand-identity-design.jpg",
    ],
  },
}

export default function CompanyDetailPage() {
  const params = useParams()
  const company = companiesData[params.id as string]

  if (!company) {
    return (
      <main className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-semibold mb-4">
            Company not found
          </h1>
          <Link href="/companies" className="text-primary font-medium">
            ← Back to companies
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-24">

      {/* ===== BACK ===== */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <Link
          href="/companies"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Companies
        </Link>
      </div>

      {/* ===== HERO ===== */}
      <section className="relative h-[420px] overflow-hidden">
        <img
          src={company.hero}
          alt={company.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="absolute bottom-0 w-full">
          <div className="max-w-7xl mx-auto px-4 pb-10">
            <span className="inline-block mb-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs">
              {company.category}
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-white">
              {company.name}
            </h1>
          </div>
        </div>
      </section>

      {/* ===== BASIC INFO ===== */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 space-y-14">

          {/* Meta */}
          <div className="grid md:grid-cols-3 gap-6 border-b border-border pb-10">
            <div>
              <p className="text-xs uppercase text-muted-foreground mb-1">
                Location
              </p>
              <p className="flex items-center gap-2 font-medium">
                <MapPin className="w-4 h-4 text-primary" />
                {company.location}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase text-muted-foreground mb-1">
                Founded
              </p>
              <p className="font-medium">{company.founded}</p>
            </div>

            <div>
              <p className="text-xs uppercase text-muted-foreground mb-1">
                Website
              </p>
              <a
                href={`https://${company.website}`}
                target="_blank"
                className="flex items-center gap-2 text-primary font-medium hover:underline"
              >
                <Globe className="w-4 h-4" />
                {company.website}
              </a>
            </div>
          </div>

          {/* About */}
          <div>
            <h2 className="font-display text-2xl font-semibold mb-4">
              About the company
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {company.overview}
            </p>
          </div>

          {/* Mission */}
          <div className="p-6 rounded-2xl glass border border-border flex gap-4">
            <Award className="w-6 h-6 text-primary mt-1" />
            <div>
              <h3 className="font-display text-lg font-semibold mb-2">
                Mission
              </h3>
              <p className="text-muted-foreground">
                {company.mission}
              </p>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h2 className="font-display text-2xl font-semibold mb-6">
              Achievements
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {company.achievements.map((item: string, i: number) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-border bg-muted/30"
                >
                  <p className="font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-semibold mb-4">
            Want to collaborate with {company.name}?
          </h2>
          <p className="text-muted-foreground mb-8">
            Get in touch and explore partnership opportunities.
          </p>
          <Link href="/contact">
            <button className="px-8 py-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition inline-flex items-center gap-2">
              Contact Us <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>

    </main>
  )
}
