"use client"

import { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Loader2, Lock, Mail, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react"

export default function CombinedLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isNotListed, setIsNotListed] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // If the user clicked the button while in "Not Listed" state
    if (isNotListed) {
      router.push("/companies/list-your-company");
      return;
    }

    try {
      // 1. FIRST CHECK: Does the email exist in our Database?
      const checkEmail = await fetch(`/api/client/check-email?email=${email}`);
      const data = await checkEmail.json();

      if (!data.exists) {
        // USER NOT FOUND CASE
        setIsNotListed(true);
        setError("This account is not registered in our system.");
        setLoading(false);
        return;
      }

      // 2. USER EXISTS: Now attempt to Sign In
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid password. Please try again.");
        setLoading(false);
      } else {
        // 3. AUTH SUCCESS: Check role and redirect
       // login/page.tsx check
const session = await getSession();

if (session?.user?.role === "admin") {
  console.log("Redirecting to Admin...");
  router.push("/dashboard/admin");
  window.location.href = "/dashboard/admin";
} else {
  console.log("Redirecting to Client...");
  router.push("/dashboard/client");
  window.location.href = "/dashboard/client";
}
        
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#fcfcfc] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-100 relative overflow-hidden">
        
        <div className="absolute top-0 right-0 p-6 opacity-10">
          <ShieldCheck className="w-12 h-12" />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight italic uppercase">
            {isNotListed ? "Account Not Found" : "Portal Login"}
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            {isNotListed ? "Join our network to get started" : "Access your business dashboard"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs font-black uppercase text-slate-400 ml-1">Email Address</label>
            <div className="relative mt-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input 
                type="email" required
                value={email} 
                onChange={(e) => { 
                  setEmail(e.target.value); 
                  setIsNotListed(false); 
                  setError("");
                }}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                placeholder="name@company.com"
              />
            </div>
          </div>

          {/* Hide password field if the user is not found to focus on the Register CTA */}
          {!isNotListed && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="text-xs font-black uppercase text-slate-400 ml-1">Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input 
                  type="password" required
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>
          )}

          {error && (
            <div className={`flex items-center gap-2 p-4 rounded-xl text-[11px] font-black uppercase border animate-shake ${
              isNotListed ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-red-50 text-red-600 border-red-100'
            }`}>
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 ${
              isNotListed ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-slate-900 hover:bg-blue-600 text-white"
            }`}
          >
            {loading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : isNotListed ? (
              <>List Your Business <ArrowRight className="w-4 h-4" /></>
            ) : (
              "Sign In to Dashboard"
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          Secure Multi-Role Access System
        </p>
      </div>
    </main>
  )
}