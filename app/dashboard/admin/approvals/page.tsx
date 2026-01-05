"use client"

import { useEffect, useState } from "react"
import { 
  CheckCircle, XCircle, Building2, Clock, Loader2, 
  Globe, MapPin, AlignLeft, Sparkles, Smartphone,
  CheckCircle2, ChevronRight
} from "lucide-react"

export default function CompanyApprovalPage() {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchPending = async () => {
    try {
      const res = await fetch("/api/admin/pending")
      const data = await res.json()
      setCompanies(data)
    } catch (err) {
      console.error("Error fetching companies")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPending()
  }, [])

  const handleAction = async (id: string, action: "accepted" | "rejected") => {
    try {
      const res = await fetch(`/api/admin/approve/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      })
      if (res.ok) {
        setCompanies(companies.filter((c: any) => c._id !== id))
      }
    } catch (err) {
      alert("Action failed")
    }
  }

  if (loading) return <div className="flex justify-center pt-40"><Loader2 className="animate-spin w-10 h-10 text-blue-600" /></div>

  return (
    <main className="pt-20 px-6 md:px-10 pb-20 max-w-7xl mx-auto">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Pending Reviews</h1>
          <p className="text-slate-500 font-medium mt-1">Carefully check the inclusion items before approving.</p>
        </div>
        <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg shadow-blue-100">
          {companies.length} Requests
        </div>
      </div>

      <div className="space-y-10">
        {companies.map((company: any) => (
          <div key={company._id} className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="flex flex-col lg:flex-row">
              
              {/* --- LEFT: CORE INFO & DESCRIPTION --- */}
              <div className="flex-1 p-8 lg:p-10 space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-[2rem] bg-slate-50 border flex items-center justify-center overflow-hidden shrink-0">
                    {company.logo ? <img src={company.logo} className="w-full h-full object-contain p-2" /> : <Building2 className="w-10 h-10 text-slate-300" />}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900">{company.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">{company.category}</span>
                      <span className="text-slate-300">•</span>
                      <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Submitted {new Date(company.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Short Description */}
                <div className="space-y-2">
                  
                  <p className="text-slate-600 font-medium leading-relaxed">{company.description || "N/A"}</p>
                </div>

                {/* --- THE INCLUSION POINTS SECTION --- */}
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
                </div>

              {/* --- RIGHT: META & ACTIONS --- */}
              <div className="lg:w-80 bg-slate-50/50 border-l border-slate-100 p-8 flex flex-col justify-between gap-8">
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Contact & Location</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white border flex items-center justify-center shadow-sm">
                        <Globe className="w-4 h-4 text-blue-500" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[9px] font-black text-slate-400 uppercase">Website</p>
                        <a href={company.website} target="_blank" className="text-xs font-bold text-slate-700 truncate block hover:text-blue-600">{company.website || "No Link"}</a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white border flex items-center justify-center shadow-sm">
                        <MapPin className="w-4 h-4 text-red-500" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[9px] font-black text-slate-400 uppercase">Location</p>
                        <span className="text-xs font-bold text-slate-700 block truncate">{company.location || "No Address"}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white border flex items-center justify-center shadow-sm">
                        <Smartphone className="w-4 h-4 text-green-500" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase">WhatsApp</p>
                        <span className="text-xs font-bold text-slate-700">{company.whatsapp}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={() => handleAction(company._id, "accepted")}
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-2xl font-black text-sm hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
                  >
                    <CheckCircle className="w-4 h-4" /> Approve Listing
                  </button>
                  <button 
                    onClick={() => handleAction(company._id, "rejected")}
                    className="w-full flex items-center justify-center gap-2 bg-white border border-red-100 text-red-500 py-4 rounded-2xl font-black text-sm hover:bg-red-50 transition-all"
                  >
                    <XCircle className="w-4 h-4" /> Decline
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {companies.length === 0 && (
        <div className="text-center py-40">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-50 mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">All Caught Up!</h2>
          <p className="text-slate-500 mt-2">There are no more companies waiting for approval.</p>
        </div>
      )}
    </main>
  )
}