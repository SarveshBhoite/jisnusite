"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Building2, Loader2, AlertCircle } from "lucide-react"

type Status = "New" | "In Progress" | "Completed"

export default function AdminServiceRequestsPage() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<Status | "All">("All")

  // 1. FETCH ALL REQUESTS FROM API
 const fetchRequests = async () => {
    try {
      // cache: 'no-store' add karne se hamesha fresh data aayega
      const res = await fetch("/api/admin/services/request", { cache: 'no-store' })
      const json = await res.json()
      setData(Array.isArray(json) ? json : [])
    } catch (err) {
      console.error("Fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  // 2. UPDATE STATUS IN DATABASE
  const updateStatus = async (id: string, newStatus: Status) => {
    try {
      const res = await fetch(`/api/admin/services/request?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      })
      
      if (res.ok) {
        // Local state update for instant feedback
        setData(prev => prev.map(req => 
          req._id === id ? { ...req, status: newStatus } : req
        ))
      }
    } catch (err) {
      alert("Failed to update status")
    }
  }

  const filtered = filter === "All" 
    ? data 
    : data.filter((r) => r.status === filter)

  if (loading) return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <Loader2 className="animate-spin text-primary w-10 h-10" />
      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Loading Requests...</p>
    </div>
  )

  return (
    <main className="pt-20 px-6 md:px-10 pb-20 max-w-7xl mx-auto">
      
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 mb-2 italic uppercase">
          Service Requests
        </h1>
        <p className="text-slate-500 font-medium">
          Manage incoming leads and project inquiries
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-2 mb-8">
        {["All", "New", "In Progress", "Completed"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item as any)}
            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all border ${
              filter === item
                ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200"
                : "bg-white text-slate-400 border-slate-200 hover:border-slate-400"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* REQUEST LIST */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2rem] p-20 text-center">
            <AlertCircle className="mx-auto w-10 h-10 text-slate-300 mb-4" />
            <p className="text-slate-400 font-bold uppercase tracking-tighter">No requests found</p>
          </div>
        ) : (
          filtered.map((req) => (
            <div
              key={req._id}
              className="p-8 rounded-[2rem] border border-slate-200 bg-white hover:shadow-xl hover:shadow-slate-100 transition-all group"
            >
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
                
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                       <h3 className="font-black text-slate-900 uppercase text-lg leading-none">
                        {req.name || "Direct Client"}
                      </h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">
                        ID: {req._id.slice(-6)} • {new Date(req.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* SERVICES LIST */}
                  <div className="flex flex-wrap gap-2">
                    {req.services?.map((s: any, i: number) => (
                      <span key={i} className="px-3 py-1 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-black uppercase">
                        {s.name}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-slate-500 font-medium line-clamp-2 max-w-2xl italic">
                    "{req.message || "No specific requirements provided."}"
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-wrap items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <StatusBadge status={req.status} />

                  <select
                    value={req.status}
                    onChange={(e) => updateStatus(req._id, e.target.value as Status)}
                    className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold uppercase outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>

                  <Link href={`/dashboard/admin/service-requests/${req._id}`}>
                    <button className="bg-white p-2 rounded-xl border border-slate-200 hover:bg-slate-900 hover:text-white transition-all group/btn">
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
    New: "bg-blue-500 text-white shadow-blue-100",
    "In Progress": "bg-amber-500 text-white shadow-amber-100",
    Completed: "bg-emerald-500 text-white shadow-emerald-100",
  }

  return (
    <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg ${styles[status]}`}>
      {status}
    </span>
  )
}