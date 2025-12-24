"use client"

import Link from "next/link"
import { Calendar, ClipboardList, ArrowRight } from "lucide-react"

const requests = [
  {
    id: "REQ-001",
    service: "Web Development",
    description: "Corporate website with CMS and SEO optimization",
    submittedAt: "10 Sep 2025",
    status: "pending",
  },
  {
    id: "REQ-002",
    service: "UI/UX Design",
    description: "Mobile app UI redesign",
    submittedAt: "22 Aug 2025",
    status: "approved",
  },
  {
    id: "REQ-003",
    service: "Digital Marketing",
    description: "SEO + social media growth strategy",
    submittedAt: "05 Aug 2025",
    status: "in_progress",
  },
]

export default function ServiceRequestsPage() {
  return (
    <div className="space-y-10">

      {/* ===== HEADER ===== */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="font-display text-2xl font-semibold mb-2">
            Service Requests
          </h2>
          <p className="text-muted-foreground">
            Track all your submitted service requests and their progress.
          </p>
        </div>

        <Link href="/services">
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition">
            Request New Service
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>

      {/* ===== REQUEST LIST ===== */}
      <div className="space-y-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="p-6 rounded-xl bg-background border border-border hover:border-primary/40 transition"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

              {/* Left */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ClipboardList className="w-4 h-4 text-primary" />
                  Request ID: {req.id}
                </div>

                <h3 className="font-display text-lg font-semibold">
                  {req.service}
                </h3>

                <p className="text-sm text-muted-foreground max-w-xl">
                  {req.description}
                </p>
              </div>

              {/* Right */}
              <div className="flex flex-col items-start md:items-end gap-3">
                <StatusBadge status={req.status} />

                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  Submitted on {req.submittedAt}
                </div>

                <button className="text-sm text-primary font-medium hover:underline">
                  View Details
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* ===== EMPTY STATE (for future) ===== */}
      {requests.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-muted-foreground mb-4">
            You haven’t requested any services yet.
          </p>
          <Link href="/services">
            <button className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium">
              Browse Services
            </button>
          </Link>
        </div>
      )}

    </div>
  )
}

/* ================= STATUS BADGE ================= */

function StatusBadge({
  status,
}: {
  status: "pending" | "approved" | "in_progress" | "completed" | "rejected"
}) {
  const styles: Record<string, string> = {
    pending: "bg-yellow-500/10 text-yellow-600",
    approved: "bg-blue-500/10 text-blue-600",
    in_progress: "bg-purple-500/10 text-purple-600",
    completed: "bg-green-500/10 text-green-600",
    rejected: "bg-red-500/10 text-red-600",
  }

  const labels: Record<string, string> = {
    pending: "Pending Review",
    approved: "Approved",
    in_progress: "In Progress",
    completed: "Completed",
    rejected: "Rejected",
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  )
}
