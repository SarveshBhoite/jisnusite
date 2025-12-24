"use client"

import Link from "next/link"
import {
  CheckCircle,
  XCircle,
  Building2,
  Clock,
} from "lucide-react"

const pendingCompanies = [
  {
    id: "cmp-001",
    name: "TechStart Innovation",
    submittedBy: "admin@techstart.io",
    location: "San Francisco, CA",
    submittedOn: "18 Jan 2025",
  },
  {
    id: "cmp-002",
    name: "Fashion Hub",
    submittedBy: "founder@fashionhub.com",
    location: "New York, NY",
    submittedOn: "17 Jan 2025",
  },
  {
    id: "cmp-003",
    name: "Health & Wellness Co",
    submittedBy: "team@healthwellness.co",
    location: "Boston, MA",
    submittedOn: "16 Jan 2025",
  },
]

export default function CompanyApprovalPage() {
  return (
    <main className="pt-20 px-6 md:px-10 pb-20 max-w-7xl mx-auto">

      {/* ===== HEADER ===== */}
      <div className="mb-10">
        <h1 className="font-display text-3xl font-semibold mb-2">
          Company Listing Approvals
        </h1>
        <p className="text-muted-foreground">
          Review and approve company listing requests before they go live.
        </p>
      </div>

      {/* ===== PENDING LIST ===== */}
      <div className="space-y-6">
        {pendingCompanies.map((company) => (
          <div
            key={company.id}
            className="p-6 rounded-xl border border-border bg-background flex flex-col lg:flex-row gap-6 lg:items-center justify-between"
          >

            {/* INFO */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary" />
              </div>

              <div>
                <h2 className="font-semibold text-lg">
                  {company.name}
                </h2>

                <p className="text-sm text-muted-foreground">
                  Submitted by {company.submittedBy}
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
                  <span>{company.location}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {company.submittedOn}
                  </span>
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-3">

              <Link href={`/dashboard/admin/approvals/${company.id}`}>
                <button className="px-4 py-2 rounded-md border border-border text-sm hover:border-primary transition">
                  View Details
                </button>
              </Link>

              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 text-white text-sm hover:bg-green-700 transition">
                <CheckCircle className="w-4 h-4" />
                Approve
              </button>

              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-red-600 text-white text-sm hover:bg-red-700 transition">
                <XCircle className="w-4 h-4" />
                Reject
              </button>

            </div>

          </div>
        ))}
      </div>

      {/* EMPTY STATE (LATER) */}
      {pendingCompanies.length === 0 && (
        <div className="text-center py-24">
          <h2 className="text-xl font-semibold mb-2">
            No Pending Requests 🎉
          </h2>
          <p className="text-muted-foreground">
            All company listings are up to date.
          </p>
        </div>
      )}

    </main>
  )
}
