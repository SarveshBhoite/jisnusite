"use client"

import { useState } from "react"
import { X } from "lucide-react"

const portfolioItems = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Development",
    image: "/modern-ecommerce-platform.jpg",
    description:
      "A complete e-commerce solution with product catalog, shopping cart, and payment integration.",
    client: "Fashion Retailer",
    year: "2024",
    result: "300% increase in online sales",
  },
  {
    id: 2,
    title: "SaaS Dashboard",
    category: "UI/UX Design",
    image: "/analytics-dashboard-interface.jpg",
    description:
      "Intuitive analytics dashboard for tracking business metrics and performance data.",
    client: "Tech Startup",
    year: "2024",
    result: "User engagement up 85%",
  },
  {
    id: 3,
    title: "Mobile App",
    category: "App Development",
    image: "/mobile-application-design.jpg",
    description:
      "Cross-platform mobile application with real-time synchronization.",
    client: "Health & Fitness",
    year: "2023",
    result: "1M+ downloads",
  },
  {
    id: 4,
    title: "Brand Identity",
    category: "Branding",
    image: "/brand-identity-design.jpg",
    description:
      "Complete brand identity system including logo, guidelines, and assets.",
    client: "Digital Agency",
    year: "2023",
    result: "Brand recognition +150%",
  },
]

const categories = [
  "All",
  "Web Development",
  "UI/UX Design",
  "App Development",
  "Branding",
]

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [activeItem, setActiveItem] =
    useState<(typeof portfolioItems)[0] | null>(null)

  const filtered =
    selectedCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((p) => p.category === selectedCategory)

  return (
    <main className="pt-28">

      {/* ===== HERO ===== */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">
            Our Work
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            A selection of projects showcasing how we help businesses
            design, build, and grow digital products.
          </p>
        </div>
      </section>

      {/* ===== FILTER ===== */}
      <section className="sticky top-20 z-40 bg-background/80 backdrop-blur-md border-y border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex gap-3 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ===== GRID ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative overflow-hidden rounded-xl border border-border bg-background text-left hover:border-primary/40 transition"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              <div className="p-5">
                <p className="text-xs text-primary font-medium mb-1">
                  {item.category}
                </p>
                <h3 className="font-display text-lg font-semibold">
                  {item.title}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ===== MODAL ===== */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={() => setActiveItem(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-background rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in duration-200"
          >
            {/* Close */}
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 p-2 rounded-md bg-black/60 text-white hover:bg-black/80"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image */}
            <div className="aspect-[16/9]">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              <div>
                <p className="text-sm text-primary font-medium mb-1">
                  {activeItem.category}
                </p>
                <h2 className="font-display text-3xl font-semibold mb-2">
                  {activeItem.title}
                </h2>
                <p className="text-muted-foreground">
                  {activeItem.description}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 border-y border-border py-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Client</p>
                  <p className="font-medium">{activeItem.client}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Year</p>
                  <p className="font-medium">{activeItem.year}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Result</p>
                  <p className="font-medium text-primary">
                    {activeItem.result}
                  </p>
                </div>
              </div>

              <a
                href="/contact"
                className="inline-flex justify-center px-6 py-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition"
              >
                Start a Project
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
