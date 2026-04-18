"use client";

import { useEffect, useState, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  ShieldCheck,
  Crown,
  Globe,
  LayoutGrid,
  Home,
  Search,
  Star,
} from "lucide-react";
import Image from "next/image";

function CompaniesList() {
  const searchParams = useSearchParams();
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || "",
  );
  const [locationQuery, setLocationQuery] = useState(
    searchParams.get("location") || "",
  );
  const [activeFilter, setActiveFilter] = useState("all");

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  const [matchingBanners, setMatchingBanners] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // For category suggestions, we'll keep a list of all unique categories
  const [allCategories, setAllCategories] = useState<string[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();
    if (query.length > 0) {
      const filtered = allCategories.filter((cat) =>
        cat.toLowerCase().startsWith(query),
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, allCategories]);

  const fetchBannersForCategory = async (targetCategory: string) => {
    const target = targetCategory.toLowerCase().trim();
    if (target) {
      try {
        const res = await fetch("/api/admin/banner");
        const allBanners = await res.json();
        const found = allBanners.filter(
          (b: any) =>
            target === b.category.toLowerCase() ||
            b.category.toLowerCase().includes(target),
        );
        setMatchingBanners(found);
        setCurrentIndex(0);
      } catch (error) {
        console.error(error);
      }
    } else {
      setMatchingBanners([]);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchBannersForCategory(searchQuery);
    }
  }, []);

  useEffect(() => {
    if (matchingBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % matchingBanners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [matchingBanners]);

  const fetchCompanies = async (
    pageNum: number,
    isNewSearch: boolean = false
  ) => {
    try {
      if (isNewSearch) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const params = new URLSearchParams({
        page: pageNum.toString(),
        limit: "10",
      });

      if (searchQuery) params.append("query", searchQuery);
      if (locationQuery) params.append("location", locationQuery);
      if (selectedCategory !== "All Categories")
        params.append("category", selectedCategory);

      const res = await fetch(`/api/companies/public?${params.toString()}`);
      const result = await res.json();

      if (result.success) {
        const newData = result.data || [];

        setCompanies((prev) => (isNewSearch ? newData : [...prev, ...newData]));
        setHasMore(newData.length === 10);

        // Update all categories for suggestions if we don't have them all yet
        if (isNewSearch || allCategories.length === 0) {
          const catSet = new Set(allCategories);
          newData.forEach((c: any) => {
            if (c.category) catSet.add(c.category);
          });
          setAllCategories(Array.from(catSet));
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Initial fetch and fetch on filter change
  useEffect(() => {
    setPage(1);
    fetchCompanies(1, true);
  }, [searchQuery, locationQuery, selectedCategory]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchCompanies(nextPage, false);
  };

  // Client-side filtering only for special tabs (Verified, Top Rated, Premium)
  const filteredCompanies = companies.filter((company) => {
    const isPaid = company.isActuallyPaid || company.planType === "paid";
    let matchesTab = true;
    if (activeFilter === "paid") matchesTab = isPaid;
    if (activeFilter === "verified") matchesTab = company.isVerified || isPaid;
    if (activeFilter === "rating") matchesTab = (company.rating || 0) ;
    return matchesTab;
  });

  // Sort if Top Rated is active
  const displayedCompanies =
    activeFilter === "rating"
      ? [...filteredCompanies].sort(
          (a, b) => (b.rating || 0) - (a.rating || 0)
        )
      : filteredCompanies;

  const filterTabs = [
    { id: "all", label: "All", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
    { id: "paid", label: "Premium", icon: <Crown className="w-3.5 h-3.5" /> },
    {
      id: "verified",
      label: "Verified",
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
    },
    {
      id: "rating",
      label: "Top Rated",
      icon: <Star className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <main className="pt-16 bg-[#F8FAFC] min-h-screen">


      {/* Search Section */}
      <section className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm mt-5">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-nowrap gap-2 md:gap-3 w-full max-w-2xl">
                

                <div className="flex-1 min-w-0 relative" ref={suggestionRef}>
                  <input
                    type="text"
                    placeholder="Search category (e.g. H for Hotels)..."
                    value={searchQuery}
                    onFocus={() => setShowSuggestions(true)}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none text-sm bg-slate-50"
                  />

                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl z-[100] overflow-hidden">
                      <div className="p-2 border-b border-slate-50 bg-slate-50/50">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-3">
                          Quick Search
                        </span>
                      </div>
                      <div className="max-h-64 overflow-y-auto no-scrollbar">
                        {suggestions.map((cat, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setSearchQuery(cat);
                              setShowSuggestions(false);
                              fetchBannersForCategory(cat);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-cyan-50 text-left transition-colors border-b border-slate-50 last:border-0"
                          >
                            <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-cyan-600">
                              <Search className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-sm font-bold text-slate-700">
                              {cat}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <input
                  type="text"
                  placeholder="Location..."
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  className="flex-1 min-w-0 px-4 py-2.5 border border-slate-200 rounded-xl outline-none text-sm bg-slate-50"
                />
              </div>
            
            </div>

                  {/* Banner Section */}
      {!loading && matchingBanners.length > 0 && (
        <div
          key={matchingBanners[currentIndex]._id}
          className="w-full pt-4 max-w-7xl mx-auto px-1"
        >
          <div className="relative w-full h-[140px] md:h-[200px] rounded-[1rem] overflow-hidden shadow-xl border-2 border-white">
            <Image
              src={matchingBanners[currentIndex].bannerImage}
              alt="Banner"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 flex flex-col justify-end p-4 md:p-10">
              <h2 className="text-white text-lg md:text-4xl font-black italic uppercase">
                Best in {matchingBanners[currentIndex].category}
              </h2>
            </div>
          </div>
        </div>
      )}

            <div className="flex items-center gap-2 overflow-x-auto  no-scrollbar pb-1">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border whitespace-nowrap ${activeFilter === tab.id ? "bg-cyan-600 text-white" : "bg-white text-slate-600"}`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MAIN LIST */}
      <div className="grid grid-cols-1 gap-5 mt-6 px-4 pb-10">
        {displayedCompanies.map((company: any) => {
          const isPaid = company.isActuallyPaid || company.planType === "paid";
          const displayWebsite = company.website
            ? company.website.replace(/^https?:\/\/(www\.)?/, "").split("/")[0]
            : "Website";

          const displayRating = company.rating
            ? company.rating.toFixed(1)
            : "4.8";

          return (
            <div
              key={company._id}
              className={`group bg-white rounded-2xl border transition-all duration-300 relative overflow-hidden mx-auto w-full max-w-7xl ${
                isPaid
                  ? "border-cyan-100 shadow-md ring-1 ring-cyan-500/5"
                  : "border-slate-100 shadow-sm"
              }`}
            >
              {isPaid && (
                <div className="absolute top-0 right-0 z-10">
                  <div className="bg-cyan-600 text-white px-2.5 py-1 rounded-bl-lg text-[9px] md:text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <Crown className="w-3 h-3" /> Premium
                  </div>
                </div>
              )}

              <div className="flex flex-col md:flex-row p-4 md:p-6 gap-4 md:gap-10 items-start md:items-center">
                <div className="flex flex-row md:flex-col gap-4 w-full md:w-auto items-center">
                  <div
                    className={`w-20 h-20 md:w-32 md:h-32 rounded-xl md:rounded-2xl border flex items-center justify-center p-2.5 md:p-4 bg-white shadow-sm shrink-0 ${
                      isPaid ? "border-cyan-50" : "border-slate-50"
                    }`}
                  >
                    <Image
                      src={company.logo || "/placeholder-logo.png"}
                      alt={company.name}
                      width={128}
                      height={128}
                      className="object-contain"
                    />
                  </div>

                  {/* Mobile Header */}
                  <div className="md:hidden flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                        {company.name}
                      </h3>
                      {(company.isVerified || isPaid) && (
                        <ShieldCheck className="w-4 h-4 text-cyan-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block text-[9px] font-black text-cyan-700 bg-cyan-50/50 px-2 py-0.5 rounded-md uppercase tracking-widest border border-cyan-100/50">
                        {company.category}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-100">
                        {displayRating}{" "}
                        <Star className="w-2.5 h-2.5 fill-current" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-center w-full">
                  <div className="hidden md:block mb-1.5 md:mb-2">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-base md:text-2xl font-extrabold text-slate-900 truncate leading-tight">
                        {company.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-100 mr-1">
                        {displayRating}
                        <Star className="w-3 h-3 fill-current" />
                      </div>
                      {(company.isVerified || isPaid) && (
                        <ShieldCheck className="w-4 h-4 md:w-6 md:h-6 text-cyan-500 shrink-0" />
                      )}
                    </div>
                    <span className="inline-block text-[9px] md:text-xs font-black text-cyan-700 bg-cyan-50/50 px-2 py-0.5 rounded-md uppercase tracking-widest border border-cyan-100/50">
                      {company.category}
                    </span>
                  </div>

                  <p className="text-slate-500 text-sm md:text-base leading-relaxed line-clamp-2 italic mb-3">
                    "{company.description || "No description provided."}"
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-1">
                    <div className="flex items-center gap-1.5 text-[11px] md:text-sm font-bold text-slate-500 uppercase tracking-tight">
                      <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-cyan-500 shrink-0" />
                      <span className="truncate max-w-[150px] md:max-w-none">
                        {company.location || "Online"}
                      </span>
                    </div>
                    {company.website && (
                      <a
                        href={
                          company.website.startsWith("http")
                            ? company.website
                            : `https://${company.website}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[11px] md:text-sm font-bold text-slate-500 hover:text-cyan-600 transition-colors uppercase tracking-tight"
                      >
                        <Globe className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-400 shrink-0" />
                        <span className="lowercase truncate max-w-[120px] md:max-w-none">
                          {displayWebsite}
                        </span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex flex-row md:flex-col gap-2 md:gap-3 w-full md:w-auto md:pl-10 md:border-l border-slate-100 shrink-0 justify-center mt-2 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0">
                  {company.whatsapp && (
                    <a
                      href={`https://wa.me/${company.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 md:flex-none"
                    >
                      <button className="w-full md:w-40 py-2.5 md:py-3.5 bg-emerald-500 text-white rounded-xl text-[10px] md:text-xs font-black uppercase shadow-md shadow-emerald-500/20 hover:bg-emerald-600 transition-all active:scale-95">
                        WhatsApp
                      </button>
                    </a>
                  )}
                  <Link
                    href={`/companies/${company._id}`}
                    className="flex-1 md:flex-none"
                  >
                    <button className="w-full md:w-40 py-2.5 md:py-3.5 bg-slate-900 text-white rounded-xl text-[10px] md:text-xs font-black uppercase shadow-md shadow-slate-900/10 hover:bg-black transition-all active:scale-95">
                      View Profile
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {!loading && displayedCompanies.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-slate-300" />
             </div>
             <h3 className="text-lg font-bold text-slate-900">No Companies Found</h3>
             <p className="text-sm text-slate-500">Try adjusting your search or filters.</p>
          </div>
        )}

        {hasMore && (
          <div className="flex justify-center mt-8 pb-10">
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="px-10 py-3.5 bg-white border-2 border-slate-200 rounded-2xl text-slate-900 text-xs font-black uppercase tracking-widest hover:border-cyan-500 hover:text-cyan-600 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-3"
            >
              {loadingMore ? (
                <>
                  <div className="w-4 h-4 border-2 border-cyan-500 border-t-transparent animate-spin rounded-full"></div>
                  Loading More...
                </>
              ) : (
                "Load More Companies"
              )}
            </button>
          </div>
        )}
      </div>

    </main>
  );
}

export default function CompaniesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CompaniesList />
    </Suspense>
  );
}
