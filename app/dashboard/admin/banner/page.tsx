"use client";

import React, { useState, useEffect } from "react";
import { ImageIcon, Check, X, Loader2, Send, Trash2, Edit3, AlertCircle } from "lucide-react";

interface Banner {
  _id: string;
  category: string;
  bannerImage: string;
}

export default function AdminBannerPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [formData, setFormData] = useState({ category: "", bannerImage: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingBanners, setLoadingBanners] = useState(true);

  // 1. Fetch all existing banners on load
  const fetchBanners = async () => {
    try {
      const res = await fetch("/api/admin/banner");
      const data = await res.json();
      setBanners(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoadingBanners(false);
    }
  };

  useEffect(() => { fetchBanners(); }, []);

  // 2. Handle File Upload (Base64)
  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) return alert("File too large (Max 2MB)");

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, bannerImage: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  // 3. Create or Update Logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category || !formData.bannerImage) return alert("Fill all fields");

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/admin/banner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: formData.category.trim().toLowerCase(),
          bannerImage: formData.bannerImage,
        }),
      });

      if (response.ok) {
        setFormData({ category: "", bannerImage: "" });
        fetchBanners(); // Refresh list
        alert("Banner Saved Successfully!");
      }
    } catch (error) {
      alert("Error saving banner");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. Delete Logic
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this banner?")) return;

    try {
      const res = await fetch("/api/admin/banner", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setBanners(prev => prev.filter(b => b._id !== id));
      }
    } catch (error) {
      alert("Delete failed");
    }
  };

  // 5. Edit Helper
  const handleEdit = (banner: Banner) => {
    setFormData({ category: banner.category, bannerImage: banner.bannerImage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      
      {/* HEADER & FORM SECTION */}
      <section className="max-w-4xl mx-auto">
        <div className="mt-12 mb-3">
          <h1 className="text-3xl font-black text-slate-900 uppercase italic text-center">Add Banner </h1>
         
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 shadow-sm space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Category Name</label>
            <input 
              type="text" placeholder="e.g. Manufacturing"
              className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-cyan-500 font-bold"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Banner Image</label>
            <div className={`relative flex items-center gap-6 p-6 rounded-3xl border-2 border-dashed transition-all ${formData.bannerImage ? "border-cyan-500 bg-cyan-50/30" : "border-slate-200"}`}>
              <div className="h-20 w-36 rounded-2xl bg-white border flex items-center justify-center overflow-hidden shadow-sm">
                {formData.bannerImage ? <img src={formData.bannerImage} className="w-full h-full object-cover" /> : <ImageIcon className="w-8 h-8 text-slate-200" />}
              </div>
              <div className="flex-1">
                <input type="file" accept="image/*" onChange={handleBannerChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                <p className="text-sm font-black text-slate-800">{formData.bannerImage ? "Change Image" : "Upload Banner"}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Max 2MB • Wide Aspect Ratio</p>
              </div>
              {formData.bannerImage && (
                <button type="button" onClick={() => setFormData(prev => ({ ...prev, bannerImage: "" }))} className="z-20 p-2 bg-white rounded-full hover:text-red-500 shadow-sm"><X className="w-4 h-4" /></button>
              )}
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full py-5 rounded-3xl bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-cyan-600 transition-all flex items-center justify-center gap-3">
            {isSubmitting ? <Loader2 className="animate-spin w-4 h-4" /> : <Send className="w-4 h-4" />}
            {formData.category ? "Save / Update Banner" : "Publish New Banner"}
          </button>
        </form>
      </section>

      {/* MANAGE / LIST SECTION */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-4">
          <h2 className="text-xl font-black text-slate-900 uppercase italic">Live Banners ({banners.length})</h2>
        </div>

        {loadingBanners ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-slate-300 w-10 h-10" /></div>
        ) : banners.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {banners.map((banner) => (
              <div key={banner._id} className="group bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="h-40 bg-slate-100 relative">
                  <img src={banner.bannerImage} alt={banner.category} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-cyan-600 shadow-sm border border-cyan-100">
                    {banner.category}
                  </div>
                </div>
                <div className="p-4 flex justify-end gap-2 bg-slate-50/50">
                  <button onClick={() => handleEdit(banner)} className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-cyan-600 transition-colors shadow-sm">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(banner._id)} className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-rose-600 transition-colors shadow-sm">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] py-20 flex flex-col items-center text-slate-400">
            <AlertCircle className="w-10 h-10 mb-2 opacity-20" />
            <p className="font-bold text-sm">No active banners found</p>
          </div>
        )}
      </section>
    </div>
  );
}