"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Upload, ArrowLeft, Plus, X, MessageSquare, Loader2, Check, Sparkles } from "lucide-react"

export default function ListYourCompanyPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [includedItems, setIncludedItems] = useState<string[]>([])
  const [currentItem, setCurrentItem] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "", // Linked to Short Description
    location: "",
    whatsapp: "",
    email: "",
    password: "",
    logo: "", // Will store the Base64 image string
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // --- LOGO UPLOAD LOGIC ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, logo: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          services: includedItems.map(item => ({ title: item })),
          status: "pending" 
        }),
      })

      if (response.ok) {
        alert("Success! Your business is pending admin approval.")
        router.push("/companies")
      } else {
        alert("Failed to submit. Please check all fields.")
      }
    } catch (error) {
      console.error("Submission error:", error)
      alert("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  const addIncludedItem = () => {
    if (currentItem.trim() && !includedItems.includes(currentItem)) {
      setIncludedItems([...includedItems, currentItem.trim()])
      setCurrentItem("")
    }
  }

  const removeItem = (itemToRemove: string) => {
    setIncludedItems(includedItems.filter((item) => item !== itemToRemove))
  }

  return (
    <main className="pt-24 bg-muted/10 min-h-screen">
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/companies" className="inline-flex items-center gap-2 text-sm text-primary font-medium mb-6 hover:-translate-x-1 transition-transform">
            <ArrowLeft className="w-4 h-4" /> Back to Directory
          </Link>
          <h1 className="font-display text-4xl font-bold mb-4 tracking-tight text-foreground">
            Register Your <span className="text-primary">Business</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Join the Jisnu Digital ecosystem. Provide your details below for verification.
          </p>
        </div>
      </section>

      <section className="pb-28">
        <div className="max-w-4xl mx-auto px-4">
          <div className="rounded-3xl border border-border bg-background shadow-xl shadow-primary/5 p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b border-border pb-2">
                  <div className="w-2 h-8 bg-primary rounded-full" />
                  <h2 className="text-2xl font-bold">Company Identity</h2>
                </div>

                <div className="grid gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground/80">Company Name</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      type="text"
                      required
                      placeholder="e.g. Acme Solutions"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-muted/20 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground/80">Business Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border bg-muted/20 outline-none transition-all"
                    >
                      <option value="">Select a category</option>
                      <option>Technology</option>
                      <option>E-commerce</option>
                      <option>Health & Wellness</option>
                      <option>Manufacturing</option>
                      <option>Professional Services</option>
                      <option>Education</option>
                      <option>Hotels</option>
                      <option>Hotels</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground/80">Short Description</label>
                    <input
                      name="description" // 👈 CRITICAL: This connects to your database field
                      value={formData.description}
                      onChange={handleInputChange}
                      type="text"
                      required
                      placeholder="Brief overview of your business..."
                      className="w-full px-4 py-3 rounded-xl border border-border bg-muted/20 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-4 pt-6 border-t border-slate-50">
                  <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-amber-500" /> Included Items / Amenities
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {includedItems && includedItems.length > 0 ? (
                      includedItems.map((item: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-3 bg-slate-50/50 p-3 rounded-2xl border border-slate-100">
                          <Check className="w-4 h-4 text-green-500 shrink-0" />
                          <span className="text-sm font-bold text-slate-700">{item}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 italic">No inclusions added yet.</p>
                    )}
                  </div>
                </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground/80">Company Logo</label>
                  <div className="relative flex items-center gap-6 p-6 rounded-2xl border-2 border-dashed border-border bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer group">
                    <div className="h-16 w-16 rounded-xl bg-background border border-border flex items-center justify-center text-primary overflow-hidden">
                      {formData.logo ? (
                        <img src={formData.logo} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <Upload className="w-6 h-6" />
                      )}
                    </div>
                    <div className="flex-1">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} // 👈 Triggers the Base64 conversion
                        className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90" 
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        {formData.logo ? <span className="text-green-600 flex items-center gap-1"><Check className="w-3 h-3" /> Image Selected</span> : "PNG, JPG up to 5MB"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ... REST OF YOUR FORM (CONTACT, INCLUSIONS, CREDENTIALS) REMAINS THE SAME ... */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b border-border pb-2">
                  <div className="w-2 h-8 bg-accent rounded-full" />
                  <h2 className="text-2xl font-bold">Contact & Location</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Primary Location</label>
                    <input name="location" value={formData.location} onChange={handleInputChange} type="text" required placeholder="City, State" className="w-full px-4 py-3 rounded-xl border border-border bg-muted/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold flex items-center gap-2"><MessageSquare className="w-4 h-4 text-[#25D366]" /> WhatsApp Number</label>
                    <input name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} type="tel" required placeholder="+91..." className="w-full px-4 py-3 rounded-xl border border-border bg-muted/20" />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b border-border pb-2">
                  <div className="w-2 h-8 bg-yellow-500 rounded-full" />
                  <h2 className="text-2xl font-bold">Business Inclusion</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input type="text" value={currentItem} onChange={(e) => setCurrentItem(e.target.value)} placeholder="e.g. Free Delivery" className="flex-1 px-4 py-3 rounded-xl border border-border bg-muted/20 outline-none" />
                    <button type="button" onClick={addIncludedItem} className="px-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"><Plus className="w-5 h-5" /></button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {includedItems.map((item) => (
                      <span key={item} className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary text-sm font-bold rounded-lg border border-primary/20">
                        {item} <button type="button" onClick={() => removeItem(item)}><X className="w-3 h-3 hover:text-destructive" /></button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-muted/30 border border-border">
                <h3 className="font-bold mb-4">Dashboard Credentials</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <input name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="Login Email" required className="bg-background px-4 py-3 rounded-xl border border-border" />
                  <input name="password" value={formData.password} onChange={handleInputChange} type="password" placeholder="Create Password" required className="bg-background px-4 py-3 rounded-xl border border-border" />
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6">
                <p className="text-xs text-muted-foreground max-w-sm">By submitting, you agree to our Terms of Service.</p>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto px-12 py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Apply for Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}