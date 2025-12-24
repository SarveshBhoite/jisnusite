"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Upload } from "lucide-react"
import { useParams } from "next/navigation"

export default function EditCompanyPage() {
  const params = useParams()

  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [gallery, setGallery] = useState<string[]>([])

  return (
    <main className="pt-20 pb-28">

      {/* ===== HEADER ===== */}
      <section className="border-b border-border pb-8">
        <div className="max-w-5xl mx-auto px-6">
          <Link
            href="/dashboard/admin/manage-companies"
            className="inline-flex items-center gap-2 text-primary font-medium mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Companies
          </Link>

          <h1 className="font-display text-3xl font-semibold">
            Edit Company
          </h1>
          <p className="text-muted-foreground">
            Update company details, branding, and listing information
          </p>
        </div>
      </section>

      {/* ===== FORM ===== */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6 space-y-14">

          {/* ===== BASIC INFO ===== */}
          <div>
            <h2 className="font-display text-xl font-semibold mb-6">
              Basic Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <input placeholder="Company Name" className="input" />
              <input placeholder="Category" className="input" />
              <input placeholder="Location" className="input" />
              <input placeholder="Founded Year" className="input" />
              <input placeholder="Website" className="input md:col-span-2" />
            </div>
          </div>

          {/* ===== LOGO UPLOAD ===== */}
          <div>
            <h2 className="font-display text-xl font-semibold mb-4">
              Company Logo
            </h2>

            <div className="flex items-center gap-6">
              <div className="w-32 h-32 rounded-xl border border-dashed border-border flex items-center justify-center bg-muted">
                {logoPreview ? (
                  <img src={logoPreview} className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <span className="text-sm text-muted-foreground">No Logo</span>
                )}
              </div>

              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border cursor-pointer hover:border-primary transition">
                <Upload className="w-4 h-4" />
                Upload Logo
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) setLogoPreview(URL.createObjectURL(file))
                  }}
                />
              </label>
            </div>
          </div>

          {/* ===== ABOUT ===== */}
          <div>
            <h2 className="font-display text-xl font-semibold mb-6">
              About Company
            </h2>

            <div className="space-y-4">
              <textarea rows={3} placeholder="Short Description" className="textarea" />
              <textarea rows={5} placeholder="Overview" className="textarea" />
              <textarea rows={3} placeholder="Mission" className="textarea" />
              <textarea rows={3} placeholder="Vision" className="textarea" />
            </div>
          </div>

          {/* ===== SOCIAL LINKS ===== */}
          <div>
            <h2 className="font-display text-xl font-semibold mb-6">
              Social Links
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <input placeholder="LinkedIn URL" className="input" />
              <input placeholder="Instagram URL" className="input" />
              <input placeholder="Twitter / X URL" className="input" />
              <input placeholder="Website URL" className="input" />
            </div>
          </div>

          {/* ===== GALLERY ===== */}
          <div>
            <h2 className="font-display text-xl font-semibold mb-4">
              Media Gallery
            </h2>

            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border cursor-pointer hover:border-primary transition mb-4">
              <Upload className="w-4 h-4" />
              Upload Images
              <input
                type="file"
                multiple
                hidden
                onChange={(e) => {
                  const files = Array.from(e.target.files || [])
                  setGallery(files.map((f) => URL.createObjectURL(f)))
                }}
              />
            </label>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gallery.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="h-32 w-full object-cover rounded-xl border"
                />
              ))}
            </div>
          </div>

          {/* ===== ADMIN CONTROLS ===== */}
          <div className="p-6 rounded-xl border border-border bg-muted/40">
            <h2 className="font-display text-lg font-semibold mb-4">
              Admin Controls
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <select className="input">
                <option>Free Plan</option>
                <option>Paid Plan</option>
              </select>

              <select className="input">
                <option>Approved</option>
                <option>Suspended</option>
              </select>
            </div>
          </div>

          {/* ===== SAVE ===== */}
          <div className="flex justify-end">
            <button className="px-8 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition">
              Save Changes
            </button>
          </div>

        </div>
      </section>
    </main>
  )
}
