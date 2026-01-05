"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  Upload, Plus, X, Loader2, CheckCircle, 
  Globe, Instagram, Facebook, LayoutGrid, Image as ImageIcon, 
  Clock, MapPin, Smartphone, Info, CheckCircle2, Linkedin, Twitter, Sparkles
} from "lucide-react"

export default function ClientCompanyPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  
  const [formData, setFormData] = useState<any>({
    name: "", category: "", description: "", detailedOverview: "",
    location: "", website: "", whatsapp: "", logo: "", 
    gallery: [], services: [], inclusions: [], workingHours: [],
    social: { instagram: "", facebook: "", linkedin: "", twitter: "" }
  })

  // State for Time Picker UI
  const [tempSlot, setTempSlot] = useState({ days: "Mon - Fri", time: "09:00 AM - 06:00 PM" })

  useEffect(() => {
    const fetchMyCompany = async () => {
      try {
        const res = await fetch(`/api/client/company`)
        const json = await res.json()
        if (json.success) {
          const d = json.data;
          setFormData({
            ...d,
            inclusions: d.inclusions || [],
            workingHours: d.workingHours || [],
            social: {
              instagram: d.social?.instagram || "",
              facebook: d.social?.facebook || "",
              linkedin: d.social?.linkedin || "",
              twitter: d.social?.twitter || ""
            }
          })
        }
      } catch (err) { console.error(err) } finally { setLoading(false) }
    }
    fetchMyCompany()
  }, [])

  const handleUpdate = async () => {
    setUpdating(true)
    try {
      const res = await fetch(`/api/client/company`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      if (res.ok) alert("Business Profile Fully Updated!")
    } catch (err) { alert("Error updating") } finally { setUpdating(false) }
  }

  const addTimeSlot = () => {
    const newSlot = `${tempSlot.days}: ${tempSlot.time}`;
    if (!formData.workingHours.includes(newSlot)) {
      setFormData({ ...formData, workingHours: [...formData.workingHours, newSlot] });
    }
  }

  if (loading) return <div className="h-screen flex items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-blue-600 w-10 h-10" /></div>

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* STICKY HEADER */}
      <div className="bg-white border-b sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-800">Edit Listing</h1>
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Model-Sync Enabled</p>
        </div>
        <button onClick={handleUpdate} disabled={updating} className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
          {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
          Update Changes
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* 1. BASIC IDENTITY */}
          <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
               <div className="relative group">
                  <div className="w-32 h-32 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden">
                    {formData.logo ? <img src={formData.logo} className="w-full h-full object-contain p-2" /> : <ImageIcon className="text-slate-300 w-8 h-8" />}
                  </div>
                  <label className="absolute inset-0 bg-black/40 text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-all rounded-3xl">
                    UPLOAD LOGO
                    <input type="file" hidden accept="image/*" onChange={(e:any) => {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.onloadend = () => setFormData({...formData, logo: reader.result});
                      reader.readAsDataURL(file);
                    }} />
                  </label>
               </div>
               <div className="flex-1 w-full space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400">BUSINESS NAME</label>
                      <input value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} className="w-full p-3 rounded-xl border bg-slate-50 outline-none focus:border-blue-500" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400">CATEGORY</label>
                      <input value={formData.category} onChange={(e)=>setFormData({...formData, category: e.target.value})} className="w-full p-3 rounded-xl border bg-slate-50 outline-none focus:border-blue-500" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400">TAGLINE</label>
                    <input value={formData.description} onChange={(e)=>setFormData({...formData, description: e.target.value})} className="w-full p-3 rounded-xl border bg-slate-50 outline-none focus:border-blue-500" />
                  </div>
               </div>
            </div>

            {/* GALLERY */}
            <div className="pt-6 border-t space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-black text-slate-900 flex items-center gap-2"><LayoutGrid className="w-5 h-5 text-blue-600" /> Gallery</h3>
                <label className="text-xs font-bold text-blue-600 cursor-pointer bg-blue-50 px-3 py-1 rounded-full">
                  + Add Photos
                  <input type="file" multiple hidden onChange={(e:any)=>{
                    const files = Array.from(e.target.files);
                    files.forEach((file:any) => {
                      const reader = new FileReader();
                      reader.onloadend = () => setFormData((prev:any) => ({...prev, gallery: [...prev.gallery, reader.result]}));
                      reader.readAsDataURL(file);
                    });
                  }} />
                </label>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {formData.gallery?.map((img:string, i:number) => (
                  <div key={i} className="aspect-square rounded-xl border relative group">
                    <img src={img} className="w-full h-full object-cover rounded-xl" />
                    <button onClick={() => setFormData({...formData, gallery: formData.gallery.filter((_:any,idx:number)=>idx!==i)})} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all"><X className="w-3 h-3" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2. OVERVIEW & INCLUSIONS */}
          <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm space-y-6">
            <h3 className="font-black text-lg flex items-center gap-2"><Info className="w-5 h-5 text-blue-600" /> Detailed Overview</h3>
            <textarea rows={5} value={formData.detailedOverview} onChange={(e)=>setFormData({...formData, detailedOverview: e.target.value})} className="w-full p-4 rounded-2xl bg-slate-50 border outline-none resize-none" placeholder="Explain your business in depth..." />
            
            <div className="space-y-4 pt-6 border-t">
              <h3 className="font-black flex items-center gap-2"><Sparkles className="w-5 h-5 text-blue-600" /> Inclusions / Amenities</h3>
              <div className="flex flex-wrap gap-2 p-4 bg-slate-50 rounded-2xl border border-dashed">
                {formData.inclusions?.map((inc: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 bg-white border border-blue-100 text-blue-700 px-4 py-2 rounded-xl text-xs font-bold shadow-sm">
                    {inc}
                    <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => setFormData({...formData, inclusions: formData.inclusions.filter((_:any, idx:number) => idx !== i)})} />
                  </div>
                ))}
                <input onKeyDown={(e: any) => { if (e.key === 'Enter' && e.target.value) { setFormData({...formData, inclusions: [...formData.inclusions, e.target.value]}); e.target.value = ''; } }} placeholder="Add and press Enter..." className="text-xs p-2 bg-transparent outline-none focus:border-blue-500 ml-2" />
              </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-8">
          {/* SOCIAL MEDIA */}
          <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm space-y-4">
            <h3 className="font-black">Social Media</h3>
            <div className="space-y-3">
              {[
                { icon: <Instagram className="w-4 h-4 text-pink-500" />, key: "instagram" },
                { icon: <Facebook className="w-4 h-4 text-blue-600" />, key: "facebook" },
                { icon: <Linkedin className="w-4 h-4 text-blue-700" />, key: "linkedin" },
                { icon: <Twitter className="w-4 h-4 text-sky-500" />, key: "twitter" }
              ].map((item) => (
                <div key={item.key} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  {item.icon}
                  <input value={formData.social?.[item.key]} onChange={(e)=>setFormData({...formData, social: {...formData.social, [item.key]: e.target.value}})} placeholder={`${item.key.charAt(0).toUpperCase() + item.key.slice(1)} URL`} className="bg-transparent text-[11px] w-full outline-none" />
                </div>
              ))}
            </div>
          </div>

          {/* WORKING HOURS (TIME PICKER) */}
          <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm space-y-4">
            <h3 className="font-black flex items-center gap-2"><Clock className="w-5 h-5 text-green-600" /> Working Hours</h3>
            <div className="space-y-2">
              {formData.workingHours?.map((hour: string, i: number) => (
                <div key={i} className="flex items-center justify-between bg-green-50 p-3 rounded-xl border border-green-100">
                  <span className="text-[11px] font-bold text-green-700">{hour}</span>
                  <X className="w-4 h-4 text-red-400 cursor-pointer" onClick={() => setFormData({...formData, workingHours: formData.workingHours.filter((_:any, idx:number) => idx !== i)})} />
                </div>
              ))}
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border space-y-3">
              <select value={tempSlot.days} onChange={(e)=>setTempSlot({...tempSlot, days: e.target.value})} className="w-full p-2 rounded-lg border text-[11px] font-bold">
                <option value="Mon - Fri">Mon - Fri</option>
                <option value="Sat - Sun">Sat - Sun</option>
                <option value="All Week">All Week (24/7)</option>
                <option value="Mon - Sat">Mon - Sat</option>
              </select>
              <input value={tempSlot.time} onChange={(e)=>setTempSlot({...tempSlot, time: e.target.value})} placeholder="09:00 AM - 06:00 PM" className="w-full p-2 rounded-lg border text-[11px]" />
              <button onClick={addTimeSlot} className="w-full py-2 bg-slate-900 text-white rounded-xl text-[10px] font-bold">Add Slot</button>
            </div>
          </div>

          {/* CONTACT */}
          <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm space-y-4">
            <h3 className="font-black flex items-center gap-2"><Smartphone className="w-5 h-5 text-blue-600" /> Contact Info</h3>
            <div className="space-y-3">
              <input value={formData.whatsapp} onChange={(e)=>setFormData({...formData, whatsapp: e.target.value})} placeholder="WhatsApp Number" className="w-full p-3 rounded-xl border bg-slate-50 text-xs" />
              <input value={formData.website} onChange={(e)=>setFormData({...formData, website: e.target.value})} placeholder="Website Link" className="w-full p-3 rounded-xl border bg-slate-50 text-xs" />
              <textarea value={formData.location} onChange={(e)=>setFormData({...formData, location: e.target.value})} placeholder="Google Maps Embed URL / Address" className="w-full p-3 rounded-xl border bg-slate-50 text-xs h-20 resize-none" />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}