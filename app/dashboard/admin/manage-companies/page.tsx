"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, Pencil, Search } from "lucide-react"

const companies = [
  {
    id: "tech-startup-co",
    name: "TechStart Innovation",
    category: "Technology",
    image: "/modern-ecommerce-platform.jpg",
    location: "San Francisco, CA",
    plan: "Paid",
  },
  {
    id: "fashion-hub",
    name: "Fashion Hub",
    category: "Retail",
    image: "/brand-identity-design.jpg",
    location: "New York, NY",
    plan: "Free",
  },
  {
    id: "health-wellness",
    name: "Health & Wellness Co",
    category: "Healthcare",
    image: "/mobile-application-design.jpg",
    location: "Boston, MA",
    plan: "Paid",
  },
  {
    id: "sustainable-future",
    name: "Sustainable Future",
    category: "Sustainability",
    image: "/analytics-dashboard-interface.jpg",
    location: "Portland, OR",
    plan: "Free",
  },
]

export default function ManageCompaniesPage() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"All" | "Paid" | "Free">("All")

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.name
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesFilter =
      filter === "All" ? true : company.plan === filter

    return matchesSearch && matchesFilter
  })

  return (
    <main className="pt-20 pb-24">

      {/* ===== HEADER ===== */}
      <section className="pb-10 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="font-display text-3xl font-semibold mb-1">
            Manage Companies
          </h1>
          <p className="text-muted-foreground">
            View and manage all approved companies
          </p>
        </div>
      </section>

      {/* ===== FILTERS ===== */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-4 md:items-center justify-between">

          {/* Search */}
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-md border border-border bg-background focus:outline-none focus:border-primary"
            />
          </div>

          {/* Filter */}
          <div className="flex gap-2">
            {["All", "Paid", "Free"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type as any)}
                className={`px-4 py-2 rounded-md text-sm font-medium border transition ${
                  filter === type
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border hover:border-primary/40"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* ===== COMPANIES GRID ===== */}
      <section>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredCompanies.length === 0 && (
            <div className="col-span-full py-20 text-center text-muted-foreground">
              No companies found
            </div>
          )}

          {filteredCompanies.map((company) => (
            <div
              key={company.id}
              className="group rounded-2xl overflow-hidden border border-border bg-background hover:border-primary/40 transition hover:-translate-y-1"
            >

              {/* IMAGE */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={company.image}
                  alt={company.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/10" />

                {/* PLAN BADGE */}
                <span
                  className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${
                    company.plan === "Paid"
                      ? "bg-green-600 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {company.plan}
                </span>

                {/* EDIT ICON */}
                <Link
                  href={`/dashboard/admin/manage-companies/${company.id}`}
                  className="absolute top-4 right-4 p-2 rounded-md bg-background/90 border border-border hover:border-primary transition"
                >
                  <Pencil className="w-4 h-4 text-primary" />
                </Link>
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <span className="text-xs text-primary font-medium">
                  {company.category}
                </span>

                <h3 className="font-display text-xl font-semibold mt-1 mb-3">
                  {company.name}
                </h3>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  {company.location}
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

    </main>
  )
}
