"use client"

import { useState } from "react"
import {
  Search,
  Upload,
  Trash2,
  ImageIcon,
  Video,
  CheckCircle,
  XCircle,
} from "lucide-react"

const companies = [
  { id: "1", name: "TechStart Innovation", plan: "Paid" },
  { id: "2", name: "Fashion Hub", plan: "Free" },
  { id: "3", name: "Health & Wellness Co", plan: "Paid" },
  { id: "4", name: "Sustainable Future", plan: "Free" },
]

export default function AdminMediaPage() {
  const [selectedCompany, setSelectedCompany] = useState<any>(null)
  const [search, setSearch] = useState("")
  const [planFilter, setPlanFilter] = useState("All")

  /** confirmed media (already live) */
  const [images, setImages] = useState<string[]>([])
  const [videos, setVideos] = useState<string[]>([])

  /** pending uploads (not live yet) */
  const [pendingImages, setPendingImages] = useState<string[]>([])
  const [pendingVideos, setPendingVideos] = useState<string[]>([])

  const filteredCompanies = companies.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase())
    const matchesPlan = planFilter === "All" || c.plan === planFilter
    return matchesSearch && matchesPlan
  })

  const confirmUpload = () => {
    setImages((prev) => [...prev, ...pendingImages])
    setVideos((prev) => [...prev, ...pendingVideos])
    setPendingImages([])
    setPendingVideos([])
  }

  const cancelUpload = () => {
    setPendingImages([])
    setPendingVideos([])
  }

  return (
    <main className="pt-20 pb-28">

      {/* ===== HEADER ===== */}
      <section className="border-b border-border pb-6">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="font-display text-3xl font-semibold">
            Media Library
          </h1>
          <p className="text-muted-foreground">
            Upload and manage images & videos for companies
          </p>
        </div>
      </section>

      {/* ===== FILTERS ===== */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3.5 text-muted-foreground" />
            <input
              placeholder="Search company..."
              className="input pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="input w-40"
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
          >
            <option>All</option>
            <option>Free</option>
            <option>Paid</option>
          </select>
        </div>
      </section>

      {/* ===== MAIN ===== */}
      <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-10">

        {/* ===== COMPANY LIST ===== */}
        <div className="border border-border rounded-xl overflow-hidden">
          <div className="bg-muted px-4 py-3 font-medium">
            Companies
          </div>

          {filteredCompanies.map((company) => (
            <button
              key={company.id}
              onClick={() => {
                setSelectedCompany(company)
                setImages([])
                setVideos([])
                setPendingImages([])
                setPendingVideos([])
              }}
              className={`w-full text-left px-4 py-4 border-b border-border hover:bg-muted transition ${
                selectedCompany?.id === company.id ? "bg-muted" : ""
              }`}
            >
              <div className="flex justify-between">
                <span className="font-medium">{company.name}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    company.plan === "Paid"
                      ? "bg-primary text-primary-foreground"
                      : "bg-border"
                  }`}
                >
                  {company.plan}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* ===== MEDIA PANEL ===== */}
        <div className="lg:col-span-2">

          {!selectedCompany ? (
            <div className="border border-dashed border-border rounded-xl h-full flex items-center justify-center text-muted-foreground">
              Select a company to manage media
            </div>
          ) : (
            <div className="space-y-10">

              {/* ===== TITLE ===== */}
              <div>
                <h2 className="font-display text-2xl font-semibold">
                  {selectedCompany.name}
                </h2>
                <p className="text-muted-foreground">
                  Media visible on company page
                </p>
              </div>

              {/* ===== PENDING CONFIRMATION ===== */}
              {(pendingImages.length > 0 || pendingVideos.length > 0) && (
                <div className="p-6 rounded-xl border border-primary bg-primary/5">
                  <h3 className="font-medium mb-3">
                    Pending Upload Confirmation
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4">
                    These files will be uploaded for{" "}
                    <strong>{selectedCompany.name}</strong>
                  </p>

                  <div className="flex gap-4">
                    <button
                      onClick={confirmUpload}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Confirm Upload
                    </button>

                    <button
                      onClick={cancelUpload}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border hover:bg-muted"
                    >
                      <XCircle className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* ===== IMAGES ===== */}
              <div>
                <div className="flex justify-between mb-4">
                  <h3 className="font-display text-xl flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" /> Images
                  </h3>

                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border hover:border-primary">
                    <Upload className="w-4 h-4" />
                    Select Images
                    <input
                      type="file"
                      multiple
                      hidden
                      onChange={(e) => {
                        const files = Array.from(e.target.files || [])
                        setPendingImages(
                          files.map((f) => URL.createObjectURL(f))
                        )
                      }}
                    />
                  </label>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((img, i) => (
                    <div key={i} className="relative group">
                      <img src={img} className="h-32 w-full object-cover rounded-lg border" />
                      <button
                        onClick={() =>
                          setImages(images.filter((_, idx) => idx !== i))
                        }
                        className="absolute top-2 right-2 p-1 bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* ===== VIDEOS ===== */}
              <div>
                <div className="flex justify-between mb-4">
                  <h3 className="font-display text-xl flex items-center gap-2">
                    <Video className="w-5 h-5" /> Videos
                  </h3>

                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border hover:border-primary">
                    <Upload className="w-4 h-4" />
                    Select Videos
                    <input
                      type="file"
                      multiple
                      hidden
                      onChange={(e) => {
                        const files = Array.from(e.target.files || [])
                        setPendingVideos(
                          files.map((f) => URL.createObjectURL(f))
                        )
                      }}
                    />
                  </label>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {videos.map((vid, i) => (
                    <div key={i} className="relative group">
                      <video src={vid} controls className="rounded-lg border" />
                      <button
                        onClick={() =>
                          setVideos(videos.filter((_, idx) => idx !== i))
                        }
                        className="absolute top-2 right-2 p-1 bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      </section>
    </main>
  )
}
