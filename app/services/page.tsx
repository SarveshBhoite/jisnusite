"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import * as LucideIcons from "lucide-react" // Saare icons import karein
import { ArrowRight, ShoppingCart, Loader2 } from "lucide-react"

export default function ServicesPage() {
  const router = useRouter()
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  // 1. Database se services fetch karein
  useEffect(() => {
    fetch("/api/services")
      .then(res => res.json())
      .then(data => {
        setServices(data)
        setLoading(false)
      })
  }, [])

  const addToCart = (service: any) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
    if (!existingCart.find((item: any) => item.serviceId === service._id)) {
      existingCart.push({
        serviceId: service._id,
        serviceName: service.title,
        price: service.price,
      })
      localStorage.setItem("cart", JSON.stringify(existingCart))
    }
    router.push("/cart")
  }

  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <Loader2 className="animate-spin w-10 h-10 text-primary" />
    </div>
  )

  return (
    <main className="pt-24 bg-[#F8FAFC]">
      <section className="py-20 bg-white border-b">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-5xl font-black mb-6 tracking-tight">Our Services</h1>
          <p className="text-lg text-slate-500 max-w-2xl font-medium">
            Dynamic solutions for your business, directly from our database.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service: any) => {
            // Dynamic Icon selection
            const Icon = (LucideIcons as any)[service.iconName || "Zap"] || LucideIcons.Zap;

            return (
              <div key={service._id} className="p-8 rounded-[2rem] border bg-white hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                </div>
                
                <h3 className="text-2xl font-black mb-3 text-slate-900">{service.title}</h3>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed line-clamp-3">
                  {service.description}
                </p>
                
                <div className="pt-6 border-t flex items-center justify-between">
                  <p className="font-black text-primary">{service.price}</p>
                  <button
                    onClick={() => addToCart(service)}
                    className="p-3 rounded-xl bg-slate-900 text-white hover:bg-primary transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}