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
    <main className="pt-24 bg-[oklch(0.98_0_0)] min-h-screen">
      {/* SEARCH BAR SECTION - RESTORED */}
      <section className="bg-[oklch(1_0_0)] border-b border-[oklch(0.92_0.01_199)] sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-row items-center justify-between gap-4">
          <input 
            type="text" 
            placeholder="Search..." 
            className="px-4 py-2 border border-[oklch(0.92_0.01_199)] rounded-lg outline-none w-full max-w-[200px] md:max-w-80 text-sm" 
          />
          <Link href="/companies/list-your-company">
            <button className="whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-xl bg-[oklch(0.35_0.12_199)] text-white font-bold hover:opacity-90 transition-all text-[10px] md:text-sm">
              List <span className="hidden sm:inline">Business</span> <ArrowRight className="w-3 h-3" />
            </button>
          </Link>
        </div>
      </section>

      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="flex flex-col items-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-[oklch(0.35_0.12_199)]" />
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {companies.map((company: any) => {
                const isPaid = company.planType === 'paid';
                
                return (
                  <div 
                    key={company._id} 
                    className={`bg-[oklch(1_0_0)] rounded-[var(--radius)] border transition-all overflow-hidden relative 
                      ${isPaid ? 'border-[oklch(0.65_0.15_190)]/30 ring-1 ring-[oklch(0.65_0.15_190)]/10 shadow-md' : 'border-[oklch(0.92_0.01_199)] shadow-sm'}`}
                  >
                    {/* Horizontal Layout Container - items-start allows height to grow with content */}
                    <div className="flex flex-row items-start p-5 md:p-8 gap-5 md:gap-10">
                      
                      {/* 1. LARGE LOGO (Large size for mobile) */}
                      <div className="w-24 h-24 md:w-40 md:h-40 rounded-2xl border flex-shrink-0 flex items-center justify-center p-3 bg-white border-[oklch(0.92_0.01_199)]">
                        <img 
                          src={company.logo || '/placeholder-logo.png'} 
                          alt={company.name} 
                          className="w-full h-full object-contain" 
                        />
                      </div>

                      {/* 2. CONTENT AREA (All content fully visible) */}
                      <div className="flex-1 min-w-0 space-y-3 md:space-y-4">
                        <div className="flex items-start gap-2 flex-wrap">
                          <h3 className="text-lg md:text-3xl font-black text-[oklch(0.15_0_0)] uppercase italic leading-tight break-words">
                            {company.name}
                          </h3>
                          {isPaid && <Crown className="w-4 h-4 text-[oklch(0.65_0.15_190)] flex-shrink-0 mt-1" />}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <span className="text-[10px] md:text-xs bg-[oklch(0.35_0.12_199)]/10 text-[oklch(0.35_0.12_199)] px-3 py-1 rounded-full font-black uppercase tracking-wider">
                            {company.category}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] md:text-xs text-[oklch(0.68_0.16_185)] font-bold uppercase">
                             <ShieldCheck className="w-4 h-4" /> Verified
                          </span>
                        </div>

                        {/* FULL DESCRIPTION - No truncation */}
                        <p className="text-[oklch(0.45_0_0)] text-xs md:text-base leading-relaxed font-medium">
                          {company.description}
                        </p>

                        <div className="flex items-center gap-4 text-[10px] md:text-sm font-bold text-[oklch(0.45_0_0)] uppercase tracking-tight">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-[oklch(0.65_0.15_190)]" /> 
                            <span className="break-words">{company.location || "Online"}</span>
                          </div>
                        </div>
                      </div>

                      {/* 3. ACTION BUTTONS - Icons on mobile */}
                      <div className="flex flex-col gap-3 shrink-0 self-center">
                        <a 
                          href={`https://wa.me/${company.whatsapp}`} 
                          target="_blank" 
                          className="w-12 h-12 md:w-auto md:px-8 md:py-4 bg-[#25D366] text-white rounded-2xl flex items-center justify-center transition-all shadow-md active:scale-95"
                        >
                          <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
                          <span className="hidden md:inline ml-3 font-black uppercase text-sm tracking-widest">Chat</span>
                        </a>
                        <Link href={`/companies/${company._id}`}>
                          <button className="w-12 h-12 md:w-auto md:px-8 md:py-4 bg-[oklch(0.15_0_0)] text-white rounded-2xl flex items-center justify-center transition-all shadow-md active:scale-95">
                            <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                            <span className="hidden md:inline ml-3 font-black uppercase text-sm tracking-widest">Visit</span>
                          </button>
                        </Link>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}