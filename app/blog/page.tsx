import Link from "next/link";
import { Calendar, User } from "lucide-react";
import Blog from "@/models/Blog";
import dbConnect from "@/lib/mongodb";

export default async function BlogPage() {
  await dbConnect();
  const posts = await Blog.find({}).sort({ createdAt: -1 }).lean();

  if (posts.length === 0) return <div className="pt-40 text-center">No blogs found.</div>;

  const featured = JSON.parse(JSON.stringify(posts[0]));
  const rest = JSON.parse(JSON.stringify(posts.slice(1)));

  return (
    <main className="pt-28">
      <section className="pb-10 max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Insights & Articles</h1>
        <p className="text-slate-500">Thoughts on digital growth from our team.</p>
      </section>

      {/* Featured Post */}
      <section className="pb-16 max-w-7xl mx-auto px-4">
        <Link href={`/blog/${featured._id}`}>
          <div className="relative h-[450px] rounded-3xl overflow-hidden group">
            <img src={featured.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
            <div className="absolute inset-0 bg-black/50 p-10 flex flex-col justify-end">
              <span className="bg-cyan-600 text-white px-3 py-1 rounded-full text-xs w-fit mb-4">{featured.category}</span>
              <h2 className="text-3xl text-white font-bold mb-2">{featured.title}</h2>
              <p className="text-white/80 max-w-xl">{featured.excerpt}</p>
            </div>
          </div>
        </Link>
      </section>

      {/* Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {rest.map((post: any) => (
            <Link key={post._id} href={`/blog/${post._id}`}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition">
                <img src={post.image} className="h-48 w-full object-cover" />
                <div className="p-6">
                  <span className="text-cyan-600 text-xs font-bold">{post.category}</span>
                  <h3 className="text-lg font-bold mt-2 h-14 line-clamp-2">{post.title}</h3>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t text-slate-500 text-xs">
                    <span className="flex items-center gap-1"><User size={14}/> {post.author}</span>
                    <span className="flex items-center gap-1"><Calendar size={14}/> {post.date}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}