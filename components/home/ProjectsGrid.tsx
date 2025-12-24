export default function ProjectsGrid() {
  return (
    <section className="py-32 bg-gradient-to-b from-primary/5 to-accent/5">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-display font-bold mb-12">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="relative rounded-3xl overflow-hidden cursor-pointer group"
            >
              <img src="/placeholder.jpg" className="w-full h-[400px] object-cover group-hover:scale-110 transition" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-end p-6">
                <h3 className="text-white text-2xl font-display font-bold">
                  Project Name
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
