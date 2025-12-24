"use client"

import Link from "next/link"
import { Upload, ArrowLeft } from "lucide-react"

export default function ListYourCompanyPage() {
  return (
    <main className="pt-24">

      {/* ===== HEADER ===== */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href="/companies"
            className="inline-flex items-center gap-2 text-sm text-primary font-medium mb-6 hover:translate-x-1 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Companies
          </Link>

          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">
            List Your Company
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Submit your company details for review. Once approved by our team,
            your company will be featured on our platform.
          </p>
        </div>
      </section>

      {/* ===== FORM ===== */}
      <section className="pb-28">
        <div className="max-w-4xl mx-auto px-4">
          <div className="rounded-2xl border border-border bg-background p-8 md:p-10">

            <form className="space-y-8">

              {/* ===== COMPANY DETAILS ===== */}
              <div>
                <h2 className="font-display text-xl font-semibold mb-4">
                  Company Information
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your company name"
                      className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Category
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:border-primary"
                    >
                      <option value="">Select category</option>
                      <option>Technology</option>
                      <option>Healthcare</option>
                      <option>Finance</option>
                      <option>Retail</option>
                      <option>Education</option>
                      <option>Sustainability</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="City, Country"
                      className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Founded Year
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 2020"
                      className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium mb-2">
                    Short Description
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Briefly describe what your company does"
                    className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:border-primary resize-none"
                  />
                </div>
              </div>

              {/* ===== LOGO UPLOAD ===== */}
              <div>
                <h2 className="font-display text-xl font-semibold mb-4">
                  Company Logo
                </h2>

                <div className="flex items-center gap-4">
                  <div className="h-24 w-24 rounded-lg border border-dashed border-border flex items-center justify-center text-muted-foreground">
                    <Upload className="w-6 h-6" />
                  </div>

                  <div>
                    <input type="file" accept="image/*" />
                    <p className="text-xs text-muted-foreground mt-2">
                      Optional. If not uploaded, a placeholder logo will be shown.
                    </p>
                  </div>
                </div>
              </div>

              {/* ===== OWNER ACCOUNT ===== */}
              <div>
                <h2 className="font-display text-xl font-semibold mb-4">
                  Owner Account
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="owner@company.com"
                      className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Create a password"
                      className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mt-3">
                  You will use these credentials later to manage your company
                  profile after approval.
                </p>
              </div>

              {/* ===== SUBMIT ===== */}
              <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground max-w-md">
                  After submission, our team will review your details. Approval
                  usually takes 24–48 hours.
                </p>

                <button
                  type="submit"
                  className="px-8 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition"
                >
                  Submit for Review
                </button>
              </div>

            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
