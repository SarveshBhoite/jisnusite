"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, MapPin, Globe, ShieldCheck, CheckCircle2, Pencil } from "lucide-react"

const companies = [
  {
    id: "tech-startup-co",
    name: "TechStart Innovation",
    logo: "/logos/techstart.png",
    category: "Technology",
    description: "Leading fintech solutions provider transforming digital payments and modern banking.",
    location: "San Francisco, CA",
    whatsapp: "1234567890",
    includedItems: ["Software Dev", "UI/UX Design", "Cloud Hosting"],
    isVerified: true,
    plan: "Paid",
  },
  {
    id: "fashion-hub",
    name: "Fashion Hub",
    logo: "/logos/fashion.png",
    category: "Retail",
    description: "Curated fashion marketplace connecting independent designers with global customers.",
    location: "New York, NY",
    whatsapp: "9876543210",
    includedItems: ["Wholesale", "Custom Tailoring", "Express Shipping"],
    isVerified: false,
    plan: "Free",
  }
]

export default function ManageCompaniesPage() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"All" | "Paid" | "Free">("All")

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.name.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === "All" ? true : company.plan === filter
    return matchesSearch && matchesFilter
  })

  return (
    <main className="pt-24 bg-[#fcfcfc] min-h-screen">
      
      {/* ===== HEADER / FILTERS ===== */}
      <section className="bg-white border-b border-border sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
             <input 
              type="text" 
              placeholder="Search companies..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none w-full md:w-80"
             />
             <div className="flex bg-slate-100 p-1 rounded-lg">
              {["All", "Paid", "Free"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type as any)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                    filter === type ? "bg-white text-primary shadow-sm" : "text-slate-500"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <h1 className="hidden md:block text-sm font-bold text-slate-400 uppercase tracking-widest">Admin Dashboard</h1>
        </div>
      </section>

      {/* ===== COMPANIES LIST (Same Card Style as Page 1) ===== */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-4">
            {filteredCompanies.map((company) => (
              <div 
                key={company.id} 
                className="group relative bg-white rounded-2xl border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-md overflow-hidden"
              >
                <div className="flex flex-col md:flex-row items-stretch md:items-center p-4 md:p-6 gap-6">
                  
                  {/* 1. LOGO AREA */}
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl border border-slate-100 bg-slate-50 flex-shrink-0 flex items-center justify-center p-3 overflow-hidden">
                    <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
                  </div>

                  {/* 2. MAIN CONTENT AREA (Horizontal Lines) */}
                  <div className="flex-1 space-y-3">
                    {/* Line 1: Name, Category, Verification */}
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                        {company.name}
                      </h3>
                      {company.isVerified && (
                        <span className="flex items-center gap-1 text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
                          <ShieldCheck className="w-3 h-3" /> Verified
                        </span>
                      )}
                      <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded uppercase">
                        {company.category}
                      </span>
                    </div>

                    {/* Line 2: Description */}
                    <p className="text-sm text-slate-500 line-clamp-1 max-w-2xl">
                      {company.description}
                    </p>

                    {/* Line 3: Included Items (Chips) */}
                    <div className="flex flex-wrap gap-2">
                      {company.includedItems.map((item, idx) => (
                        <span key={idx} className="flex items-center gap-1 text-[11px] font-medium text-slate-600">
                          <CheckCircle2 className="w-3 h-3 text-primary" /> {item}
                        </span>
                      ))}
                    </div>

                    {/* Line 4: Location & Quick Links */}
                    <div className="flex items-center gap-4 text-xs font-medium text-slate-400 pt-1">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        {company.location}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5" />
                        Plan: <span className={company.plan === "Paid" ? "text-amber-600 font-bold" : ""}>{company.plan}</span>
                      </div>
                    </div>
                  </div>

                  {/* 3. ACTION AREA (Admin Logic) */}
                  <div className="flex flex-row md:flex-col gap-3 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6 min-w-[180px]">
                    <Link href={`/dashboard/admin/manage-companies/${company.id}`} className="flex-1">
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-sm">
                        <Pencil className="w-4 h-4" /> Edit Profile
                      </button>
                    </Link>
                    <Link href={`/companies/${company.id}`} className="flex-1">
                      <button className="w-full px-4 py-2.5 bg-slate-50 text-slate-600 border border-slate-200 rounded-xl text-sm font-bold hover:bg-slate-100 transition-all">
                        View Live
                      </button>
                    </Link>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}