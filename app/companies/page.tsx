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
  LockOpen,
  Sparkles,
} from "lucide-react";

function CompaniesList() {
  const searchParams = useSearchParams();
  const [companies, setCompanies] = useState<any[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Search States
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || "",
  );
  const [locationQuery, setLocationQuery] = useState(
    searchParams.get("location") || "",
  );
  const [activeFilter, setActiveFilter] = useState("all");

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

  useEffect(() => {
    const filtered = companies.filter((company) => {
      const isPaid = company.isActuallyPaid || company.planType === "paid";
      const matchesSearch =
        company.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.category?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation =
        !locationQuery ||
        company.location?.toLowerCase().includes(locationQuery.toLowerCase());

      let matchesTab = true;
      if (activeFilter === "paid") matchesTab = isPaid;
      if (activeFilter === "free") matchesTab = !isPaid;
      if (activeFilter === "verified")
        matchesTab = company.isVerified || isPaid;

      return matchesSearch && matchesLocation && matchesTab;
    });
    setFilteredCompanies(filtered);
  }, [searchQuery, locationQuery, companies, activeFilter]);

  // NEW LOGIC: Only show banner if there is an active search AND paid results exist
  const isSearching =
    searchQuery.trim().length > 0 || locationQuery.trim().length > 0;
  const paidBannerCompanies = filteredCompanies.filter(
    (c) => c.isActuallyPaid || c.planType === "paid",
  );

  const filterTabs = [
    { id: "all", label: "All", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
    { id: "paid", label: "Premium", icon: <Crown className="w-3.5 h-3.5" /> },
    { id: "free", label: "Free", icon: <LockOpen className="w-3.5 h-3.5" /> },
    {
      id: "verified",
      label: "Verified",
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <main className="pt-16 bg-[#F8FAFC] min-h-screen">
      {!loading && isSearching && paidBannerCompanies.length > 0 && (
        <section className="py-6 bg-gradient-to-b from-cyan-50/50 to-transparent overflow-hidden  animate-in fade-in slide-in-from-top-2 duration-500 w-full">
          <div className="max-w-10xl mx-auto px-4">
            <div className="flex  overflow-x-auto no-scrollbar  scroll-smooth snap-x">
              {paidBannerCompanies.map((company) => (
                <Link
                  key={`banner-${company._id}`}
                  href={`/companies/${company._id}`}
                  // CHANGED: w-full makes the banner stretch across the entire 7xl container
                  className="flex-shrink-0 w-full snap-start group"
                >
                  <div className="bg-white border-2  p-5 shadow-sm  transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl border border-cyan-50 bg-white p-2 shrink-0">
                        <img
                          src={company.logo || "/placeholder-logo.png"}
                          alt={company.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      {/* flex-1 ensures the content uses the remaining horizontal space */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1">
                          <h3 className="font-bold text-slate-800 text-sm md:text-base truncate">
                            {company.name}
                          </h3>
                          <Crown className="w-3 h-3 text-cyan-600 flex-shrink-0" />
                        </div>
                        <p className="text-[10px] md:text-xs text-slate-500 font-medium truncate italic">
                          {company.category}
                        </p>
                        <div className="flex items-center gap-1 mt-1 text-[10px] md:text-xs text-cyan-700 font-bold uppercase">
                          <MapPin className="w-2.5 h-2.5" />
                          <span className="truncate">{company.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SEARCH & FILTER SECTION */}
      <section className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20 shadow-sm mt-5">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col md:flex-row gap-3 w-full max-w-2xl">
                <Link
                  href="/"
                  className="flex items-center gap-1.5 text-slate-500 hover:text-cyan-600 transition-colors text-sm font-semibold group"
                >
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

              <Link
                href="/companies/list-your-company"
                className="w-full md:w-auto"
              >
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
              <p className="mt-3 text-slate-500 text-sm font-medium">
                Updating directory...
              </p>
            </div>
          ) : filteredCompanies.length > 0 ? (
            <div className="grid grid-cols-1 gap-5">
              {filteredCompanies.map((company: any) => {
                const isPaid =
                  company.isActuallyPaid || company.planType === "paid";
                return (
                  <div
                    key={company._id}
                    className={`group bg-white rounded-2xl border transition-all duration-300 relative 
                      ${isPaid ? "border-cyan-100 shadow-md ring-1 ring-cyan-500/5" : "border-slate-100 shadow-sm"}`}
                  >
                    <div className="absolute top-0 right-0 z-10">
                      {isPaid ? (
                        <div className="bg-cyan-600 text-white px-3 py-1 rounded-bl-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                          <Crown className="w-3 h-3" /> Premium
                        </div>
                      ) : (
                        <div className="bg-slate-100 text-slate-500 px-3 py-1 rounded-bl-xl text-[10px] font-bold uppercase border-l border-b border-slate-200">
                          Free
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col md:flex-row p-5 md:p-6 gap-6">
                      <div className="flex justify-center md:block shrink-0">
                        <div
                          className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl border flex items-center justify-center p-4 bg-white shadow-inner
                          ${isPaid ? "border-cyan-50" : "border-slate-50"}`}
                        >
                          <img
                            src={company.logo || "/placeholder-logo.png"}
                            alt={company.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0 space-y-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg md:text-xl font-bold text-slate-800 truncate">
                              {company.name}
                            </h3>
                            {(company.isVerified || isPaid) && (
                              <ShieldCheck className="w-4 h-4 text-cyan-500" />
                            )}
                          </div>
                          <span className="inline-block text-[10px] font-black text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-md uppercase tracking-wide">
                            {company.category}
                          </span>
                        </div>

                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 italic">
                          "{company.description || "No description provided."}"
                        </p>

                       <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-tight">
  
  {/* LOCATION: Links to Google Maps Search */}
  <a 
    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.location || "Online")}`}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-1.5 hover:text-cyan-500 transition-colors cursor-pointer"
    onClick={(e) => e.stopPropagation()} // Prevents the parent Link/card click from triggering
  >
    <MapPin className="w-3.5 h-3.5 text-cyan-500" />
    <span>{company.location || "Online"}</span>
  </a>

  {/* WEBSITE: Links to the external URL */}
  {company.website && (
    <a 
      href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 hover:text-blue-500 transition-colors cursor-pointer"
      onClick={(e) => e.stopPropagation()} // Prevents the parent Link/card click from triggering
    >
      <Globe className="w-3.5 h-3.5 text-slate-400" />
      <span className="lowercase font-medium">
        {company.website.replace(/^https?:\/\//, '')} {/* Cleans the display text */}
      </span>
    </a>
  )}
</div>
                      </div>

                      <div className="flex flex-row md:flex-col gap-2 md:border-l md:pl-6 border-slate-100 justify-center">
                        <Link
                          href={`https://wa.me/${company.whatsapp}`}
                          className="flex-1"
                        >
                          <button className="w-full md:w-36 flex items-center justify-center gap-2 py-3 bg-emerald-500 text-white rounded-xl text-[11px] font-black uppercase transition-all hover:bg-emerald-600 active:scale-95 shadow-lg shadow-emerald-500/20">
                            WhatsApp
                          </button>
                        </Link>
                        <Link
                          href={`/companies/${company._id}`}
                          className="flex-1"
                        >
                          <button className="w-full md:w-36 flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-xl text-[11px] font-black uppercase transition-all hover:bg-black active:scale-95 shadow-lg shadow-slate-900/20">
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
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <LayoutGrid className="text-slate-300" />
              </div>
              <p className="text-slate-500 font-bold">
                No {activeFilter} businesses found.
              </p>
              <button
                onClick={() => setActiveFilter("all")}
                className="mt-2 text-cyan-600 text-sm font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default function CompaniesPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center text-cyan-600 animate-pulse font-bold">
          Initializing...
        </div>
      }
    >
      <CompaniesList />
    </Suspense>
  );
}
