"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Users,
  Lightbulb,
  Target,
  Award,
  CheckCircle2,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="relative bg-background">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden min-h-[50vh] flex items-center justify-center pt-32 pb-20 md:pt-40 md:pb-24 bg-slate-900 text-white">
        {/* Background Team & Tech Image with Opacity & Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 mix-blend-luminosity scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80')`,
          }}
        />

        {/* Semi-Transparent Dark & Vibrant Gradient Layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/80 to-slate-950/95 backdrop-blur-[2px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full bg-cyan-500/15 blur-[140px] rounded-full pointer-events-none" />

        {/* Subtle Tech Grid Lines Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 my-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-cyan-300 text-xs sm:text-sm font-medium mb-6 backdrop-blur-md shadow-inner">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>Who We Are</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight text-white mb-6 mx-auto leading-tight">
            About{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
              Jisnu Digital Solutions
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Jisnu Digital Solutions is a best digital marketing  company helping businesses grow through website development, SEO, digital marketing, mobile apps, and UI/UX design. We create practical digital solutions that improve online visibility, attract customers, and support business growth across Pune and Maharashtra.
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
             At Jisnu Digital, we help businesses find new opportunities and grow in the digital world. We understand that running a business takes time and effort, so our goal is to make online marketing simpler and more effective. As a digital marketing agency in Pune, we work with startups, small businesses, and established brands to help them reach more customers and build a strong online presence.

We offer a range of services, including SEO, social media marketing, Google Ads, Meta Ads, website development, and performance marketing. From improving your website's visibility on Google to creating engaging social media content and running targeted ad campaigns, we focus on helping your business connect with the right audience.
            </p>

          </div>

          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border bg-muted">
            <Image
              src="/SMM.jpg"
              alt="Jisnu Digital team working"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-28 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Our Digital Marketing Services
            </h2>
        
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "SEO Services",
                desc: "We offer professional SEO services in Pune to improve Google rankings, increase organic traffic, and boost online visibility. Our SEO strategies include keyword research, on-page SEO, technical SEO, and local SEO to help businesses attract customers and grow online.",
              },
              {
                title: "Social Media Marketing",
                desc: "We offer social media marketing services in Pune to help businesses grow their brand through engaging Facebook and Instagram content, targeted campaigns, and better audience engagement.",
              },
              {
                title: "Google Ads Management",
                desc: "We provide expert Google Ads management services in Pune to reach the right audience, generate quality leads, and grow your business with cost-effective advertising campaigns.",
              },
              {
                title: "Website Development",
                desc: "Looking for professional website development services in Pune? We create fast, mobile-friendly, and SEO-friendly websites that showcase your business, attract potential customers, and help you grow online.",
              },
            ].map((service, i) => (
              <div
                key={i}
                className="p-8 rounded-xl border border-border bg-background"
              >
                <h3 className="font-display text-xl font-semibold mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Why Choose Jisnu Digital
            </h2>
          </div>

          <ul className="grid md:grid-cols-2 gap-4 text-muted-foreground">
            {[
              "Experienced Digital Marketing Experts",
              "Result-Driven Marketing Strategies",
              "Affordable Pricing",
              "Dedicated Customer Support",
              "Proven SEO Techniques",
            ].map((point, i) => (
              <li
                key={i}
                className="flex items-start gap-3 p-4 rounded-lg border border-border bg-muted/30"
              >
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
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
                name: "Rohit Pawar",
                role: "Sales Manager",
                image: "/Rohit.jpg",
              },
              {
                name: "Pratik Ghalme",
                role: "Manager",
                image: "/pratik.jpg",
              },
              {
                name: " Hrushikesh patil",
                role: "Team Leader",
                image: "/patil sir.jpeg",
              },
              {
                name: "Sarvesh Bhoite",
                role: "Software Developer",
                image: "/Raj.jpg",
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
      
      {/* ================= CONTACT BLOCK ================= */}
      <section className="py-20 bg-muted/40 border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            If you are looking for the best digital marketing agency in Pune,
            contact Jisnu Digital today and grow your business online.
          </p>
        </div>
      </section>


    </main>
  );
}

