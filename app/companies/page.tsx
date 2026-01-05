"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, MapPin, MessageSquare, CheckCircle2, Globe, ShieldCheck, Loader2, Star, Crown } from "lucide-react"

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch("/api/companies/public")
        const data = await res.json()
        
        // SORTING LOGIC: Paid companies ko pehle dikhane ke liye
        const sortedData = data.sort((a: any, b: any) => {
          if (a.planType === 'paid' && b.planType !== 'paid') return -1;
          if (a.planType !== 'paid' && b.planType === 'paid') return 1;
          return 0;
        });

        setCompanies(sortedData)
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
      {/* SEARCH BAR SECTION */}
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

      {/* COMPANIES LIST SECTION */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="flex flex-col items-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground font-medium">Loading verified businesses...</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {companies.map((company: any) => {
                const isPaid = company.planType === 'paid';
                
                return (
                  <div 
                    key={company._id} 
                    className={`bg-white rounded-3xl border transition-all duration-300 hover:shadow-xl overflow-hidden relative 
                      ${isPaid ? 'border-amber-200 bg-gradient-to-r from-white to-amber-50/30 ring-1 ring-amber-100' : 'border-border'}`}
                  >
                    {/* Premium Label for Paid Companies */}
                    {isPaid && (
                      <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-black px-4 py-1 rounded-bl-2xl flex items-center gap-1 uppercase tracking-tighter shadow-sm">
                        <Crown className="w-3 h-3" /> Featured Partner
                      </div>
                    )}

                    <div className="flex flex-col md:flex-row items-center p-8 gap-8">
                      
                      {/* 1. LOGO */}
                      <div className={`w-32 h-32 rounded-2xl border flex-shrink-0 flex items-center justify-center p-4 bg-white shadow-sm
                        ${isPaid ? 'border-amber-100' : 'border-slate-100'}`}>
                        <img 
                          src={company.logo || '/placeholder-logo.png'} 
                          alt={company.name} 
                          className="w-full h-full object-contain" 
                        />
                      </div>

                      {/* 2. CONTENT AREA */}
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-2xl font-black text-slate-900">{company.name}</h3>
                          
                          <div className="flex gap-2">
                            <span className="flex items-center gap-1 text-[10px] bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-bold uppercase border border-blue-100">
                               <ShieldCheck className="w-3 h-3" /> Verified
                            </span>
                            
                            {isPaid && (
                              <span className="flex items-center gap-1 text-[10px] bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-bold uppercase border border-amber-200">
                                <Star className="w-3 h-3 fill-amber-700" /> Premium
                              </span>
                            )}
                          </div>

                          <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-2 py-1 rounded uppercase tracking-wider">
                            {company.category}
                          </span>
                        </div>

                        <p className="text-slate-600 text-sm leading-relaxed max-w-3xl line-clamp-2">
                          {company.description || "Leading provider of quality services and community excellence."}
                        </p>

                        {/* Services Badges */}
                        <div className="flex flex-wrap gap-2">
                          {company.services?.slice(0, 3).map((service: any, idx: number) => (
                            <span key={idx} className="flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                              <CheckCircle2 className="w-3 h-3 text-green-500" /> {service.title}
                            </span>
                          ))}
                          {company.services?.length > 3 && (
                            <span className="text-[10px] text-slate-400 font-bold self-center">+{company.services.length - 3} More</span>
                          )}
                        </div>

                        <div className="flex items-center gap-6 text-xs font-bold text-slate-400 pt-2 uppercase tracking-tight">
                          <div className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-default">
                            <MapPin className="w-4 h-4 text-red-500" /> {company.location || "Location Not Provided"}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Globe className="w-4 h-4 text-blue-400" /> Website
                          </div>
                        </div>
                      </div>

                      {/* 3. ACTION BUTTONS */}
                      <div className="flex flex-col gap-3 min-w-[200px] w-full md:w-auto">
                        <a 
                          href={`https://wa.me/${company.whatsapp}`} 
                          target="_blank" 
                          className="flex items-center justify-center gap-2 px-6 py-4 bg-[#25D366] text-white rounded-2xl font-black hover:bg-[#1eb954] transition-all shadow-lg shadow-green-100"
                        >
                          <MessageSquare className="w-5 h-5" /> WhatsApp
                        </a>
                        <Link href={`/companies/${company._id}`} className="w-full">
                          <button className="w-full px-6 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                            Full Profile
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}

              {companies.length === 0 && (
                 <div className="text-center py-32 border-2 border-dashed rounded-[3rem] bg-white">
                    <p className="text-slate-400 font-bold text-xl">No verified businesses found.</p>
                 </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}