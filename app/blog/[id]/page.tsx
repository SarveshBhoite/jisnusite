import dbConnect from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PostDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  await dbConnect();

  let post: any;
  try {
    post = await Blog.findById(id).lean();
  } catch {
    return notFound();
  }

  if (!post) return notFound();

  const imagePath =
    post.image.startsWith("http") || post.image.startsWith("/")
      ? post.image
      : `/${post.image}`;

  return (
    <main className="pt-24 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Navigation */}
        <Link
          href="/blog"
          className="text-cyan-600 flex items-center gap-2 mb-8 hover:-translate-x-1 transition group"
        >
          <ArrowLeft size={18} className="group-hover:mr-1 transition-all" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-10">
          <span className="bg-cyan-100 text-cyan-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {post.category}
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold mt-6 mb-8 text-slate-900 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-slate-500 text-sm border-y py-6 border-slate-100">
            <span className="flex items-center gap-2">
              <User size={18} className="text-cyan-600" /> {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={18} className="text-cyan-600" /> {post.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={18} className="text-cyan-600" /> {post.readTime}
            </span>
          </div>
        </header>

        {/* Image */}
        <div className="rounded-3xl overflow-hidden mb-12 shadow-2xl bg-slate-100">
          <img
            src={imagePath}
            alt={post.title}
            className="w-full h-auto object-cover max-h-[500px]"
          />
        </div>

        {/* BLOG CONTENT (PLAIN HTML — INTERNAL LINKS WORK) */}
        <article
          suppressHydrationWarning
          className="prose prose-lg prose-cyan max-w-none
            prose-headings:text-slate-900
            prose-p:text-slate-600
            prose-img:rounded-2xl
            prose-strong:text-slate-900"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-16 pt-10 border-t border-slate-100">
          <p className="text-slate-400 text-center italic">
            Thank you for reading!
          </p>
        </div>
      </div>
    </main>
  );
}
