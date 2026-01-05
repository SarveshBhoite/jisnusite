"use client"

import Link from "next/link"
import { ReactNode } from "react"
import {
  LayoutDashboard,
  Building2,
  ImageIcon,
  User,
  FileText,
  LogOut,
} from "lucide-react"

export default function ClientDashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen flex bg-muted/40">

      {/* ===== SIDEBAR ===== */}
      <aside className="w-64 bg-background border-r border-border hidden md:flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-border">
          <span className="font-display text-lg font-semibold">
            Jisnu Dashboard
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-2 text-sm">
          <SidebarLink
            href="/dashboard/client"
            icon={<LayoutDashboard className="w-4 h-4" />}
            label="Overview"
          />
          <SidebarLink
            href="/dashboard/client/company"
            icon={<Building2 className="w-4 h-4" />}
            label="My Company"
          />
          <SidebarLink
            href="/dashboard/client/media"
            icon={<ImageIcon className="w-4 h-4" />}
            label="Media Library"
          />
          <SidebarLink
            href="/dashboard/client/requests"
            icon={<FileText className="w-4 h-4" />}
            label="Service Requests"
          />
          <SidebarLink
            href="/dashboard/client/profile"
            icon={<User className="w-4 h-4" />}
            label="Profile & Security"
          />
        </nav>

        {/* Logout */}


<div className="p-4 border-t border-border">
  <Link href="/logout" className="w-full">
    <button className="w-full flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold text-red-500 hover:bg-red-50 hover:text-red-600 transition group">
      <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
      Logout
    </button>
  </Link>
</div>
      </aside>

      {/* ===== MAIN AREA ===== */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6">
          <h1 className="font-display text-lg font-semibold">
            Client Dashboard
          </h1>

          {/* Avatar */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Company Owner</p>
              <p className="text-xs text-muted-foreground">
                owner@company.com
              </p>
            </div>
            <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
              C
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

function SidebarLink({
  href,
  icon,
  label,
}: {
  href: string
  icon: ReactNode
  label: string
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition"
    >
      {icon}
      {label}
    </Link>
  )
}
