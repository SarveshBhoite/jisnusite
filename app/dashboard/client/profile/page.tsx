"use client"

import { useState, useEffect } from "react"
import { User, Lock, Mail, Phone, Building, Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  })

  // 1. Fetch Profile Data from DB
  useEffect(() => {
const fetchProfile = async () => {
  try {

    if (status !== "authenticated" || !session?.user?.email) return;
    const res = await fetch(`/api/client/profile?email=${session.user.email}`);
    
    // Check if the response is actually JSON
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      console.error("Expected JSON but got HTML. This usually means a 404 or 500 error page.");
      console.log("Response starts with:", text.substring(0, 100));
      return;
    }

    const data = await res.json();
    setProfile(data);
  } catch (error) {
    console.error("Fetch failed:", error);
  }
};
    fetchProfile()
  }, [session, status])

  // 2. Handle Save Changes
  const handleSaveProfile = async () => {
    setSaving(true)
    try {
      const res = await fetch("/api/client/profile/", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      })
      if (res.ok) {
        alert("Profile updated successfully!")
      }
    } catch (error) {
      alert("Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>

  return (
    <div className="space-y-14">
      {/* PAGE HEADER */}
      <div>
        <h2 className="font-display text-2xl font-semibold mb-2">Profile & Security</h2>
        <p className="text-muted-foreground text-sm">Manage your personal details and account security.</p>
      </div>

      {/* PROFILE INFO */}
      <section className="p-8 rounded-xl border border-border bg-background shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <User className="w-6 h-6 text-primary" />
          <h3 className="font-display text-xl font-semibold">Profile Information</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <InputField
            icon={<User size={18} />}
            label="Full Name"
            value={profile.name}
            onChange={(v) => setProfile({ ...profile, name: v })}
          />
          <InputField
            icon={<Mail size={18} />}
            label="Email Address"
            value={profile.email}
            disabled // Email usually shouldn't be changeable for security
          />
          <InputField
            icon={<Phone size={18} />}
            label="Phone Number"
            value={profile.phone}
            onChange={(v) => setProfile({ ...profile, phone: v })}
          />
          <InputField
            icon={<Building size={18} />}
            label="Company Name"
            value={profile.company}
            onChange={(v) => setProfile({ ...profile, company: v })}
          />
        </div>

        <button 
          onClick={handleSaveProfile}
          disabled={saving}
          className="mt-8 px-6 py-3 rounded-md bg-primary text-white font-medium hover:bg-primary/90 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Profile Changes"}
        </button>
      </section>

      {/* SECURITY SECTION (Keep your existing UI) */}



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
