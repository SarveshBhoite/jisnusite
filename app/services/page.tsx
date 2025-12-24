"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  Code,
  PenTool,
  TrendingUp,
  Zap,
  Smartphone,
  Globe,
  ShoppingCart,
} from "lucide-react"

const servicesData = [
  {
    id: "web-development",
    icon: Code,
    title: "Web Development",
    description: "Custom-built websites and applications with cutting-edge technology.",
    price: "Starting at ₹40,000",
  },
  {
    id: "ui-ux-design",
    icon: PenTool,
    title: "UI/UX Design",
    description: "User-centric designs that convert and engage.",
    price: "Starting at ₹25,000",
  },
  {
    id: "digital-strategy",
    icon: TrendingUp,
    title: "Digital Strategy",
    description: "Data-driven strategies tailored to your business goals.",
    price: "Starting at ₹30,000",
  },
  {
    id: "mobile-development",
    icon: Smartphone,
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications.",
    price: "Starting at ₹60,000",
  },
  {
    id: "branding",
    icon: Globe,
    title: "Branding",
    description: "Complete brand identity and positioning solutions.",
    price: "Starting at ₹35,000",
  },
  {
    id: "digital-marketing",
    icon: Zap,
    title: "Digital Marketing",
    description: "SEO, social media, and content marketing services.",
    price: "Starting at ₹15,000 / month",
  },
]

export default function ServicesPage() {
  const router = useRouter()

  const addToCart = (service: any) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")

    // avoid duplicates
    if (!existingCart.find((item: any) => item.serviceId === service.id)) {
      existingCart.push({
        serviceId: service.id,
        serviceName: service.title,
        price: service.price,
      })
      localStorage.setItem("cart", JSON.stringify(existingCart))
    }

    router.push("/cart")
  }

  return (
    <main className="pt-24">

      {/* ================= HERO ================= */}
      <section className="py-20 bg-muted/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-6">
            Our Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Explore our services, view details, and add the ones you need to your cart.
            You can submit a request once you’re ready.
          </p>
        </div>
      </section>

      {/* ================= SERVICES GRID ================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="p-8 rounded-xl border border-border bg-background flex flex-col hover:border-primary/40 transition"
            >
              {/* Clickable service */}
              <Link href={`/services/${service.id}`} className="group">
                <service.icon className="w-12 h-12 text-primary mb-5 group-hover:scale-110 transition-transform" />
                <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition">
                  {service.title}
                </h3>
              </Link>

              <p className="text-sm text-muted-foreground mb-4 flex-grow">
                {service.description}
              </p>

              <p className="text-primary font-medium mb-4">
                {service.price}
              </p>

              <div className="flex items-center justify-between gap-3">
                <Link
                  href={`/services/${service.id}`}
                  className="text-sm text-primary font-medium hover:underline inline-flex items-center gap-1"
                >
                  View Details <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => addToCart(service)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-primary text-primary text-sm font-medium hover:bg-primary hover:text-white transition"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}
