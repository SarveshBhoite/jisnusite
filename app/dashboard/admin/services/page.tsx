"use client"

import { useState, useEffect } from "react"
import { 
  Plus, Search, Trash2, Edit3, Save, X, 
  CheckCircle2, DollarSign, Tag, Loader2 
} from "lucide-react"

export default function AdminServicesPage() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null) // TRACKING EDIT MODE
  
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    basePrice: 0,
    discountPrice: 0,
    inclusions: [] as string[],
    status: "active"
  })
  const [newInclusion, setNewInclusion] = useState("")

  // Fetch Services
  const fetchServices = async () => {
    try {
      const res = await fetch("/api/admin/services")
      const data = await res.json()
      setServices(data)
    } catch (err) {
      console.error("Fetch error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchServices() }, [])

  // OPEN MODAL FOR NEW SERVICE
  const openAddModal = () => {
    setEditId(null) // Reset edit mode
    setFormData({ title: "", category: "", description: "", basePrice: 0, discountPrice: 0, inclusions: [], status: "active" })
    setIsModalOpen(true)
  }

  // OPEN MODAL FOR EDITING
  const openEditModal = (service: any) => {
    setEditId(service._id) // Set the ID of service being edited
    setFormData({
      title: service.title,
      category: service.category,
      description: service.description,
      basePrice: service.basePrice,
      discountPrice: service.discountPrice,
      inclusions: service.inclusions || [],
      status: service.status || "active"
    })
    setIsModalOpen(true)
  }

  const addInclusion = () => {
    if (newInclusion.trim()) {
      setFormData({ ...formData, inclusions: [...formData.inclusions, newInclusion.trim()] })
      setNewInclusion("")
    }
  }

  const removeInclusion = (index: number) => {
    const updated = formData.inclusions.filter((_, i) => i !== index)
    setFormData({ ...formData, inclusions: updated })
  }

  // UPDATED HANDLE SUBMIT (Detects POST or PATCH)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // logic to decide URL and Method
    const url = editId ? `/api/admin/services?id=${editId}` : "/api/admin/services"
    const method = editId ? "PATCH" : "POST"

    try {
      const res = await fetch(url, {
        method: method,
        body: JSON.stringify(formData),
      })
      
      if (res.ok) {
        setIsModalOpen(false)
        fetchServices() // Refresh list
      } else {
        alert("Failed to save service")
      }
    } catch (err) {
      console.error("Save failed")
    }
  }

  const deleteService = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/admin/services?id=${id}`, { method: "DELETE" });
    fetchServices();
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin" /></div>

  return (
    <main className="pt-24 px-6 md:px-10 pb-20 bg-slate-50 min-h-screen">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Platform Services</h1>
          <p className="text-slate-500 font-medium">Manage your service catalog and pricing</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold   transition-all"
        >
          <Plus className="w-5 h-5" /> Add New Service
        </button>
      </div>

      {/* SERVICE CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service: any) => (
          <div key={service._id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-blue-50 text-blue-600 text-[10px] px-2.5 py-1 rounded-lg font-black uppercase tracking-wider">
                  {service.category}
                </span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => openEditModal(service)} 
                    className="p-2 text-slate-400 hover:text-blue-600 bg-slate-50 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => deleteService(service._id)} 
                    className="p-2 text-slate-400 hover:text-red-600 bg-slate-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
              <p className="text-sm text-slate-500 line-clamp-2 mb-4">{service.description}</p>
              
              {/* PRICING DISPLAY */}
              <div className="flex items-center gap-3 mb-6 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Selling Price</p>
                   <p className="text-xl font-black text-slate-900">₹{service.discountPrice}</p>
                </div>
                <div className="border-l pl-3">
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">MRP</p>
                   <p className="text-sm font-bold text-slate-400 line-through">₹{service.basePrice}</p>
                </div>
              </div>

              {/* INCLUSIONS LIST */}
              <div className="space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">What's Included:</p>
                {service.inclusions?.slice(0, 3).map((item: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> {item}
                  </div>
                ))}
                {service.inclusions?.length > 3 && (
                  <p className="text-[10px] text-blue-600 font-bold">+ {service.inclusions.length - 3} more items</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== ADD/EDIT MODAL ===== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden">
            <div className="px-8 py-6 border-b flex justify-between items-center bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900">
                {editId ? "Update Service" : "Configure Service"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full"><X /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-slate-400 uppercase mb-2">Service Title</label>
                  <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-medium" />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase mb-2">Category</label>
                  <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none">
                    <option value="">Select Category</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="App Development">App Development</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase mb-2">Base Price</label>
                    <input type="number" required value={formData.basePrice} onChange={e => setFormData({...formData, basePrice: Number(e.target.value)})} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase mb-2">Discount Price</label>
                    <input type="number" required value={formData.discountPrice} onChange={e => setFormData({...formData, discountPrice: Number(e.target.value)})} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none text-green-600 font-bold" />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-slate-400 uppercase mb-2">Included Features</label>
                  <div className="flex gap-2 mb-3">
                    <input value={newInclusion} onChange={e => setNewInclusion(e.target.value)} className="flex-1 px-4 py-3 rounded-xl border border-slate-200 outline-none" placeholder="e.g. 1 Year Hosting Free" />
                    <button type="button" onClick={addInclusion} className="bg-slate-900 text-white px-4 rounded-xl font-bold">Add</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.inclusions.map((item, i) => (
                      <span key={i} className="flex items-center gap-2 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold">
                        {item} <X className="w-3 h-3 cursor-pointer text-red-500" onClick={() => removeInclusion(i)} />
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-slate-400 uppercase mb-2">Description</label>
                  <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none min-h-[100px]" />
                </div>
              </div>

              <button type="submit" className="w-full mt-8 bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all">
                {editId ? "Update Service Now" : "Publish Service"}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}