export default function ClientsMarquee() {
  const clients = ["Google", "Microsoft", "Amazon", "Meta", "Apple"]

  return (
    <section className="py-16 border-y border-foreground/10 bg-foreground/[0.02]">
      <div className="flex gap-16 animate-marquee">
        {clients.map((c) => (
          <span key={c} className="text-xl font-semibold text-foreground/40">
            {c}
          </span>
        ))}
      </div>
    </section>
  )
}
