"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2, LogOut } from "lucide-react"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    const performLogout = async () => {
      try {
        // 1. Agar aap NextAuth use kar rahe hain:
        // await signOut({ redirect: false })

        // 2. Agar aap manual JWT/Cookies use kar rahe hain (API call):
        const res = await fetch("/api/auth/logout", { method: "POST" })

        if (res.ok) {
          // Clear local storage if any
          localStorage.clear()
          
          // Chhota sa delay professional feel ke liye
          setTimeout(() => {
            router.push("/")
            router.refresh() // State reset karne ke liye
          }, 2000)
        }
      } catch (err) {
        console.error("Logout failed", err)
        router.push("/")
      }
    }

    performLogout()
  }, [router])

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">
        {/* Animated Icon */}
        <div className="relative">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
            <LogOut className="w-8 h-8 text-red-500" />
          </div>
          <div className="absolute inset-0 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin"></div>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-black text-slate-900">Logging You Out</h1>
          <p className="text-slate-500 font-medium mt-1">Safely clearing your session...</p>
        </div>

        <div className="flex items-center gap-2 text-slate-400 text-sm font-bold bg-slate-50 px-4 py-2 rounded-full">
          <Loader2 className="w-4 h-4 animate-spin" />
          PLEASE WAIT
        </div>
      </div>
    </div>
  )
}