"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Menu, X, ShoppingCart, LogOut, User, LayoutDashboard, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSession, signOut } from "next-auth/react" // NextAuth hooks

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
  const { data: session, status } = useSession() // Session data fetch karna
const [cartCount, setCartCount] = useState(0)

  const updateCartCount = () => {
    if (typeof window !== "undefined") {
      const stored = JSON.parse(localStorage.getItem("cart") || "[]")
      setCartCount(stored.length)
    }
  }

  useEffect(() => {
    updateCartCount() // Initial check
    window.addEventListener("cartUpdated", updateCartCount)
    return () => window.removeEventListener("cartUpdated", updateCartCount)
  }, [])
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="backdrop-blur-xl bg-background/75 border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 md:h-20 items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center pr-4 group">
              <Image
                src="/icon.jpeg"
                alt="Jisnu Digital Solutions"
                width={44}
                height={44}
                className="rounded-md transition-transform duration-300 group-hover:scale-105 "
                priority
              />
              <div className="hidden sm:flex flex-col leading-tight ">
                <span className="font-display text-base font-semibold tracking-tight">Jisnu Digital</span>
                <span className="text-xs text-muted-foreground">Solutions</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10 py-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="relative text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground group">
                  {link.label}
                  <span className="pointer-events-none absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-3">
              
              {/* CART ICON - Now visible on all screens, but styled for mobile */}
              <Link href="/cart" className="relative rounded-md p-2 hover:bg-muted transition group">
                <ShoppingCart className="h-5 w-5 text-foreground" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white animate-in zoom-in duration-300">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Desktop Only Actions */}
              <div className="hidden md:flex items-center gap-3">
                {/* DYNAMIC AUTH SECTION */}
                {status === "authenticated" ? (
                  <div className="relative group ml-2">
                    <button className="flex items-center gap-3 p-1 rounded-full hover:bg-muted transition-all">
                      <div className="text-right hidden xl:block">
                        <p className="text-sm font-bold text-foreground leading-none uppercase italic">
                          {session.user?.name?.split(" ")[0]}
                        </p>
                        <p className="text-[10px] text-muted-foreground font-medium">{session.user?.email}</p>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-black italic border border-primary/20">
                        {session.user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:rotate-180 transition-transform" />
                    </button>

                    <div className="absolute right-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-2xl">
                      <div className="bg-background border border-border rounded-xl p-2 space-y-1">
                        <Link href="/dashboard/client" className="flex items-center gap-2 p-3 hover:bg-muted rounded-lg text-sm font-semibold transition">
                          <LayoutDashboard className="w-4 h-4 text-primary" /> Dashboard
                        </Link>
                        <Link href="/dashboard/client/profile" className="flex items-center gap-2 p-3 hover:bg-muted rounded-lg text-sm font-semibold transition">
                          <User className="w-4 h-4 text-primary" /> Profile
                        </Link>
                        <div className="h-px bg-border my-1" />
                        <button 
                          onClick={() => signOut({ callbackUrl: '/' })}
                          className="w-full flex items-center gap-2 p-3 hover:bg-red-50 text-red-500 rounded-lg text-sm font-bold transition"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link href="/login">
                    <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                      Login
                    </Button>
                  </Link>
                )}

                <Link href="/companies/list-your-company">
                  <Button className="h-9 px-5 text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-all shadow-md">
                    List Company
                  </Button>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button onClick={() => setOpen(!open)} className="lg:hidden rounded-md p-2 hover:bg-muted transition">
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
         </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden backdrop-blur-xl bg-background/95 border-b border-border">
          <div className="px-6 py-6 space-y-5">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block text-base font-medium text-foreground">
                {link.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-border space-y-4">
              {status === "authenticated" ? (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold">
                      {session.user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{session.user?.name}</p>
                      <p className="text-xs text-muted-foreground">{session.user?.email}</p>
                    </div>
                  </div>
                  <Link href="/dashboard/client" onClick={() => setOpen(false)} className="block text-primary font-bold">My Dashboard</Link>
                  <button onClick={() => signOut()} className="block text-red-500 font-bold">Logout</button>
                </>
              ) : (
                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}