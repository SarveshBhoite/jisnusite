"use client"
import { useState, useEffect } from "react"
import { Plus, Trash2, Image as ImageIcon, Loader2 } from "lucide-react"

export default function AdminPortfolio() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    companyName: "",
    serviceName: "",
    category: "Web Development",
    description: "",
    image: ""
  })

  // Handle Image Upload (Base64)
  const handleImage = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setFormData({ ...formData, image: reader.result as string });
    reader.readAsDataURL(file);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/admin/portfolio", {
      method: "POST",
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      alert("Project Added to Portfolio!");
      window.location.reload();
    }
    setLoading(false);
  }

  return (
    <div className="p-8 max-w-6xl mx-auto bg-white min-h-screen">
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
            <option>UI/UX Design</option>
            <option>Branding</option>
            <option>SEO</option>
          </select>
        </div>
        
        <div className="space-y-4 text-center">
          <textarea 
            placeholder="Project Description" rows={3}
            className="w-full p-4 rounded-2xl border-none ring-1 ring-slate-200 outline-none"
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer hover:bg-slate-100">
            {formData.image ? <img src={formData.image} className="h-full object-contain" /> : <ImageIcon className="text-slate-400" />}
            <input type="file" className="hidden" onChange={handleImage} />
          </label>
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