"use client"

import { useEffect, useState } from "react"
import { Building2, ImageIcon, FileText, CheckCircle, Loader2 } from "lucide-react"


export default function ClientDashboardPage() {
  const [stats, setStats] = useState({
    status: "Checking...",
    mediaCount: 0,
    requests: 0,
    completion: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchClientStats() {
      try {
        const res = await fetch("/api/client/stats")
        if (!res.ok) throw new Error("Failed to fetch")
        const data = await res.json()
        setStats(data)
      } catch (err) {
        console.error("Error fetching client dashboard data:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchClientStats()
  }, [])

  return (
    // Added horizontal padding for mobile view compat
    // ibility
    
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 px-1 md:px-0">
      {/* ===== WELCOME ===== */}
      <div>
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-2 text-slate-900">
          Welcome back 👋
        </h2>
        <p className="text-slate-500 text-sm md:text-base">
          Manage your company listing, uploads, and service requests from here.
        </p>
      </div>

      {/* ===== STATS SECTION ===== */}
      {/* Changed to 1 column on mobile, 2 on tablet, 4 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {loading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="h-28 md:h-32 bg-slate-100 animate-pulse rounded-2xl border border-slate-200" />
          ))
        ) : (
          <>
            <StatCard
              icon={<Building2 className="w-5 h-5" />}
              title="Company Status"
              value={stats.status}
              type="status"
            />
            <StatCard
              icon={<ImageIcon className="w-5 h-5" />}
              title="Media Uploaded"
              value={`${stats.mediaCount} Files`}
            />
            <StatCard
              icon={<FileText className="w-5 h-5" />}
              title="Service Requests"
              value={`${stats.requests} Requests`}
            />
            <StatCard
              icon={<CheckCircle className="w-5 h-5" />}
              title="Profile Completion"
              value={`${stats.completion}%`}
              type="completion"
            />
          </>
        )}
      </div>

      {/* ===== QUICK ACTIONS ===== */}
      {/* Stacked on mobile, side-by-side on md screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <QuickCard
          title="Complete Your Company Profile"
          description={
            stats.completion < 100 
            ? `Your profile is ${stats.completion}% complete. Add more details to reach 100% and get verified.`
            : "Great job! Your profile is fully complete and ready for customers."
          }
          button={stats.completion < 100 ? "Finish Setup" : "Edit Profile"}
          href="/dashboard/client/company"
          progress={stats.completion}
        />
        
        <QuickCard
          title="Upload Media"
          description="Keep your gallery fresh with recent project photos or office images."
          button="Manage Gallery"
          href="/dashboard/client/company"
        />
      </div>
    </div>
  )
}

/* ===== COMPONENTS ===== */

function StatCard({ icon, title, value, type }: { icon: React.ReactNode, title: string, value: string, type?: "status" | "completion" }) {
  const getStatusColor = (val: string) => {
    const low = val.toLowerCase();
    if (low.includes("verified") || low.includes("approved")) return "text-green-600 bg-green-50"
    if (low.includes("pending")) return "text-amber-600 bg-amber-50"
    if (low.includes("reject")) return "text-red-600 bg-red-50"
    return "text-slate-600 bg-slate-50"
  }

  return (
    // Reduced padding slightly for mobile (p-5) vs desktop (md:p-6)
    <div className="p-5 md:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-3 mb-3 md:mb-4">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
          {icon}
        </div>
        <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-400">{title}</p>
      </div>
      
      {type === "status" ? (
        <span className={`inline-block px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-tighter ${getStatusColor(value)}`}>
          {value}
        </span>
      ) : (
        <p className="text-xl md:text-2xl font-black text-slate-900">{value}</p>
      )}
    </div>
  )
}

function QuickCard({ title, description, button, href, progress }: { title: string, description: string, button: string, href: string, progress?: number }) {
  return (
    // Changed rounded corners and padding for mobile compatibility
    <div className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white border border-slate-200 shadow-sm flex flex-col hover:border-blue-300 transition-all group relative overflow-hidden">
      {progress !== undefined && (
        <div className="absolute top-0 left-0 h-1 bg-blue-500 transition-all duration-1000" style={{ width: `${progress}%` }} />
      )}
      
      <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-slate-900 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="text-slate-500 text-xs md:text-sm mb-6 md:mb-8 leading-relaxed">
        {description}
      </p>
      <a
        href={href}
        className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 md:py-3.5 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-blue-600 shadow-lg shadow-slate-200 transition-all active:scale-95 mt-auto"
      >
        {button}
      </a>
    </div>
  )
}