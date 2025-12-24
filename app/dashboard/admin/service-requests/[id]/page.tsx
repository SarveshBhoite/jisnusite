"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  Building2,
  CheckCircle,
  Clock,
} from "lucide-react"

type Status = "New" | "In Progress" | "Completed"

const requestData: Record<string, any> = {
  "req-001": {
    company: "TechStart Innovation",
    date: "19 Jan 2025",
    status: "In Progress" as Status,
    message:
      "We need branding creatives and a full website for product launch.",
    services: [
      { name: "Graphic Design", quantity: 5, price: 500 },
      { name: "Video Editing", quantity: 2, price: 800 },
      { name: "Website Development", quantity: 1, price: 15000 },
    ],
  },
}

export default function ServiceRequestDetailPage() {
  const params = useParams()
  const request = requestData[params.id as string]

  if (!request) {
    return (
      <main className="pt-20 flex justify-center items-center">
        <p>Request not found</p>
      </main>
    )
  }

  const subtotal = request.services.reduce(
    (sum: number, s: any) => sum + s.quantity * s.price,
    0
  )

  return (
    <main className="pt-20 px-6 md:px-10 pb-20 max-w-6xl mx-auto">

      {/* ===== BACK ===== */}
      <Link
        href="/dashboard/admin/service-requests"
        className="flex items-center gap-2 text-primary font-medium mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Requests
      </Link>

      {/* ===== HEADER ===== */}
      <div className="mb-10">
        <h1 className="font-display text-3xl font-semibold mb-2">
          Service Request Details
        </h1>
        <p className="text-muted-foreground">
          Submitted on {request.date}
        </p>
      </div>

      {/* ===== COMPANY INFO ===== */}
      <div className="p-6 rounded-xl border border-border bg-background mb-10">
        <div className="flex items-center gap-3 mb-2">
          <Building2 className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-lg">
            {request.company}
          </h2>
        </div>

        <p className="text-sm text-muted-foreground max-w-3xl">
          {request.message}
        </p>
      </div>

      {/* ===== SERVICES TABLE ===== */}
      <div className="p-6 rounded-xl border border-border bg-background mb-10">
        <h3 className="font-semibold text-lg mb-4">
          Requested Services
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left py-3">Service</th>
                <th className="text-center py-3">Qty</th>
                <th className="text-right py-3">Unit Price</th>
                <th className="text-right py-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {request.services.map((s: any, i: number) => (
                <tr key={i} className="border-b border-border">
                  <td className="py-4 font-medium">
                    {s.name}
                  </td>
                  <td className="py-4 text-center">
                    {s.quantity}
                  </td>
                  <td className="py-4 text-right">
                    ₹{s.price}
                  </td>
                  <td className="py-4 text-right font-semibold">
                    ₹{s.quantity * s.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TOTAL */}
        <div className="flex justify-end mt-6">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">
              Total Amount
            </p>
            <p className="text-2xl font-semibold text-primary">
              ₹{subtotal}
            </p>
          </div>
        </div>
      </div>

      {/* ===== STATUS SECTION ===== */}
      <div className="p-6 rounded-xl border border-border bg-background flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

        <div className="flex items-center gap-3">
          {request.status === "Completed" ? (
            <CheckCircle className="w-6 h-6 text-green-600" />
          ) : (
            <Clock className="w-6 h-6 text-yellow-600" />
          )}

          <div>
            <p className="text-sm text-muted-foreground">
              Current Status
            </p>
            <p className="font-semibold text-lg">
              {request.status}
            </p>
          </div>
        </div>

        <select
          defaultValue={request.status}
          className="px-4 py-2 rounded-md border border-border bg-background focus:outline-none focus:border-primary"
        >
          <option>New</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

      </div>

    </main>
  )
}
