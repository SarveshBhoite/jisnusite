"use client";

import { useState, useEffect, FormEvent, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Menu,
  X,
  ArrowRight,
  ShoppingBag,
  Search,
  MapPin,
  User,
  LogOut,
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [navQuery, setNavQuery] = useState("");
  const [navLocation, setNavLocation] = useState("");
  const [categorySuggestions, setCategorySuggestions] = useState<string[]>([]);
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showCategorySuggestions, setShowCategorySuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const categorySuggestionRef = useRef<HTMLDivElement>(null);
  const locationSuggestionRef = useRef<HTMLDivElement>(null);

  // Cart count state
  const [cartCount, setCartCount] = useState(0);

  const pathname = usePathname();
  const router = useRouter();

  const isHomePage = pathname === "/";
  const useWhiteNav = !isHomePage || isScrolled;

  // Logic to update count from localStorage
  useEffect(() => {
    const updateCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.length);
    };

    updateCount();

    window.addEventListener("cartUpdated", updateCount);
    window.addEventListener("storage", updateCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCount);
      window.removeEventListener("storage", updateCount);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dashboardHref =
    session?.user?.role === "admin"
      ? "/dashboard/admin"
      : session?.user?.role === "employee"
      ? "/dashboard/employee"
      : "/dashboard/client";

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsProfileOpen(false);
  }, [pathname]);

  const companyCategoryNames = [
    "E-commerce",
    "Hotels",
    "Energy",
    "Education",
    "Manufacturing",
    "Technology",
    "Health & Wellness",
    "Professiional Services",
    "Real Estate",
    "Decoration",
    "Restaurants",
    "Beauty Spa",
    "Home Decor",
    "Wedding Planning",
    "Rent & Hire",
    "Hospitals",
    "Contractors",
    "Pet Shops",
    "PG/Hostels",
    "Estate Agent",
    "Dentists",
    "Gym",
    "Loans",
    "Event Organiser",
    "Resort",
  ];

  const cityNames = [
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

  useEffect(() => {
    const q = navQuery.trim().toLowerCase();
    if (!q) {
      setCategorySuggestions([]);
      return;
    }
    setCategorySuggestions(
      companyCategoryNames
        .filter((name) => name.toLowerCase().startsWith(q))
        .slice(0, 8),
    );
  }, [navQuery]);

  useEffect(() => {
    const l = navLocation.trim().toLowerCase();
    if (!l) {
      setLocationSuggestions([]);
      return;
    }
    setLocationSuggestions(
      cityNames.filter((city) => city.toLowerCase().startsWith(l)).slice(0, 8),
    );
  }, [navLocation]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categorySuggestionRef.current &&
        !categorySuggestionRef.current.contains(event.target as Node)
      ) {
        setShowCategorySuggestions(false);
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

  const handleNavbarSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (navQuery.trim()) params.append("query", navQuery.trim());
    if (navLocation.trim()) params.append("location", navLocation.trim());
    router.push(`/companies?${params.toString()}`);
    setIsSearchOpen(false);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Companies", href: "/companies" },
    { name: "About ", href: "/about" },
    { name: "Blogs", href: "/blog" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61571480567573",
      icon: Facebook,
      hoverClass: "hover:bg-blue-600",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/jisnu_digitalsolution_pvt_ltd/",
      icon: Instagram,
      hoverClass: "hover:bg-pink-600",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/jisnu-digital-solution-s-pvt-ltd/?viewAsMember=true",
      icon: Linkedin,
      hoverClass: "hover:bg-sky-700",
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@jisnudigitalsolutions?si=auJgN7ncjXtnMPrf",
      icon: Youtube,
      hoverClass: "hover:bg-red-600",
    },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        useWhiteNav || isMobileMenuOpen || isSearchOpen
          ? "bg-white shadow-lg py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="group flex items-center gap-2.5 shrink-0">
            <div className="relative z-10 w-10 h-10 rounded-xl border-2 border-cyan-600/20 bg-white overflow-hidden shadow-lg transition-transform group-hover:rotate-0 rotate-3">
              <Image src="/icon.jpeg" alt="Logo" fill className="object-cover" />
            </div>
            <span
              className={`text-xl font-black tracking-tighter ${
                useWhiteNav || isMobileMenuOpen || isSearchOpen
                  ? "text-slate-900"
                  : "text-white"
              } hidden sm:inline`}
            >
              JISNU<span className="text-cyan-500">DIGITAL</span>
            </span>
          </Link>

          <div
            className={`hidden lg:flex items-center rounded-full px-6 py-2 border ${
              useWhiteNav
                ? "bg-slate-100 border-slate-200"
                : "bg-white/10 border-white/10 backdrop-blur-sm"
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-1 text-sm font-bold transition-all relative group ${
                  pathname === link.href
                    ? "text-cyan-600"
                    : useWhiteNav
                    ? "text-slate-600 hover:text-cyan-600"
                    : "text-slate-200 hover:text-white"
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-4 right-4 h-0.5 bg-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform ${
                    pathname === link.href ? "scale-x-100" : ""
                  }`}
                />
              </Link>
            ))}
          </div>

          <div className={`${isSearchOpen ? "flex-1 flex items-center justify-end min-w-0" : "flex items-center gap-2 md:gap-4"}`}>
            {isSearchOpen ? (
              <form
                onSubmit={handleNavbarSearch}
                className="w-full max-w-[72vw] sm:max-w-[560px] lg:max-w-[680px] bg-white rounded-lg border border-slate-200 shadow-sm px-1 py-0.5 sm:px-1.5 sm:py-1 flex items-center gap-1"
              >
                <div className="relative flex-1 min-w-0" ref={categorySuggestionRef}>
                  <div className="flex items-center gap-1 px-1.5 sm:px-2">
                    <Search className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      value={navQuery}
                      onFocus={() => setShowCategorySuggestions(true)}
                      onChange={(e) => {
                        setNavQuery(e.target.value);
                        setShowCategorySuggestions(true);
                      }}
                      placeholder="Category"
                      className="w-full text-[10px] sm:text-xs py-0.5 sm:py-1 text-slate-700 placeholder:text-slate-400 outline-none"
                    />
                  </div>

                  {showCategorySuggestions && categorySuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-100 rounded-lg shadow-xl z-[120] overflow-hidden">
                      <div className="max-h-44 overflow-y-auto">
                        {categorySuggestions.map((cat, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              setNavQuery(cat);
                              setShowCategorySuggestions(false);
                            }}
                            className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-cyan-50 border-b border-slate-50 last:border-0"
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-px h-4 sm:h-5 bg-slate-200 shrink-0" />

                <div className="relative flex-1 min-w-0" ref={locationSuggestionRef}>
                  <div className="flex items-center gap-1 px-1.5 sm:px-2">
                    <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      value={navLocation}
                      onFocus={() => setShowLocationSuggestions(true)}
                      onChange={(e) => {
                        setNavLocation(e.target.value);
                        setShowLocationSuggestions(true);
                      }}
                      placeholder="Location"
                      className="w-full text-[10px] sm:text-xs py-0.5 sm:py-1 text-slate-700 placeholder:text-slate-400 outline-none"
                    />
                  </div>

                  {showLocationSuggestions && locationSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-100 rounded-lg shadow-xl z-[120] overflow-hidden">
                      <div className="max-h-44 overflow-y-auto">
                        {locationSuggestions.map((city, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              setNavLocation(city);
                              setShowLocationSuggestions(false);
                            }}
                            className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-cyan-50 border-b border-slate-50 last:border-0"
                          >
                            {city}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-cyan-600 text-white text-[10px] sm:text-[11px] font-bold hover:bg-cyan-700 transition-colors shrink-0"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="p-0.5 sm:p-1 rounded-md text-slate-500 hover:bg-slate-100 transition-colors shrink-0"
                  aria-label="Close search"
                >
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </form>
            ) : (
              <>
                <div className="hidden xl:flex items-center gap-2">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        useWhiteNav || isMobileMenuOpen
                          ? "bg-white border-slate-200 text-slate-700"
                          : "bg-white/10 border-white/20 text-white"
                      } ${social.hoverClass} hover:text-white hover:border-transparent`}
                    >
                      <social.icon className="w-3.5 h-3.5" />
                    </Link>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setIsSearchOpen(true);
                    setIsMobileMenuOpen(false);
                    setIsProfileOpen(false);
                  }}
                  className={`p-2 rounded-full transition-colors ${
                    useWhiteNav || isMobileMenuOpen
                      ? "text-slate-700 hover:bg-slate-100"
                      : "text-white hover:bg-white/10"
                  }`}
                  aria-label="Open search"
                >
                  <Search className="w-5 h-5" />
                </button>

                <Link href="/cart" className="relative p-2 rounded-full hover:bg-black transition-colors">
                  <ShoppingBag
                    className={`w-5 h-5 ${
                      useWhiteNav || isMobileMenuOpen ? "text-slate-700" : "text-white"
                    }`}
                  />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 bg-cyan-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <div className="hidden md:flex items-center gap-4">
                  {status === "authenticated" ? (
                    <div className="relative">
                      <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className={`flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border transition-all ${
                          useWhiteNav
                            ? "bg-white border-slate-200"
                            : "bg-white/10 border-white/20 text-white"
                        }`}
                      >
                        <div className="w-7 h-7 rounded-full bg-cyan-600 flex items-center justify-center text-white text-xs font-bold uppercase">
                          {session.user?.name?.charAt(0)}
                        </div>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                      {isProfileOpen && (
                        <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3">
                          <div className="px-4 py-3 border-b border-slate-50 mb-2">
                            <span className="block text-sm font-black text-cyan-600 uppercase">
                              {session.user?.name}
                            </span>
                            <span className="block text-xs text-slate-500 truncate">
                              {session.user?.email}
                            </span>
                          </div>
                          <Link
                            href={dashboardHref}
                            className="flex items-center gap-3 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
                          >
                            <User className="w-4 h-4" /> Dashboard
                          </Link>
                          <button
                            onClick={() => signOut()}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50"
                          >
                            <LogOut className="w-4 h-4" /> Sign Out
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href="/login"
                      className={`text-sm font-bold ${useWhiteNav ? "text-slate-700" : "text-white"}`}
                    >
                      Login
                    </Link>
                  )}

                  <Link
                    href="/contact"
                    className="bg-cyan-700 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-2"
                  >
                    Get Quote <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className={`p-2 rounded-lg lg:hidden transition-colors ${
                    useWhiteNav || isMobileMenuOpen
                      ? "text-slate-900 hover:bg-slate-100"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </>
            )}
          </div>
        </div>

        {isMobileMenuOpen && !isSearchOpen && (
          <div className="lg:hidden mt-4 pb-6 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                    pathname === link.href ? "bg-cyan-50 text-cyan-600" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="my-2 border-slate-100" />

              <div className="px-4 py-2">
                <div className="flex items-center gap-2">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className={`w-9 h-9 rounded-full border border-slate-200 bg-white text-slate-700 flex items-center justify-center transition-all duration-300 ${social.hoverClass} hover:text-white hover:border-transparent`}
                    >
                      <social.icon className="w-4 h-4" />
                    </Link>
                  ))}
                </div>
              </div>

              {status === "authenticated" ? (
                <>
                  <Link href={dashboardHref} className="px-4 py-3 flex items-center gap-3 text-slate-700 font-bold">
                    <User className="w-5 h-5" /> My Dashboard
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </>
              ) : (
                <Link href="/login" className="px-4 py-3 flex items-center gap-3 text-slate-700 font-bold">
                  <User className="w-5 h-5" /> Login to Account
                </Link>
              )}

              <Link
                href="/contact"
                className="mx-4 mt-2 bg-cyan-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                Get Free Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
