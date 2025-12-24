"use client"

import Link from "next/link"
import Image from "next/image"
import {
  Facebook,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Top Section */}
        <div className="grid gap-12 md:grid-cols-4">

          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/icon.jpeg"
                alt="Jisnu Digital Solutions"
                width={42}
                height={42}
                className="rounded-md"
              />
              <div className="leading-tight">
                <p className="font-display text-base font-semibold">
                  Jisnu Digital
                </p>
                <p className="text-xs text-muted-foreground">
                  Solutions
                </p>
              </div>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Jisnu Digital Solutions provides reliable, modern digital services
              to help businesses build, scale, and grow their online presence.
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="font-display text-sm font-semibold mb-4">
              Services
            </p>
            <ul className="space-y-3">
              {[
                { label: "Web Development", href: "/services" },
                { label: "UI / UX Design", href: "/services" },
                { label: "SEO & Marketing", href: "/services" },
                { label: "All Services", href: "/services" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="font-display text-sm font-semibold mb-4">
              Company
            </p>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Portfolio", href: "/portfolio" },
                { label: "Blogs", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-display text-sm font-semibold mb-4">
              Contact
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5" />
                info@jisnudigital.com
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5" />
                +91 XXXXX XXXXX
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5" />
                India
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="my-12 border-t border-border" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {year} Jisnu Digital Solutions. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {[
              { icon: Facebook, href: "#" },
              { icon: Linkedin, href: "#" },
              { icon: Instagram, href: "#" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="p-2 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-primary transition"
                aria-label="social"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  )
}
