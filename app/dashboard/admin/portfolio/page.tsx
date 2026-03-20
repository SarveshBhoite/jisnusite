"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Plus, Trash2, Image as ImageIcon, Loader2,ChevronLeft  } from "lucide-react"
import CloudinaryUploadButton from "@/components/CloudinaryUploadButton"

export default function AdminPortfolio() {
  const { status } = useSession()
  const router = useRouter()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    companyName: "",
    serviceName: "",
    category: "Web Development",
    description: "",
    image: ""
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (status !== "authenticated") {
      alert("Session expired. Please login again.");
      router.push("/login");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/admin/portfolio", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      alert("Project Added to Portfolio!");
      window.location.reload();
    } else if (res.status === 401) {
      alert("Unauthorized. Please login as admin.");
      router.push("/login");
    } else if (res.status === 403) {
      alert("You do not have permission to add portfolio.");
    } else {
      alert("Failed to add portfolio.");
    }
    setLoading(false);
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  return (
    <div className="pt-25 max-w-6xl mx-auto bg-white min-h-screen">
      <Link
            href="/dashboard/admin"
            className="text-slate-600 text-sm font-bold flex items-center gap-1 hover:text-blue-600 transition"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Home
          </Link>
      <h1 className="text-3xl font-black uppercase italic mb-8">Portfolio Manager</h1>

      {/* Add Project Form */}
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6 bg-slate-50 p-8 rounded-[2rem] mb-12 border border-slate-100">
        <div className="space-y-4">
          <input 
            type="text" placeholder="Company Name" required
            className="w-full p-4 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-primary outline-none"
            onChange={(e) => setFormData({...formData, companyName: e.target.value})}
          />
          <input 
            type="text" placeholder="Service (e.g. SEO & Web Design)" required
            className="w-full p-4 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-primary outline-none"
            onChange={(e) => setFormData({...formData, serviceName: e.target.value})}
          />
          <select 
            className="w-full p-4 rounded-2xl border-none ring-1 ring-slate-200 outline-none"
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          >
            <option>Web Development</option>
            <option>App Development</option>
            <option>Software Development</option>
            <option>Social Media Marketing</option>
            <option>SEO</option>
          </select>
        </div>
        
        <div className="space-y-4 text-center">
          <textarea 
            placeholder="Project Description" rows={3}
            className="w-full p-4 rounded-2xl border-none ring-1 ring-slate-200 outline-none"
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
          <div className="space-y-3">
            {formData.image ? (
              <div className="h-40 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <img src={formData.image} className="h-full w-full object-cover" />
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
          className="md:col-span-2 py-4 bg-slate-900 text-white rounded-full font-black uppercase tracking-widest hover:bg-primary transition-all flex justify-center items-center"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Publish to Portfolio"}
        </button>
      </form>
    </div>
  )
}
