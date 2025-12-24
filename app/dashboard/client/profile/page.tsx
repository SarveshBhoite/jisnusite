"use client"

import { useState } from "react"
import { User, Lock, Mail, Phone, Building } from "lucide-react"

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "Raj Bhoite",
    email: "raj@example.com",
    phone: "",
    company: "",
  })

  return (
    <div className="space-y-14">

      {/* ===== PAGE HEADER ===== */}
      <div>
        <h2 className="font-display text-2xl font-semibold mb-2">
          Profile & Security
        </h2>
        <p className="text-muted-foreground">
          Manage your personal details and account security.
        </p>
      </div>

      {/* ===== PROFILE INFO ===== */}
      <section className="p-8 rounded-xl border border-border bg-background">
        <div className="flex items-center gap-3 mb-8">
          <User className="w-6 h-6 text-primary" />
          <h3 className="font-display text-xl font-semibold">
            Profile Information
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Full Name */}
          <InputField
            icon={<User />}
            label="Full Name"
            value={profile.name}
            onChange={(v) => setProfile({ ...profile, name: v })}
          />

          {/* Email */}
          <InputField
            icon={<Mail />}
            label="Email Address"
            value={profile.email}
            disabled
          />

          {/* Phone */}
          <InputField
            icon={<Phone />}
            label="Phone Number"
            value={profile.phone}
            onChange={(v) => setProfile({ ...profile, phone: v })}
          />

          {/* Company */}
          <InputField
            icon={<Building />}
            label="Company Name"
            value={profile.company}
            onChange={(v) => setProfile({ ...profile, company: v })}
          />
        </div>

        <button className="mt-8 px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition">
          Save Profile Changes
        </button>
      </section>

      {/* ===== SECURITY ===== */}
      <section className="p-8 rounded-xl border border-border bg-background">
        <div className="flex items-center gap-3 mb-8">
          <Lock className="w-6 h-6 text-primary" />
          <h3 className="font-display text-xl font-semibold">
            Security
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <PasswordField label="Current Password" />
          <PasswordField label="New Password" />
          <PasswordField label="Confirm New Password" />
        </div>

        <p className="text-xs text-muted-foreground mt-4">
          Password must be at least 8 characters long and include letters and numbers.
        </p>

        <button className="mt-8 px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition">
          Update Password
        </button>
      </section>

    </div>
  )
}

/* ================= COMPONENTS ================= */

function InputField({
  label,
  value,
  onChange,
  icon,
  disabled = false,
}: {
  label: string
  value: string
  onChange?: (v: string) => void
  icon: React.ReactNode
  disabled?: boolean
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </span>
        <input
          value={value}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:border-primary disabled:opacity-60"
        />
      </div>
    </div>
  )
}

function PasswordField({ label }: { label: string }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
      </label>
      <input
        type="password"
        className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:border-primary"
      />
    </div>
  )
}
