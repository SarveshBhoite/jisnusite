// app/admin/ads/page.tsx
"use client"
import { useState } from "react";

export default function AdminAds() {
  const [form, setForm] = useState({ title: "", subtitle: "", colorCode: "#2563eb" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/ads", {
      method: "POST",
      body: JSON.stringify(form),
    });
    if (res.ok) alert("Ad added successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className=" space-y-4 max-w-md p-25">
      <input 
        type="text" placeholder="Ad Title" 
        className="w-full p-2 border"
        onChange={(e) => setForm({...form, title: e.target.value})} 
      />
      <input 
        type="text" placeholder="Subtitle" 
        className="w-full p-2 border"
        onChange={(e) => setForm({...form, subtitle: e.target.value})} 
      />
      <input 
        type="color" 
        className="w-full h-10"
        onChange={(e) => setForm({...form, colorCode: e.target.value})} 
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Save Advertisement</button>
    </form>
  );
}