"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Plus, Trash2, Image as ImageIcon, Loader2, ChevronLeft, Edit2, X } from "lucide-react"
import CloudinaryUploadButton from "@/components/CloudinaryUploadButton"

interface Portfolio {
  _id: string
  companyName: string
  serviceName: string
  category: string
  description: string
  image: string
  createdAt: string
}

const CATEGORIES = [
  "Web Development",
  "App Development",
  "Software Development",
  "Social Media Marketing",
  "SEO"
]

export default function AdminPortfolio() {
  const { status } = useSession()
  const router = useRouter()
  const [projects, setProjects] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    companyName: "",
    serviceName: "",
    category: "Web Development",
    description: "",
    image: ""
  })

  // Fetch all portfolios
  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/admin/portfolio")
      if (res.ok) {
        const data = await res.json()
        setProjects(data)
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error)
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      fetchProjects()
    }
  }, [status])

  // Reset form
  const resetForm = () => {
    setFormData({
      companyName: "",
      serviceName: "",
      category: "Web Development",
      description: "",
      image: ""
    })
    setEditingId(null)
  }

  // Handle add/update submit
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (status !== "authenticated") {
      alert("Session expired. Please login again.")
      router.push("/login")
      return
    }

    setLoading(true)
    
    try {
      const url = editingId 
        ? "/api/admin/portfolio" 
        : "/api/admin/portfolio"
      
      const method = editingId ? "PUT" : "POST"
      const payload = editingId 
        ? { id: editingId, ...formData }
        : formData

      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        alert(editingId ? "Project Updated!" : "Project Added to Portfolio!")
        resetForm()
        await fetchProjects()
      } else if (res.status === 401) {
        alert("Unauthorized. Please login as admin.")
        router.push("/login")
      } else if (res.status === 403) {
        alert("You do not have permission to perform this action.")
      } else {
        alert("Failed to save portfolio.")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("An error occurred while saving portfolio.")
    } finally {
      setLoading(false)
    }
  }

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this portfolio?")) return

    setDeleting(id)
    try {
      const res = await fetch(`/api/admin/portfolio?id=${id}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (res.ok) {
        alert("Portfolio deleted successfully!")
        await fetchProjects()
      } else if (res.status === 403) {
        alert("You do not have permission to delete portfolio.")
      } else {
        alert("Failed to delete portfolio.")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("An error occurred while deleting portfolio.")
    } finally {
      setDeleting(null)
    }
  }

  // Handle edit click
  const handleEdit = (project: Portfolio) => {
    setFormData({
      companyName: project.companyName,
      serviceName: project.serviceName,
      category: project.category,
      description: project.description,
      image: project.image
    })
    setEditingId(project._id)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  return (
    <div className="pt-25 max-w-6xl mx-auto bg-white min-h-screen p-4">
      <Link
        href="/dashboard/admin"
        className="text-slate-600 text-sm font-bold flex items-center gap-1 hover:text-blue-600 transition"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Home
      </Link>
      
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black uppercase italic">Portfolio Manager</h1>
        {editingId && (
          <button
            onClick={resetForm}
            className="flex items-center gap-2 px-4 py-2 bg-slate-300 text-slate-900 rounded-full font-semibold hover:bg-slate-400 transition"
          >
            <X className="w-4 h-4" /> Cancel Edit
          </button>
        )}
      </div>

      {/* Add/Edit Project Form */}
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6 bg-slate-50 p-8 rounded-[2rem] mb-12 border border-slate-100">
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Company Name" 
            required
            value={formData.companyName}
            className="w-full p-4 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-primary outline-none"
            onChange={(e) => setFormData({...formData, companyName: e.target.value})}
          />
          <input 
            type="text" 
            placeholder="Service (e.g. SEO & Web Design)" 
            required
            value={formData.serviceName}
            className="w-full p-4 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-primary outline-none"
            onChange={(e) => setFormData({...formData, serviceName: e.target.value})}
          />
          <select 
            value={formData.category}
            className="w-full p-4 rounded-2xl border-none ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-primary"
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div className="space-y-4 text-center">
          <textarea 
            placeholder="Project Description" 
            rows={3}
            value={formData.description}
            className="w-full p-4 rounded-2xl border-none ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-primary"
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
          <div className="space-y-3">
            {formData.image ? (
              <div className="h-40 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <img src={formData.image} alt="Project" className="h-full w-full object-cover" />
              </div>
            ) : (
              <div className="flex h-32 w-full items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50">
                <ImageIcon className="text-slate-400" />
              </div>
            )}

            <CloudinaryUploadButton
              label="Upload Project Image"
              onUploaded={(secureUrl) =>
                setFormData((prev) => ({ ...prev, image: secureUrl }))
              }
            />
          </div>
        </div>

        <button 
          disabled={loading}
          className="md:col-span-2 py-4 bg-slate-900 text-white rounded-full font-black uppercase tracking-widest hover:bg-primary transition-all flex justify-center items-center disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : editingId ? "Update Portfolio" : "Publish to Portfolio"}
        </button>
      </form>

      {/* Portfolio List */}
      <div>
        <h2 className="text-2xl font-black uppercase italic mb-6">All Portfolios ({projects.length})</h2>
        
        {fetching ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin w-8 h-8" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-[2rem] border border-slate-100">
            <p className="text-slate-500 text-lg">No portfolios found. Add your first portfolio above!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project._id} className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden hover:shadow-lg transition">
                {project.image ? (
                  <div className="h-48 w-full overflow-hidden bg-slate-100">
                    <img src={project.image} alt={project.companyName} className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <div className="h-48 w-full flex items-center justify-center bg-slate-100">
                    <ImageIcon className="w-12 h-12 text-slate-300" />
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="font-black text-lg mb-1">{project.companyName}</h3>
                  <p className="text-sm text-slate-600 mb-2">{project.serviceName}</p>
                  <div className="mb-3">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-2 rounded-xl font-semibold hover:bg-blue-600 transition"
                    >
                      <Edit2 className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      disabled={deleting === project._id}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-xl font-semibold hover:bg-red-600 transition disabled:opacity-50"
                    >
                      {deleting === project._id ? <Loader2 className="animate-spin w-4 h-4" /> : <Trash2 className="w-4 h-4" />}
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
