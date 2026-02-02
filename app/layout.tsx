import type React from "react"
import type { Metadata } from "next"
import { Sora, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer"
import "./globals.css"
import AuthProvider from "@/components/SessionProvider"

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Jisnu Digital Solutions - Premium Digital Services",
  description:
    "Professional digital solutions for modern businesses. Web development, design, SEO, and digital strategy.",
  icons: {
    icon: [
      {
        url: "/icon.jpeg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon.jpeg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.jpeg",
        type: "image/svg+xml",
      },
    ],
    apple: "/icon.jpeg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sora.variable} ${inter.variable} font-sans antialiased`}
      >
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  )
}
