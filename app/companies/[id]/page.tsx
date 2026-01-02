"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, MessageSquare, ShieldCheck, Globe, MapPin, Loader2, CheckCircle2 } from "lucide-react"

export default function PublicCompanyProfile() {
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [company, setCompany] = useState<any>(null)

  useEffect(() => {
    const fetchCompany = async () => {
      const res = await fetch(`/api/companies/${params.id}`)
      const json = await res.json()
      if (json.success) setCompany(json.data)
      setLoading(false)
    }
    fetchCompany()
  }, [params.id])

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>
  if (!company) return <div className="text-center py-20">Business Not Found</div>

  return (
    <main className="pt-24 pb-28 bg-[#FBFBFE]">
      {/* HEADER - Consistent with your UI */}
      <section className="border-b border-slate-200 bg-white pb-8">
        <div className="max-w-5xl mx-auto px-6">
          <Link href="/companies" className="inline-flex items-center gap-2 text-primary font-bold mb-4 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Directory
          </Link>
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">{company.name}</h1>
              <p className="text-slate-500 font-medium">{company.category} • Official Partner</p>
            </div>
            <span className="flex items-center gap-1 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase border border-blue-100">
              <ShieldCheck className="w-4 h-4" /> Verified
            </span>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          {/* MAIN CONTENT */}
          <div className="md:col-span-2 space-y-12">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
               <h2 className="text-xl font-bold mb-4">About the Company</h2>
               <p className="text-blue-600 font-bold mb-4">{company.description}</p>
               <p className="text-slate-600 leading-relaxed whitespace-pre-line">{company.detailedOverview}</p>
            </div>

            {/* SERVICES LIST */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
               <h2 className="text-xl font-bold mb-6">Our Services</h2>
               <div className="grid gap-4">
                 {company.services?.map((s: any, i: number) => (
                   <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <h4 className="font-bold text-slate-900 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" /> {s.title}
                      </h4>
                      <p className="text-sm text-slate-500 mt-1">{s.desc}</p>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* SIDEBAR CARD */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm sticky top-32">
              <div className="w-32 h-32 mx-auto mb-6 rounded-3xl overflow-hidden border border-slate-100 p-4 bg-slate-50">
                <img src={company.logo || "/placeholder-logo.png"} className="w-full h-full object-contain" />
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-slate-600">
                  <MapPin className="w-5 h-5 text-primary" /> <span className="font-medium">{company.location}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Globe className="w-5 h-5 text-primary" /> <span className="font-medium truncate">{company.website || 'No Website'}</span>
                </div>
              </div>
              <a href={`https://wa.me/${company.whatsapp}`} target="_blank" className="flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] text-white rounded-2xl font-bold hover:opacity-90 transition shadow-lg shadow-green-100">
                <MessageSquare className="w-5 h-5" /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}