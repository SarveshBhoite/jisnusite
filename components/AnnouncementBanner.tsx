"use client"

import { X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function AnnouncementBanner() {
  // later this comes from backend
  const banner = {
    active: true,
    text: "🎉 Flat 20% OFF on Website Development – Limited Time",
    link: "/services",
  }

  const [open, setOpen] = useState(banner.active)
  if (!open) return null

  return (
    <div className="w-full bg-gradient-to-r from-primary to-accent text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
        <Link href={banner.link} className="font-medium hover:underline">
          {banner.text}
        </Link>
        <button onClick={() => setOpen(false)}>
          <X className="w-4 h-4 opacity-80 hover:opacity-100" />
        </button>
      </div>
    </div>
  )
}
