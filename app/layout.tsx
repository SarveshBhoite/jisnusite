import type React from "react"
import type { Metadata } from "next"
import { Sora, Inter } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import { MessageCircle } from "lucide-react"
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer"
import "./globals.css"
import AuthProvider from "@/components/SessionProvider"
// Import the new component (assuming you save it in components/PricingPopup.tsx)
import PricingPopup from "@/components/PricingPopup"

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
  title: "Best Digital Marketing Agency in Pune|Jisnu Digital",
  description: "Best Digital Marketing Agency in Pune. Jisnu Digital Solutions Pvt. Ltd. offers SEO, Social Media Marketing,Google Ads and Website development services.",
  icons: { icon: "/icon.jpeg", apple: "/icon.jpeg" },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sora.variable} ${inter.variable} font-sans antialiased`}>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-1RSY1JFY9H"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-1RSY1JFY9H');
          `}
        </Script>
        <AuthProvider>
          <Navbar />
          {/* The Popup lives here, it will handle its own "show/hide" logic */}
          <PricingPopup /> 
          <main className="min-h-screen">{children}</main>
          <a
            href="https://wa.me/917709936965"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-[2000] bg-[#25D366] text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg hover:bg-[#20bf5a] transition-colors flex items-center justify-center"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
          </a>
          <Footer />
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  )
}
