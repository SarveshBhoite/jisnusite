"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Loader2, Sparkles, CheckCircle2, Mail, Phone, Send, Info } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [services, setServices] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Advertisements Data (JustDial style banners)
  const ads = [
    { id: 1, title: "30% OFF ON SEO", bg: "bg-blue-600", text: "New Year Sale!" },
    { id: 2, title: "FREE DOMAIN NAME", bg: "bg-indigo-600", text: "With Business Plan" },
    { id: 3, title: "LOGO DESIGN @ ₹999", bg: "bg-purple-600", text: "Limited Offer" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servRes, portRes] = await Promise.all([
          fetch("/api/admin/services", { cache: "no-store" }),
          fetch("/api/admin/portfolio", { cache: "no-store" })
        ]);
        const sData = await servRes.json();
        const pData = await portRes.json();
        setServices(sData.slice(0, 3));
        const cleanPort = Array.isArray(pData) ? pData : (pData.data || []);
        setPortfolio(cleanPort.slice(0, 4));
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (

   
    
    <main className="bg-[oklch(0.98_0_0)]">
      {/* COMBINED HERO & ADS VIEWPORT (Approx 100vh total) */}
      <div className="min-h-screen flex flex-col bg-[oklch(0.98_0_0)] overflow-hidden">
        
        {/* HERO CONTENT (approx 65vh) */}
        <section className="flex-grow flex items-center relative pt-16">
          {/* Subtle Background Glow using Primary Deep Teal */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[oklch(0.35_0.12_199)]/5 blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Side: Text using Foreground and Primary */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[oklch(0.92_0_0)] border border-[oklch(0.92_0.01_199)] backdrop-blur-md">
                  <span className="text-[10px] font-bold text-[oklch(0.35_0.12_199)] uppercase tracking-[0.2em]">Jisnu Digital Agency</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-black text-[oklch(0.15_0_0)] leading-tight uppercase italic tracking-tighter">
                  Crafting Digital <br />
                  <span className="text-[oklch(0.35_0.12_199)]">Masterpieces.</span>
                </h1>
                
                <p className="text-[oklch(0.45_0_0)] text-sm md:text-base max-w-md leading-relaxed font-medium">
                  We specialize in high-end web development and strategic growth that transforms how brands connect with people.
                </p>

                <div className="flex items-center gap-4">
                  <button className="px-6 py-3 bg-[oklch(0.35_0.12_199)] text-white rounded-[var(--radius)] font-black uppercase text-[11px] tracking-widest hover:brightness-110 transition-all active:scale-95 shadow-md shadow-[oklch(0.35_0.12_199)]/20">
                    Get Started
                  </button>
                  <button className="text-[oklch(0.15_0_0)] text-[11px] font-black uppercase tracking-widest flex items-center gap-2 group">
                    View Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[oklch(0.65_0.15_190)]" />
                  </button>
                </div>
              </div>

              {/* Right Side: Small, Delicate Image */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-64 h-64 md:w-120 md:h-80">
                  {/* Decorative Border Frame using Border variable */}
                  <div className="absolute -inset-4 border border-[oklch(0.35_0.12_199)] rounded-[3rem] animate-[spin_20s_linear_infinite]" />
                  
                  <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-4 border-[oklch(1_0_0)] shadow-2xl shadow-[oklch(0.15_0_0)]/5">
                    <Image 
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" 
                      alt="Hero" 
                      fill 
                      className="object-cover hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SCROLLING ADS (Tucked at the bottom of the viewport) */}
        <section className="bg-[oklch(1_0_0)]/60 backdrop-blur-sm border-t border-[oklch(0.92_0.01_199)] py-8 z-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-4 mb-4">
              <span className="h-[1px] w-8 bg-[oklch(0.35_0.12_199)]"></span>
              <span className="text-[10px] font-black text-[oklch(0.45_0_0)] uppercase tracking-[0.3em]">Exclusive Offers</span>
            </div>
            
            <div className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused]">
              {[...ads, ...ads, ...ads].map((ad, index) => (
                <div 
                  key={index} 
                  className={`inline-block w-[280px] md:w-[350px] h-32 rounded-[var(--radius)] p-5 relative overflow-hidden flex-shrink-0 group cursor-pointer shadow-sm border border-[oklch(0.92_0.01_199)] transition-all bg-[oklch(1_0_0)]`}
                >
                  <div className="relative z-10 flex flex-col justify-center h-full">
                    <span className="text-[9px] font-black uppercase text-[oklch(0.45_0_0)] opacity-70 mb-1">{ad.text}</span>
                    <h3 className="text-base md:text-lg font-black uppercase italic leading-tight text-[oklch(0.35_0.12_199)] group-hover:text-[oklch(0.65_0.15_190)] transition-colors">
                      {ad.title}
                    </h3>
                  </div>
                  {/* Subtle color accent using the ad's background color variable but localized */}
                  <div className={`absolute top-0 right-0 w-1 h-full ${ad.bg}`} />
                  <Sparkles className="absolute right-2 bottom-2 w-8 h-8 text-[oklch(0.92_0.01_199)] group-hover:scale-125 transition-transform" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    
  

      {/* 2. SERVICES SECTION */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-black text-slate-900 uppercase italic">Popular Services</h2>
            <Link href="/services" className="text-sm font-bold text-primary flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <div key={s._id} className="group p-6 rounded-3xl border border-slate-100 bg-white hover:shadow-xl transition-all duration-300">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-900 font-bold mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    {s.title.charAt(0)}
                  </div>
                  <h3 className="text-lg font-black text-slate-900 uppercase italic mb-2">{s.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2">{s.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <span className="font-black text-slate-900">₹{s.discountPrice}</span>
                    <Link href="/services" className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. PORTFOLIO SECTION */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-black text-slate-900 uppercase italic">Recent Projects</h2>
            <p className="text-slate-500 text-sm mt-2">Delivering excellence across industries</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {portfolio.map((project) => (
              <div key={project._id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 group shadow-sm">
                <div className="relative aspect-video">
                  <Image src={project.image || "/project-placeholder.jpg"} alt={project.companyName} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-8 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">{project.category}</span>
                    <h3 className="text-xl font-black text-slate-900 uppercase italic">{project.companyName}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                    <ArrowRight className="w-5 h-5 -rotate-45" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US / ABOUT */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 space-y-6">
              <h2 className="text-3xl font-black text-slate-900 uppercase italic leading-none">Why Partner With <br/> <span className="text-primary text-5xl">Jisnu Digital?</span></h2>
              <p className="text-slate-600 text-sm leading-relaxed">We don&apos;t just build websites; we build business tools that generate leads and drive growth through expert digital strategy.</p>
              <div className="space-y-3">
                {["Expert Developers", "Result Oriented Work", "24/7 Premium Support"].map((text, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-xs font-black uppercase text-slate-700">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2 relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
              <Image src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop" alt="About" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONTACT FORM SECTION */}
      <section className="py-20 bg-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-black text-slate-900 uppercase italic">Get in Touch</h2>
              <p className="text-slate-500 text-sm mt-4 mb-8">Fill the form and our experts will contact you within 24 hours.</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <Mail className="w-5 h-5 text-primary" />
                  <p className="text-sm font-bold text-slate-800 italic">hello@jisnudigital.com</p>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <Phone className="w-5 h-5 text-primary" />
                  <p className="text-sm font-bold text-slate-800 italic">+91 98765 43210</p>
                </div>
              </div>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Your Name" className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:ring-2 focus:ring-primary transition-all text-slate-900" />
              <input type="email" placeholder="Your Email" className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:ring-2 focus:ring-primary transition-all text-slate-900" />
              <textarea placeholder="Tell us about your project" rows={3} className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:ring-2 focus:ring-primary transition-all text-slate-900"></textarea>
              <button className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-primary transition-all active:scale-95">
                Send Now <Send className="w-4 h-4"/>
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}





// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { 
//   ArrowRight, 
//   Loader2, 
//   Sparkles, 
//   CheckCircle2, 
//   Mail, 
//   Phone, 
//   Send, 
//   Star,
//   Zap,
//   MousePointer2,
//   ArrowUpRight,
//   Circle,
//   Triangle,
//   Square,
//   Hexagon,
//   Play
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useMemo } from "react";

// export default function Home() {
//   const [services, setServices] = useState<any[]>([]);
//   const [portfolio, setPortfolio] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [hoveredService, setHoveredService] = useState<number | null>(null);
//   const [currentTime, setCurrentTime] = useState("");

//   const ads = [
//     { id: 1, title: "30% OFF ON SEO", bg: "bg-amber-400", text: "New Year Sale!", emoji: "🚀" },
//     { id: 2, title: "FREE DOMAIN NAME", bg: "bg-violet-400", text: "With Business Plan", emoji: "🎁" },
//     { id: 3, title: "LOGO DESIGN @ ₹999", bg: "bg-rose-400", text: "Limited Offer", emoji: "🎨" },
//     { id: 4, title: "WEB DEV 50% OFF", bg: "bg-emerald-400", text: "This Week Only", emoji: "💻" },
//   ];

//   const featuredProject = useMemo(() => {
//     if (portfolio.length === 0) return null;
//     // Returns a random project from the fetched portfolio array
//     return portfolio[Math.floor(Math.random() * portfolio.length)];
//   }, [portfolio]);

//   useEffect(() => {
//     const updateTime = () => {
//       setCurrentTime(new Date().toLocaleTimeString('en-US', { 
//         hour: '2-digit', 
//         minute: '2-digit',
//         hour12: true 
//       }));
//     };
//     updateTime();
//     const interval = setInterval(updateTime, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [servRes, portRes] = await Promise.all([
//           fetch("/api/admin/services", { cache: "no-store" }),
//           fetch("/api/admin/portfolio", { cache: "no-store" })
//         ]);
//         const sData = await servRes.json();
//         const pData = await portRes.json();
//         setServices(sData.slice(0, 4));
//         const cleanPort = Array.isArray(pData) ? pData : (pData.data || []);
//         setPortfolio(cleanPort.slice(0, 4));
//       } catch (err) {
//         console.error("Failed to fetch data", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <main className="bg-stone-50 overflow-hidden">
      
//       {/* ========== HERO SECTION ========== */}
//       <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//         {/* Top Status Bar */}
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center gap-3">
//             <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
//             <span className="text-sm font-medium text-stone-600">Available for projects</span>
//           </div>
//           <div className="hidden md:block text-sm text-stone-500 font-mono">
//             {currentTime}
//           </div>
//         </div>

//         {/* Improved Bento Grid */}
//         <div className="grid grid-cols-12 grid-rows-6 gap-4 h-[75vh] min-h-[700px]">
          
//           {/* Main Headline (Top Left Large) */}
//           <div className="col-span-12 lg:col-span-7 row-span-4 bg-white rounded-[2.5rem] p-8 lg:p-12 flex flex-col justify-between border border-stone-200 relative overflow-hidden group">
//             <div className="absolute top-8 right-8 flex gap-2 z-20">
//               <div className="w-3 h-3 rounded-full bg-violet-500" />
//               <div className="w-3 h-3 rounded-full bg-amber-400" />
//               <div className="w-3 h-3 rounded-full bg-rose-400" />
//             </div>
            
//             <div className="relative z-10">
//               <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-stone-100 rounded-full mb-8">
//                 <Sparkles className="w-4 h-4 text-violet-600" />
//                 <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Digital Agency</span>
//               </div>
              
//               <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-stone-900 leading-[0.85] tracking-tight">
//                 We Build<br />
//                 <span className="relative inline-block text-violet-600">
//                   Digital
//                   <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
//                     <path d="M2 10C50 2 150 2 198 10" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round"/>
//                   </svg>
//                 </span><br />
//                 Experiences
//               </h1>
//             </div>
            
//             <div className="relative z-10 flex items-center gap-6 mt-8">
//               <Link href="/services" className="flex items-center gap-3 px-8 py-4 bg-stone-900 text-white rounded-full font-bold hover:bg-violet-600 transition-all">
//                 Start a Project
//                 <div className="bg-white/20 p-1 rounded-full"><ArrowRight className="w-4 h-4" /></div>
//               </Link>
//               <Link href="/portfolio" className="text-stone-600 font-bold flex items-center gap-1 hover:text-stone-900">
//                 View our work <ArrowUpRight className="w-4 h-4" />
//               </Link>
//             </div>
//           </div>

//           {/* Projects Stats (Purple) */}
//           <div className="col-span-6 lg:col-span-2 row-span-2 bg-violet-600 rounded-[2rem] p-8 flex flex-col justify-between text-white relative overflow-hidden">
//             <Zap className="w-8 h-8 opacity-80" />
//             <div>
//               <div className="text-5xl font-black">150+</div>
//               <div className="text-violet-200 text-xs font-bold uppercase tracking-wider">Projects Done</div>
//             </div>
//           </div>

//           {/* Featured Dynamic Portfolio Card */}
//           <div className="col-span-6 lg:col-span-3 row-span-4 bg-stone-200 rounded-[2rem] relative overflow-hidden group">
//             <Image 
//               src={featuredProject?.image || "/hero-image.jpg"} 
//               alt="Featured" fill className="object-cover group-hover:scale-105 transition-transform duration-700" 
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
//             <div className="absolute bottom-8 left-8">
//               <div className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">Featured</div>
//               <div className="text-white font-bold text-xl">{featuredProject?.companyName || "Creative Solutions"}</div>
//             </div>
//           </div>

//           {/* Happy Clients (Yellow) */}
//           <div className="hidden lg:flex col-span-2 row-span-2 bg-amber-400 rounded-[2rem] p-8 flex-col justify-between relative">
//             <Star className="w-8 h-8 text-amber-900" />
//             <div>
//               <div className="text-5xl font-black text-amber-900">50+</div>
//               <div className="text-amber-800 text-xs font-bold uppercase tracking-wider">Happy Clients</div>
//             </div>
//           </div>

//           {/* Description Block */}
//           <div className="col-span-12 lg:col-span-4 row-span-2 bg-stone-100 rounded-[2rem] p-10 flex items-center justify-between border border-stone-200">
//             <p className="text-stone-500 text-lg leading-relaxed max-w-[240px]">
//               We craft digital experiences that connect brands with their audience.
//             </p>
//             <div className="w-14 h-14 rounded-full border-2 border-stone-300 flex items-center justify-center animate-bounce">
//               <Send className="w-5 h-5 text-stone-400 -rotate-45" />
//             </div>
//           </div>

//           {/* Showreel (Gradient) */}
//           <div className="hidden lg:flex col-span-3 row-span-2 bg-gradient-to-br from-rose-400 to-orange-400 rounded-[2rem] p-6 items-center justify-center relative cursor-pointer group">
//             <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-all">
//               <Play className="w-6 h-6 text-rose-500 fill-current ml-1" />
//             </div>
//             <span className="absolute bottom-6 left-8 text-white font-bold text-xs uppercase tracking-widest">Watch Showreel</span>
//           </div>
//         </div>
//       </section>

//       {/* ========== MARQUEE ADS ========== */}
//       <section className="py-6 overflow-hidden border-y border-stone-200 bg-white">
//         <div className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused]">
//           {[...ads, ...ads, ...ads, ...ads].map((ad, index) => (
//             <div 
//               key={index} 
//               className={`group relative w-[280px] h-24 ${ad.bg} rounded-2xl p-4 flex-shrink-0 cursor-pointer overflow-hidden transition-all hover:scale-105`}
//             >
//               <div className="flex items-center justify-between h-full">
//                 <div>
//                   <span className="text-xs font-bold uppercase tracking-widest text-black/60">{ad.text}</span>
//                   <h3 className="text-lg font-black text-black">{ad.title}</h3>
//                 </div>
//                 <span className="text-3xl">{ad.emoji}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ========== SERVICES - HORIZONTAL SCROLL CARDS ========== */}
//       <section className="py-24 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
//           {/* Section Header - Asymmetric */}
//           <div className="grid grid-cols-12 gap-4 mb-16">
//             <div className="col-span-12 lg:col-span-5">
//               <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-100 rounded-full mb-4">
//                 <div className="w-2 h-2 rounded-full bg-violet-600" />
//                 <span className="text-xs font-bold text-violet-700 uppercase tracking-widest">Services</span>
//               </div>
//               <h2 className="text-4xl md:text-5xl font-black text-stone-900 leading-tight">
//                 What We
//                 <span className="text-violet-600"> Do Best</span>
//               </h2>
//             </div>
//             <div className="col-span-12 lg:col-span-5 lg:col-start-8 flex items-end">
//               <p className="text-stone-500 text-lg">
//                 Comprehensive digital solutions tailored to elevate your brand and drive measurable results.
//               </p>
//             </div>
//           </div>

//           {loading ? (
//             <div className="flex justify-center py-20">
//               <Loader2 className="w-12 h-12 animate-spin text-violet-600" />
//             </div>
//           ) : (
//             <>
//               {/* Services - Staggered Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {services.map((s, index) => (
//                   <div 
//                     key={s._id}
//                     className={`group relative p-8 rounded-[2rem] border-2 transition-all duration-500 cursor-pointer ${
//                       index % 2 === 1 ? 'md:translate-y-12' : ''
//                     } ${
//                       hoveredService === index 
//                         ? 'bg-stone-900 border-stone-900 text-white' 
//                         : 'bg-stone-50 border-stone-200 hover:border-stone-300'
//                     }`}
//                     onMouseEnter={() => setHoveredService(index)}
//                     onMouseLeave={() => setHoveredService(null)}
//                   >
//                     {/* Service Number */}
//                     <div className={`absolute top-8 right-8 text-7xl font-black transition-colors ${
//                       hoveredService === index ? 'text-white/10' : 'text-stone-200'
//                     }`}>
//                       {String(index + 1).padStart(2, '0')}
//                     </div>

//                     <div className="relative z-10">
//                       {/* Icon */}
//                       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
//                         hoveredService === index ? 'bg-violet-600' : 'bg-white border-2 border-stone-200'
//                       }`}>
//                         <span className={`text-2xl font-black ${
//                           hoveredService === index ? 'text-white' : 'text-stone-900'
//                         }`}>
//                           {s.title.charAt(0)}
//                         </span>
//                       </div>

//                       <h3 className={`text-2xl font-bold mb-3 ${
//                         hoveredService === index ? 'text-white' : 'text-stone-900'
//                       }`}>
//                         {s.title}
//                       </h3>
                      
//                       <p className={`text-sm leading-relaxed mb-6 line-clamp-2 ${
//                         hoveredService === index ? 'text-stone-300' : 'text-stone-500'
//                       }`}>
//                         {s.description}
//                       </p>

//                       <div className="flex items-center justify-between">
//                         <div className="flex items-baseline gap-2">
//                           <span className={`text-3xl font-black ${
//                             hoveredService === index ? 'text-white' : 'text-stone-900'
//                           }`}>
//                             ₹{s.discountPrice}
//                           </span>
//                           {s.price && (
//                             <span className={`text-sm line-through ${
//                               hoveredService === index ? 'text-stone-500' : 'text-stone-400'
//                             }`}>
//                               ₹{s.price}
//                             </span>
//                           )}
//                         </div>

//                         <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all group-hover:scale-110 ${
//                           hoveredService === index ? 'bg-violet-600' : 'bg-stone-200'
//                         }`}>
//                           <ArrowUpRight className={`w-5 h-5 ${
//                             hoveredService === index ? 'text-white' : 'text-stone-600'
//                           }`} />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* View All Link */}
//               <div className="flex justify-center mt-16">
//                 <Link 
//                   href="/services"
//                   className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-stone-200 rounded-full font-bold hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all"
//                 >
//                   View All Services
//                   <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </Link>
//               </div>
//             </>
//           )}
//         </div>
//       </section>

//       {/* ========== PORTFOLIO - MASONRY STYLE ========== */}
//       <section className="py-24 bg-stone-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
//           {/* Section Header */}
//           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
//             <div>
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-12 h-1 bg-violet-600 rounded-full" />
//                 <span className="text-sm font-bold text-violet-600 uppercase tracking-widest">Portfolio</span>
//               </div>
//               <h2 className="text-4xl md:text-5xl font-black text-stone-900">
//                 Selected Works
//               </h2>
//             </div>
//             <Link 
//               href="/portfolio"
//               className="inline-flex items-center gap-2 text-stone-600 font-medium hover:text-stone-900 transition-colors"
//             >
//               View all projects <ArrowRight className="w-4 h-4" />
//             </Link>
//           </div>

//           {/* Portfolio - Creative Grid */}
//           <div className="grid grid-cols-12 gap-4 md:gap-6">
//             {portfolio.map((project, index) => {
//               // Different sizes for visual interest
//               const sizes = [
//                 "col-span-12 md:col-span-8 aspect-[16/10]",
//                 "col-span-12 md:col-span-4 aspect-square",
//                 "col-span-12 md:col-span-5 aspect-[4/3]",
//                 "col-span-12 md:col-span-7 aspect-[16/9]"
//               ];
              
//               return (
//                 <div 
//                   key={project._id}
//                   className={`group relative ${sizes[index % 4]} rounded-[2rem] overflow-hidden cursor-pointer`}
//                 >
//                   <Image 
//                     src={project.image || "/project-placeholder.jpg"} 
//                     alt={project.companyName} 
//                     fill 
//                     className="object-cover transition-transform duration-700 group-hover:scale-110" 
//                   />
                  
//                   {/* Overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  
//                   {/* Content */}
//                   <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
//                     {/* Category */}
//                     <div className="self-start">
//                       <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-widest">
//                         {project.category}
//                       </span>
//                     </div>
                    
//                     {/* Title & Arrow */}
//                     <div className="flex items-end justify-between">
//                       <div>
//                         <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
//                           {project.companyName}
//                         </h3>
//                         <p className="text-white/70 text-sm max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                           {project.description || 'Digital solution crafted with precision'}
//                         </p>
//                       </div>
//                       <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center flex-shrink-0 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
//                         <ArrowUpRight className="w-6 h-6 text-stone-900" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* ========== WHY CHOOSE US - SPLIT DESIGN ========== */}
//       <section className="py-24 bg-white relative">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-12 gap-8">
            
//             {/* Left - Sticky Content */}
//             <div className="col-span-12 lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
//               <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 rounded-full mb-6">
//                 <Star className="w-3 h-3 text-amber-600" />
//                 <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">Why Us</span>
//               </div>
              
//               <h2 className="text-4xl md:text-5xl font-black text-stone-900 leading-tight mb-6">
//                 We&apos;re Not Just
//                 <span className="block text-violet-600">Another Agency</span>
//               </h2>
              
//               <p className="text-stone-500 text-lg leading-relaxed mb-8">
//                 We combine creativity with strategy to deliver results that exceed expectations. Every project is a partnership.
//               </p>

//               {/* Stats Row */}
//               <div className="flex gap-8">
//                 <div>
//                   <div className="text-4xl font-black text-stone-900">5+</div>
//                   <div className="text-sm text-stone-500">Years Experience</div>
//                 </div>
//                 <div>
//                   <div className="text-4xl font-black text-stone-900">98%</div>
//                   <div className="text-sm text-stone-500">Client Satisfaction</div>
//                 </div>
//               </div>
//             </div>

//             {/* Right - Features Cards */}
//             <div className="col-span-12 lg:col-span-6 lg:col-start-7 space-y-6">
//               {[
//                 { 
//                   icon: "⚡", 
//                   color: "bg-amber-400",
//                   title: "Lightning Fast Delivery", 
//                   desc: "We respect deadlines. Your project will be delivered on time, every single time. Our agile process ensures quick turnarounds without compromising quality." 
//                 },
//                 { 
//                   icon: "🎯", 
//                   color: "bg-rose-400",
//                   title: "Result Oriented Approach", 
//                   desc: "We focus on metrics that matter. Every design decision is backed by data and aimed at achieving your business objectives." 
//                 },
//                 { 
//                   icon: "🚀", 
//                   color: "bg-violet-500",
//                   title: "Cutting-Edge Technology", 
//                   desc: "We use the latest tools and frameworks to build scalable, future-proof solutions that grow with your business." 
//                 },
//                 { 
//                   icon: "💬", 
//                   color: "bg-emerald-400",
//                   title: "24/7 Premium Support", 
//                   desc: "Our team is always here for you. Get round-the-clock support and assistance whenever you need it." 
//                 },
//               ].map((feature, i) => (
//                 <div 
//                   key={i} 
//                   className="group p-8 rounded-[2rem] bg-stone-50 border-2 border-stone-100 hover:border-stone-200 hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-300"
//                 >
//                   <div className="flex gap-6">
//                     <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
//                       {feature.icon}
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-bold text-stone-900 mb-2">{feature.title}</h3>
//                       <p className="text-stone-500 leading-relaxed">{feature.desc}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ========== CONTACT - CREATIVE LAYOUT ========== */}
//       <section className="py-24 bg-stone-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
//           {/* Large Heading */}
//           <div className="text-center mb-16">
//             <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-stone-900 leading-none">
//               Let&apos;s Work
//               <span className="block text-violet-600">Together</span>
//             </h2>
//           </div>

//           <div className="grid grid-cols-12 gap-6">
            
//             {/* Contact Info Cards */}
//             <div className="col-span-12 lg:col-span-4 space-y-6">
//               <div className="p-8 bg-stone-900 rounded-[2rem] text-white">
//                 <Mail className="w-8 h-8 mb-6" />
//                 <div className="text-sm text-stone-400 uppercase tracking-widest mb-2">Email Us</div>
//                 <div className="text-xl font-bold">hello@jisnudigital.com</div>
//               </div>
              
//               <div className="p-8 bg-violet-600 rounded-[2rem] text-white">
//                 <Phone className="w-8 h-8 mb-6" />
//                 <div className="text-sm text-violet-200 uppercase tracking-widest mb-2">Call Us</div>
//                 <div className="text-xl font-bold">+91 98765 43210</div>
//               </div>

//               <div className="p-8 bg-amber-400 rounded-[2rem]">
//                 <div className="text-sm text-amber-800 uppercase tracking-widest mb-2">Response Time</div>
//                 <div className="text-4xl font-black text-amber-900">24 hrs</div>
//               </div>
//             </div>

//             {/* Form */}
//             <div className="col-span-12 lg:col-span-8">
//               <div className="h-full p-8 md:p-12 bg-white rounded-[2rem] border-2 border-stone-200">
//                 <h3 className="text-2xl font-bold text-stone-900 mb-2">Send us a message</h3>
//                 <p className="text-stone-500 mb-8">Fill out the form and we&apos;ll get back to you shortly.</p>
                
//                 <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-bold text-stone-700 mb-2">Name</label>
//                       <input 
//                         type="text" 
//                         placeholder="John Doe" 
//                         className="w-full px-5 py-4 bg-stone-50 rounded-xl border-2 border-stone-100 outline-none focus:border-violet-500 transition-all text-stone-900" 
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-bold text-stone-700 mb-2">Email</label>
//                       <input 
//                         type="email" 
//                         placeholder="john@example.com" 
//                         className="w-full px-5 py-4 bg-stone-50 rounded-xl border-2 border-stone-100 outline-none focus:border-violet-500 transition-all text-stone-900" 
//                       />
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-bold text-stone-700 mb-2">Subject</label>
//                     <input 
//                       type="text" 
//                       placeholder="Project Inquiry" 
//                       className="w-full px-5 py-4 bg-stone-50 rounded-xl border-2 border-stone-100 outline-none focus:border-violet-500 transition-all text-stone-900" 
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-bold text-stone-700 mb-2">Message</label>
//                     <textarea 
//                       placeholder="Tell us about your project..." 
//                       rows={4} 
//                       className="w-full px-5 py-4 bg-stone-50 rounded-xl border-2 border-stone-100 outline-none focus:border-violet-500 transition-all text-stone-900 resize-none"
//                     ></textarea>
//                   </div>
                  
//                   <button 
//                     type="submit"
//                     className="w-full py-5 bg-stone-900 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-violet-600 transition-all active:scale-[0.98]"
//                   >
//                     Send Message
//                     <Send className="w-5 h-5" />
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ========== FINAL CTA ========== */}
//       <section className="py-24 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="relative p-12 md:p-20 rounded-[3rem] bg-stone-900 overflow-hidden">
            
//             {/* Background Elements */}
//             <div className="absolute inset-0 overflow-hidden">
//               <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-600 rounded-full opacity-20 blur-3xl" />
//               <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500 rounded-full opacity-20 blur-3xl" />
              
//               {/* Grid Pattern */}
//               <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
//             </div>

//             <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
//               <div>
//                 <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
//                   Ready to Start Your
//                   <span className="block text-violet-400">Next Project?</span>
//                 </h2>
//               </div>
              
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <Link 
//                   href="/contact"
//                   className="px-8 py-4 bg-white text-stone-900 rounded-full font-bold hover:bg-violet-100 transition-all"
//                 >
//                   Get in Touch
//                 </Link>
//                 <Link 
//                   href="/services"
//                   className="px-8 py-4 border-2 border-white/20 text-white rounded-full font-bold hover:bg-white/10 transition-all"
//                 >
//                   View Services
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//     </main>
//   );
// }