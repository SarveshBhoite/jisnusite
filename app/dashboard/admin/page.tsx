"use client"

import Link from "next/link"
import {
  Building2,
  CheckCircle,
  Clock,
  DollarSign,
  Image,
  ClipboardList,
} from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <main className="pt-20 px-6 md:px-10 pb-20">

      {/* ===== HEADER ===== */}
      <div className="mb-10">
        <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Overview of companies, requests, and platform activity
        </p>
      </div>

      {/* ===== KPI CARDS ===== */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-14">
        <KpiCard
          title="Total Companies"
          value="42"
          icon={<Building2 />}
        />
        <KpiCard
          title="Paid Companies"
          value="18"
          icon={<DollarSign />}
        />
        <KpiCard
          title="Free Companies"
          value="24"
          icon={<CheckCircle />}
        />
        <KpiCard
          title="Pending Approvals"
          value="5"
          icon={<Clock />}
        />
        <KpiCard
          title="Service Requests"
          value="12"
          icon={<ClipboardList />}
        />
      </section>

      {/* ===== QUICK ACTIONS ===== */}
      <section className="mb-16">
        <h2 className="font-display text-xl font-semibold mb-6">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          <QuickAction
            title="Manage Companies"
            href="/dashboard/admin/manage-companies"
            icon={<Building2 />}
          />
          <QuickAction
            title="Pending Approvals"
            href="/dashboard/admin/approvals"
            icon={<Clock />}
          />
          <QuickAction
            title="Service Requests"
            href="/dashboard/admin/service-requests"
            icon={<ClipboardList />}
          />
          <QuickAction
            title="Media Library"
            href="/dashboard/admin/media"
            icon={<Image />}
          />
        </div>
      </section>

      {/* ===== RECENT ACTIVITY ===== */}
      <section className="mb-16">
        <h2 className="font-display text-xl font-semibold mb-6">
          Recent Activity
        </h2>

        <div className="rounded-xl border border-border bg-background">
          <ActivityItem
            title="TechStart Innovation approved"
            subtitle="Company listing approved"
            time="2 hours ago"
          />
          <ActivityItem
            title="New service request received"
            subtitle="Web Development – Fashion Hub"
            time="5 hours ago"
          />
          <ActivityItem
            title="Media uploaded"
            subtitle="Gallery images added for Education 360"
            time="Yesterday"
          />
        </div>
      </section>

      {/* ===== COMPANY MANAGEMENT STATUS ===== */}
      <section>
        <h2 className="font-display text-xl font-semibold mb-6">
          Company Management Status
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <StatusCard
            title="Managed by Jisnu"
            value="18 Companies"
            description="Admin team actively manages content"
          />
          <StatusCard
            title="Self-managed"
            value="24 Companies"
            description="Companies manage their own uploads"
          />
        </div>
      </section>

    </main>
  )
}

/* ===== COMPONENTS ===== */

function KpiCard({
  title,
  value,
  icon,
}: {
  title: string
  value: string
  icon: React.ReactNode
}) {
  return (
    <div className="p-6 rounded-xl border border-border bg-background flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
      <div className="w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center">
        {icon}
      </div>
    </div>
  )
}

function QuickAction({
  title,
  href,
  icon,
}: {
  title: string
  href: string
  icon: React.ReactNode
}) {
  return (
    <Link href={href}>
      <div className="p-6 rounded-xl border border-border bg-background hover:border-primary/40 transition cursor-pointer flex items-center gap-4">
        <div className="w-10 h-10 rounded-md bg-primary text-primary-foreground flex items-center justify-center">
          {icon}
        </div>
        <span className="font-medium">{title}</span>
      </div>
    </Link>
  )
}

function ActivityItem({
  title,
  subtitle,
  time,
}: {
  title: string
  subtitle: string
  time: string
}) {
  return (
    <div className="flex items-start justify-between px-6 py-4 border-b last:border-b-0 border-border">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <span className="text-xs text-muted-foreground">{time}</span>
    </div>
  )
}

function StatusCard({
  title,
  value,
  description,
}: {
  title: string
  value: string
  description: string
}) {
  return (
    <div className="p-6 rounded-xl border border-border bg-muted/40">
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-xl font-semibold mb-1">{value}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
