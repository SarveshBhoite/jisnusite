export default function ProcessSection() {
  const steps = ["Discovery", "Strategy", "Design", "Develop", "Launch"]

  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-display font-bold mb-12 text-center">
          Our Process
        </h2>

        <div className="grid md:grid-cols-5 gap-6">
          {steps.map((s, i) => (
            <div key={s} className="p-6 rounded-2xl border hover:border-primary transition">
              <span className="text-primary font-bold">0{i + 1}</span>
              <h3 className="font-display font-bold mt-2">{s}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
