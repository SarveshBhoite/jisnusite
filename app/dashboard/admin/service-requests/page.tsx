"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Building2, Loader2, AlertCircle, CheckCircle ,ChevronLeft } from "lucide-react"

type Status = "New" | "In Progress" | "Completed"

export default function AdminServiceRequestsPage() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<Status | "All">("All")

  const fetchRequests = async () => {
    try {
      const res = await fetch("/api/admin/services/request", { cache: 'no-store' })
      const json = await res.json()
      setData(Array.isArray(json) ? json : [])
    } catch (err) {
      console.error("Fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchRequests() }, [])

  const updateStatus = async (id: string, newStatus: Status) => {
    try {
      // Optimistic Update: Update UI immediately
      setData(prev => prev.map(req => 
        req._id === id ? { ...req, status: newStatus } : req
      ))

      const res = await fetch(`/api/admin/services/request?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      })
      
      if (!res.ok) throw new Error();
    } catch (err) {
      alert("Failed to sync with database. Reverting...")
      fetchRequests(); // Revert on failure
    }
  }

  // This logic ensures that if you mark something as 'Completed' while 
  // viewing the 'New' tab, it will vanish from the current view.
  const filtered = filter === "All" 
    ? data 
    : data.filter((r) => r.status === filter)

  if (loading) return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Refreshing Dashboard...</p>
    </div>
  )

  return (
    <main className="pt-20 px-4 md:px-10 pb-20 max-w-7xl mx-auto min-h-screen bg-slate-50/50">
      
      {/* HEADER */}
      <div className="mb-10 flex justify-between items-end">
        <Link
                    href="/dashboard/admin"
                    className="text-slate-600 text-sm font-bold flex items-center gap-1 hover:text-blue-600 transition"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back to Home
                  </Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2 italic uppercase">
            Requests Log
          </h1>
          <p className="text-slate-500 font-medium text-sm">
            Current View: <span className="text-blue-600 font-bold">{filter}</span>
          </p>
        </div>
        <div className="hidden md:block text-right">
            <p className="text-[10px] font-black text-slate-300 uppercase">Total Requests</p>
            <p className="text-2xl font-black text-slate-900">{data.length}</p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex overflow-x-auto pb-4 no-scrollbar gap-2 mb-8">
        {["All", "New", "In Progress", "Completed"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item as any)}
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border whitespace-nowrap ${
              filter === item
                ? "bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-200 scale-105"
                : "bg-white text-slate-400 border-slate-200 hover:border-slate-300"
            }`}
          >
            {item} ({item === "All" ? data.length : data.filter(d => d.status === item).length})
          </button>
        ))}
      </div>

      {/* REQUEST LIST */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] py-24 text-center">
            <CheckCircle className="mx-auto w-12 h-12 text-slate-200 mb-4" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No {filter} items found</p>
          </div>
        ) : (
          filtered.map((req) => (
            <div
              key={req._id}
              className={`p-6 md:p-8 rounded-[2rem] border transition-all duration-500 animate-in fade-in slide-in-from-top-4 ${
                req.status === 'Completed' ? 'bg-slate-50/50 border-slate-100 opacity-75' : 'bg-white border-slate-200 shadow-sm hover:shadow-xl'
              }`}
            >
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${req.status === 'Completed' ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                      <Building2 className={`w-6 h-6 ${req.status === 'Completed' ? 'text-emerald-600' : 'text-slate-600'}`} />
                    </div>
                    <div>
                       <h3 className="font-black text-slate-900 uppercase text-lg leading-none">
                        {req.name || "Direct Client"}
                      </h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mt-1.5 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        ID: {req._id.slice(-6)} • {new Date(req.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {req.services?.map((s: any, i: number) => (
                      <span key={i} className="px-3 py-1 rounded-lg bg-blue-50 text-blue-600 text-[9px] font-black uppercase border border-blue-100">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-100 shadow-inner">
                  <StatusBadge status={req.status} />

                  <select
                    value={req.status}
                    onChange={(e) => updateStatus(req._id, e.target.value as Status)}
                    className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-[10px] font-black uppercase outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="New">New</option>
                    <option value="In Progress">Working</option>
                    <option value="Completed">Finish</option>
                  </select>

                  <Link href={`/dashboard/admin/service-requests/${req._id}`}>
                    <button className="bg-slate-900 text-white p-2.5 rounded-xl hover:bg-blue-600 transition-all group/btn">
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  )
}

function StatusBadge({ status }: { status: Status }) {
  const styles = {
    New: "bg-blue-600 text-white",
    "In Progress": "bg-amber-500 text-white",
    Completed: "bg-emerald-500 text-white",
  }

  return (
    <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${styles[status]}`}>
      {status === 'In Progress' ? 'Live' : status}
    </span>
  )
}