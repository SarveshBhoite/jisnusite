"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock, Loader2, CheckCircle } from "lucide-react"

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })

      if (res.ok) setSubmitted(true)
    } catch (err) {
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <CheckCircle className="w-16 h-16 text-cyan-500 mb-4 animate-bounce" />
        <h2 className="text-3xl font-bold">Message Sent!</h2>
        <p className="text-slate-500 mt-2">Our team will get back to you shortly.</p>
        <button onClick={() => setSubmitted(false)} className="mt-6 text-cyan-600 font-bold hover:underline">Send another message</button>
      </div>
    )
  }

  return (
    <main className="min-h-screen pt-20 bg-[#F8FAFC]">
      {/* HERO SECTION */}
      <section className="relative py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
              Get In <span className="text-cyan-600">Touch</span>
            </h1>
            <p className="text-lg text-slate-500">
              Have a question or a digital project in mind? We're ready to help.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-14">
          {/* INFO COLUMN */}
          <div className="space-y-8">
            <InfoItem icon={<Mail />} title="Email" value="info@jisnu.com" href="mailto:info@jisnu.com" />
            <InfoItem icon={<Phone />} title="Phone" value="+91 98765 43210" href="tel:+919876543210" />
            <InfoItem icon={<MapPin />} title="Office" value="123 Tech Park, Digital City" />
            <InfoItem icon={<Clock />} title="Hours" value="Mon-Sat: 9AM - 6PM" />
          </div>

          {/* FORM COLUMN */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-xl shadow-slate-200/50">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input label="First Name" name="firstName" required placeholder="John" />
                  <Input label="Last Name" name="lastName" required placeholder="Doe" />
                </div>
                <Input label="Email Address" name="email" type="email" required placeholder="john@example.com" />
                <Input label="Company Name" name="company" placeholder="Optional" />
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 text-xs uppercase tracking-wider">Subject</label>
                  <select name="subject" required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:ring-2 ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all">
                    <option value="">Select a reason</option>
                    <option>General Enquiry</option>
                    <option>Digital Marketing</option>
                    <option>Web Development</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 text-xs uppercase tracking-wider">Message</label>
                  <textarea name="message" required rows={5} placeholder="How can we help you?" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:ring-2 ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all resize-none" />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-cyan-700 py-4 font-bold text-white hover:bg-cyan-900 transition-all shadow-lg shadow-cyan-700/20 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function InfoItem({ icon, title, value, href }: { icon: any; title: string; value: string; href?: string }) {
  return (
    <div className="flex gap-4 items-start group">
      <div className="h-12 w-12 rounded-2xl bg-cyan-50 flex items-center justify-center text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-all">
        {icon}
      </div>
      <div>
        <p className="font-bold text-slate-800 text-sm uppercase tracking-tighter">{title}</p>
        {href ? (
          <a href={href} className="text-slate-500 hover:text-cyan-600 transition-colors">{value}</a>
        ) : (
          <p className="text-slate-500">{value}</p>
        )}
      </div>
    </div>
  )
}

function Input({ label, name, ...props }: any) {
  return (
    <div>
      <label className="block text-sm font-bold text-slate-700 mb-2 text-xs uppercase tracking-wider">{label}</label>
      <input
        name={name}
        {...props}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:ring-2 ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all"
      />
    </div>
  )
}