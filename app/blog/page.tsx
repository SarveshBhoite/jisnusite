"use client"

import Link from "next/link"
import { Calendar, User } from "lucide-react"

const blogPosts = [
  {
    id: "future-web-design",
    title: "The Future of Web Design in 2025",
    excerpt: "Explore emerging design trends and technologies shaping digital experiences.",
    author: "Sarah Chen",
    date: "Dec 15, 2024",
    category: "Design Trends",
    image: "/brand-identity-design.jpg",
  },
  {
    id: "digital-marketing-roi",
    title: "Maximizing Your Digital Marketing ROI",
    excerpt: "Strategic insights to optimize your marketing spend and improve conversion rates.",
    author: "Alex Kumar",
    date: "Dec 10, 2024",
    category: "Marketing",
    image: "/analytics-dashboard-interface.jpg",
  },
  {
    id: "scalable-web-apps",
    title: "Building Scalable Web Applications",
    excerpt: "Best practices for applications that grow with your business.",
    author: "Emma Rodriguez",
    date: "Dec 5, 2024",
    category: "Development",
    image: "/modern-ecommerce-platform.jpg",
  },
  {
    id: "user-experience-psychology",
    title: "Psychology of User Experience Design",
    excerpt: "Understanding user behavior to create effective digital products.",
    author: "James Wilson",
    date: "Nov 28, 2024",
    category: "Design",
    image: "/mobile-application-design.jpg",
  },
  {
    id: "ai-in-business",
    title: "Implementing AI in Your Business Strategy",
    excerpt: "How AI is transforming business operations and decision-making.",
    author: "Sarah Chen",
    date: "Nov 20, 2024",
    category: "Technology",
    image: "/brand-identity-design.jpg",
  },
  {
    id: "brand-storytelling",
    title: "The Art of Brand Storytelling",
    excerpt: "Creating emotional connections through authentic brand narratives.",
    author: "Alex Kumar",
    date: "Nov 15, 2024",
    category: "Branding",
    image: "/analytics-dashboard-interface.jpg",
  },
]

export default function BlogPage() {
  const featured = blogPosts[0]
  const rest = blogPosts.slice(1)

  return (
    <main className="pt-28">

      {/* ===== HERO ===== */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">
            Insights & Articles
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Thoughts on design, development, and digital growth from our team.
          </p>
        </div>
      </section>

      {/* ===== FEATURED POST ===== */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <Link href={`/blog/${featured.id}`}>
            <div className="group relative overflow-hidden rounded-2xl border border-border cursor-pointer">
              <div className="aspect-[16/9]">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              <div className="absolute bottom-0 p-8 max-w-3xl">
                <span className="inline-block mb-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                  {featured.category}
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-3">
                  {featured.title}
                </h2>
                <p className="text-white/85 mb-4">
                  {featured.excerpt}
                </p>

                <div className="flex items-center gap-4 text-sm text-white/70">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {featured.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {featured.date}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ===== BLOG GRID ===== */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <article className="group h-full rounded-xl border border-border bg-background overflow-hidden hover:border-primary/40 transition">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-6 flex flex-col h-full">
                  <span className="text-xs text-primary font-medium mb-2">
                    {post.category}
                  </span>
                  <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-primary transition">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground flex-grow">
                    {post.excerpt}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
            Want updates from Jisnu Digital?
          </h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to receive new articles and insights directly.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-5 py-3 rounded-md border border-border bg-background focus:outline-none focus:border-primary"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
