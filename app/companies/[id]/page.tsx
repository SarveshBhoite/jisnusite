import { notFound } from "next/navigation"
import dbConnect from "@/lib/mongodb"
import Company from "@/models/Company"
import { 
  MapPin, Globe, ShieldCheck, Clock, 
  Phone, MessageSquare, Star, Info, 
  CheckCircle2, LayoutGrid, Smartphone,
  Instagram, Linkedin, Facebook, Twitter,
  Share2, Sparkles, ExternalLink
} from "lucide-react"

export default async function PublicCompanyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await dbConnect()
  const company = await Company.findById(id).lean()

  if (!company) notFound()

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* --- HERO SECTION --- */}
      <section className="bg-white border-b relative">
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-12">
          <div className="flex flex-col lg:flex-row items-start gap-10">
            
            <div className="flex-shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] bg-white border shadow-xl shadow-slate-100 p-4 flex items-center justify-center relative overflow-hidden group">
                <img src={company.logo || "/placeholder.png"} alt={company.name} className="w-full h-full object-contain transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent" />
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Verified Business
                </span>
                <span className="px-4 py-1.5 bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                  {company.category}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                {company.name}
              </h1>

              <p className="text-xl text-blue-600 font-bold max-w-2xl leading-relaxed">
                {company.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-4 text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="flex bg-amber-400 text-white px-2 py-0.5 rounded text-xs font-black">
                    4.8 <Star className="w-3 h-3 fill-current ml-1" />
                  </div>
                  <span className="text-sm font-bold underline decoration-slate-200 underline-offset-4">Top Rated Professional</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <MapPin className="w-4 h-4 text-red-400" /> {company.location ? "View Location Below" : "Location Not Shared"}
                </div>
              </div>
            </div>

            <div className="lg:w-72 w-full space-y-3">
              <a href={`tel:${company.whatsapp}`} className="w-full flex items-center justify-center gap-3 bg-primary text-white py-5 rounded-[2rem] font-black  ">
                <Phone className="w-5 h-5" /> Call Now
              </a>
              <a href={`https://wa.me/${company.whatsapp}`} target="_blank" className="w-full flex items-center justify-center gap-3 bg-white border-2 border-green-500 text-green-600 py-4 rounded-[2rem] font-black hover:bg-green-50 transition-all">
                <MessageSquare className="w-5 h-5" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTENT GRID --- */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* LEFT: MAIN CONTENT */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* GALLERY */}
            {company.gallery?.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 h-[400px] rounded-[3rem] overflow-hidden border">
                    <img src={company.gallery[0]} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col gap-4 h-[400px]">
                    <div className="flex-1 rounded-[2rem] overflow-hidden border">
                       <img src={company.gallery[1] || company.gallery[0]} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 rounded-[2rem] overflow-hidden border relative group">
                       <img src={company.gallery[2] || company.gallery[0]} className="w-full h-full object-cover" />
                       <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                          <LayoutGrid className="w-8 h-8 mb-2" />
                          <span className="font-bold text-sm">Total {company.gallery.length} Photos</span>
                       </div>
                    </div>
                  </div>
              </div>
            )}

            {/* OVERVIEW */}
            <div className="bg-white p-10 rounded-[3.5rem] border shadow-sm border-slate-100">
              <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-4">
                <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                Company Overview
              </h2>
              <p className="text-slate-600 text-lg leading-[1.8] whitespace-pre-line">
                {company.detailedOverview}
              </p>
            </div>

            {/* NEW: INCLUSIONS / AMENITIES */}
            {company.inclusions?.length > 0 && (
              <div className="bg-white p-10 rounded-[3.5rem] border shadow-sm border-slate-100">
                <h2 className="text-2xl font-black mb-8 flex items-center gap-4">
                  <Sparkles className="w-6 h-6 text-blue-400" /> What's Included
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {company.inclusions.map((item: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                      <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                      <span className="text-sm font-bold tracking-wide">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SERVICES */}
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm">
              <h2 className="text-3xl font-black text-slate-900 flex items-center gap-4 mb-10">
                <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                Our Services
              </h2>
              <div className="grid sm:grid-cols-2 gap-8">
                {company.services?.map((s: any, i: number) => (
                  <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-blue-200 transition-colors">
                    <h4 className="text-xl font-black text-slate-900 mb-2">{s.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* CONTACT & HOURS CARD */}
            <div className="bg-primary rounded-[3.5rem] p-10 text-white sticky top-24 shadow-2xl z-10">
              <h3 className="text-xl font-black mb-8">Business Details</h3>
              <div className="space-y-6">
                
                {/* TIMING SLOTS RENDER */}
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Working Hours</p>
                    {company.workingHours?.length > 0 ? (
                      company.workingHours.map((hour: string, idx: number) => (
                        <p key={idx} className="text-xs font-bold bg-green-400/10 text-green-400 px-3 py-1 rounded-lg border border-green-400/20">
                          {hour}
                        </p>
                      ))
                    ) : <p className="text-sm font-bold">Contact for Timing</p>}
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Website</p>
                    <a href={company.website} className="text-sm font-bold hover:text-blue-400 truncate block max-w-[180px]">
                      {company.website || "Not Available"}
                    </a>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                    <Smartphone className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Direct Line</p>
                    <p className="text-sm font-bold">{company.whatsapp}</p>
                  </div>
                </div>
              </div>

              {/* SOCIAL MEDIA ICONS */}
              <div className="mt-10 pt-8 border-t border-white/10 flex justify-center gap-6">
                {company.social?.instagram && <a href={company.social.instagram}><Instagram className="w-6 h-6 text-slate-400 hover:text-pink-400 transition" /></a>}
                {company.social?.facebook && <a href={company.social.facebook}><Facebook className="w-6 h-6 text-slate-400 hover:text-blue-400 transition" /></a>}
                {company.social?.linkedin && <a href={company.social.linkedin}><Linkedin className="w-6 h-6 text-slate-400 hover:text-blue-300 transition" /></a>}
                {company.social?.twitter && <a href={company.social.twitter}><Twitter className="w-6 h-6 text-slate-400 hover:text-sky-400 transition" /></a>}
              </div>
            </div>

            {/* LOCATION CARD */}
            {company.location && (
              <div className="bg-white p-8 rounded-[3rem] border shadow-2xl border-slate-100 sticky top-28 z-20">
                <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2 text-xl">
                  <MapPin className="w-6 h-6 text-red-500" /> Visit Us
                </h3>
                <div className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-xs text-slate-700 font-bold leading-relaxed">
                    {company.location}
                  </p>
                </div>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.location)}`} 
                  target="_blank" 
                  className="flex items-center justify-center gap-3 w-full py-5 bg-primary text-white font-black rounded-[2rem] hover:bg-blue-700 transition-all"
                >
                  <ExternalLink className="w-5 h-5" /> Open in Maps
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}