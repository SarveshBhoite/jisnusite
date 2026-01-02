"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Upload, Plus, X, MessageSquare, ShieldCheck, Globe, MapPin, Loader2 } from "lucide-react"

export default function EditCompanyPage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  // State management for all fields
  const [formData, setFormData] = useState<any>({
    name: "", category: "", location: "", website: "", whatsapp: "",
    description: "", detailedOverview: "", logo: "", status: "pending", plan: "Standard",
    services: [], inclusions: [], gallery: [],
    social: { instagram: "", linkedin: "", twitter: "", facebook: "" }
  })

  // 1. Load data from DB on mount
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await fetch(`/api/companies/${params.id}`)
        const json = await res.json()
        if (json.success) setFormData(json.data)
      } catch (err) { console.error(err) }
      setLoading(false)
    }
    fetchCompany()
  }, [params.id])

  // 2. Dynamic list handlers (Same as your UI logic)
  const addService = () => setFormData({...formData, services: [...(formData.services || []), { title: "", desc: "" }]})
  const addInclusion = () => setFormData({...formData, inclusions: [...(formData.inclusions || []), ""]})

  // 3. Update Database
  const handleUpdate = async () => {
    setUpdating(true)
    const res = await fetch(`/api/companies/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
    if (res.ok) {
        alert("Company updated successfully!")
        router.refresh()
    }
    setUpdating(false)
  }

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>

  return (
    <main className="pt-20 pb-28 bg-[#FBFBFE]">
      {/* HEADER */}
      <section className="border-b border-slate-200 bg-white pb-8">
        <div className="max-w-5xl mx-auto px-6">
          <Link href="/dashboard/admin/manage-companies" className="inline-flex items-center gap-2 text-primary font-bold mb-4 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Manage Companies
          </Link>
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Edit Business Profile</h1>
              <p className="text-slate-500 font-medium">Update details for {formData.name}</p>
            </div>
            <span className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase border border-blue-100">
              <ShieldCheck className="w-3 h-3" /> System Verified
            </span>
          </div>
        </div>
      </section>

      {/* FORM CONTENT */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          
          {/* 1. BRANDING (Logo) */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><div className="w-2 h-2 bg-primary rounded-full" /> Branding & Identity</h2>
            <div className="flex items-center gap-8">
              <div className="w-40 h-40 rounded-[2rem] border-4 border-dashed border-slate-200 flex items-center justify-center bg-slate-50 overflow-hidden">
                {formData.logo ? <img src={formData.logo} className="w-full h-full object-contain p-4" /> : <span className="text-xs font-bold text-slate-400">No Logo</span>}
              </div>
              <label className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-bold cursor-pointer hover:bg-slate-800 transition shadow-lg">
                <Upload className="w-4 h-4" /> Upload Business Logo
                <input type="file" hidden onChange={(e) => {
                   const file = e.target.files?.[0];
                   if(file) {
                     const reader = new FileReader();
                     reader.onloadend = () => setFormData({...formData, logo: reader.result});
                     reader.readAsDataURL(file);
                   }
                }} />
              </label>
            </div>
          </div>

          {/* 2. CORE INFO */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm grid md:grid-cols-2 gap-6">
             <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 ml-1">Company Name</label>
                <input value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 outline-none font-medium" />
             </div>
             <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 ml-1">Category</label>
                <input value={formData.category} onChange={(e)=>setFormData({...formData, category: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 outline-none font-medium" />
             </div>
             <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 ml-1">Location</label>
                <input value={formData.location} onChange={(e)=>setFormData({...formData, location: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 outline-none font-medium" />
             </div>
             <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 ml-1">Website URL</label>
                <input value={formData.website} onChange={(e)=>setFormData({...formData, website: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 outline-none font-medium" />
             </div>
          </div>

          {/* 3. ABOUT & OVERVIEW */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-2">
               <label className="text-xs font-black uppercase text-slate-400 ml-1">Quick Status / Bio Info</label>
               <input value={formData.description} onChange={(e)=>setFormData({...formData, description: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 outline-none font-medium" />
            </div>
            <div className="space-y-2">
               <label className="text-xs font-black uppercase text-slate-400 ml-1">Detailed Overview</label>
               <textarea rows={5} value={formData.detailedOverview} onChange={(e)=>setFormData({...formData, detailedOverview: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 outline-none font-medium resize-none" />
            </div>
          </div>

          {/* 4. DYNAMIC SERVICES */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2"><div className="w-2 h-2 bg-primary rounded-full" /> Our Services</h2>
              <button onClick={addService} className="text-xs font-black uppercase text-primary"><Plus className="w-3 h-3 inline" /> Add Service</button>
            </div>
            <div className="space-y-4">
              {formData.services?.map((s: any, i: number) => (
                <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 relative">
                   <button onClick={() => {
                     const news = [...formData.services]; news.splice(i, 1); setFormData({...formData, services: news})
                   }} className="absolute top-2 right-2 text-red-500"><X className="w-4 h-4"/></button>
                   <input value={s.title} onChange={(e) => {
                      const news = [...formData.services]; news[i].title = e.target.value; setFormData({...formData, services: news})
                   }} placeholder="Service Title" className="w-full mb-2 p-2 rounded-lg border-none outline-none font-bold" />
                   <textarea value={s.desc} onChange={(e) => {
                      const news = [...formData.services]; news[i].desc = e.target.value; setFormData({...formData, services: news})
                   }} placeholder="Description" className="w-full p-2 rounded-lg border-none outline-none text-sm resize-none" />
                </div>
              ))}
            </div>
          </div>

          {/* SAVE ACTION */}
          <div className="flex justify-end pt-4">
            <button onClick={handleUpdate} disabled={updating} className="px-12 py-5 rounded-[1.5rem] bg-blue-600 text-white font-black text-lg hover:bg-blue-700 transition shadow-2xl">
              {updating ? "Saving Changes..." : "Update Listing"}
            </button>
          </div>

        </div>
      </section>
    </main>
  )
}