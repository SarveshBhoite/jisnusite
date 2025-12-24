"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Users, Lightbulb, Target, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="pt-24">

      {/* ================= HERO ================= */}
      <section className="py-24 bg-muted/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl md:text-5xl xl:text-6xl font-semibold mb-6">
            About Jisnu Digital Solutions
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
            We are a digital services company helping businesses design, build,
            and scale meaningful digital products through thoughtful design and
            reliable technology.
          </p>
        </div>
      </section>

      {/* ================= STORY ================= */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">

          <div className="space-y-6">
            <h2 className="font-display text-3xl md:text-4xl font-semibold">
              Our Story
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Jisnu Digital Solutions was founded with a simple goal — to help
              businesses build digital products that are practical, scalable,
              and built for long-term growth.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Over the years, we’ve worked with startups, small businesses, and
              growing organizations across different industries, delivering
              websites, platforms, and digital strategies that solve real
              business problems.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We focus on clarity, collaboration, and execution — ensuring every
              project delivers value beyond visuals.
            </p>
          </div>

          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border bg-muted">
            <Image
              src="/modern-ecommerce-platform.jpg"
              alt="Jisnu Digital team working"
              fill
              className="object-cover"
            />
          </div>

        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="py-28 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-2xl mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              What Drives Us
            </h2>
            <p className="text-muted-foreground">
              Our values shape how we work, communicate, and deliver.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Lightbulb,
                title: "Innovation",
                desc: "We continuously explore better ways to design and build digital solutions.",
              },
              {
                icon: Target,
                title: "Quality",
                desc: "Every project is executed with attention to detail and long-term impact.",
              },
              {
                icon: Users,
                title: "Collaboration",
                desc: "We work closely with clients as partners, not vendors.",
              },
              {
                icon: Award,
                title: "Integrity",
                desc: "Honest communication and transparency guide everything we do.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 rounded-xl border border-border bg-background hover:border-primary/40 transition"
              >
                <item.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-display text-lg font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-2xl mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              By the Numbers
            </h2>
            <p className="text-muted-foreground">
              A snapshot of our experience and impact.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { value: "200+", label: "Projects Delivered" },
              { value: "95%", label: "Client Retention" },
              { value: "8+", label: "Years of Experience" },
              { value: "15+", label: "Industries Served" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="font-display text-4xl md:text-5xl font-semibold text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= TEAM ================= */}
      <section className="py-28 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-2xl mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Our Team
            </h2>
            <p className="text-muted-foreground">
              A focused team of designers, developers, and strategists.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Team Member",
                role: "Role / Position",
                image: "/professional-headshot-man-business.jpg",
              },
              {
                name: "Team Member",
                role: "Role / Position",
                image: "/professional-headshot-woman-technology.jpg",
              },
              {
                name: "Team Member",
                role: "Role / Position",
                image: "/professional-creative-man.png",
              },
              {
                name: "Team Member",
                role: "Role / Position",
                image: "/professional-headshot-woman-engineer.jpg",
              },
            ].map((member, i) => (
              <div key={i}>
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4 border border-border">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-28 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
            Let’s work together
          </h2>
          <p className="text-muted-foreground mb-8">
            Have a project in mind? We’d love to understand your goals and help
            you build something meaningful.
          </p>
          <Link href="/contact">
            <button className="inline-flex items-center gap-2 px-7 py-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition">
              Contact Us <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>

    </main>
  )
}
