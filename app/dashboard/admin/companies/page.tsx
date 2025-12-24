"use client"

import Link from "next/link"
import { Check, X, Eye, Building2, Crown, UserCog } from "lucide-react"
import { useState } from "react"

const companies = [
  {
    id: "tech-startup-co",
    name: "TechStart Innovation",
    location: "San Francisco, CA",
    logo: "/placeholder.svg",
    plan: "Paid",
    managedBy: "Jisnu",
    status: "Approved",
  },
  {
    id: "fashion-hub",
    name: "Fashion Hub",
    location: "New York, NY",
    logo: "/placeholder.svg",
    plan: "Free",
    managedBy: "Client",
    status: "Pending",
  },
  {
    id: "education-360",
    name: "Education 360",
    location: "Austin, TX",
    logo: "/placeholder.svg",
    plan: "Paid",
    managedBy: "Jisnu",
    status: "Approved",
  },
  {
    id: "health-wellness",
    name: "Health & Wellness Co",
    location: "Boston, MA",
    logo: "/placeholder.svg",
    plan: "Free",
    managedBy: "Client",
    status: "Pending",
  },
]

export default function AdminCompaniesPage() {
  const [filter, setFilter] = useState<"All" | "Pending" | "Approved">("All")

  const filteredCompanies =
    filter === "All"
      ? companies
      : companies.filter((c) => c.status === filter)

  return (
    <main className="pt-20 px-6 md:px-10 pb-20">

      {/* ===== HEADER ===== */}
      <div className="mb-10">
        <h1 className="font-display text-3xl font-semibold mb-2">
          Companies
        </h1>
        <p className="text-muted-foreground">
          Manage all listed companies and approvals
        </p>
      </div>

      {/* ===== FILTERS ===== */}
      <div className="flex gap-3 mb-8">
        {["All", "Pending", "Approved"].map((item) => (
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

      {/* ===== COMPANY LIST ===== */}
      <div className="space-y-4">
        {filteredCompanies.map((company) => (
          <div
            key={company.id}
            className="p-5 rounded-xl border border-border bg-background flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            {/* LEFT */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-md border bg-muted flex items-center justify-center">
                <Building2 className="w-6 h-6 text-muted-foreground" />
              </div>

              <div>
                <h3 className="font-semibold">{company.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {company.location}
                </p>
              </div>
            </div>

            {/* MIDDLE TAGS */}
            <div className="flex flex-wrap gap-3 text-xs">
              <Tag
                label={company.plan}
                icon={<Crown className="w-3 h-3" />}
                type={company.plan === "Paid" ? "primary" : "muted"}
              />
              <Tag
                label={`Managed by ${company.managedBy}`}
                icon={<UserCog className="w-3 h-3" />}
                type="outline"
              />
              <Tag
                label={company.status}
                type={company.status === "Approved" ? "success" : "warning"}
              />
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2">
              {company.status === "Pending" && (
                <>
                  <ActionButton icon={<Check />} color="green" />
                  <ActionButton icon={<X />} color="red" />
                </>
              )}

              <Link href={`/companies/${company.id}`}>
                <ActionButton icon={<Eye />} />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </main>
  )
}

/* ===== UI HELPERS ===== */

function Tag({
  label,
  icon,
  type = "muted",
}: {
  label: string
  icon?: React.ReactNode
  type?: "primary" | "muted" | "outline" | "success" | "warning"
}) {
  const styles: Record<string, string> = {
    primary: "bg-primary text-primary-foreground",
    muted: "bg-muted text-muted-foreground",
    outline: "border border-border",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full ${styles[type]}`}
    >
      {icon}
      {label}
    </span>
  )
}

function ActionButton({
  icon,
  color = "default",
}: {
  icon: React.ReactNode
  color?: "default" | "green" | "red"
}) {
  const styles: Record<string, string> = {
    default: "border-border hover:border-primary/40",
    green: "border-green-300 text-green-600 hover:bg-green-50",
    red: "border-red-300 text-red-600 hover:bg-red-50",
  }

  return (
    <button
      className={`p-2 rounded-md border transition ${styles[color]}`}
    >
      {icon}
    </button>
  )
}
