"use client"

import { ReactNode, useEffect, useState } from "react"
import Link from "next/link"
import { LayoutDashboard, Building2, ImageIcon, User, FileText, LogOut, Loader2 } from "lucide-react"

function SidebarLink({ href, icon, label }: { href: string; icon: ReactNode; label: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent text-foreground hover:text-accent-foreground transition-colors">
      {icon}
      <span>{label}</span>
    </Link>
  )
}

export default function ClientDashboardLayout({ children }: { children: ReactNode }) {
  const [ownerData, setOwnerData] = useState<{ name: string; email: string; logo?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileFromDB = async () => {
      try {
        // Humne koi parameter nahi bheja, kyunki API session se email khud nikal legi
        const res = await fetch("/api/client/company");
        const result = await res.json();

        if (result.success && result.data) {
          setOwnerData({
            name: result.data.name,
            email: result.data.email,
            logo: result.data.logo // Agar aap logo bhi dikhana chahte hain
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

  return (
    <div className="min-h-screen flex bg-muted/40 pt-20">
      {/* SIDEBAR (Same as before) */}
      <aside className="w-64 bg-background border-r border-border hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <span className="font-display text-lg font-semibold italic text-primary">JISNU DIGITAL</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2 text-sm">
          <SidebarLink href="/dashboard/client" icon={<LayoutDashboard className="w-4 h-4" />} label="Overview" />
          <SidebarLink href="/dashboard/client/company" icon={<Building2 className="w-4 h-4" />} label="My Company" />
          <SidebarLink href="/dashboard/client/media" icon={<ImageIcon className="w-4 h-4" />} label="Media Library" />
          <SidebarLink href="/dashboard/client/requests" icon={<FileText className="w-4 h-4" />} label="Service Requests" />
          <SidebarLink href="/dashboard/client/profile" icon={<User className="w-4 h-4" />} label="Profile & Security" />
        </nav>
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6">
          <h1 className="font-display text-lg font-semibold uppercase italic">Client Portal</h1>

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
                
                {/* Agar Logo hai toh image dikhayein, nahi toh First Letter */}
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-black italic border-2 border-primary/20 overflow-hidden">
                  {ownerData.logo ? (
                    <img src={ownerData.logo} alt="logo" className="w-full h-full object-cover" />
                  ) : (
                    ownerData.name.charAt(0).toUpperCase()
                  )}
                </div>
              </>
            ) : (
              <Link href="/api/auth/signin" className="text-xs font-bold text-red-500 underline">Login to Sync</Link>
            )}
          </div>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}