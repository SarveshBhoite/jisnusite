"use client"

import { useState, useEffect } from "react"
import { X, Loader2, AlertCircle, ArrowUpRight } from "lucide-react"

export default function PortfolioPage() {
  const [portfolioItems, setPortfolioItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [activeItem, setActiveItem] = useState<any | null>(null)

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch("/api/admin/portfolio", { cache: 'no-store' })
        const data = await res.json()
        const actualData = Array.isArray(data) ? data : (data.data || [])
        setPortfolioItems(actualData)
      } catch (err) {
        console.error("Failed to fetch portfolio:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchPortfolio()
  }, [])

  const staticCategories = ["All", "Web Development", "App Development", "UI/UX Design", "Branding", "SEO"];
  const dynamicCategories = portfolioItems.map((item: any) => item.category).filter(Boolean);
  const categories = Array.from(new Set([...staticCategories, ...dynamicCategories]));

  const filtered = selectedCategory === "All"
    ? portfolioItems
    : portfolioItems.filter((p) => p.category === selectedCategory)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-black" />
      </div>
    )
  }

  return (
    <main className="pt-28 pb-20 bg-[#F8F9FA]">
      {/* ===== HERO ===== */}
      <section className="mb-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-display text-5xl md:text-7xl font-black mb-4 uppercase italic tracking-tighter text-black">
            Our Work
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Showcasing real results delivered for our verified partners and clients.
          </p>
        </div>
      </section>

      {/* ===== FILTER ===== */}
      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-y border-gray-200 mb-12">
        <div className="max-w-7xl mx-auto px-4 py-4 flex gap-3 justify-center flex-wrap">
          {categories.map((cat: any) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all ${
                selectedCategory === cat
                  ? "bg-black text-white shadow-lg"
                  : "bg-white text-gray-400 border border-gray-200 hover:border-black hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ===== GRID ===== */}
      <section className="max-w-7xl mx-auto px-4">
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <div
                key={item._id}
                onClick={() => setActiveItem(item)}
                className="group cursor-pointer bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                {/* 1. Image Section (Above) */}
                <div className="relative aspect-[16/11] overflow-hidden bg-gray-100">
                  <img
                    src={item.image || "/project-placeholder.jpg"}
                    alt={item.companyName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white p-3 rounded-full shadow-lg">
                      <ArrowUpRight className="w-5 h-5 text-black" />
                    </div>
                  </div>
                </div>

                {/* 2. Content Section (Below) */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
                      {item.category}
                    </p>
                  </div>
                  <h3 className="text-2xl font-bold text-black uppercase italic mb-2 tracking-tight">
                    {item.companyName}
                  </h3>
                  <p className="text-gray-500 text-sm font-medium line-clamp-1">
                    {item.serviceName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed">
            <AlertCircle className="w-10 h-10 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-bold uppercase tracking-widest">No projects found</p>
          </div>
        )}
      </section>

      {/* ===== MODAL ===== */}
      {activeItem && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setActiveItem(null)}>
          <div onClick={(e) => e.stopPropagation()} className="relative max-w-5xl w-full bg-white rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            <button onClick={() => setActiveItem(null)} className="absolute top-6 right-6 z-10 p-3 rounded-full bg-gray-100 text-black hover:bg-black hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="grid md:grid-cols-2">
              <div className="bg-gray-100 aspect-square md:aspect-auto">
                <img src={activeItem.image} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="p-10 md:p-16 flex flex-col justify-center">
                <p className="text-blue-600 font-black text-[10px] uppercase tracking-widest mb-4">{activeItem.category}</p>
                <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-6">{activeItem.companyName}</h2>
                <p className="text-gray-500 mb-8 leading-relaxed">{activeItem.description}</p>
                <div className="border-t pt-8 space-y-4 mb-10">
                    <div className="flex justify-between text-sm"><span className="text-gray-400 uppercase font-bold">Service</span><span className="font-black italic uppercase">{activeItem.serviceName}</span></div>
                </div>
                <button onClick={() => window.location.href='/contact'} className="bg-black text-white py-5 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-blue-600 transition-all">Start Project</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}