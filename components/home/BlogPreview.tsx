export default function BlogPreview() {
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-display font-bold mb-12">
          Latest Blogs
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="group cursor-pointer">
              <div className="rounded-2xl overflow-hidden mb-4">
                <img src="/blog.jpg" className="group-hover:scale-105 transition" />
              </div>
              <h3 className="font-display font-bold">
                Blog Title
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
