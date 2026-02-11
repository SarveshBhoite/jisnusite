"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Edit3, Plus, X } from "lucide-react";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", excerpt: "", content: "", category: "", image: "", readTime: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  // 1. Fetch posts on load
  const fetchPosts = async () => {
    const res = await fetch("/api/admin/blog");
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 2. Handle Create & Update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const url = editingId ? `/api/admin/blog?id=${editingId}` : "/api/admin/blog";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert(editingId ? "Blog Updated!" : "Blog Published!");
      setForm({ title: "", excerpt: "", content: "", category: "", image: "", readTime: "" });
      setEditingId(null);
      setShowForm(false);
      fetchPosts();
    }
    setLoading(false);
  };

  // 3. Handle Delete
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      const res = await fetch(`/api/admin/blog?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchPosts();
    }
  };

  // 4. Set form for Editing
  const startEdit = (post: any) => {
    setForm(post);
    setEditingId(post._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-6xl mx-auto pt-32 p-6 mb-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-cyan-600">Blog Management</h1>
        <button 
          onClick={() => { setShowForm(!showForm); if(showForm) setEditingId(null); }}
          className="flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-cyan-700 transition"
        >
          {showForm ? <><X size={18}/> Cancel</> : <><Plus size={18}/> Add New Post</>}
        </button>
      </div>

      {/* --- FORM SECTION --- */}
      {showForm && (
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-12 animate-in fade-in slide-in-from-top-4">
          <h2 className="text-xl font-bold mb-6">{editingId ? "Edit Post" : "Create New Post"}</h2>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <input className="border p-3 rounded-lg bg-white" placeholder="Blog Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="border p-3 rounded-lg bg-white" placeholder="Category" value={form.category} onChange={e => setForm({...form, category: e.target.value})} required />
             
            </div>
            <input className="border p-3 rounded-lg bg-white" placeholder="Image URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})} required />
            <textarea className="border p-3 rounded-lg bg-white" placeholder="Short Excerpt" value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} required />
            <textarea className="border p-3 rounded-lg h-64 font-mono bg-white text-sm" placeholder="Content (HTML allowed)" value={form.content} onChange={e => setForm({...form, content: e.target.value})} required />
            <button type="submit" disabled={loading} className="bg-cyan-600 text-white py-4 rounded-xl font-bold hover:bg-cyan-700 transition shadow-lg shadow-cyan-200">
              {loading ? "Processing..." : editingId ? "Update Changes" : "Publish Post"}
            </button>
          </form>
        </div>
      )}

      {/* --- LIST SECTION --- */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-bold text-slate-700">Post Title</th>
              <th className="p-4 font-bold text-slate-700 hidden md:table-cell">Category</th>
              <th className="p-4 font-bold text-slate-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post: any) => (
              <tr key={post._id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                <td className="p-4 font-medium text-slate-900">{post.title}</td>
                <td className="p-4 text-slate-500 hidden md:table-cell">{post.category}</td>
                <td className="p-4">
                  <div className="flex justify-end gap-3">
                    <button onClick={() => startEdit(post)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Edit">
                      <Edit3 size={18} />
                    </button>
                    <button onClick={() => handleDelete(post._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={3} className="p-8 text-center text-slate-400">No blog posts found. Add your first one!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}