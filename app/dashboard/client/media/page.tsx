"use client"

import { ImageIcon, Video, Upload, CheckCircle, AlertCircle } from "lucide-react"

export default function MediaLibraryPage() {
  return (
    <div className="space-y-10">

      {/* ===== HEADER ===== */}
      <div>
        <h2 className="font-display text-2xl font-semibold mb-2">
          Media Library
        </h2>
        <p className="text-muted-foreground">
          Upload your company logo, images, and videos. These will be reviewed by the admin before publishing.
        </p>
      </div>

      {/* ===== LOGO SECTION ===== */}
      <Section
        title="Company Logo"
        description="This logo will appear on your company profile and listings."
        status="not_uploaded"
      >
        <UploadBox
          label="Upload Company Logo"
          helper="PNG, JPG or SVG • Max 2MB"
          type="logo"
        />
      </Section>

      {/* ===== IMAGES SECTION ===== */}
      <Section
        title="Company Images"
        description="Upload office photos, product images, or portfolio visuals."
        status="pending"
      >
        <UploadGrid type="image" />
      </Section>

      {/* ===== VIDEOS SECTION ===== */}
      <Section
        title="Company Videos"
        description="Upload promotional or explainer videos."
        status="empty"
      >
        <UploadGrid type="video" />
      </Section>

    </div>
  )
}

/* ========================= COMPONENTS ========================= */

function Section({
  title,
  description,
  status,
  children,
}: {
  title: string
  description: string
  status: "not_uploaded" | "pending" | "approved" | "empty"
  children: React.ReactNode
}) {
  return (
    <div className="p-6 rounded-xl bg-background border border-border">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold mb-1">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>

        <StatusBadge status={status} />
      </div>

      {children}
    </div>
  )
}

function StatusBadge({
  status,
}: {
  status: "not_uploaded" | "pending" | "approved" | "empty"
}) {
  const config = {
    not_uploaded: {
      label: "Not uploaded",
      icon: <AlertCircle className="w-4 h-4" />,
      className: "bg-muted text-muted-foreground",
    },
    pending: {
      label: "Pending review",
      icon: <AlertCircle className="w-4 h-4" />,
      className: "bg-yellow-500/10 text-yellow-600",
    },
    approved: {
      label: "Approved",
      icon: <CheckCircle className="w-4 h-4" />,
      className: "bg-green-500/10 text-green-600",
    },
    empty: {
      label: "No files",
      icon: <AlertCircle className="w-4 h-4" />,
      className: "bg-muted text-muted-foreground",
    },
  }

  const item = config[status]

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${item.className}`}>
      {item.icon}
      {item.label}
    </div>
  )
}

function UploadBox({
  label,
  helper,
}: {
  label: string
  helper: string
  type: "logo" | "image" | "video"
}) {
  return (
    <div className="border border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-primary/40 transition cursor-pointer">
      <Upload className="w-8 h-8 text-primary mb-3" />
      <p className="font-medium mb-1">{label}</p>
      <p className="text-xs text-muted-foreground">{helper}</p>
    </div>
  )
}

function UploadGrid({
  type,
}: {
  type: "image" | "video"
}) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

      {/* Upload Card */}
      <div className="border border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center hover:border-primary/40 transition cursor-pointer">
        {type === "image" ? (
          <ImageIcon className="w-8 h-8 text-primary mb-3" />
        ) : (
          <Video className="w-8 h-8 text-primary mb-3" />
        )}
        <p className="text-sm font-medium">
          Upload {type === "image" ? "Image" : "Video"}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Click or drag & drop
        </p>
      </div>

      {/* Placeholder previews */}
      {[1, 2].map((i) => (
        <div
          key={i}
          className="relative h-40 rounded-xl bg-muted flex items-center justify-center text-muted-foreground text-sm"
        >
          {type === "image" ? "Image Preview" : "Video Preview"}
        </div>
      ))}
    </div>
  )
}
