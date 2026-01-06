"use client"

import { useState, useEffect } from "react"
import { Check, ShoppingCart, Loader2, Zap, ArrowRight } from "lucide-react"

export default function ServicesFrontend() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/admin/services")
        const data = await res.json()
        // Only show active services
        setServices(data.filter((s: any) => s.status === "active"))
      } catch (err) {
        console.error("Failed to load services")
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  const addToCart = (service: any) => {
    // Basic LocalStorage Cart Logic
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]")
    const exists = currentCart.find((item: any) => item._id === service._id)
    
    if (exists) {
      alert("This service is already in your cart!")
      return
    }

    const updatedCart = [...currentCart, { ...service, quantity: 1 }]
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    
    // Dispatch custom event to update navbar cart count (optional)
    window.dispatchEvent(new Event("cartUpdated"))
    alert(`${service.title} added to cart!`)
  }

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-white">
      <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
    </div>
  )

  return (
    <main className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* HERO SECTION 
        <div className="text-center mb-16">
          <span className="bg-blue-100 text-blue-700 text-[10px] px-4 py-1.5 rounded-full font-black uppercase tracking-[0.2em]">
            Our Solutions
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mt-4 mb-6">
            Scale Your Business <br /> <span className="text-blue-600">With Expert Services</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium">
            Choose from our range of premium digital services designed to help your brand grow.
            Professional execution with guaranteed results.
          </p>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service: any) => {
            const discountPercentage = Math.round(
              ((service.basePrice - service.discountPrice) / service.basePrice) * 100
            )

            return (
              <div 
                key={service._id} 
                className="group bg-white rounded-[2.5rem] border border-slate-200 p-8 hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-500 relative flex flex-col"
              >
                {/* DISCOUNT BADGE */}
                {discountPercentage > 0 && (
                  <div className="absolute top-6 right-6 bg-green-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg z-10">
                    {discountPercentage}% OFF
                  </div>
                )}

                <div className="mb-2">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:rotate-12 transition-all duration-500">
                    <Zap className="w-6 h-6 text-blue-600 group-hover:text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-2 h-12 line-clamp-2">
                    {service.description}
                  </p>
                </div>

                {/* FEATURES / INCLUSIONS */}
                <div className="space-y-3 mb-8 flex-1">
                  <h1 className="text-sm font-bold text-slate-700">Features Included:</h1>
                  {service.inclusions?.map((item: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 text-sm font-semibold text-slate-600">
                      <div className="mt-1 w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-green-600 stroke-[4px]" />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>

                {/* PRICING & BUTTON */}
                <div className="pt-6 border-t border-slate-100">
                  <div className="flex items-end gap-2 mb-6">
                    <span className="text-3xl font-black text-slate-900">₹{service.discountPrice}</span>
                    <span className="text-lg text-slate-400 font-bold line-through mb-1">₹{service.basePrice}</span>
                  </div>

                  <button 
                    onClick={() => addToCart(service)}
                    className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-lg active:scale-95"
                  >
                    <ShoppingCart className="w-5 h-5" /> Add to Cart
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {services.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 font-bold italic">No services available at the moment.</p>
          </div>
        )}
      </div>
    </main>
  )
}