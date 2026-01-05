"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, MapPin, Loader2, Crown, Building2 } from "lucide-react"

export default function ManageCompaniesPage() {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")

  useEffect(() => {
    const fetchVerifiedCompanies = async () => {
      try {
        const res = await fetch("/api/companies/all")
        const data = await res.json()
        
        // Safety filter: Ensure we only keep 'verified' status companies in state
        const onlyVerified = data.filter((c: any) => c.status === "verified")
        setCompanies(onlyVerified)
        
        console.log("Verified companies loaded:", onlyVerified.length);
      } catch (err) {
        console.error("Failed to load companies")
      } finally {
        setLoading(false)
      }
    }
    fetchVerifiedCompanies()
  }, [])

  // ================= FILTER LOGIC =================
  const filteredCompanies = companies.filter((company: any) => {
    // 1. Search Logic
    const matchesSearch = company.name?.toLowerCase().includes(search.toLowerCase())

    // 2. Plan Logic (Checks planType or plan field)
    const dbPlan = (company.planType || company.plan || "free").toLowerCase().trim();
    const activeFilter = filter.toLowerCase();

    const matchesFilter = activeFilter === "all" ? true : dbPlan === activeFilter;

    return matchesSearch && matchesFilter;
  })

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-slate-900" />
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Loading Verified Businesses...</p>
      </div>
    </div>
  )

  return (
    <main className="pt-24 bg-[#fcfcfc] min-h-screen">
      {/* ===== STICKY HEADER & FILTERS ===== */}
      <section className="bg-white border-b sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
             <div className="relative w-full md:w-64">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <input 
                  type="text" 
                  placeholder="Search by name..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl outline-none w-full text-sm focus:border-blue-500 transition-colors"
               />
             </div>

             {/* FILTER TOGGLES */}
             <div className="flex bg-slate-100 p-1 rounded-xl">
              {["All", "Paid", "Free"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-6 py-2 rounded-lg text-xs font-black transition-all ${
                    filter === type 
                    ? "bg-white text-slate-900 shadow-sm" 
                    : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Live on Platform
            </p>
            <p className="text-sm font-bold text-slate-900">
              {filteredCompanies.length} Verified Records
            </p>
          </div>
        </div>
      </section>

      {/* ===== LISTING SECTION ===== */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          {filteredCompanies.map((company: any) => {
            const isPaid = (company.planType || company.plan || "free").toLowerCase() === 'paid';
            
            return (
              <div 
                key={company._id} 
                className={`p-5 bg-white rounded-[2rem] border transition-all hover:shadow-md ${
                  isPaid ? 'border-amber-200 bg-amber-50/5' : 'border-slate-100'
                }`}
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {/* Logo Container */}
                  <div className="w-20 h-20 rounded-2xl bg-white flex-shrink-0 border border-slate-100 p-2 shadow-sm">
                    <img 
                      src={company.logo || '/placeholder.png'} 
                      className="w-full h-full object-contain" 
                      alt={company.name} 
                    />
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-slate-900">{company.name}</h3>
                      {isPaid ? (
                        <span className="bg-amber-100 text-amber-700 text-[9px] px-2.5 py-1 rounded-full font-black uppercase flex items-center gap-1 border border-amber-200">
                          <Crown className="w-3 h-3" /> Paid Member
                        </span>
                      ) : (
                        <span className="bg-slate-100 text-slate-500 text-[9px] px-2.5 py-1 rounded-full font-black uppercase border border-slate-200">
                          Free Listing
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-xs font-bold">
                      <span className="flex items-center gap-1 text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {company.location || "No Location"}
                      </span>
                      <span className="text-blue-600 px-2 py-0.5 bg-blue-50 rounded-md uppercase text-[10px]">
                        {company.category}
                      </span>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex items-center gap-3">
                    <Link href={`/dashboard/admin/manage-companies/${company._id}`}>
                      <button className="px-8 py-3.5 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-blue-600 transition-all shadow-lg active:scale-95">
                        Edit Profile
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Empty State */}
          {filteredCompanies.length === 0 && (
            <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-[3rem]">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No Verified Companies Found</h3>
              <p className="text-slate-400 text-sm max-w-xs mx-auto mt-2">
                Try changing your filter or search term. Only companies with "verified" status appear here.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}