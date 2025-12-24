"use client"

import Link from "next/link"
import {
  ArrowLeft,
  Building2,
  MapPin,
  Calendar,
  Mail,
  Globe,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { useParams } from "next/navigation"

const companyRequestData: Record<string, any> = {
  "cmp-001": {
    name: "TechStart Innovation",
    logo: "", // empty = placeholder
    location: "San Francisco, CA",
    founded: "2018",
    email: "admin@techstart.io",
    website: "techstart.io",
    submittedBy: "admin@techstart.io",
    submittedOn: "18 Jan 2025",
    status: "Pending",
  },
}

export default function CompanyApprovalDetailPage() {
  const params = useParams()
  const companyId = params.id as string
  const company = companyRequestData[companyId]

  if (!company) {
    return (
      <main className="pt-20 flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Company request not found.</p>
      </main>
    )
  }

  return (
    <main className="pt-20 pb-20 max-w-5xl mx-auto px-6">

      {/* ===== BACK ===== */}
      <Link
        href="/dashboard/admin/company-approvals"
        className="inline-flex items-center gap-2 text-primary font-medium mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Approvals
      </Link>

      {/* ===== HEADER ===== */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10">
        <div className="w-20 h-20 rounded-xl border border-border bg-muted flex items-center justify-center overflow-hidden">
          {company.logo ? (
            <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
          ) : (
            <Building2 className="w-10 h-10 text-muted-foreground" />
          )}
        </div>

        <div>
          <h1 className="font-display text-3xl font-semibold mb-1">
            {company.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            Listing request • Submitted on {company.submittedOn}
          </p>
        </div>

        <span className="ml-auto px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">
          Pending Approval
        </span>
      </div>

      {/* ===== DETAILS CARD ===== */}
      <div className="rounded-2xl border border-border bg-background p-8 space-y-8">

        <h2 className="font-display text-xl font-semibold">
          Company Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6 text-sm">

          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-primary" />
            <span>
              <strong>Company Name:</strong> {company.name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary" />
            <span>
              <strong>Location:</strong> {company.location}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-primary" />
            <span>
              <strong>Founded:</strong> {company.founded}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-primary" />
            <span>
              <strong>Company Email:</strong> {company.email}
            </span>
          </div>

          {company.website && (
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-primary" />
              <a
                href={`https://${company.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {company.website}
              </a>
            </div>
          )}

          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-primary" />
            <span>
              <strong>Submitted By:</strong> {company.submittedBy}
            </span>
          </div>

        </div>
      </div>

      {/* ===== ACTIONS ===== */}
      <div className="mt-12 flex flex-wrap gap-4 justify-end">

        <button className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 transition">
          <XCircle className="w-5 h-5" />
          Reject Listing
        </button>

        <button className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition">
          <CheckCircle className="w-5 h-5" />
          Approve & Publish
        </button>

      </div>

    </main>
  )
}
