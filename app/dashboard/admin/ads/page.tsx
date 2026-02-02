"use client"
import { useState, useEffect } from "react";

export default function AdminAds() {
  const [ads, setAds] = useState([]);
  const [form, setForm] = useState<{ _id?: string; title: string; subtitle: string; colorCode: string }>({ _id: "", title: "", subtitle: "", colorCode: "#2563eb" });
  const [isEditing, setIsEditing] = useState(false);

  // 1. Load Ads on page load
  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    const res = await fetch("/api/admin/ads");
    const data = await res.json();
    setAds(data);
  };

  // 2. Create or Update Logic
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // 1. Create a copy of the data
  const dataToSend = { ...form };

  // 2. Remove _id if it's empty (New Ad)
  if (!isEditing || !dataToSend._id) {
    dataToSend._id = undefined;
  }

  const method = isEditing ? "PUT" : "POST";
  
  const res = await fetch("/api/admin/ads", {
    method: method,
    headers: { "Content-Type": "application/json" }, // Good practice to include
    body: JSON.stringify(dataToSend),
  });

  if (res.ok) {
    alert(isEditing ? "Ad updated!" : "Ad created!");
    resetForm();
    fetchAds();
  } else {
    const errorData = await res.json();
    alert("Error: " + errorData.error);
  }
};

  // 3. Delete Logic
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    const res = await fetch(`/api/admin/ads?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchAds();
    }
  };

  const handleEdit = (ad: any) => {
    setForm(ad);
    setIsEditing(true);
  };

  const resetForm = () => {
    setForm({ _id: "", title: "", subtitle: "", colorCode: "#2563eb" });
    setIsEditing(false);
  };

  return (
    <div className="pt-28 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Advertisements</h1>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded shadow-md mb-10">
        <h2 className="font-semibold">{isEditing ? "Edit Ad" : "Create New Ad"}</h2>
        <input 
          type="text" placeholder="Ad Title" value={form.title}
          className="w-full p-2 border rounded"
          onChange={(e) => setForm({...form, title: e.target.value})} 
          required
        />
        <input 
          type="text" placeholder="Subtitle" value={form.subtitle}
          className="w-full p-2 border rounded"
          onChange={(e) => setForm({...form, subtitle: e.target.value})} 
          required
        />
        <div className="flex items-center gap-4">
          <label>Background Color:</label>
          <input 
            type="color" value={form.colorCode}
            className="h-10 w-20 cursor-pointer"
            onChange={(e) => setForm({...form, colorCode: e.target.value})} 
          />
        </div>
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {isEditing ? "Update Ad" : "Save Ad"}
          </button>
          {isEditing && (
            <button type="button" onClick={resetForm} className="bg-gray-400 text-white px-4 py-2 rounded">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* List Section */}
      <div className="space-y-4">
        <h2 className="font-semibold text-xl">Existing Ads</h2>
        {ads.map((ad: any) => (
          <div key={ad._id} className="flex items-center justify-between p-4 border rounded shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: ad.colorCode }}></div>
              <div>
                <p className="font-bold">{ad.title}</p>
                <p className="text-sm text-gray-500">{ad.subtitle}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(ad)} className="text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50">
                Edit
              </button>
              <button onClick={() => handleDelete(ad._id)} className="text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-50">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}