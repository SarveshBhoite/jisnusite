"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, MapPin, MessageSquare, CheckCircle2, Globe, ShieldCheck, Loader2 } from "lucide-react"

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch("/api/companies/public")
        const data = await res.json()
        setCompanies(data)
      } catch (err) {
        console.error("Failed to load companies")
      } finally {
        setLoading(false)
      }
    }
    fetchCompanies()
  }, [])

  return (
    <main className="pt-24 bg-[#fcfcfc] min-h-screen">
      {/* SEARCH BAR */}
      <section className="bg-white border-b border-border sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
             <input type="text" placeholder="Search companies..." className="px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none w-full md:w-80" />
          </div>
          <Link href="/companies/list-your-company">
            <button className="whitespace-nowrap flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all text-sm">
              List Your Business Free <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>

      {/* COMPANIES LIST */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="flex flex-col items-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground font-medium">Loading verified businesses...</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {companies.map((company: any) => (
                <div key={company._id} className="bg-white rounded-2xl border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-md overflow-hidden">
                  <div className="flex flex-col md:flex-row items-center p-6 gap-8">
                    
                    {/* 1. LOGO (Always on Left) */}
                    <div className="w-32 h-32 rounded-xl border border-slate-100 bg-slate-50 flex-shrink-0 flex items-center justify-center p-4">
                      <img 
                        src={company.logo || '/placeholder-logo.png'} 
                        alt={company.name} 
                        className="w-full h-full object-contain" 
                      />
                    </div>

                    {/* 2. CONTENT AREA */}
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-2xl font-bold text-slate-900">{company.name}</h3>
                        <span className="flex items-center gap-1 text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-bold uppercase">
                           <ShieldCheck className="w-3 h-3" /> Verified
                        </span>
                        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded uppercase">
                          {company.category}
                        </span>
                      </div>

                      {/* Displaying the 'description' field from your MongoDB */}
                      <p className="text-slate-600 leading-relaxed max-w-3xl line-clamp-2">
                        {company.description || "Leading provider of quality services and community excellence."}
                      </p>

                      {/* Mapping the 'services' array */}
                      <div className="flex flex-wrap gap-3">
                        {company.services?.map((service: any, idx: number) => (
                          <span key={idx} className="flex items-center gap-1 text-xs font-medium text-slate-600 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> {service.title}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-6 text-sm font-medium text-slate-400 pt-2">
                        <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary" /> {company.location}</div>
                        <div className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-slate-400" /> Website</div>
                      </div>
                    </div>

                    {/* 3. ACTION BUTTONS (Right Side on Desktop) */}
                    <div className="flex flex-col gap-3 min-w-[200px] w-full md:w-auto">
                      <a 
                        href={`https://wa.me/${company.whatsapp}`} 
                        target="_blank" 
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-xl font-bold hover:bg-[#1eb954] transition-all"
                      >
                        <MessageSquare className="w-5 h-5" /> WhatsApp
                      </a>
                      <Link href={`/companies/${company._id}`} className="w-full">
                        <button className="w-full px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-sm">
                          View Full Profile
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {companies.length === 0 && (
                 <div className="text-center py-32 border-2 border-dashed rounded-3xl bg-white">
                    <p className="text-muted-foreground text-lg">No approved companies found in this category.</p>
                 </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}