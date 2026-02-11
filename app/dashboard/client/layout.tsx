"use client"

import { ReactNode, useEffect, useState } from "react"
import Link from "next/link"
import { LayoutDashboard, Building2, ImageIcon, User, FileText, Menu, X, Loader2 } from "lucide-react"

function SidebarLink({ href, icon, label, onClick }: { href: string; icon: ReactNode; label: string; onClick?: () => void }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-3 md:py-2 rounded-md hover:bg-accent text-foreground hover:text-accent-foreground transition-colors text-base md:text-sm"
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}

export default function ClientDashboardLayout({ children }: { children: ReactNode }) {
  const [ownerData, setOwnerData] = useState<{ name: string; email: string; logo?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile Menu State

  useEffect(() => {
    const fetchProfileFromDB = async () => {
      try {
        const res = await fetch("/api/client/company");
        const result = await res.json();
        if (result.success && result.data) {
          setOwnerData({
            name: result.data.name,
            email: result.data.email,
            logo: result.data.logo
          });
        }
      } catch (err) {
        console.error("Profile load error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileFromDB();
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen flex bg-muted/40 pt-16 md:pt-20">
      
      {/* ===== MOBILE SIDEBAR OVERLAY ===== */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 md:hidden" 
          onClick={toggleMobileMenu}
        />
      )}

      {/* ===== SIDEBAR (Desktop & Mobile) ===== */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border flex flex-col transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-border">
          <span className="font-display text-lg font-semibold italic text-primary">JISNU DIGITAL</span>
          <button className="md:hidden" onClick={toggleMobileMenu}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2 text-sm">
          <SidebarLink onClick={() => setIsMobileMenuOpen(false)} href="/dashboard/client" icon={<LayoutDashboard className="w-4 h-4" />} label="Overview" />
          <SidebarLink onClick={() => setIsMobileMenuOpen(false)} href="/dashboard/client/company" icon={<Building2 className="w-4 h-4" />} label="My Company" />
          <SidebarLink onClick={() => setIsMobileMenuOpen(false)} href="/dashboard/client/media" icon={<ImageIcon className="w-4 h-4" />} label="Media Library" />
          <SidebarLink onClick={() => setIsMobileMenuOpen(false)} href="/dashboard/client/requests" icon={<FileText className="w-4 h-4" />} label="Service Requests" />
          <SidebarLink onClick={() => setIsMobileMenuOpen(false)} href="/dashboard/client/profile" icon={<User className="w-4 h-4" />} label="Profile & Security" />
        </nav>
      </aside>

      {/* ===== MAIN AREA ===== */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-background border-b border-border flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">
          <div className="flex items-center gap-3">
            {/* Hamburger Button for Mobile */}
            <button 
              onClick={toggleMobileMenu}
              className="p-2 -ml-2 md:hidden hover:bg-accent rounded-md"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="font-display text-sm md:text-lg font-semibold uppercase italic truncate">
              Client Portal
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
            ) : ownerData ? (
              <>
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-black text-slate-900 uppercase italic leading-none">
                    {ownerData.name}
                  </p>
                  <p className="text-[10px] font-bold text-muted-foreground tracking-tighter">
                    {ownerData.email}
                  </p>
                </div>
                
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-black italic border-2 border-primary/20 overflow-hidden shrink-0">
                  {ownerData.logo ? (
                    <img src={ownerData.logo} alt="logo" className="w-full h-full object-cover" />
                  ) : (
                    ownerData.name.charAt(0).toUpperCase()
                  )}
                </div>
              </>
            ) : (
              <Link href="/api/auth/signin" className="text-xs font-bold text-red-500 underline">Login</Link>
            )}
          </div>
        </header>

        {/* Content Area - Added responsive padding */}
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}