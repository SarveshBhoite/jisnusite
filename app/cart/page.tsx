"use client"

import { useEffect, useState } from "react"
import { ArrowRight, ShoppingCart, X, MessageSquare, UserCircle, Lock } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react" // Step 1: Session import karein

export default function CartPage() {
  const { data: session, status } = useSession() // Session status check karna
  const [cart, setCart] = useState<any[]>([])
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]")
    setCart(stored)
  }, [])

  const removeItem = (id: string) => {
    const updated = cart.filter(item => item._id !== id)
    setCart(updated)
    localStorage.setItem("cart", JSON.stringify(updated))
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const totalMRP = cart.reduce((acc, item) => acc + (item.basePrice || 0), 0)
  const totalDiscounted = cart.reduce((acc, item) => acc + (item.discountPrice || 0), 0)
  const totalSavings = totalMRP - totalDiscounted

  const submitRequest = async () => {
    if (status !== "authenticated") {
      alert("Please login to place an order");
      return;
    }

    setLoading(true);

    const payload = {
      // Ab hum customerName aur phone ki jagah session ka email bhejenge
      email: session.user?.email, 
      name: session.user?.name,
      services: cart.map(item => ({
        id: item._id,
        name: item.title,
        price: item.discountPrice
      })),
      totalAmount: totalDiscounted,
      message: message,
      status: "New"
    };

    try {
      const res = await fetch("/api/admin/services/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("✅ Order Placed Successfully!");
        localStorage.removeItem("cart");
        setCart([]);
        window.dispatchEvent(new Event("cartUpdated"));
      } else {
        const result = await res.json();
        alert(`❌ ${result.message || "Something went wrong"}`);
      }
    } catch (error) {
      alert("System error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-32 pb-24 bg-[#fcfcfc] min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3 italic uppercase">
            <ShoppingCart className="w-8 h-8 text-blue-600" />
            Service Cart ({cart.length})
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200">
            <p className="text-slate-400 font-bold mb-6">Your cart is empty.</p>
            <Link href="/services">
              <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-600 transition-all">
                Browse Services
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2 space-y-4">
              {/* DYNAMIC CONTACT INFO SECTION */}
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 mb-2">
                  <UserCircle className="w-4 h-4 text-blue-600" /> Checkout Account
                </h3>
                
                {status === "authenticated" ? (
                  <div className="flex items-center gap-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                      {session.user?.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{session.user?.name}</p>
                      <p className="text-xs text-slate-500 font-medium">{session.user?.email}</p>
                    </div>
                    <div className="ml-auto">
                      <span className="text-[10px] font-black bg-blue-600 text-white px-2 py-1 rounded-md uppercase">Verified</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-center">
                    <Lock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm font-bold text-slate-500 mb-4">Please login to continue with checkout</p>
                    <Link href="/login">
                      <button className="bg-slate-900 text-white px-6 py-2 rounded-lg text-xs font-bold uppercase hover:bg-blue-600 transition-all">
                        Login Now
                      </button>
                    </Link>
                  </div>
                )}
              </div>

              {/* ITEMS LIST */}
              {cart.map((item) => (
                <div key={item._id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center font-bold text-blue-600 italic">
                      {item.title.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{item.title}</h3>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">{item.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-black text-slate-900">₹{item.discountPrice}</p>
                      <p className="text-xs text-slate-400 line-through font-bold">₹{item.basePrice}</p>
                    </div>
                    <button onClick={() => removeItem(item._id)} className="p-2 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}

              {/* MESSAGE BOX (Only shown if logged in) */}
              {status === "authenticated" && (
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                  <label className="flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-widest mb-4">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                    Project Brief (Optional)
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us more about your requirements..."
                    className="w-full rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              )}
            </div>

            {/* SUMMARY PANEL */}
            <div className="lg:col-span-1">
              <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl sticky top-32 border border-white/5">
                <h2 className="text-xl font-bold mb-6 pb-4 border-b border-white/10 italic uppercase">Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-slate-400 font-bold text-xs uppercase">
                    <span>Subtotal</span>
                    <span>₹{totalMRP}</span>
                  </div>
                  <div className="flex justify-between text-green-400 font-bold text-xs uppercase">
                    <span>Discount</span>
                    <span>- ₹{totalSavings}</span>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                    <span className="font-bold text-sm uppercase">Total Payable</span>
                    <span className="text-3xl font-black text-white italic">₹{totalDiscounted}</span>
                  </div>
                </div>

                {status === "authenticated" ? (
                  <button
                    onClick={submitRequest}
                    disabled={loading || cart.length === 0}
                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
                  >
                    {loading ? "Sending..." : "Send Request"} <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <Link href="/login">
                    <button className="w-full bg-slate-700 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 transition-all">
                      Login to Checkout <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                )}
                
                <p className="text-[10px] text-center text-slate-500 mt-6 font-bold uppercase tracking-widest">
                  Our team will call you within 24 hours
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </main>
  )
}