"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CheckCircle, XCircle, Building2, Clock, Loader2 } from "lucide-react"

export default function CompanyApprovalPage() {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)

  // 1. Fetch data from MongoDB on load
  const fetchPending = async () => {
    try {
      const res = await fetch("/api/admin/pending")
      const data = await res.json()
      setCompanies(data)
    } catch (err) {
      console.error("Error fetching companies")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPending()
  }, [])

  // 2. Handle Approval/Rejection
  const handleAction = async (id: string, action: "accepted" | "rejected") => {
    try {
      const res = await fetch(`/api/admin/approve/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      })
      if (res.ok) {
        // Remove the processed company from the UI list
        setCompanies(companies.filter((c: any) => c._id !== id))
      }
    } catch (err) {
      alert("Action failed")
    }
  }

  if (loading) return <div className="flex justify-center pt-40"><Loader2 className="animate-spin w-10 h-10 text-primary" /></div>

  return (
    <main className="pt-20 px-6 md:px-10 pb-20 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="font-display text-3xl font-semibold mb-2">Company Listing Approvals</h1>
        <p className="text-muted-foreground">Review requests from MongoDB Atlas.</p>
      </div>

      <div className="space-y-6">
        {companies.map((company: any) => (
          <div key={company._id} className="p-6 rounded-xl border border-border bg-background flex flex-col lg:flex-row gap-6 lg:items-center justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">{company.name}</h2>
                <p className="text-sm text-muted-foreground">WhatsApp: {company.whatsapp}</p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
                  <span>{company.location}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {new Date(company.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => handleAction(company._id, "accepted")}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 text-white text-sm hover:bg-green-700 transition"
              >
                <CheckCircle className="w-4 h-4" /> Approve
              </button>

              <button 
                onClick={() => handleAction(company._id, "rejected")}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-red-600 text-white text-sm hover:bg-red-700 transition"
              >
                <XCircle className="w-4 h-4" /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {companies.length === 0 && (
        <div className="text-center py-24">
          <h2 className="text-xl font-semibold mb-2">No Pending Requests 🎉</h2>
        </div>
      )}
    </main>
  )
}