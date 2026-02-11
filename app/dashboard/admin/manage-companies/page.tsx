"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, MapPin, Loader2, Crown, Building2, CheckCircle2, ChevronLeft } from "lucide-react"

export default function ManageCompaniesPage() {
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")
  const [companies, setCompanies] = useState<any[]>([])

  useEffect(() => {
    const fetchVerifiedCompanies = async () => {
      try {
        const res = await fetch("/api/companies/all")
        const data = await res.json()
        if (Array.isArray(data)) setCompanies(data)
      } catch (err) {
        console.error("Failed to load companies:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchVerifiedCompanies()
  }, [])

  const filteredCompanies = companies.filter((company: any) => {
    const matchesSearch = company.name?.toLowerCase().includes(search.toLowerCase())
    const activeFilter = filter.toLowerCase()
    let matchesFilter = true
    if (activeFilter === "paid") matchesFilter = company.isActuallyPaid === true
    if (activeFilter === "free") matchesFilter = company.isActuallyPaid !== true
    return matchesSearch && matchesFilter
  })

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="flex flex-col items-center gap-4 px-6 text-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          Synchronizing Directory...
        </p>
      </div>
    </div>
  )

  return (
    <main className="bg-[#fcfcfc] min-h-screen pb-20">
      {/* ===== TOP NAV ===== */}
      <div className="pt-20 px-4 max-w-7xl mx-auto">
        <Link
          href="/dashboard/admin"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-600 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" /> Back Home
        </Link>
      </div>

      {/* ===== STICKY HEADER & FILTERS ===== */}
      <section className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-30 mt-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-xl font-black text-slate-900 uppercase italic">Manage Directory</h1>
            
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {filteredCompanies.length} Active Records
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-3">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search business name..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none text-sm font-medium focus:bg-white focus:border-blue-500 transition-all shadow-inner"
              />
            </div>

            {/* Segmented Filter */}
            <div className="flex bg-slate-100 p-1.5 rounded-2xl overflow-x-auto no-scrollbar">
              {["All", "Paid", "Free"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`flex-1 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    filter === type 
                    ? "bg-white text-slate-900 shadow-md" 
                    : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== LISTING SECTION ===== */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          {filteredCompanies.map((company: any) => (
            <div 
              key={company._id} 
              className={`group p-4 md:p-6 bg-white rounded-[2rem] border transition-all hover:shadow-xl hover:-translate-y-1 ${
                company.isActuallyPaid ? 'border-amber-200 bg-amber-50/5' : 'border-slate-100'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-8">
                {/* Logo with Status Ring */}
                <div className={`relative w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-white flex-shrink-0 border-4 p-2 shadow-sm transition-transform group-hover:rotate-2 ${
                  company.isActuallyPaid ? 'border-amber-100 shadow-amber-100' : 'border-slate-50'
                }`}>
                  <img 
                    src={company.logo || '/placeholder.png'} 
                    className="w-full h-full object-contain" 
                    alt={company.name} 
                  />
                  {company.isActuallyPaid && (
                    <div className="absolute -top-2 -right-2 bg-amber-500 p-1.5 rounded-lg shadow-lg">
                      <Crown className="w-3 h-3 text-white fill-white" />
                    </div>
                  )}
                </div>
                
                {/* Business Info */}
                <div className="flex-1 text-center sm:text-left space-y-3">
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-900 leading-tight uppercase tracking-tight">
                      {company.name}
                    </h3>
                    <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2">
                      <span className="bg-blue-600 text-white text-[8px] px-2 py-1 rounded-md font-black uppercase tracking-tighter">
                        {company.category}
                      </span>
                      {company.isActuallyPaid ? (
                        <span className="bg-emerald-50 text-emerald-600 text-[8px] px-2 py-1 rounded-md font-black uppercase tracking-tighter border border-emerald-100">
                          Active Premium
                        </span>
                      ) : (
                        <span className="bg-slate-100 text-slate-400 text-[8px] px-2 py-1 rounded-md font-black uppercase tracking-tighter border border-slate-200">
                          Basic Tier
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-[11px] font-bold text-slate-500">
                    <div className="flex items-center justify-center sm:justify-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-red-400" />
                      <span className="truncate max-w-[200px]">{company.location || "Unspecified"}</span>
                    </div>
                    {company.isActuallyPaid && (
                      <div className="hidden sm:flex items-center gap-1.5 text-emerald-600">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified Billing</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile Optimized Actions */}
                <div className="w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-none">
                  <Link href={`/dashboard/admin/manage-companies/${company._id}`} className="block">
                    <button className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 group-hover:gap-4">
                      Modify <ChevronLeft className="w-4 h-4 rotate-180" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {filteredCompanies.length === 0 && (
            <div className="text-center py-20 bg-white border-2 border-dashed border-slate-200 rounded-[3rem] px-6">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <Building2 className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-black text-slate-900 uppercase">No Data Found</h3>
              <p className="text-slate-400 text-sm mt-2 max-w-xs mx-auto font-medium leading-relaxed italic">
                Try adjusting your filters or checking the spelling of the business name.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}