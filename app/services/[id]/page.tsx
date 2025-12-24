"use client"

import Link from "next/link"
import { ArrowLeft, Check, ShoppingCart } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

const serviceDetailsData: Record<string, any> = {
  "web-development": {
    title: "Web Development",
    description:
      "Transform your ideas into high-performance, scalable web applications tailored to your business goals.",
    hero: "/web-development-services.jpg",
    content: {
      overview:
        "Our web development team builds custom, scalable solutions using modern technologies and best practices. From simple websites to complex platforms, we focus on performance, security, and long-term scalability.",
      benefits: [
        "Custom static & dynamic websites",
        "Modern tech stack (Next.js, React, Node)",
        "Responsive design for all devices",
        "SEO & performance optimized",
        "Secure and scalable architecture",
        "Ongoing maintenance & support",
      ],
      process: [
        { step: 1, title: "Requirement Analysis", description: "Understanding business goals and scope" },
        { step: 2, title: "Planning", description: "Architecture, timelines, and tech decisions" },
        { step: 3, title: "Design", description: "UI/UX aligned with your brand" },
        { step: 4, title: "Development", description: "Clean, scalable code implementation" },
        { step: 5, title: "Testing", description: "Quality checks and performance validation" },
        { step: 6, title: "Launch & Support", description: "Deployment and post-launch support" },
      ],
    },
  },

  "ui-ux-design": {
    title: "UI / UX Design",
    description:
      "Design intuitive, visually appealing digital experiences that engage users and drive conversions.",
    hero: "/ui-ux-design-services.jpg",
    content: {
      overview:
        "We design user-first interfaces backed by research and usability principles. Our UI/UX process ensures clarity, consistency, and conversion-focused layouts.",
      benefits: [
        "User research & wireframing",
        "Modern, clean UI design",
        "Mobile-first & responsive layouts",
        "Interactive prototypes",
        "Accessibility-focused design",
        "Developer-ready handoff",
      ],
      process: [
        { step: 1, title: "Research", description: "Understanding users and business goals" },
        { step: 2, title: "Wireframes", description: "Structuring layouts and flows" },
        { step: 3, title: "Visual Design", description: "High-fidelity UI design" },
        { step: 4, title: "Prototyping", description: "Clickable interactive prototypes" },
        { step: 5, title: "Review", description: "Feedback and iterations" },
        { step: 6, title: "Handoff", description: "Assets & specs for development" },
      ],
    },
  },

  "digital-strategy": {
    title: "Digital Strategy",
    description:
      "Create a clear, actionable digital roadmap aligned with your business vision.",
    hero: "/digital-strategy-services.jpg",
    content: {
      overview:
        "We help businesses define digital direction by analyzing market trends, competitors, and growth opportunities.",
      benefits: [
        "Market & competitor analysis",
        "Technology recommendations",
        "Customer journey mapping",
        "Growth opportunity identification",
        "Execution roadmap",
        "KPI & success metrics",
      ],
      process: [
        { step: 1, title: "Audit", description: "Business & digital presence review" },
        { step: 2, title: "Research", description: "Market & user analysis" },
        { step: 3, title: "Strategy", description: "Digital roadmap creation" },
        { step: 4, title: "Planning", description: "Execution milestones" },
        { step: 5, title: "Presentation", description: "Strategy walkthrough" },
        { step: 6, title: "Support", description: "Execution guidance" },
      ],
    },
  },
}

export default function ServiceDetailPage() {
  const params = useParams()
  const router = useRouter()
  const serviceId = params.id as string
  const service = serviceDetailsData[serviceId]

  if (!service) {
    return (
      <main className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold mb-4">Service Not Found</h1>
          <Link href="/services" className="text-primary font-medium flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
        </div>
      </main>
    )
  }

  const addServiceToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")

    cart.push({
      serviceId,
      serviceName: service.title,
    })

    localStorage.setItem("cart", JSON.stringify(cart))
    router.push("/cart")
  }

  return (
    <main className="pt-20">

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/services" className="flex items-center gap-2 text-primary font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </Link>
      </div>

      {/* Hero */}
      <section className="relative h-[420px] overflow-hidden">
        <img src={service.hero} alt={service.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4">

          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">
            {service.title}
          </h1>

          <p className="text-lg text-muted-foreground mb-12">
            {service.description}
          </p>

          {/* Overview */}
          <div className="mb-16">
            <h2 className="font-display text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              {service.content.overview}
            </p>
          </div>

          {/* Included */}
          <div className="mb-16">
            <h2 className="font-display text-2xl font-semibold mb-6">
              What’s Included
            </h2>

            <ul className="grid md:grid-cols-2 gap-4">
              {service.content.benefits.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Process */}
          <div className="mb-20">
            <h2 className="font-display text-2xl font-semibold mb-10">
              Our Process
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {service.content.process.map((step: any) => (
                <div
                  key={step.step}
                  className="p-6 rounded-xl border border-border bg-muted/40"
                >
                  <div className="w-10 h-10 rounded-md bg-primary text-white flex items-center justify-center font-medium mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-medium mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-2xl border border-border bg-muted/30 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-xl font-semibold mb-2">
                Interested in this service?
              </h3>
              <p className="text-muted-foreground text-sm max-w-md">
                Add this service to your cart. Our team will discuss your
                requirements and share a custom quotation.
              </p>
            </div>

            <button
              onClick={addServiceToCart}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition"
            >
              <ShoppingCart className="w-4 h-4" />
              Add Service to Cart
            </button>
          </div>

        </div>
      </section>
    </main>
  )
}
