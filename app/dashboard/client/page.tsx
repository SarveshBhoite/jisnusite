"use client"

import { Building2, ImageIcon, FileText, CheckCircle } from "lucide-react"

export default function ClientDashboardPage() {
  return (
    <div className="space-y-8">

      {/* ===== WELCOME ===== */}
      <div>
        <h2 className="font-display text-2xl font-semibold mb-2">
          Welcome back 👋
        </h2>
        <p className="text-muted-foreground">
          Manage your company listing, uploads, and service requests from here.
        </p>
      </div>

      {/* ===== STATS ===== */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Building2 className="w-5 h-5" />}
          title="Company Status"
          value="Pending Approval"
        />
        <StatCard
          icon={<ImageIcon className="w-5 h-5" />}
          title="Media Uploaded"
          value="0 Files"
        />
        <StatCard
          icon={<FileText className="w-5 h-5" />}
          title="Service Requests"
          value="0 Requests"
        />
        <StatCard
          icon={<CheckCircle className="w-5 h-5" />}
          title="Profile Completion"
          value="40%"
        />
      </div>

      {/* ===== QUICK ACTIONS ===== */}
      <div className="grid md:grid-cols-2 gap-6">
        <QuickCard
          title="Complete Your Company Profile"
          description="Add company details, vision, mission, and social links to get approved faster."
          button="Go to My Company"
          href="/dashboard/client/company"
        />
        <QuickCard
          title="Upload Media"
          description="Upload your company logo, images, or promotional videos."
          button="Open Media Library"
          href="/dashboard/client/media"
        />
      </div>

    </div>
  )
}

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode
  title: string
  value: string
}) {
  return (
    <div className="p-6 rounded-xl bg-background border border-border">
      <div className="flex items-center gap-3 mb-3 text-primary">
        {icon}
        <p className="text-sm font-medium">{title}</p>
      </div>
      <p className="font-display text-xl font-semibold">{value}</p>
    </div>
  )
}

function QuickCard({
  title,
  description,
  button,
  href,
}: {
  title: string
  description: string
  button: string
  href: string
}) {
  return (
    <div className="p-6 rounded-xl bg-background border border-border flex flex-col">
      <h3 className="font-display text-lg font-semibold mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm mb-6 flex-grow">
        {description}
      </p>
      <a
        href={href}
        className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition"
      >
        {button}
      </a>
    </div>
  )
}
