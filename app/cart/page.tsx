"use client"

import { useEffect, useState } from "react"
import { ArrowRight, ShoppingCart, X, MessageSquare, UserCircle, Phone } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([])
  const [message, setMessage] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [phone, setPhone] = useState("")
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

  // API SUBMISSION LOGIC
const submitRequest = async () => {
  if (!customerName || !phone) {
    alert("Please enter your Registered Name and WhatsApp Number");
    return;
  }

  setLoading(true);

  const payload = {
    name: customerName,      // Aapke database field ke hisaab se
    whatsapp: phone,         // Aapke database field ke hisaab se
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

    const result = await res.json();

    if (res.ok) {
      alert("✅ Order Placed Successfully!");
      localStorage.removeItem("cart");
      setCart([]);
      setCustomerName("");
      setPhone("");
      window.dispatchEvent(new Event("cartUpdated"));
    } else {
      // Yahan wahi error message dikhega jo humne API mein likha hai
      alert(`❌ ${result.message}`);
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
          {cart.length > 0 && (
            <button 
              onClick={() => { localStorage.removeItem("cart"); setCart([]); window.dispatchEvent(new Event("cartUpdated")); }}
              className="text-xs font-bold text-red-500 hover:underline uppercase tracking-tighter"
            >
              Clear All
            </button>
          )}
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
              {/* CUSTOMER DETAILS FORM */}
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 mb-2">
                  <UserCircle className="w-4 h-4 text-blue-600" /> Your Contact Info
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name / Business Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                  <input
                    type="tel"
                    placeholder="WhatsApp / Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
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
                    <button 
                      onClick={() => removeItem(item._id)}
                      className="p-2 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}

              {/* MESSAGE BOX */}
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

                <button
                  onClick={submitRequest}
                  disabled={loading || cart.length === 0}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
                >
                  {loading ? "Sending..." : "Send Request"} <ArrowRight className="w-4 h-4" />
                </button>
                
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