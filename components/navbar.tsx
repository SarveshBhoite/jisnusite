"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { 
  Menu, X, Phone, ArrowRight, ShoppingBag, 
  User, LogOut, ChevronDown, Building2, Mail 
} from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const useWhiteNav = !isHomePage || isScrolled;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Companies", href: "/companies" },
    { name: "About Us", href: "/about" },
     { name: "Blogs", href: "/blog" }
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
      useWhiteNav || isMobileMenuOpen ? "bg-white shadow-lg py-3" : "bg-transparent py-6"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Section */}
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="relative z-10 w-10 h-10 rounded-xl border-2 border-cyan-600/20 bg-white overflow-hidden shadow-lg transition-transform group-hover:rotate-0 rotate-3">
              <Image src="/icon.jpeg" alt="Logo" fill className="object-cover" />
            </div>
            <span className={`text-xl font-black tracking-tighter ${useWhiteNav || isMobileMenuOpen ? "text-slate-900" : "text-white"}`}>
              JISNU<span className="text-cyan-500">DIGITAL</span>
            </span>
          </Link>

          {/* Desktop Navigation (Hidden on Mobile) */}
          <div className={`hidden lg:flex items-center rounded-full px-6 py-2 border ${
            useWhiteNav ? "bg-slate-100 border-slate-200" : "bg-white/10 border-white/10 backdrop-blur-sm"
          }`}>
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`px-4 py-1 text-sm font-bold transition-all relative group ${
                  pathname === link.href ? "text-cyan-600" : (useWhiteNav ? "text-slate-600 hover:text-cyan-600" : "text-slate-200 hover:text-white")
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform ${pathname === link.href ? "scale-x-100" : ""}`} />
              </Link>
            ))}
          </div>

          {/* Action Area */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Cart Icon - ALWAYS VISIBLE */}
            <Link href="/cart" className="relative p-2 rounded-full hover:bg-cyan-50 transition-colors">
              <ShoppingBag className={`w-5 h-5 ${useWhiteNav || isMobileMenuOpen ? "text-slate-700" : "text-white"}`} />
              <span className="absolute top-0 right-0 bg-cyan-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">0</span>
            </Link>

            {/* Desktop-Only Login/Quote Area */}
            <div className="hidden md:flex items-center gap-4">
              {status === "authenticated" ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className={`flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border transition-all ${
                      useWhiteNav ? "bg-white border-slate-200" : "bg-white/10 border-white/20 text-white"
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
                            <span className="block text-sm font-black text-cyan-600 uppercase">{session.user?.name}</span>
                            <span className="block text-xs text-slate-500 truncate">{session.user?.email}</span>
                        </div>
                        <Link href="/dashboard/client" className="flex items-center gap-3 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">
                            <User className="w-4 h-4" /> Dashboard
                        </Link>
                        <button onClick={() => signOut()} className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50">
                            <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login" className={`text-sm font-bold ${useWhiteNav ? "text-slate-700" : "text-white"}`}>
                  Login
                </Link>
              )}
              <Link href="/contact" className="bg-cyan-700 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                Get Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Menu Toggle - ONLY VISIBLE ON MOBILE */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg lg:hidden transition-colors ${
                useWhiteNav || isMobileMenuOpen ? "text-slate-900 hover:bg-slate-100" : "text-white hover:bg-white/10"
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
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
              
              {/* Mobile Auth/CTA */}
              {status === "authenticated" ? (
                 <><Link href="/dashboard/client" className="px-4 py-3 flex items-center gap-3 text-slate-700 font-bold">
                  <User className="w-5 h-5" /> My Dashboard
                </Link><button onClick={() => signOut()} className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button></>
              ) : (
                <Link href="/login" className="px-4 py-3 flex items-center gap-3 text-slate-700 font-bold">
                    <User className="w-5 h-5" /> Login to Account
                </Link>
              )}
              
              <Link href="/contact" className="mx-4 mt-2 bg-cyan-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                Get Free Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}