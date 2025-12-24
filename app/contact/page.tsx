"use client"

import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-20">

      {/* ===== HERO ===== */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="font-display text-5xl md:text-6xl font-semibold mb-6">
              Get In{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Have a question or general enquiry?  
              Send us a message and our team will get back to you shortly.
            </p>
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-14">

          {/* ===== CONTACT INFO ===== */}
          <div className="space-y-8">

            <InfoItem
              icon={<Mail />}
              title="Email"
              value={<a href="mailto:info@jisnu.com">info@jisnu.com</a>}
            />

            <InfoItem
              icon={<Phone />}
              title="Phone"
              value={<a href="tel:+1234567890">+1 (234) 567-890</a>}
            />

            <InfoItem
              icon={<MapPin />}
              title="Address"
              value={
                <>
                  123 Digital Street <br />
                  Tech City, TC 12345
                </>
              }
            />

            <InfoItem
              icon={<Clock />}
              title="Business Hours"
              value={
                <>
                  Mon – Fri: 9:00 AM – 6:00 PM <br />
                  Sat: 10:00 AM – 4:00 PM
                </>
              }
            />
          </div>

          {/* ===== CONTACT FORM ===== */}
          <div className="md:col-span-2">
            <div className="rounded-3xl border border-border bg-background p-8 md:p-12">
              <form className="space-y-6">

                <div className="grid md:grid-cols-2 gap-6">
                  <Input label="First Name" placeholder="John" />
                  <Input label="Last Name" placeholder="Doe" />
                </div>

                <Input label="Email" type="email" placeholder="john@example.com" />

                <Input label="Company (optional)" placeholder="Your Company" />

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <select className="w-full rounded-md border border-border bg-background px-4 py-3 focus:outline-none focus:border-primary">
                    <option value="">Select a subject</option>
                    <option>General Enquiry</option>
                    <option>Partnership</option>
                    <option>Support</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Write your message here..."
                    className="w-full rounded-md border border-border bg-background px-4 py-3 resize-none focus:outline-none focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-md bg-primary px-6 py-4 font-medium text-primary-foreground hover:bg-primary/90 transition"
                >
                  Send Message
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  For service requests, please use the Services → Cart flow.
                </p>

              </form>
            </div>
          </div>

        </div>
      </section>

      {/* ===== MAP ===== */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-display text-3xl font-semibold mb-8">
            Find Us
          </h2>

          <div className="h-96 overflow-hidden rounded-2xl border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.406203584183!2d73.77271787523874!3d18.600790682508364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9a68125fa15%3A0x4ab3e638485e9d03!2sJISNU%20Digital%20Solutions%20PVT%20LTD!5e0!3m2!1sen!2sin!4v1766489139014!5m2!1sen!2sin"
              width="100%"
              height="100%"
              loading="lazy"
              style={{ border: 0 }}
            />
          </div>
        </div>
      </section>

    </main>
  )
}

/* ===== SMALL REUSABLE COMPONENTS ===== */

function InfoItem({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode
  title: string
  value: React.ReactNode
}) {
  return (
    <div className="flex gap-4">
      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  )
}

function Input({
  label,
  placeholder,
  type = "text",
}: {
  label: string
  placeholder?: string
  type?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-md border border-border bg-background px-4 py-3 focus:outline-none focus:border-primary"
      />
    </div>
  )
}
