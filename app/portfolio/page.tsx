"use client"

import { useState, useEffect } from "react"
import { X, Loader2, AlertCircle, ArrowUpRight, TrendingUp } from "lucide-react"

const defaultPortfolios = [
  {
    _id: "perf-1",
    companyName: "Bosch & Ashok Leyland Dealer",
    serviceName: "B2B Automotive Lead Generation",
    category: "Performance Marketing",
    metricBadge: "628 Leads @ ₹10.59 CPL",
    description: "High-volume Meta ad messaging campaign driving 628+ qualified commercial vehicle & industrial coupler inquiries at an incredible ₹10.59 cost per lead across 191,355 targeted impressions.",
    image: "/portfolio/performance-bosh-ashok-leyland.png",
    stats: {
      leads: "628 Leads",
      cpl: "₹10.59",
      spend: "₹6,652.71",
      impressions: "191,355"
    }
  },
  {
    _id: "perf-2",
    companyName: "Saffron Realty & Developers",
    serviceName: "Real Estate NA Plots Lead Gen",
    category: "Performance Marketing",
    metricBadge: "800+ Leads @ ₹4.67 CPL",
    description: "Hyper-targeted real estate plot sales campaign in Pune delivering 800+ verified buyer leads with an industry-record low CPL starting at just ₹4.67 per messaging inquiry.",
    image: "/portfolio/performance-saffron-realty.png",
    stats: {
      leads: "800+ Inquiries",
      cpl: "₹4.67 - ₹5.70",
      spend: "₹11,257.34",
      impressions: "100,209"
    }
  },
  {
    _id: "perf-3",
    companyName: "Solar Energy Solutions",
    serviceName: "Rooftop Solar Subsidy Leads",
    category: "Performance Marketing",
    metricBadge: "698 Leads @ ₹17.91 CPL",
    description: "Nationwide residential and commercial rooftop solar campaign driving 698+ verified homeowner applications across 525,000+ targeted Meta impressions at ₹17.91 CPL.",
    image: "/portfolio/performance-solar-energy.png",
    stats: {
      leads: "698 Inquiries",
      cpl: "₹17.91",
      spend: "₹12,499.98",
      impressions: "525,301"
    }
  },
  {
    _id: "perf-4",
    companyName: "MPSC Maths Coaching Academy",
    serviceName: "EdTech & Student Admission Ads",
    category: "Performance Marketing",
    metricBadge: "27 Leads @ ₹19.15 CPL",
    description: "Direct-to-WhatsApp student enrollment campaigns targeting competitive exam aspirants, producing immediate student admissions at an optimized ₹19.15 per lead.",
    image: "/portfolio/performance-mpsc-education.png",
    stats: {
      leads: "27 Enrollments",
      cpl: "₹19.15",
      spend: "₹516.96",
      impressions: "20,984"
    }
  },
  {
    _id: "proj-web-1",
    companyName: "Mounty River Resort",
    serviceName: "Web & Booking Engine",
    category: "Web Development",
    description: "High-performance resort website with real-time room booking system and custom CMS.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
  },
  {
    _id: "proj-app-jisnu",
    companyName: "My Jisnu Digitals",
    serviceName: "Google Play Workforce Management App",
    category: "App Development",
    metricBadge: "Live on Play Store",
    description: "Official Android mobile application for smart workforce attendance (punch-in/out), daily task assignment, work report submissions, and employee administration on Google Play Store.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    link: "https://play.google.com/store/apps/details?id=com.jisnu.employeeportal",
  },
  {
    _id: "proj-app-1",
    companyName: "Kidz Explore Therapy",
    serviceName: "Mobile & Parent Portal",
    category: "App Development",
    description: "Cross-platform mobile application for appointment tracking, child progress logs & direct therapist chat.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
  },
  {
    _id: "proj-seo-1",
    companyName: "Nair Interiors",
    serviceName: "Organic & Local SEO",
    category: "SEO",
    description: "Ranked #1 on Google for 25+ targeted local interior design keywords in Pune within 4 months.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  }
];

export default function PortfolioPage() {
  const [portfolioItems, setPortfolioItems] = useState<any[]>(defaultPortfolios)
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [activeItem, setActiveItem] = useState<any | null>(null)

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch("/api/admin/portfolio", { cache: 'no-store' })
        if (res.ok) {
          const data = await res.json()
          const actualData = Array.isArray(data) ? data : (data?.data || [])
          if (actualData.length > 0) {
            setPortfolioItems(actualData)
          }
        }
      } catch (err) {
        console.error("Failed to fetch portfolio:", err)
      }
    }
    fetchPortfolio()
  }, [])

  const staticCategories = ["All", "Performance Marketing", "Web Development", "App Development", "SEO", "Social Media Marketing"];
  const dynamicCategories = portfolioItems.map((item: any) => item.category).filter(Boolean);
  const categories = Array.from(new Set([...staticCategories, ...dynamicCategories]));

  const baseItems = portfolioItems.length > 0 ? portfolioItems : defaultPortfolios;
  const perfItems = defaultPortfolios.filter(dp => dp.category === "Performance Marketing");
  const allDisplayItems = [
    ...perfItems,
    ...baseItems.filter(p => !perfItems.some(dp => dp._id === p._id || dp.companyName.toLowerCase() === (p.companyName || "").toLowerCase()))
  ];

  const filtered = selectedCategory === "All"
    ? allDisplayItems
    : allDisplayItems.filter((p) => {
        const cat = (p.category || "").toLowerCase();
        const serv = (p.serviceName || "").toLowerCase();
        const combined = `${cat} ${serv}`;
        const sel = selectedCategory.toLowerCase();

        if (sel === "performance marketing") {
          if (
            cat.includes("social") ||
            serv.includes("social") ||
            combined.includes("smm") ||
            cat.includes("seo") ||
            serv.includes("seo")
          ) {
            return false;
          }
          return cat.includes("performance") || combined.includes("performance marketing") || combined.includes("meta ad") || combined.includes("google ad") || combined.includes("lead");
        }

        if (sel === "social media marketing") {
          return cat.includes("social") || serv.includes("social") || combined.includes("smm");
        }

        if (sel === "web development") return cat.includes("web") || serv.includes("web");
        if (sel === "app development") return cat.includes("app") || cat.includes("mobile") || serv.includes("app") || serv.includes("mobile");
        if (sel === "seo") return cat.includes("seo") || serv.includes("seo");
        return combined.includes(sel);
      });

  return (
    <main className="pt-28 pb-20 bg-[#F8F9FA]">
      {/* ===== HERO ===== */}
      <section className="mb-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-cyan-700 font-bold text-xs uppercase tracking-widest px-3 py-1 bg-cyan-100 rounded-full border border-cyan-200 mb-4 inline-block">
            Verified Client Results
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-black mb-4 uppercase italic tracking-tighter text-black">
            Our Work & Client Portfolio
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Showcasing proven campaign metrics, web engineering, and performance marketing delivered for verified partners.
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
                  ? "bg-black text-white shadow-lg scale-105"
                  : "bg-white text-gray-500 border border-gray-200 hover:border-black hover:text-black"
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
                className="group cursor-pointer bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
              >
                {/* 1. Image Section (Above) */}
                <div className="relative aspect-[16/11] overflow-hidden bg-slate-900">
                  <img
                    src={item.image || "/project-placeholder.jpg"}
                    alt={item.companyName}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                  {/* Badge */}
                  {item.metricBadge && (
                    <span className="absolute bottom-3 left-4 bg-emerald-600/90 text-white backdrop-blur-md text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm border border-emerald-400/30 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {item.metricBadge}
                    </span>
                  )}

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white p-3 rounded-full shadow-lg">
                      <ArrowUpRight className="w-5 h-5 text-black" />
                    </div>
                  </div>
                </div>

                {/* 2. Content Section (Below) */}
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-600">
                        {item.category}
                      </p>
                    </div>
                    <h3 className="text-2xl font-bold text-black uppercase italic mb-2 tracking-tight group-hover:text-cyan-700 transition-colors">
                      {item.companyName}
                    </h3>
                    <p className="text-gray-500 text-sm font-medium line-clamp-1 mb-2">
                      {item.serviceName}
                    </p>
                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-cyan-700">
                    <span>View Full Proof & Details</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
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
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6" onClick={() => setActiveItem(null)}>
          <div onClick={(e) => e.stopPropagation()} className="relative max-w-5xl w-full bg-white rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
            <button onClick={() => setActiveItem(null)} className="absolute top-5 right-5 z-20 p-3 rounded-full bg-gray-100 text-black hover:bg-black hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="overflow-y-auto">
              <div className="grid md:grid-cols-2">
                <div className="bg-slate-900 flex items-center justify-center p-4">
                  <img src={activeItem.image} className="w-full h-auto max-h-[70vh] object-contain rounded-xl" alt={activeItem.companyName} />
                </div>
                <div className="p-8 sm:p-12 flex flex-col justify-between">
                  <div>
                    <span className="text-cyan-600 font-black text-[10px] uppercase tracking-widest block mb-2">{activeItem.category}</span>
                    <h2 className="text-3xl sm:text-4xl font-black uppercase italic tracking-tight mb-4 text-slate-900">{activeItem.companyName}</h2>
                    <p className="text-gray-600 mb-6 text-sm leading-relaxed">{activeItem.description}</p>
                    
                    {/* Stats */}
                    {activeItem.stats && (
                      <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <div>
                          <span className="text-[11px] font-medium text-slate-400 block">Total Results</span>
                          <span className="text-base font-black text-cyan-800">{activeItem.stats.leads}</span>
                        </div>
                        <div>
                          <span className="text-[11px] font-medium text-slate-400 block">Cost Per Result</span>
                          <span className="text-base font-black text-emerald-700">{activeItem.stats.cpl}</span>
                        </div>
                        <div>
                          <span className="text-[11px] font-medium text-slate-400 block">Impressions</span>
                          <span className="text-base font-black text-slate-800">{activeItem.stats.impressions}</span>
                        </div>
                        <div>
                          <span className="text-[11px] font-medium text-slate-400 block">Amount Spent</span>
                          <span className="text-base font-black text-slate-800">{activeItem.stats.spend}</span>
                        </div>
                      </div>
                    )}

                    <div className="border-t border-gray-100 pt-4 space-y-2 mb-6 text-xs">
                      <div className="flex justify-between"><span className="text-gray-400 uppercase font-bold">Service</span><span className="font-bold text-slate-800">{activeItem.serviceName}</span></div>
                    </div>
                  </div>
                  
                  {activeItem.link && (
                    <a
                      href={activeItem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full mb-3 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-full font-black uppercase text-xs tracking-[0.2em] transition-all text-center flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                    >
                      <span>Open on Google Play Store</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}

                  <button onClick={() => window.location.href='/contact'} className="w-full bg-cyan-700 hover:bg-cyan-800 text-white py-4 rounded-full font-black uppercase text-xs tracking-[0.2em] transition-all shadow-lg shadow-cyan-700/20">
                    Get Similar Results
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}