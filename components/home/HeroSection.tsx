"use client"

import Link from "next/link"
import { ArrowUpRight, Play, ArrowDown } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* background gradients stay here */}

      <div className="relative max-w-7xl mx-auto px-4 pt-32 pb-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <div className="space-y-8">
          <h1 className="text-5xl md:text-7xl font-display font-bold">
            We craft{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              digital
            </span>{" "}
            experiences
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl">
            Premium digital agency delivering scalable web, design, and growth solutions.
          </p>

          <div className="flex gap-4">
            <Link href="/contact">
              <button className="px-8 py-4 rounded-full bg-foreground text-background font-semibold flex items-center gap-2 hover:scale-105 transition">
                Start a Project <ArrowUpRight />
              </button>
            </Link>

            <Link href="/portfolio">
              <button className="px-8 py-4 rounded-full border border-foreground/20 flex items-center gap-2">
                <Play className="w-4 h-4" /> View Work
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT – your bento cards */}
        <div>{/* bento grid stays */}</div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-muted-foreground">
        <span className="text-xs uppercase">Scroll</span>
        <ArrowDown className="animate-bounce" />
      </div>
    </section>
  )
}
