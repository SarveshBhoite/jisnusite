"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { 
  ArrowLeft, Upload, Plus, X, Loader2, CheckCircle, 
  MessageSquare, Globe, Instagram, Linkedin, Facebook, Twitter,
  LayoutGrid, Image as ImageIcon, Clock, Shield, MapPin, AlignLeft,
  Smartphone, Mail, Info, CreditCard, CheckCircle2, Sparkles
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

  // State for adding temporary chips
  const [tempInclusion, setTempInclusion] = useState("")
  const [tempHour, setTempHour] = useState("")

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await fetch(`/api/companies/${params.id}`)
        const json = await res.json()
        if (json.success) {
          // Ensure arrays exist to avoid map errors
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

  if (loading) return <div className="h-screen flex items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-blue-600 w-10 h-10" /></div>

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* --- STICKY HEADER --- */}
      <div className="bg-white border-b sticky top-0 z-50 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center mt-20">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/admin/manage-companies" className="p-2 hover:bg-slate-100 rounded-full transition">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Admin Editing Mode</p>
              <h1 className="text-xl font-black">{formData.name || "Loading..."}</h1>
            </div>
          </div>
          <button onClick={handleUpdate} disabled={updating} className="bg-primary text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2  shadow-xl  transition-all active:scale-95">
            {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
            Save Business Profile
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* --- LEFT COLUMN --- */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* IDENTITY & GALLERY */}
            <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm space-y-8">
               {/* Business Header Info */}
               <div className="flex items-start gap-6">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden">
                    {formData.logo ? <img src={formData.logo} className="w-full h-full object-contain p-2" /> : <ImageIcon className="text-slate-300 w-8 h-8" />}
                  </div>
                  <label className="absolute inset-0 bg-black/40 text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-all rounded-3xl">
                    CHANGE LOGO
                    <input type="file" hidden onChange={(e:any) => {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.onloadend = () => setFormData({...formData, logo: reader.result});
                      reader.readAsDataURL(file);
                    }} />
                  </label>
                </div>
                
                <div className="flex-1 grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400">Business Name</label>
                      <input value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border bg-slate-50 outline-none focus:border-blue-500" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400">Category</label>
                      <input value={formData.category} onChange={(e)=>setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 rounded-xl border bg-slate-50 outline-none" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400">Short Description</label>
                    <input value={formData.description} onChange={(e)=>setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 rounded-xl border bg-slate-50 outline-none" />
                  </div>
                </div>
              </div>

              {/* GALLERY MANAGER */}
              <div className="space-y-4 pt-6 border-t">
                <div className="flex justify-between items-center">
                  <h3 className="font-black text-slate-900 flex items-center gap-2"><LayoutGrid className="w-5 h-5 text-blue-600" /> Image Gallery</h3>
                  <label className="text-xs font-bold text-blue-600 cursor-pointer bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition">
                    + Add Images
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
                <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
                  {formData.gallery?.map((img: any, i: number) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden border group">
                      <img src={img} className="w-full h-full object-cover" />
                      <button onClick={() => {
                        const ng = formData.gallery.filter((_: any, index: number) => index !== i);
                        setFormData({ ...formData, gallery: ng });
                      }} className="absolute top-1 right-1 bg-red-500 text-white rounded-md p-1 opacity-0 group-hover:opacity-100 transition"><X className="w-3 h-3" /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* OVERVIEW & INCLUSIONS */}
            <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl font-black flex items-center gap-2"><AlignLeft className="w-6 h-6 text-blue-600" /> Detailed Overview</h2>
                <textarea rows={6} value={formData.detailedOverview} onChange={(e)=>setFormData({...formData, detailedOverview: e.target.value})} className="w-full p-6 rounded-3xl bg-slate-50 border outline-none resize-none" placeholder="Business story..." />
              </div>

              {/* INCLUSIONS (CHIPS) */}
              <div className="pt-6 border-t">
                <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2"><Sparkles className="w-5 h-5 text-blue-600" /> Inclusions & Amenities</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.inclusions?.map((item: string, i: number) => (
                    <span key={i} className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-xl text-xs font-bold border border-blue-100">
                      {item}
                      <button onClick={() => {
                        const ni = formData.inclusions.filter((_: any, idx: number) => idx !== i);
                        setFormData({...formData, inclusions: ni})
                      }}><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={tempInclusion} onChange={(e)=>setTempInclusion(e.target.value)} placeholder="Add inclusion (e.g. Free WiFi)" className="flex-1 px-4 py-2 rounded-xl bg-slate-50 border outline-none text-sm" />
                  <button onClick={() => {
                    if(tempInclusion) {
                      setFormData({...formData, inclusions: [...formData.inclusions, tempInclusion]});
                      setTempInclusion("");
                    }
                  }} className="bg-slate-900 text-white px-4 rounded-xl text-sm font-bold">Add</button>
                </div>
              </div>
            </div>

            {/* SERVICES */}
            <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black flex items-center gap-2"><CheckCircle2 className="w-6 h-6 text-blue-600" /> Services</h2>
                <button onClick={()=>setFormData({...formData, services: [...formData.services, {title: "", desc: ""}]})} className="text-xs font-bold text-blue-600">+ Add New Service</button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {formData.services?.map((s:any, i:number) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-2xl border relative">
                    <button onClick={()=>{
                      const ns = [...formData.services]; ns.splice(i,1); setFormData({...formData, services: ns})
                    }} className="absolute top-2 right-2 text-slate-400 hover:text-red-500"><X className="w-4 h-4" /></button>
                    <input value={s.title} onChange={(e)=>{
                      const ns = [...formData.services]; ns[i].title = e.target.value; setFormData({...formData, services: ns})
                    }} placeholder="Service Title" className="w-full font-bold bg-transparent outline-none text-blue-600 mb-1" />
                    <textarea value={s.desc} onChange={(e)=>{
                      const ns = [...formData.services]; ns[i].desc = e.target.value; setFormData({...formData, services: ns})
                    }} placeholder="Service description..." className="w-full text-xs bg-transparent outline-none text-slate-500 resize-none" rows={2} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN --- */}
          <div className="space-y-8">
            
            {/* STATUS & PLAN */}
            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl">
              <h3 className="text-lg font-black mb-6">Admin Control</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Verification Status</label>
                  <select value={formData.status} onChange={(e)=>setFormData({...formData, status: e.target.value})} className="w-full bg-slate-800 rounded-xl px-4 py-3 text-sm font-bold outline-none border-none">
                    <option value="pending">Pending</option>
                    <option value="verified">Verified</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Business Plan</label>
                  <select value={formData.plan} onChange={(e)=>setFormData({...formData, plan: e.target.value})} className="w-full bg-slate-800 rounded-xl px-4 py-3 text-sm font-bold outline-none border-none">
                    <option>Standard</option>
                    <option>Premium</option>
                    <option>Gold</option>
                  </select>
                </div>
              </div>
            </div>

            {/* TIMING (ARRAY BASED) */}
            <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm space-y-4">
               <h3 className="font-black flex items-center gap-2"><Clock className="w-5 h-5 text-green-600" /> Working Hours</h3>
               <div className="space-y-2">
                 {formData.workingHours?.map((hour: string, i: number) => (
                   <div key={i} className="flex justify-between items-center bg-green-50 px-3 py-2 rounded-xl border border-green-100">
                     <span className="text-xs font-bold text-green-700">{hour}</span>
                     <button onClick={() => {
                        const nh = formData.workingHours.filter((_: any, idx: number) => idx !== i);
                        setFormData({...formData, workingHours: nh})
                     }}><X className="w-3 h-3 text-green-400" /></button>
                   </div>
                 ))}
               </div>
               <div className="flex gap-2">
                 <input value={tempHour} onChange={(e)=>setTempHour(e.target.value)} placeholder="e.g. Mon-Fri: 9AM-6PM" className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border text-xs outline-none" />
                 <button onClick={() => {
                    if(tempHour) {
                      setFormData({...formData, workingHours: [...formData.workingHours, tempHour]});
                      setTempHour("");
                    }
                 }} className="bg-green-600 text-white px-3 rounded-xl text-xs font-bold">Add</button>
               </div>
            </div>

            {/* CONTACT LINKS */}
            <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm space-y-4">
               <h3 className="font-black">Contact Info</h3>
               <div className="space-y-3">
                 <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border">
                   <Smartphone className="w-4 h-4 text-blue-600" />
                   <input value={formData.whatsapp} onChange={(e)=>setFormData({...formData, whatsapp: e.target.value})} placeholder="WhatsApp Number" className="flex-1 bg-transparent text-xs font-bold outline-none" />
                 </div>
                 <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border">
                   <Globe className="w-4 h-4 text-blue-600" />
                   <input value={formData.website} onChange={(e)=>setFormData({...formData, website: e.target.value})} placeholder="Website Link" className="flex-1 bg-transparent text-xs font-bold outline-none" />
                 </div>
                 <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border">
                   <MapPin className="w-4 h-4 text-red-500" />
                   <input value={formData.location} onChange={(e)=>setFormData({...formData, location: e.target.value})} placeholder="Location/Address" className="flex-1 bg-transparent text-xs font-bold outline-none" />
                 </div>
               </div>
            </div>

            {/* SOCIAL MEDIA */}
            <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm space-y-4">
               <h3 className="font-black">Social Profiles</h3>
               <div className="grid gap-3">
                 <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border">
                   <Instagram className="w-4 h-4 text-pink-500" />
                   <input value={formData.social?.instagram} onChange={(e)=>setFormData({...formData, social: {...formData.social, instagram: e.target.value}})} placeholder="Instagram Link" className="flex-1 text-[10px] bg-transparent outline-none" />
                 </div>
                 <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border">
                   <Linkedin className="w-4 h-4 text-blue-700" />
                   <input value={formData.social?.linkedin} onChange={(e)=>setFormData({...formData, social: {...formData.social, linkedin: e.target.value}})} placeholder="LinkedIn Link" className="flex-1 text-[10px] bg-transparent outline-none" />
                 </div>
                 <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border">
                   <Twitter className="w-4 h-4 text-sky-500" />
                   <input value={formData.social?.twitter} onChange={(e)=>setFormData({...formData, social: {...formData.social, twitter: e.target.value}})} placeholder="Twitter/X Link" className="flex-1 text-[10px] bg-transparent outline-none" />
                 </div>
                 <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border">
                   <Facebook className="w-4 h-4 text-blue-600" />
                   <input value={formData.social?.facebook} onChange={(e)=>setFormData({...formData, social: {...formData.social, facebook: e.target.value}})} placeholder="Facebook Link" className="flex-1 text-[10px] bg-transparent outline-none" />
                 </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}