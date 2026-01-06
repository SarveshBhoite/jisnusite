"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Companies", href: "/companies" },
  { label: "Blogs", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Glass Background */}
      <div className="backdrop-blur-xl bg-background/75 border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 md:h-20 items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/icon.jpeg"
                alt="Jisnu Digital Solutions"
                width={44}
                height={44}
                className="rounded-md transition-transform duration-300 group-hover:scale-105"
                priority
              />
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="font-display text-base font-semibold tracking-tight">
                  Jisnu Digital
                </span>
                <span className="text-xs text-muted-foreground">
                  Solutions
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground group"
                >
                  {link.label}
                  <span className="pointer-events-none absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-3">

              {/* Cart */}
              <Link
                href="/cart"
                className="relative rounded-md p-2 hover:bg-muted transition"
                aria-label="Cart"
              >
                <ShoppingCart className="h-5 w-5 text-foreground" />
              </Link>

              {/* Auth */}
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  Login
                </Button>
              </Link>

              <Link href="/companies/list-your-company">
                <Button className="h-9 px-5 text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-all">
                  List Company
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden rounded-md p-2 hover:bg-muted transition"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden backdrop-blur-xl bg-background/95 border-b border-border">
          <div className="px-6 py-6 space-y-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block text-base font-medium text-foreground"
              >
                {link.label}
              </Link>
            ))}

            {/* Cart (Mobile) */}
            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="block text-base font-medium text-foreground"
            >
              Cart
            </Link>

            {/* Auth (Mobile) */}
            <div className="pt-4 space-y-3">
              <Link href="/login">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link href="/companies/list-your-company">
                <Button className="w-full bg-primary text-primary-foreground">
                  List Company
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
