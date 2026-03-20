"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Mail,
  MapPin,
  Clock,
  ThumbsUp,
  Users,
  Award,
  ChevronRight,
  PhoneCall,
  Search,
  BadgeCheck,
  Headphones,
  Send,
  Shield,
  CheckCircle2,
  Star,
  Image as ImageIcon,
  Zap,
  Trophy,
  TrendingUp,
  MessageCircle,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [services, setServices] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [ads, setAds] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);
  const locationSuggestionRef = useRef<HTMLDivElement>(null);
  const [recentWorkIndex, setRecentWorkIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);

  const categories = [
    { name: "Web Development", icon: "🌐", count: "500+" },
    { name: "App Development", icon: "📱", count: "350+" },
    { name: "SEO Services", icon: "📈", count: "200+" },
    { name: "Logo Design", icon: "🎨", count: "450+" },
    { name: "Digital Marketing", icon: "📣", count: "300+" },
    { name: "E-Commerce", icon: "🛒", count: "150+" },
    { name: "UI/UX Design", icon: "✨", count: "280+" },
    { name: "Content Writing", icon: "✍️", count: "180+" },
  ];

  const companyCategories = [
    { name: "E-commerce", icon: "🛍️", color: "from-blue-400 to-blue-600" },
    { name: "Hotels", icon: "🏨", color: "from-orange-400 to-orange-600" },
    { name: "Energy", icon: "⚡", color: "from-yellow-400 to-yellow-600" },
    { name: "Education", icon: "🎓", color: "from-indigo-400 to-indigo-600" },
    { name: "Manufacturing", icon: "🏭", color: "from-slate-500 to-slate-700" },
    { name: "Technology", icon: "💻", color: "from-cyan-400 to-cyan-600" },
    {
      name: "Health & Wellness",
      icon: "🏥",
      color: "from-emerald-400 to-emerald-600",
    },
    {
      name: "Professiional Services",
      icon: "💼",
      color: "from-purple-400 to-purple-600",
    },
    { name: "Real Estate", icon: "🏠", color: "from-rose-400 to-rose-600" },
    { name: "Decoration", icon: "✨", color: "from-amber-400 to-amber-600" },
    { name: "Restaurants", icon: "🍴", color: "from-red-400 to-red-600" },
    { name: "Beauty Spa", icon: "💆‍♀️", color: "from-pink-400 to-pink-600" },
    { name: "Home Decor", icon: "🛋️", color: "from-orange-300 to-orange-500" },
    {
      name: "Wedding Planning",
      icon: "💍",
      color: "from-fuchsia-400 to-fuchsia-600",
    },
    { name: "Rent & Hire", icon: "🚜", color: "from-yellow-500 to-yellow-700" },
    { name: "Hospitals", icon: "🚑", color: "from-red-500 to-red-700" },
    { name: "Contractors", icon: "👷", color: "from-amber-600 to-amber-800" },
    { name: "Pet Shops", icon: "🐾", color: "from-brown-400 to-brown-600" },
    { name: "PG/Hostels", icon: "🏢", color: "from-violet-400 to-violet-600" },
    {
      name: "Estate Agent",
      icon: "🏘️",
      color: "from-emerald-500 to-emerald-700",
    },
    { name: "Dentists", icon: "🦷", color: "from-sky-300 to-sky-500" },
    { name: "Gym", icon: "🏋️‍♂️", color: "from-zinc-600 to-zinc-800" },
    { name: "Loans", icon: "💰", color: "from-green-500 to-green-700" },
    {
      name: "Event Organiser",
      icon: "🎉",
      color: "from-indigo-500 to-indigo-700",
    },
    { name: "Resort", icon: "🏝️", color: "from-cyan-400 to-cyan-600" },
  ];

  const trustStats = [
    { icon: Users, value: "50+", label: "Happy Clients" },
    { icon: Award, value: "150+", label: "Projects Done" },
    { icon: ThumbsUp, value: "98%", label: "Satisfaction" },
    { icon: Clock, value: "5+", label: "Years Exp." },
  ];

  const citySuggestions = [
    "Nagpur",
    "Nashik",
    "Nanded",
    "Navi Mumbai",
    "New Delhi",
    "Noida",
    "Mumbai",
    "Pune",
    "Aurangabad",
    "Amravati",
    "Akola",
    "Chandrapur",
    "Wardha",
    "Yavatmal",
    "Jalgaon",
    "Kolhapur",
    "Solapur",
    "Sangli",
    "Satara",
    "Ahmednagar",
    "Bengaluru",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Ahmedabad",
    "Surat",
    "Jaipur",
    "Lucknow",
    "Indore",
    "Bhopal",
  ];

  const customerReviews = [
    {
      name: "Rohit Sharma",
      company: "Mounty River Resort",
      review:
        "We had a great experience working with JISNU Digital Solutions Pvt. Ltd In Wakad & PCMC. Their team is highly professional, creative, and dedicated to delivering excellent digital marketing services. They helped us improve our online presence with effective strategies, quality content, and consistent support. Their approach to digital marketing, branding, and social media management is very impressive.The team understands business needs and provides the right solutions to help grow online visibility. We highly recommend JISNU Digital Solutions Pvt. Ltd. to anyone looking for reliable and result-oriented digital marketing services.Great work and excellent support! Thank you so much Team",
      rating: 5,
    },
    {
      name: "asmita shirsat",
      company: "Kidz Explore Theorpy Center",
      review:
        "For our center Kidz Explore Therapy, Jisnu Digital Solutions Pvt. Ltd in Wakad. has provided excellent digital marketing services. They have managed our GMB page, social media, and online branding very professionally.",
      rating: 5,
    },
    {
      name: "NITIN LONKAR",
      company: "Lonkar Enterprises Pune",
      review:
        "I’ve been working with Jisnu Digital for my digital marketing needs, and the results have been amazing! Their team is professional, responsive, and truly understands the latest trends. Thanks to them, my online presence has improved significantly, and I’m seeing great results in lead generation and traffic Highly recommend!",
      rating: 4,
    },
    {
      name: "Amole ade",
      company: "Nair Interiors",
      review:
        "Best digital marketing solutions company.",
      rating: 5,
    },
  ];

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (q.length > 0) {
      const allPossibleCats = [
        ...categories.map((c) => c.name),
        ...companyCategories.map((c) => c.name),
      ];
      const uniqueCats = Array.from(new Set(allPossibleCats));
      const filtered = uniqueCats.filter((cat) =>
        cat.toLowerCase().startsWith(q),
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  useEffect(() => {
    const l = location.trim().toLowerCase();
    if (l.length > 0) {
      const filtered = citySuggestions
        .filter((city) => city.toLowerCase().startsWith(l))
        .slice(0, 8);
      setLocationSuggestions(filtered);
    } else {
      setLocationSuggestions([]);
    }
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
      if (
        locationSuggestionRef.current &&
        !locationSuggestionRef.current.contains(event.target as Node)
      ) {
        setShowLocationSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.append("query", query);
    if (location) params.append("location", location);
    router.push(`/companies?${params.toString()}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [servRes, portRes, adsRes] = await Promise.all([
          fetch("/api/admin/services", { cache: "no-store" }),
          fetch("/api/admin/portfolio", { cache: "no-store" }),
          fetch("/api/admin/ads", { cache: "no-store" }),
        ]);

        if (adsRes.ok) {
          const adsData = await adsRes.json();
          setAds(Array.isArray(adsData) ? adsData : adsData.data || []);
        }

        if (servRes.ok) {
          const sData = await servRes.json();
          const cleanServ = Array.isArray(sData) ? sData : sData.data || [];
          setServices(cleanServ.slice(0, 6));
        }

        if (portRes.ok) {
          const pData = await portRes.json();
          const cleanPort = Array.isArray(pData) ? pData : pData.data || [];
          setPortfolio(cleanPort.slice(0, 4));
        }
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const [index, setIndex] = useState(0);

  // Define the 3 different "views" for the card
  const cards = [
    {
      type: "trust",
      title: "Verified & Trusted",
      subtitle: "100% Secure Services",
      icon: <Shield className="w-6 h-6 text-cyan-600" />,
      items: [
        "Government Registered Company",
        "5+ Years of Experience",
        "1000+ Satisfied Customers",
        "24/7 Customer Support",
      ],
      footer: "4.9 Rating (500+ reviews)",
    },

    {
      type: "image",
      title: "Recent Projects",
      subtitle: "See our latest work",
      icon: <Trophy className="w-6 h-6 text-amber-600" />,
      // Using placeholder images for the "2 images in card" requirement
      images: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=300&q=80",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=300&q=80",
      ],
      items: ["UI/UX Optimization", "E-commerce Solutions"],
      footer: "View Full Portfolio",
    },
    // 3. Growth / Stats Card
    {
      type: "growth",
      title: "Business Growth",
      subtitle: "Scaling your brand",
      icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
      items: [
        "SEO Ranking Improvement",
        "Social Media Management",
        "Lead Generation Funnels",
        "Brand Strategy",
      ],
      footer: "Trusted by Top Brands",
    },
  ];

  // Logic to rotate index every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % cards.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!portfolio.length) return;
    const timer = setInterval(() => {
      setRecentWorkIndex((prev) => (prev + 1) % portfolio.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [portfolio.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % customerReviews.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [customerReviews.length]);

  const current = cards[index];

  return (
    <main className="bg-slate-50 min-h-screen relative">
      {/* ========== HERO SECTION ========== */}
      <section className="bg-gradient-to-br from-[#0f172a] via-[#134e4a] to-[#0d9488] pt-24 pb-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-cyan-200 mb-6">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">Serving All Over India</span>
            <ChevronRight className="w-4 h-4" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
                India&apos;s #1 Digital
                <span className="block text-cyan-400 drop-shadow-md">
                  Service Provider
                </span>
              </h1>

              <p className="text-slate-200 text-base mb-6 max-w-lg">
                Get the best digital services for your business. Web
                development, SEO, marketing & more at affordable prices.
              </p>

              <div className="bg-white rounded-xl shadow-xl p-2 flex flex-col md:flex-row items-center gap-2 mb-6 border border-slate-100 relative">
                <div
                  className="flex-1 flex items-center gap-3 px-4 w-full relative"
                  ref={suggestionRef}
                >
                  <Search className="w-5 h-5 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={query}
                    onFocus={() => setShowSuggestions(true)}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="Search for services "
                    className="w-full py-3 outline-none text-slate-700 placeholder:text-slate-400"
                  />

                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-xl shadow-2xl z-[100] overflow-hidden">
                      <div className="max-h-60 overflow-y-auto">
                        {suggestions.map((cat, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setQuery(cat);
                              setShowSuggestions(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-cyan-50 text-left transition-colors border-b border-slate-50 last:border-0"
                          >
                            <Search className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-sm font-bold text-slate-700">
                              {cat}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="hidden md:block w-px h-8 bg-slate-200 mx-2" />

                <div
                  className="flex-1 flex items-center gap-3 px-4 w-full border-t md:border-t-0 border-slate-100 pt-2 md:pt-0 relative"
                  ref={locationSuggestionRef}
                >
                  <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={location}
                    onFocus={() => setShowLocationSuggestions(true)}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      setShowLocationSuggestions(true);
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="Location "
                    className="w-full py-3 outline-none text-slate-700 placeholder:text-slate-400"
                  />

                  {showLocationSuggestions && locationSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-xl shadow-2xl z-[100] overflow-hidden">
                      <div className="max-h-60 overflow-y-auto">
                        {locationSuggestions.map((city, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setLocation(city);
                              setShowLocationSuggestions(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-cyan-50 text-left transition-colors border-b border-slate-50 last:border-0"
                          >
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-sm font-bold text-slate-700">
                              {city}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleSearch}
                  className="w-full md:w-auto bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-lg font-bold transition-colors"
                >
                  Search
                </button>
              </div>

              <div className="flex flex-wrap gap-6">
                {trustStats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-cyan-300" />
                    </div>
                    <div>
                      <div className="font-black text-white">{stat.value}</div>
                      <div className="text-xs text-cyan-100/70">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Changed max-w-sm to max-w-md for more width */}
            <div className="hidden lg:block w-full max-w-650px">
              <div className="bg-white rounded-2xl shadow-2xl p-6 text-slate-900 border-t-4 border-cyan-500 transition-all duration-500 ease-in-out min-h-[380px] flex flex-col justify-between">
                {/* Header Section */}
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${index === 0 ? "bg-cyan-50" : index === 1 ? "bg-amber-50" : "bg-emerald-50"}`}
                    >
                      {current.icon}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">
                        {current.title}
                      </div>
                      <div className="text-sm text-slate-500">
                        {current.subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Content Logic */}
                  <div className="space-y-3">
                    {current.type === "image" && (
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {current.images?.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt="work"
                            className="rounded-lg h-32 w-full object-cover border border-slate-100"
                          />
                        ))}
                      </div>
                    )}

                    {current.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-slate-700 text-sm"
                      >
                        <CheckCircle2
                          className={`w-4 h-4 flex-shrink-0 ${index === 0 ? "text-cyan-500" : index === 1 ? "text-amber-500" : "text-emerald-500"}`}
                        />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Section */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    {current.type === "trust" ? (
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-cyan-500 text-cyan-500"
                          />
                        ))}
                        <span className="ml-2 font-bold text-slate-900 text-sm">
                          4.9
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm font-bold text-cyan-600 cursor-pointer hover:underline flex items-center gap-1">
                        {current.footer} <Zap className="w-3 h-3" />
                      </span>
                    )}
                    {current.type === "trust" && (
                      <span className="text-xs text-slate-500">
                        500+ reviews
                      </span>
                    )}
                  </div>

                  {/* Simple Pagination Dots */}
                  <div className="flex gap-1.5 mt-4 justify-center">
                    {cards.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all ${index === i ? "w-4 bg-cyan-500" : "w-1.5 bg-slate-200"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid Section */}
      <section className="bg-white py-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {categories.map((cat, i) => (
              <Link
                href={`/services?category=${encodeURIComponent(cat.name)}`}
                key={i}
                className="group flex flex-col items-center text-center p-3 rounded-xl hover:bg-cyan-50 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-slate-100 group-hover:bg-cyan-100 flex items-center justify-center text-2xl mb-2 transition-colors">
                  {cat.icon}
                </div>
                <span className="text-xs font-medium text-slate-700 group-hover:text-cyan-700 leading-tight">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== OFFERS SECTION ========== */}
      {!loading && ads.length > 0 && (
        <section className="bg-white py-6 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-600" />
                <h2 className="font-bold text-slate-900">
                  Best Deals & Offers
                </h2>
              </div>
              <Link
                href="/services"
                className="text-cyan-600 text-sm font-medium flex items-center gap-1"
              >
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="overflow-hidden">
              <div className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused]">
                {[...ads, ...ads, ...ads].map((ad, index) => (
                  <div
                    key={index}
                    className="w-[300px] bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl p-4 flex-shrink-0 cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="inline-block px-2 py-0.5 bg-white/20 rounded text-white text-[10px] font-bold uppercase mb-2">
                          {ad.subtitle || ad.text || "Limited Offer"}
                        </span>
                        <h3 className="text-white font-bold text-lg leading-tight">
                          {ad.title}
                        </h3>
                        <button className="mt-3 px-4 py-1.5 bg-white text-cyan-700 rounded-full text-xs font-bold hover:bg-cyan-50 transition-colors">
                          Get This Deal
                        </button>
                      </div>
                      <div className="text-4xl">🎉</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========== Companies SECTION (Home Page) ========== */}
      <section className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div className="text-left">
              <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight">
                Browse Categories
              </h2>
              <p className="text-slate-500 text-sm font-medium">
                Find the best businesses by industry
              </p>
            </div>

            <Link
              href="/categories"
              className="hidden md:flex items-center gap-2 text-cyan-600 font-bold text-xs uppercase tracking-widest hover:gap-3 transition-all"
            >
              Explore All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 md:gap-6">
            {companyCategories.slice(0, 16).map((cat, i) => (
              <Link
                key={i}
                href={`/companies?query=${encodeURIComponent(cat.name)}`}
                className="group flex flex-col items-center gap-3"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-cyan-100 border border-slate-100 flex items-center justify-center text-2xl transition-all duration-300 group-hover:bg-cyan-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-cyan-200 group-hover:-translate-y-1">
                  {cat.icon}
                </div>

                <span className="text-[10px] md:text-xs font-black text-slate-700 uppercase tracking-tighter text-center group-hover:text-cyan-700 transition-colors line-clamp-1">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 md:hidden">
            <Link href="/categories">
              <button className="w-full py-3 bg-slate-50 text-slate-600 text-xs font-bold uppercase rounded-xl border border-slate-100">
                View All Categories
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== PORTFOLIO SECTION ========== */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Our Recent Work
              </h2>
              <p className="text-sm text-slate-500">
                Projects delivered with excellence
              </p>
            </div>
            <Link
              href="/portfolio"
              className="text-cyan-600 text-sm font-medium flex items-center gap-1"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {portfolio.length > 0 && (
              <div className="col-span-1 md:col-span-2 lg:col-span-4">
                <div
                  key={portfolio[recentWorkIndex]?._id || recentWorkIndex}
                  className="group mx-auto max-w-3xl bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all"
                >
                  <div className="relative aspect-[16/8] overflow-hidden">
                    <Image
                      src={portfolio[recentWorkIndex]?.image || "/project-placeholder.jpg"}
                      alt={portfolio[recentWorkIndex]?.companyName || "Project"}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-cyan-600 text-white text-[10px] font-bold rounded">
                        {portfolio[recentWorkIndex]?.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-slate-900 mb-1 group-hover:text-cyan-600 transition-colors">
                      {portfolio[recentWorkIndex]?.companyName}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 fill-cyan-400 text-cyan-400"
                          />
                        ))}
                      </div>
                      <span className="text-slate-500 text-xs">
                        (4.{9 - (recentWorkIndex % 2)})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-teal-600 text-xs font-medium flex items-center gap-1">
                        <BadgeCheck className="w-3 h-3" /> Verified Project
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 transition-colors" />
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-center gap-2">
                  {portfolio.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setRecentWorkIndex(i)}
                      className={`h-2 rounded-full transition-all ${
                        recentWorkIndex === i ? "w-6 bg-cyan-600" : "w-2 bg-slate-300"
                      }`}
                      aria-label={`Go to project ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========== CUSTOMER REVIEWS SECTION ========== */}
      <section className="py-10 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-slate-900">Customer Reviews</h2>
            <p className="text-sm text-slate-500">
              What our clients say about our service quality
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div
              key={reviewIndex}
              className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm transition-all duration-500"
            >
              <div className="mb-4 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i <= customerReviews[reviewIndex].rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-300"
                    }`}
                  />
                ))}
              </div>

              <p className="text-slate-700 text-base md:text-lg leading-relaxed">
                "{customerReviews[reviewIndex].review}"
              </p>

              <div className="mt-5 pt-5 border-t border-slate-100">
                <h3 className="font-bold text-slate-900">
                  {customerReviews[reviewIndex].name}
                </h3>
                <p className="text-sm text-slate-500">
                  {customerReviews[reviewIndex].company}
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-center gap-2">
              {customerReviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setReviewIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    reviewIndex === i ? "w-6 bg-cyan-600" : "w-2 bg-slate-300"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHY CHOOSE US ========== */}
      <section className="py-10 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-slate-900">
              Why Choose Jisnu Digital?
            </h2>
            <p className="text-sm text-slate-500">
              Trusted by 1000+ businesses across India
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: Shield,
                title: "100% Secure",
                desc: "Safe & Trusted Services",
                color: "bg-teal-50 text-teal-600",
              },
              {
                icon: Clock,
                title: "On-Time Delivery",
                desc: "We Value Your Time",
                color: "bg-cyan-50 text-cyan-600",
              },
              {
                icon: Headphones,
                title: "24/7 Support",
                desc: "Always Here to Help",
                color: "bg-sky-50 text-sky-600",
              },
              {
                icon: TrendingUp,
                title: "Best Results",
                desc: "Proven Track Record",
                color: "bg-emerald-50 text-emerald-600",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 text-center border border-slate-200 hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-14 h-14 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CONTACT SECTION ========== */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-2">
                <Send className="w-5 h-5 text-cyan-600" />
                <h2 className="text-xl font-bold text-slate-900">
                  Get Free Quote
                </h2>
              </div>
              <p className="text-slate-500 text-sm mb-6">
                Fill the form and get callback within 30 minutes
              </p>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Your Name *"
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg outline-none focus:border-cyan-500 transition-all"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="Email Address *"
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg outline-none focus:border-cyan-500 transition-all"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg outline-none focus:border-cyan-500 transition-all"
                  />
                </div>
                <select className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg outline-none focus:border-cyan-500 transition-all">
                  <option value="">Select Service *</option>
                  <option>Web Development</option>
                  <option>App Development</option>
                </select>
                <textarea
                  placeholder="Tell us about your requirement..."
                  rows={3}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg outline-none focus:border-cyan-500 transition-all resize-none"
                ></textarea>
                <button
                  type="submit"
                  className="w-full py-4 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-all"
                >
                  Get Free Quote <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            <div className="space-y-4">
              <div className="bg-teal-700 rounded-xl p-6 text-white">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-lg mb-1">Call Us Now</div>
                    <div className="text-xl font-bold">+91 7709936965 </div>
                  </div>
                </div>
              </div>
              <div className="bg-cyan-700 rounded-xl p-6 text-white">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-lg mb-1">Email Us</div>
                    <div className="text-lg font-bold">
                      info.jdsolutions2018@gmail.com
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== BOTTOM CTA BAR ========== */}
      <section className="bg-slate-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white text-center md:text-left">
              <div className="font-bold text-lg">
                Looking for Digital Services?
              </div>
              <div className="text-slate-400 text-sm">
                Get the best quotes from Jisnu Digital
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold transition-colors">
                <PhoneCall className="w-4 h-4" /> Call Now
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-bold transition-colors">
                <Send className="w-4 h-4" /> Get Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== VERTICAL FLOATING SIDEBAR (JUSTDIAL STYLE) ========== */}
      <div className="fixed right-0 top-[40%] z-[999] flex flex-col items-end pointer-events-none">
        {/* Advertise Button (Vertical) */}
        <Link
          href="/companies/list-your-company"
          className="pointer-events-auto w-[34px] bg-[#df4f2d] text-white py-4 px-1 rounded-l-md shadow-lg transition-all duration-300 hover:pr-2 group border-b border-white/20 mb-10"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          <div className="flex items-center gap-2 transform rotate-180">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Paid Listing
            </span>
            <Zap className="w-3 h-3 text-white fill-current transform rotate-180" />
          </div>
        </Link>

        {/* Free Listing Button (Vertical) */}
        <Link
          href="/companies/list-your-company"
          className="pointer-events-auto w-[34px] bg-[#0076d7] text-white py-4 px-1 rounded-l-md shadow-lg transition-all duration-300 hover:pr-2 group"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          <div className="flex items-center gap-2 transform rotate-180">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Free Listing
            </span>
            <BadgeCheck className="w-3 h-3 text-white transform rotate-180" />
          </div>
        </Link>

        {/* WhatsApp Button (Vertical) */}
        <a
          href="https://wa.me/917709936965"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto mt-10 w-[34px] bg-[#25D366] text-white py-4 px-1 rounded-l-md shadow-lg transition-all duration-300 hover:pr-2 group"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          <div className="flex items-center gap-2 transform rotate-180">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              WhatsApp
            </span>
            <MessageCircle className="w-3 h-3 text-white transform rotate-180" />
          </div>
        </a>
      </div>
    </main>
  );
}
