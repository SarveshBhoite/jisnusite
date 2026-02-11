"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { X, CheckCircle2, Crown, Star, Zap } from "lucide-react";

export default function PricingPopup() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure we are in the browser
  useEffect(() => {
    setIsClient(true);
  }, []);

useEffect(() => {
  if (status === "authenticated" && pathname.includes("/dashboard")) {
    // Show every time they land on dashboard while logged in
    const timer = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(timer);
  } else {
    // Hide if they log out
    setShow(false);
  }
}, [status, pathname]);

  if (!show || !isClient) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* Dark Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-500" 
        onClick={() => setShow(false)} 
      />
      
      {/* Modal Container */}
      <div className="bg-white w-full max-w-6xl rounded-[2.5rem] overflow-hidden shadow-2xl relative z-[100000] animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col lg:flex-row">
        
        {/* Close Button */}
        <button 
          onClick={() => setShow(false)} 
          className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 rounded-full z-[100001]"
        >
          <X className="w-6 h-6 text-slate-500" />
        </button>

        {/* Left Side: Branding (Flyer Content) */}
        <div className="lg:w-1/4 bg-slate-900 p-10 text-white flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate-800">
          <h2 className="text-4xl font-black italic leading-tight tracking-tighter">
            DIGITAL <br /> MARKETING <br /> 
            <span className="text-cyan-500">& BRANDING</span>
          </h2>
          <p className="mt-6 text-slate-400 text-xs font-medium leading-relaxed">
            Scale your brand with professional social media management.
          </p>
        </div>

        {/* Right Side: Packages (Flyer Data) */}
        <div className="lg:w-3/4 p-8 md:p-12 bg-slate-50 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* PLATINUM (Best Value from your flyer) */}
            <PackageCard 
              name="Platinum" 
              icon={<Crown className="text-amber-500" />} 
              features={["30 Posts", "10 Reels", "YT / GMB Included", "Local SEO", "Website SEO", "Full Research"]}
              color="border-amber-400"
              btn="bg-amber-600"
            />
            {/* GOLD */}
            <PackageCard 
              name="Gold" 
              icon={<Zap className="text-cyan-500" />} 
              features={["20 Posts", "5 Reels", "Adv. Research", "IG/FB/TW/LI", "Google Optimization", "Lead Campaigns"]}
              color="border-cyan-500"
              btn="bg-cyan-600"
              popular
            />
            {/* SILVER */}
            <PackageCard 
              name="Silver" 
              icon={<Star className="text-slate-400" />} 
              features={["15 Posts", "2 Reels", "Research", "FB/IG", "Google Page", "Monthly Reports"]}
              color="border-slate-200"
              btn="bg-slate-800"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function PackageCard({ name, icon, features, color, btn, popular = false }: any) {
  return (
    <div className={`bg-white p-6 rounded-3xl border-2 transition-all flex flex-col relative ${color}`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-600 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase">
          Most Popular
        </div>
      )}
      <div className="flex items-center gap-2 mb-4 font-bold uppercase text-slate-800">
        {icon} {name}
      </div>
      <ul className="space-y-2 mb-6 flex-1 text-[10px] font-bold text-slate-500">
        {features.map((f: string, i: number) => (
          <li key={i} className="flex gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> {f}
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 rounded-xl text-white text-[10px] font-black uppercase tracking-widest ${btn}`}>
        Get Started
      </button>
    </div>
  );
}