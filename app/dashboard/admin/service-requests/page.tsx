"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Building2,
  ClipboardList,
} from "lucide-react"

type Status = "New" | "In Progress" | "Completed"

const requests = [
  {
    id: "req-001",
    company: "TechStart Innovation",
    services: ["Web Development", "UI/UX Design"],
    message:
      "We want a complete redesign and development of our product website.",
    status: "New" as Status,
    date: "19 Jan 2025",
  },
  {
    id: "req-002",
    company: "Fashion Hub",
    services: ["Branding", "Digital Marketing"],
    message:
      "Need branding refresh and ongoing marketing support.",
    status: "In Progress" as Status,
    date: "16 Jan 2025",
  },
  {
    id: "req-003",
    company: "Education 360",
    services: ["UI/UX Design"],
    message:
      "Redesign student dashboard for better usability.",
    status: "Completed" as Status,
    date: "10 Jan 2025",
  },
]

export default function AdminServiceRequestsPage() {
  const [data, setData] = useState(requests)
  const [filter, setFilter] = useState<Status | "All">("All")

  const filtered =
    filter === "All" ? data : data.filter((r) => r.status === filter)

  const updateStatus = (id: string, status: Status) => {
    setData((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status } : req
      )
    )
  }

  return (
    <main className="pt-20 px-6 md:px-10 pb-20">

      {/* ===== HEADER ===== */}
      <div className="mb-10">
        <h1 className="font-display text-3xl font-semibold mb-2">
          Service Requests
        </h1>
        <p className="text-muted-foreground">
          Review and manage service requests from companies
        </p>
      </div>

      {/* ===== FILTERS ===== */}
      <div className="flex gap-3 mb-8">
        {["All", "New", "In Progress", "Completed"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item as any)}
            className={`px-4 py-2 rounded-md text-sm font-medium border transition ${
              filter === item
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background border-border hover:border-primary/40"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* ===== REQUEST LIST ===== */}
      <div className="space-y-5">
        {filtered.map((req) => (
          <div
            key={req.id}
            className="p-6 rounded-xl border border-border bg-background hover:border-primary/40 transition"
          >
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">

              {/* LEFT CONTENT */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">
                  Service Request
                </h3>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building2 className="w-4 h-4 text-primary" />
                  {req.company}
                </div>

                {/* SERVICES LIST */}
                <div className="flex flex-wrap gap-2">
                  {req.services.map((service, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground max-w-3xl">
                  {req.message}
                </p>

                <p className="text-xs text-muted-foreground">
                  Submitted on {req.date}
                </p>
              </div>

              {/* RIGHT ACTIONS */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

                <StatusBadge status={req.status} />

                {/* STATUS CONTROL */}
                <select
                  value={req.status}
                  onChange={(e) =>
                    updateStatus(req.id, e.target.value as Status)
                  }
                  className="px-4 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:border-primary"
                >
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>

                <Link href={`/dashboard/admin/service-requests/${req.id}`}>
                  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border text-sm font-medium hover:border-primary/40 transition">
                    View
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>

              </div>
            </div>
          </div>
        ))}
      </div>

    </main>
  )
}

/* ===== STATUS BADGE ===== */

function StatusBadge({ status }: { status: Status }) {
  const styles = {
    New: "bg-blue-100 text-blue-700",
    "In Progress": "bg-yellow-100 text-yellow-700",
    Completed: "bg-green-100 text-green-700",
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  )
}
