"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  ShieldCheck,
  Loader2,
  Crown,
  Globe,
  LayoutGrid,
  Home,
} from "lucide-react";

function CompaniesList() {
  const searchParams = useSearchParams();
  const [companies, setCompanies] = useState<any[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "");
  const [locationQuery, setLocationQuery] = useState(searchParams.get("location") || "");
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeBanner, setActiveBanner] = useState<any>(null);
// 1. Change state to handle the rotation index and the list
const [matchingBanners, setMatchingBanners] = useState<any[]>([]);
const [currentIndex, setCurrentIndex] = useState(0);

useEffect(() => {
  const fetchBanners = async () => {
    const searchTerm = searchQuery?.toLowerCase().trim();
    const categoryTerm = (selectedCategory && selectedCategory !== "All Categories") 
      ? selectedCategory.toLowerCase().trim() 
      : null;
    
    const target = categoryTerm || searchTerm;

    if (target) {
      try {
        const res = await fetch('/api/admin/banner');
        const allBanners = await res.json();
        
        // 🚀 CHANGE: Use .filter() instead of .find() to get ALL matches
        const found = allBanners.filter((b: any) => 
          target.includes(b.category.toLowerCase()) || 
          b.category.toLowerCase().includes(target)
        );
        
        setMatchingBanners(found);
        setCurrentIndex(0); // Reset to first banner on new search
      } catch (error) {
        console.error("Banner fetch error:", error);
      }
    } else {
      setMatchingBanners([]);
    }
  };
  fetchBanners();
}, [selectedCategory, searchQuery]);

// 2. 🚀 ROTATION LOGIC: Change banner every 5 seconds
useEffect(() => {
  if (matchingBanners.length <= 1) return;

  const interval = setInterval(() => {
    setCurrentIndex((prev) => (prev + 1) % matchingBanners.length);
  }, 5000); // 5 seconds rotation

  return () => clearInterval(interval);
}, [matchingBanners]);
  // 🚀 FETCH COMPANIES
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch("/api/companies/public");
        const data = await res.json();
        const rawData = data.data || data;

        const sortedData = rawData.sort((a: any, b: any) => {
          const aPaid = a.isActuallyPaid || a.planType === "paid";
          const bPaid = b.isActuallyPaid || b.planType === "paid";
          if (aPaid && !bPaid) return -1;
          if (!aPaid && bPaid) return 1;
          return 0;
        });

        setCompanies(sortedData);
      } catch (err) {
        console.error("Failed to load companies");
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  // 🚀 FILTER LOGIC
  useEffect(() => {
    const filtered = companies.filter((company) => {
      const isPaid = company.isActuallyPaid || company.planType === "paid";
      const matchesSearch =
        company.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.category?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLocationQuery =
        !locationQuery ||
        company.location?.toLowerCase().includes(locationQuery.toLowerCase());

      const matchesCategoryFilter =
        selectedCategory === "All Categories" ||
        company.category === selectedCategory;
      const matchesLocationFilter =
        selectedLocation === "All Locations" ||
        company.location === selectedLocation;

      let matchesTab = true;
      if (activeFilter === "paid") matchesTab = isPaid;
      if (activeFilter === "free") matchesTab = !isPaid;
      if (activeFilter === "verified") matchesTab = company.isVerified || isPaid;

      return matchesSearch && matchesLocationQuery && matchesTab && matchesCategoryFilter && matchesLocationFilter;
    });
    setFilteredCompanies(filtered);
  }, [searchQuery, locationQuery, companies, activeFilter, selectedCategory, selectedLocation]);

  const filterTabs = [
    { id: "all", label: "All", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
    { id: "paid", label: "Premium", icon: <Crown className="w-3.5 h-3.5" /> },
    { id: "verified", label: "Verified", icon: <ShieldCheck className="w-3.5 h-3.5" /> },
  ];

  return (
    <main className="pt-16 bg-[#F8FAFC] min-h-screen">
                  {/* 🚀 CATEGORY BANNER (Inside Search Section, Top of Results) */}
            {!loading && matchingBanners.length > 0 && (
  <div 
    key={matchingBanners[currentIndex]._id} // Forces animation re-trigger on change
    className="w-full pt-4 animate-in fade-in slide-in-from-right-5 duration-700"
  >
    <div className="relative w-full h-[100px] md:h-[200px] rounded-[1rem] overflow-hidden shadow-xl border-2 border-white group">
      <img
        src={matchingBanners[currentIndex].bannerImage}
        alt={matchingBanners[currentIndex].category}
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end p-6 md:p-10">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-amber-500 text-white w-fit px-2 py-0.5 rounded mb-2 block">
              Featured Spotlight
            </span>
            <h2 className="text-white text-2xl md:text-4xl font-black italic uppercase tracking-tighter">
              Best in {matchingBanners[currentIndex].category}
            </h2>
          </div>

          {/* 🚀 DOT INDICATORS: Only show if more than 1 banner */}
          {matchingBanners.length > 1 && (
            <div className="flex gap-1 mb-2">
              {matchingBanners.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === currentIndex ? "w-4 bg-white" : "w-1 bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
)}
      {/* SEARCH & FILTER SECTION */}
      <section className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20 shadow-sm mt-5">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col md:flex-row gap-3 w-full max-w-2xl">
                <Link href="/" className="flex items-center gap-1.5 text-slate-500 hover:text-cyan-600 transition-colors text-sm font-semibold group">
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Link>
                <input
                  type="text"
                  placeholder="Search business..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl outline-none text-sm focus:ring-2 ring-cyan-500/10 focus:border-cyan-500 transition-all bg-slate-50"
                />
                <input
                  type="text"
                  placeholder="Location..."
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  className="md:w-48 px-4 py-2.5 border border-slate-200 rounded-xl outline-none text-sm focus:ring-2 ring-cyan-500/10 focus:border-cyan-500 transition-all bg-slate-50"
                />
              </div>
              <Link href="/companies/list-your-company" className="w-full md:w-auto">
                <button className="w-full flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-700 text-white font-bold hover:bg-cyan-800 transition-all text-xs uppercase tracking-wider shadow-lg shadow-cyan-700/20">
                  Add Business <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
                    activeFilter === tab.id
                      ? "bg-cyan-600 border-cyan-600 text-white shadow-md shadow-cyan-600/20"
                      : "bg-white border-slate-200 text-slate-600 hover:border-cyan-300 hover:text-cyan-600"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>


          </div>
        </div>
      </section>

      {/* MAIN LIST */}
<div className="grid grid-cols-1 gap-5 mt-8">
  {filteredCompanies.map((company: any) => {
    const isPaid = company.isActuallyPaid || company.planType === "paid";
    
    const displayWebsite = company.website 
      ? company.website.replace(/^https?:\/\/(www\.)?/, "").split('/')[0] 
      : "Website";

    return (
      <div
        key={company._id}
        className={`group bg-white rounded-2xl border transition-all duration-300 relative overflow-hidden mx-auto w-full max-w-7xl ${
          isPaid ? "border-cyan-100 shadow-md ring-1 ring-cyan-500/5" : "border-slate-100 shadow-sm"
        }`}
      >
        {/* Premium Badge */}
        {isPaid && (
          <div className="absolute top-0 right-0 z-10">
            <div className="bg-cyan-600 text-white px-2.5 py-1 rounded-bl-lg text-[9px] md:text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <Crown className="w-3 h-3" /> Premium
            </div>
          </div>
        )}

        {/* 🚀 CENTERED ROW LAYOUT */}
        <div className="flex flex-row p-4 md:p-6 gap-4 md:gap-10 items-center justify-center">
          
          {/* LEFT: LOGO */}
          <div className="flex shrink-0 items-center justify-center">
            <div className={`w-20 h-20 md:w-32 md:h-32 rounded-xl md:rounded-2xl border flex items-center justify-center p-2.5 md:p-4 bg-white shadow-sm ${
              isPaid ? "border-cyan-50" : "border-slate-50"
            }`}>
              <img
                src={company.logo || "/placeholder-logo.png"}
                alt={company.name}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* 🚀 CENTER: TEXT CONTENT (Size increased for mobile) */}
          <div className="flex-1 min-w-0 flex flex-col justify-center"> 
            <div className="mb-1.5 md:mb-2">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-base md:text-2xl font-extrabold text-slate-900 truncate leading-tight">
                  {company.name}
                </h3>
                {(company.isVerified || isPaid) && (
                  <ShieldCheck className="w-4 h-4 md:w-6 md:h-6 text-cyan-500 shrink-0" />
                )}
              </div>
              <span className="inline-block text-[9px] md:text-xs font-black text-cyan-700 bg-cyan-50/50 px-2 py-0.5 rounded-md uppercase tracking-widest border border-cyan-100/50">
                {company.category}
              </span>
            </div>

            {/* Description - Desktop only */}
            <p className="hidden md:block text-slate-500 text-base leading-relaxed line-clamp-2 italic mb-3">
              "{company.description || "No description provided."}"
            </p>

            {/* METADATA ROW (Increased text size) */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-1">
              <div className="flex items-center gap-1.5 text-[11px] md:text-sm font-bold text-slate-500 uppercase tracking-tight">
                <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-cyan-500 shrink-0" />
                <span className="truncate max-w-[120px] md:max-w-none">
                   {company.location || "Online"}
                </span>
              </div>
              
              {company.website && (
                <a
                  href={company.website.startsWith("http") ? company.website : `https://${company.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[11px] md:text-sm font-bold text-slate-500 hover:text-cyan-600 transition-colors uppercase tracking-tight"
                >
                  <Globe className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-400 shrink-0" />
                  <span className="lowercase truncate max-w-[90px] md:max-w-none">
                    {displayWebsite}
                  </span>
                </a>
              )}
            </div>
          </div>

          {/* RIGHT: BUTTONS (Fixed width to maintain center alignment) */}
          <div className="flex flex-col gap-2 md:gap-3 pl-4 md:pl-10 border-l border-slate-100 shrink-0 justify-center">
            {company.whatsapp && (
              <a
                href={`https://wa.me/${company.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="w-24 md:w-40 py-2.5 md:py-3.5 bg-emerald-500 text-white rounded-xl text-[10px] md:text-xs font-black uppercase shadow-md shadow-emerald-500/20 hover:bg-emerald-600 transition-all active:scale-95">
                  WhatsApp
                </button>
              </a>
            )}
            <Link href={`/companies/${company._id}`}>
              <button className="w-24 md:w-40 py-2.5 md:py-3.5 bg-slate-900 text-white rounded-xl text-[10px] md:text-xs font-black uppercase shadow-md shadow-slate-900/10 hover:bg-black transition-all active:scale-95">
                View Profile
              </button>
            </Link>
          </div>

        </div>
      </div>
    );
  })}
</div>
    </main>
  );
}

export default function CompaniesPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center text-cyan-600 animate-pulse font-bold">Initializing...</div>}>
      <CompaniesList />
    </Suspense>
  );
}