"use client"

import { useState } from "react"
import {
  Building2,
  MapPin,
  Globe,
  Upload,
  Facebook,
  Linkedin,
  Instagram,
  Twitter,
  CheckCircle,
  Clock,
} from "lucide-react"

export default function MyCompanyPage() {
  const [status] = useState<"pending" | "approved">("pending")

  return (
    <div className="space-y-16">

      {/* ===== PAGE HEADER ===== */}
      <div>
        <h2 className="font-display text-2xl font-semibold mb-2">
          My Company
        </h2>
        <p className="text-muted-foreground">
          Manage your company listing details shown on the platform.
        </p>
      </div>

      {/* ===== STATUS ===== */}
      <div className="flex items-center gap-3 p-4 rounded-lg border border-border bg-muted/40">
        {status === "approved" ? (
          <>
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="font-medium text-green-600">
              Approved & Live
            </span>
          </>
        ) : (
          <>
            <Clock className="w-5 h-5 text-orange-500" />
            <span className="font-medium text-orange-600">
              Pending Admin Approval
            </span>
          </>
        )}
      </div>

      {/* ===== BASIC INFO ===== */}
      <Section title="Basic Information" icon={<Building2 />}>
        <div className="grid md:grid-cols-2 gap-6">
          <Input label="Company Name" placeholder="TechStart Innovation" />
          <Input label="Category" placeholder="Technology / SaaS / Retail" />
          <Input label="Founded Year" placeholder="2019" />
          <Input label="Location" icon={<MapPin />} placeholder="San Francisco, CA" />
          <Input label="Website" icon={<Globe />} placeholder="https://example.com" />
          <Input label="Official Email" placeholder="contact@company.com" />
        </div>
      </Section>

      {/* ===== LOGO UPLOAD ===== */}
      <Section title="Branding">
        <div className="flex items-center gap-6">
          {/* Logo Preview */}
          <div className="w-28 h-28 rounded-lg border border-dashed border-border flex items-center justify-center bg-muted/40">
            <span className="text-xs text-muted-foreground">
              Logo Preview
            </span>
          </div>

          {/* Upload */}
          <div>
            <label className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-primary text-primary-foreground font-medium cursor-pointer hover:bg-primary/90 transition">
              <Upload className="w-4 h-4" />
              Upload Logo
              <input type="file" className="hidden" />
            </label>
            <p className="text-xs text-muted-foreground mt-2">
              PNG, JPG • Max 2MB
            </p>
          </div>
        </div>
      </Section>

      {/* ===== ABOUT ===== */}
      <Section title="About Company">
        <div className="space-y-6">
          <Textarea label="Company Overview" placeholder="Brief description about your company..." />
          <Textarea label="Vision" placeholder="Your long-term vision..." />
          <Textarea label="Mission" placeholder="Your mission statement..." />
        </div>
      </Section>

      {/* ===== SOCIAL LINKS ===== */}
      <Section title="Social Presence">
        <div className="grid md:grid-cols-2 gap-6">
          <Input icon={<Linkedin />} label="LinkedIn" placeholder="https://linkedin.com/company/..." />
          <Input icon={<Instagram />} label="Instagram" placeholder="https://instagram.com/..." />
          <Input icon={<Twitter />} label="Twitter / X" placeholder="https://x.com/..." />
          <Input icon={<Facebook />} label="Facebook" placeholder="https://facebook.com/..." />
        </div>
      </Section>

      {/* ===== SUBMIT ===== */}
      <div className="pt-10 border-t border-border">
        <button className="px-8 py-4 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition">
          Submit for Approval
        </button>

        <p className="text-xs text-muted-foreground mt-3">
          Changes will be reviewed by admin before going live.
        </p>
      </div>

    </div>
  )
}

/* ===================== COMPONENTS ===================== */

function Section({
  title,
  icon,
  children,
}: {
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className="p-8 rounded-xl border border-border bg-background">
      <div className="flex items-center gap-3 mb-8">
        {icon && <span className="text-primary">{icon}</span>}
        <h3 className="font-display text-xl font-semibold">{title}</h3>
      </div>
      {children}
    </section>
  )
}

function Input({
  label,
  placeholder,
  icon,
}: {
  label: string
  placeholder?: string
  icon?: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </span>
        )}
        <input
          placeholder={placeholder}
          className={`w-full ${
            icon ? "pl-10" : "pl-4"
          } pr-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:border-primary`}
        />
      </div>
    </div>
  )
}

function Textarea({
  label,
  placeholder,
}: {
  label: string
  placeholder?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
      </label>
      <textarea
        rows={4}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-md border border-border bg-background resize-none focus:outline-none focus:border-primary"
      />
    </div>
  )
}
