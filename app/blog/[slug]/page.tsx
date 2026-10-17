import dbConnect from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { ArrowLeft, ArrowRight, Calendar, ChevronRight, Sparkles, User } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  await dbConnect();
  try {
    const post = (await Blog.findOne({ slug }).lean()) as any;
    if (!post) return { title: "Blog Post | Jisnu Digital" };

    return {
      title: `${post.title} | Jisnu Digital`,
      description: post.excerpt || post.title,
      alternates: {
        canonical: `https://www.jisnudigital.com/blog/${post.slug}`,
      },
    };
  } catch {
    return { title: "Blog Post | Jisnu Digital" };
  }
}

export default async function PostDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  await dbConnect();

  let post: any = null;
  try {
    post = await Blog.findOne({ slug }).lean();
  } catch {
    return notFound();
  }

  // Fallback: Redirect legacy ID URLs to their corresponding slug URLs
  if (!post && slug.match(/^[0-9a-fA-F]{24}$/)) {
    try {
      const postById = (await Blog.findById(slug).lean()) as any;
      if (postById && postById.slug) {
        redirect(`/blog/${postById.slug}`);
      }
    } catch {
      // Ignore database errors during legacy ID lookup
    }
  }

  if (!post) return notFound();

  // Fetch 4 to 5 related / other blogs
  let relatedPosts: any[] = [];
  try {
    // 1. First, fetch posts in the same category (excluding current post)
    const sameCategory = await Blog.find({
      slug: { $ne: post.slug },
      category: post.category,
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    relatedPosts = [...sameCategory];

    // 2. If fewer than 5, fill remaining spots with other recent posts
    if (relatedPosts.length < 5) {
      const excludeSlugs = [post.slug, ...relatedPosts.map((p: any) => p.slug)];
      const otherPosts = await Blog.find({
        slug: { $nin: excludeSlugs },
      })
        .sort({ createdAt: -1 })
        .limit(5 - relatedPosts.length)
        .lean();

      relatedPosts = [...relatedPosts, ...otherPosts];
    }
  } catch (err) {
    console.error("Error fetching related posts:", err);
  }

  const imagePath =
    post.image?.startsWith("http") || post.image?.startsWith("/")
      ? post.image
      : `/${post.image}`;

  return (
    <main className="pt-28 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-cyan-600 mb-8 hover:-translate-x-1 transition group font-medium text-sm"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to All Articles
        </Link>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Main Article (Left Column - 8 Cols) */}
          <article className="lg:col-span-8 min-w-0">
            <header className="mb-8">
              <span className="bg-cyan-100 text-cyan-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider inline-block">
                {post.category}
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-5 mb-6 text-slate-900 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-slate-500 text-sm border-y py-4 border-slate-100">
                <span className="flex items-center gap-2">
                  <User size={17} className="text-cyan-600" /> {post.author}
                </span>
                {post.date && (
                  <span className="flex items-center gap-2">
                    <Calendar size={17} className="text-cyan-600" /> {post.date}
                  </span>
                )}
              </div>
            </header>

            <div className="rounded-3xl overflow-hidden mb-10 shadow-xl bg-slate-100 border border-slate-100">
              <img
                src={imagePath}
                alt={post.title}
                className="w-full h-auto object-cover max-h-[500px]"
              />
            </div>

            <div
              suppressHydrationWarning
              className="prose prose-lg prose-cyan max-w-none
                prose-headings:text-slate-900
                prose-p:text-slate-600
                prose-img:rounded-2xl
                prose-strong:text-slate-900 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-14 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-slate-400 text-sm italic">
                Thank you for reading!
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 hover:text-cyan-700 transition-colors"
              >
                <ArrowLeft size={16} />
                Explore more articles
              </Link>
            </div>
          </article>

          {/* Right Sidebar: Other / Related Blogs (4 Cols) */}
          <aside className="lg:col-span-4 w-full">
            <div className="sticky top-28 space-y-8">
              {/* Related Posts Card */}
              <div className="bg-slate-50/80 rounded-3xl p-6 border border-slate-200/80 shadow-sm">
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                      Related Articles
                    </h2>
                  </div>
                  <Link
                    href="/blog"
                    className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 flex items-center gap-0.5 transition-colors"
                  >
                    View all
                    <ChevronRight size={14} />
                  </Link>
                </div>

                {relatedPosts.length > 0 ? (
                  <div className="space-y-4">
                    {relatedPosts.map((rel: any, index: number) => {
                      const relImg =
                        rel.image?.startsWith("http") || rel.image?.startsWith("/")
                          ? rel.image
                          : `/${rel.image}`;

                      return (
                        <Link
                          key={rel._id?.toString() || rel.slug || index}
                          href={`/blog/${rel.slug}`}
                          className="group flex items-start gap-3.5 p-2 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-200 border border-transparent hover:border-slate-200/70"
                        >
                          <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-200 shadow-sm">
                            <img
                              src={relImg}
                              alt={rel.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0 py-0.5">
                            <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 border border-cyan-100 px-2 py-0.5 rounded-md mb-1.5">
                              {rel.category}
                            </span>
                            <h3 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 group-hover:text-cyan-600 transition-colors leading-snug">
                              {rel.title}
                            </h3>
                            {rel.date && (
                              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mt-1.5">
                                <Calendar size={12} className="text-slate-400 shrink-0" />
                                <span className="truncate">{rel.date}</span>
                              </div>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 py-4 text-center">
                    No related articles found.
                  </p>
                )}
              </div>

              {/* Consultation / CTA Card */}
              <div className="rounded-3xl p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden shadow-xl border border-slate-800">
                <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 flex items-center justify-center mb-4">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-400 block mb-1">
                    Grow Your Business
                  </span>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    Need Help With Web Development or Digital Marketing?
                  </h3>
                  <p className="text-slate-300 text-xs leading-relaxed mb-5">
                    Partner with Jisnu Digital Solutions in Pune to build, scale, and accelerate your business growth online.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-all shadow-lg shadow-cyan-600/30 hover:scale-[1.02] active:scale-95"
                  >
                    <span>Get Free Consultation</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
