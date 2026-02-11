"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { 
  ArrowLeft, Upload, Plus, X, Loader2, CheckCircle, 
  MessageSquare, Globe, Instagram, Linkedin, Facebook, Twitter,
  LayoutGrid, Image as ImageIcon, Clock, Shield, MapPin, AlignLeft,
  Smartphone, Mail, Info, CreditCard, CheckCircle2, Sparkles, Save
} from "lucide-react"

export default function EditCompanyPage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  const [formData, setFormData] = useState<any>({
    name: "", category: "", description: "", detailedOverview: "",
    location: "", website: "", whatsapp: "", email: "",
    logo: "", gallery: [], services: [], inclusions: [], workingHours: [],
    social: { instagram: "", linkedin: "", twitter: "", facebook: "" },
    plan: "Standard", status: "pending", locationLink: ""
  })

  const [tempInclusion, setTempInclusion] = useState("")
  const [tempHour, setTempHour] = useState("")

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await fetch(`/api/companies/${params.id}`)
        const json = await res.json()
        if (json.success) {
          setFormData((prev: any) => ({
            ...prev,
            ...json.data,
            inclusions: json.data.inclusions || [],
            workingHours: json.data.workingHours || [],
            social: json.data.social || { instagram: "", linkedin: "", twitter: "", facebook: "" }
          }))
        }
      } catch (err) { console.error(err) }
      setLoading(false)
    }
    fetchCompany()
  }, [params.id])

  const handleUpdate = async () => {
    setUpdating(true)
    try {
      const res = await fetch(`/api/companies/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      if (res.ok) alert("Business Profile Updated Successfully!")
    } catch (err) { alert("Update failed") }
    setUpdating(false)
  }

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
      <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loading Editor...</p>
    </div>
  )

  return (
    <main className="min-h-screen bg-[#F8FAFC] pt-24 md:pb-20">
      {/* --- STICKY HEADER --- */}
      <div className="bg-white border-b sticky top-0 z-50 px-4 md:px-6 py-3 md:py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-4">
            <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-full transition">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="max-w-[150px] md:max-w-none">
              <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">Admin Mode</p>
              <h1 className="text-sm md:text-xl font-black truncate">{formData.name || "Edit Business"}</h1>
            </div>
          </div>
          <button 
            onClick={handleUpdate} 
            disabled={updating} 
            className="bg-slate-900 text-white px-4 md:px-8 py-2 md:py-3 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold flex items-center gap-2 shadow-lg transition-all active:scale-95"
          >
            {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span className="hidden md:inline">Save Profile</span>
            <span className="md:hidden">Save</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-6 md:mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* --- LEFT COLUMN --- */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            
            {/* IDENTITY & GALLERY */}
            <div className="bg-white p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border shadow-sm space-y-6 md:space-y-8">
               <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                <div className="relative group shrink-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden">
                    {formData.logo ? <img src={formData.logo} className="w-full h-full object-contain p-2" /> : <ImageIcon className="text-slate-300 w-8 h-8" />}
                  </div>
                  <label className="absolute inset-0 bg-black/40 text-white text-[9px] font-bold opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-all rounded-3xl">
                    UPLOAD
                    <input type="file" hidden onChange={(e:any) => {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.onloadend = () => setFormData({...formData, logo: reader.result});
                      reader.readAsDataURL(file);
                    }} />
                  </label>
                </div>
                
                <div className="w-full grid gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase text-slate-400">Business Name</label>
                      <input value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border bg-slate-50 text-sm outline-none focus:border-blue-500" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase text-slate-400">Category</label>
                      <input value={formData.category} onChange={(e)=>setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border bg-slate-50 text-sm outline-none" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-slate-400">Short Catchphrase</label>
                    <input value={formData.description} onChange={(e)=>setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border bg-slate-50 text-sm outline-none" />
                  </div>
                </div>
              </div>

              {/* GALLERY MANAGER */}
              <div className="space-y-4 pt-6 border-t">
                <div className="flex justify-between items-center">
                  <h3 className="font-black text-slate-900 flex items-center gap-2 text-sm md:text-base"><LayoutGrid className="w-4 h-4 text-blue-600" /> Gallery</h3>
                  <label className="text-[10px] font-bold text-blue-600 cursor-pointer bg-blue-50 px-3 py-1.5 rounded-full">
                    + Add
                    <input type="file" multiple hidden accept="image/*" onChange={(e: any) => {
                      const files = Array.from(e.target.files);
                      Promise.all(files.map(file => {
                        return new Promise((resolve) => {
                          const reader = new FileReader();
                          reader.onloadend = () => resolve(reader.result);
                          reader.readAsDataURL(file as File);
                        });
                      })).then((results) => {
                        setFormData((prev: any) => ({ ...prev, gallery: [...(prev.gallery || []), ...results] }));
                      });
                    }} />
                  </label>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 md:gap-3">
                  {formData.gallery?.map((img: any, i: number) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden border group">
                      <img src={img} className="w-full h-full object-cover" />
                      <button onClick={() => {
                        const ng = formData.gallery.filter((_: any, index: number) => index !== i);
                        setFormData({ ...formData, gallery: ng });
                      }} className="absolute top-1 right-1 bg-red-500 text-white rounded-md p-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition"><X className="w-3 h-3" /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* OVERVIEW & INCLUSIONS */}
            <div className="bg-white p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border shadow-sm space-y-6">
              <div className="space-y-3">
                <h2 className="text-lg md:text-xl font-black flex items-center gap-2"><AlignLeft className="w-5 h-5 text-blue-600" /> Description</h2>
                <textarea rows={5} value={formData.detailedOverview} onChange={(e)=>setFormData({...formData, detailedOverview: e.target.value})} className="w-full p-4 md:p-6 rounded-2xl md:rounded-3xl bg-slate-50 border outline-none resize-none text-sm leading-relaxed" placeholder="Tell the story..." />
              </div>

              <div className="pt-6 border-t">
                <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2 text-sm"><Sparkles className="w-4 h-4 text-blue-600" /> Amenities</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.inclusions?.map((item: string, i: number) => (
                    <span key={i} className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-[10px] font-bold border border-blue-100">
                      {item}
                      <button onClick={() => {
                        const ni = formData.inclusions.filter((_: any, idx: number) => idx !== i);
                        setFormData({...formData, inclusions: ni})
                      }}><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={tempInclusion} onChange={(e)=>setTempInclusion(e.target.value)} placeholder="Add amenity..." className="flex-1 px-4 py-2 rounded-xl bg-slate-50 border outline-none text-xs" />
                  <button onClick={() => {
                    if(tempInclusion) {
                      setFormData({...formData, inclusions: [...formData.inclusions, tempInclusion]});
                      setTempInclusion("");
                    }
                  }} className="bg-slate-900 text-white px-4 rounded-xl text-xs font-bold">Add</button>
                </div>
              </div>
            </div>

            {/* SERVICES */}
            <div className="bg-white p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg md:text-xl font-black flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-blue-600" /> Services</h2>
                <button onClick={()=>setFormData({...formData, services: [...formData.services, {title: "", desc: ""}]})} className="text-[10px] font-bold text-blue-600 uppercase">+ Add</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formData.services?.map((s:any, i:number) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-2xl border relative">
                    <button onClick={()=>{
                      const ns = [...formData.services]; ns.splice(i,1); setFormData({...formData, services: ns})
                    }} className="absolute top-2 right-2 text-slate-300 hover:text-red-500"><X className="w-4 h-4" /></button>
                    <input value={s.title} onChange={(e)=>{
                      const ns = [...formData.services]; ns[i].title = e.target.value; setFormData({...formData, services: ns})
                    }} placeholder="Service Title" className="w-full font-bold bg-transparent outline-none text-blue-600 text-sm mb-1 pr-6" />
                    <textarea value={s.desc} onChange={(e)=>{
                      const ns = [...formData.services]; ns[i].desc = e.target.value; setFormData({...formData, services: ns})
                    }} placeholder="Description..." className="w-full text-[11px] bg-transparent outline-none text-slate-500 resize-none" rows={2} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN --- */}
          <div className="space-y-6 md:space-y-8">
            
            {/* STATUS & PLAN */}
            <div className="bg-slate-900 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] text-white shadow-xl">
              <h3 className="text-base md:text-lg font-black mb-6">Admin Control</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <div>
                  <label className="text-[9px] font-black uppercase text-slate-500 block mb-2">Verification Status</label>
                  <select value={formData.status} onChange={(e)=>setFormData({...formData, status: e.target.value})} className="w-full bg-slate-800 rounded-xl px-4 py-3 text-xs font-bold outline-none border-none cursor-pointer">
                    <option value="pending">Pending</option>
                    <option value="verified">Verified</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase text-slate-500 block mb-2">Plan Level</label>
                  <select value={formData.plan} onChange={(e)=>setFormData({...formData, plan: e.target.value})} className="w-full bg-slate-800 rounded-xl px-4 py-3 text-xs font-bold outline-none border-none cursor-pointer">
                    <option>Standard</option>
                    <option>Premium</option>
                    <option>Gold</option>
                  </select>
                </div>
              </div>
            </div>

            {/* TIMING */}
            <div className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border shadow-sm space-y-4">
               <h3 className="font-black flex items-center gap-2 text-sm"><Clock className="w-4 h-4 text-green-600" /> Timing</h3>
               <div className="space-y-2">
                 {formData.workingHours?.map((hour: string, i: number) => (
                   <div key={i} className="flex justify-between items-center bg-green-50 px-3 py-2 rounded-xl border border-green-100">
                     <span className="text-[10px] font-bold text-green-700">{hour}</span>
                     <button onClick={() => {
                        const nh = formData.workingHours.filter((_: any, idx: number) => idx !== i);
                        setFormData({...formData, workingHours: nh})
                     }}><X className="w-3 h-3 text-green-400" /></button>
                   </div>
                 ))}
               </div>
               <div className="flex gap-2">
                 <input value={tempHour} onChange={(e)=>setTempHour(e.target.value)} placeholder="Mon-Fri..." className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border text-[10px] outline-none" />
                 <button onClick={() => {
                    if(tempHour) {
                      setFormData({...formData, workingHours: [...formData.workingHours, tempHour]});
                      setTempHour("");
                    }
                 }} className="bg-green-600 text-white px-3 rounded-xl text-[10px] font-bold">Add</button>
               </div>
            </div>

            {/* CONTACT & SOCIALS */}
            <div className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border shadow-sm space-y-6">
               <div className="space-y-4">
                 <h3 className="font-black text-sm">Contact Info</h3>
                 <div className="space-y-3">
                   <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border">
                     <Smartphone className="w-4 h-4 text-blue-600" />
                     <input value={formData.whatsapp} onChange={(e)=>setFormData({...formData, whatsapp: e.target.value})} placeholder="WhatsApp" className="flex-1 bg-transparent text-[11px] font-bold outline-none" />
                   </div>
                   <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border">
                     <Globe className="w-4 h-4 text-blue-600" />
                     <input value={formData.website} onChange={(e)=>setFormData({...formData, website: e.target.value})} placeholder="Website" className="flex-1 bg-transparent text-[11px] font-bold outline-none" />
                   </div>
                 </div>
               </div>

               <div className="space-y-4 pt-6 border-t">
                 <h3 className="font-black text-sm">Social Profiles</h3>
                 <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                   <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border">
                     <Instagram className="w-3.5 h-3.5 text-pink-500" />
                     <input value={formData.social?.instagram} onChange={(e)=>setFormData({...formData, social: {...formData.social, instagram: e.target.value}})} placeholder="Insta" className="flex-1 text-[9px] bg-transparent outline-none" />
                   </div>
                   <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border">
                     <Linkedin className="w-3.5 h-3.5 text-blue-700" />
                     <input value={formData.social?.linkedin} onChange={(e)=>setFormData({...formData, social: {...formData.social, linkedin: e.target.value}})} placeholder="Linkd" className="flex-1 text-[9px] bg-transparent outline-none" />
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}