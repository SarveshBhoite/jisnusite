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
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800">
              {filteredCompanies.length}{" "}
              <span className="text-slate-400 font-medium lowercase">
                {activeFilter} listings found
              </span>
            </h2>
          </div>

          {loading ? (
            <div className="flex flex-col items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-cyan-600" />
            </div>
          ) : filteredCompanies.length > 0 ? (
            <div className="grid grid-cols-1 gap-5">
              {filteredCompanies.map((company: any) => {
                const isPaid = company.isActuallyPaid || company.planType === "paid";
                return (
                  <div key={company._id} className={`group bg-white rounded-2xl border transition-all duration-300 relative ${isPaid ? "border-cyan-100 shadow-md ring-1 ring-cyan-500/5" : "border-slate-100 shadow-sm"}`}>
                     {/* ... (Keep your existing card JSX exactly as it was) ... */}
                     <div className="absolute top-0 right-0 z-10">
                      {isPaid ? (
                        <div className="bg-cyan-600 text-white px-3 py-1 rounded-bl-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                          <Crown className="w-3 h-3" /> Premium
                        </div>
                      ) : null}
                    </div>
                    <div className="flex flex-col md:flex-row p-5 md:p-6 gap-6">
                        {/* Company content here */}
                        <div className="flex-1 min-w-0 space-y-3">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg md:text-xl font-bold text-slate-800 truncate">{company.name}</h3>
                                {(company.isVerified || isPaid) && <ShieldCheck className="w-4 h-4 text-cyan-500" />}
                            </div>
                            <span className="inline-block text-[10px] font-black text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-md uppercase tracking-wide">
                                {company.category}
                            </span>
                            <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 italic">"{company.description}"</p>
                        </div>
                        <div className="flex flex-row md:flex-col gap-2 md:border-l md:pl-6 border-slate-100 justify-center">
                            <Link href={`/companies/${company._id}`} className="flex-1">
                                <button className="w-full md:w-36 flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-xl text-[11px] font-black uppercase shadow-lg">
                                    View Profile
                                </button>
                            </Link>
                        </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-slate-500 font-bold">No {activeFilter} businesses found.</p>
            </div>
          )}
        </div>
      </section>
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