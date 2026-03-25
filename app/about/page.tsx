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
              <b>Jisnu Digital</b> is a leading digital marketing agency in Pune
              providing result-oriented online marketing services for
              businesses. We help brands grow online through advanced SEO
              strategies, social media marketing, Google Ads campaigns and
              professional website development.
            </p>
            <p className="text-muted-foreground leading-relaxed">
             Our goal is to help businesses increase online visibility, generate quality leads and improve their brand presence in the digital world.
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
                desc: "We provide professional SEO services in Pune to improve your website ranking on Google and increase organic traffic.",
              },
              {
                title: "Social Media Marketing",
                desc: "Our social media experts create engaging campaigns on Facebook, Instagram and other platforms to build your brand and connect with customers.",
              },
              {
                title: "Google Ads Management",
                desc: "We run targeted Google Ads campaigns that bring high-quality leads and maximize ROI for your business.",
              },
              {
                title: "Website Development",
                desc: "We design fast, responsive and SEO-friendly websites that help businesses grow online.",
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
                name: "Pratik Pawar",
                role: "Team Leader",
                image: "/Pawar.jpg",
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

