"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  CheckCircle,
  Clock,
  Loader2,
  IndianRupee,
  MessageSquare,
} from "lucide-react";

type Status = "New" | "In Progress" | "Completed";

export default function ServiceRequestDetailPage() {
  const params = useParams();
  const [request, setRequest] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 1. FETCH SPECIFIC REQUEST
  const fetchRequestDetails = async () => {
    try {
      // Hum direct saare fetch karke filter kar sakte hain ya API ko query de sakte hain
      const res = await fetch("/api/admin/services/request", {
        cache: "no-store",
      });
      const allData = await res.json();
      const single = allData.find((r: any) => r._id === params.id);
      setRequest(single);
    } catch (err) {
      console.error("Error fetching request details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) fetchRequestDetails();
  }, [params.id]);

  // 2. UPDATE STATUS FROM DETAIL PAGE
  const updateStatus = async (newStatus: Status) => {
    try {
      const res = await fetch(`/api/admin/services/request?id=${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setRequest((prev: any) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      alert("Failed to update status");
    }
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <Loader2 className="animate-spin text-primary w-10 h-10" />
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
          Loading Details...
        </p>
      </div>
    );

  if (!request)
    return (
      <div className="pt-32 text-center">
        <p className="text-slate-500 font-bold mb-4 text-xl tracking-tighter uppercase italic">
          Request Not Found
        </p>
        <Link
          href="/dashboard/admin/service-requests"
          className="text-blue-600 font-black uppercase text-xs hover:underline"
        >
          Go Back to Dashboard
        </Link>
      </div>
    );

  return (
    <main className="pt-24 px-6 md:px-10 pb-20 max-w-6xl mx-auto">
      {/* BACK NAVIGATION */}
      <Link
        href="/dashboard/admin/service-requests"
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold text-[10px] uppercase tracking-widest mb-10 transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> Back to All Requests
      </Link>

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h1 className="font-black text-4xl text-slate-900 uppercase italic leading-none mb-3">
            Request Details
          </h1>
          <p className="text-slate-400 font-bold text-sm uppercase tracking-tight">
            Submitted on{" "}
            {new Date(request.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-3xl border border-slate-100">
          <div className="flex items-center gap-3">
            {request.status === "Completed" ? (
              <CheckCircle className="w-6 h-6 text-emerald-500" />
            ) : (
              <Clock className="w-6 h-6 text-amber-500" />
            )}
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">
                Status
              </p>
              <p className="font-bold text-slate-900 leading-none">
                {request.status}
              </p>
            </div>
          </div>
          <select
            value={request.status}
            onChange={(e) => updateStatus(e.target.value as Status)}
            className="ml-4 px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold uppercase outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: INFO & SERVICES */}
        <div className="lg:col-span-2 space-y-6">
          {/* COMPANY CARD */}
                   <div className="p-8 rounded-[2.5rem] border border-slate-100 bg-white shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">
                    Client Name
                  </p>
                  <h2 className="font-black text-2xl text-slate-900 uppercase italic">
                    {request.name || "Direct Client"}
                  </h2>
                </div>
              </div>

              {/* Phone Number Display & Action */}
              <div className="flex items-center gap-4 border-l pl-6 border-slate-100">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">
                    Contact Number
                  </p>
                 <p className="font-bold text-slate-900 text-lg">
    {request.whatsapp || "Pending..."}
  </p>
                </div>
               
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-50">
              <p className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-2 mb-2">
                <MessageSquare className="w-3 h-3 text-blue-500" /> Requirements
              </p>
              <p className="text-slate-600 font-medium italic leading-relaxed">
                "{request.message || "No specific requirements provided."}"
              </p>
            </div>
          </div>

          {/* SERVICES TABLE CARD */}
          <div className="p-8 rounded-[2.5rem] border border-slate-100 bg-white shadow-sm overflow-hidden">
            <h3 className="font-black text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-2 italic">
              Requested Services
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-50">
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Service Item
                    </th>
                    <th className="pb-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {request.services?.map((s: any, i: number) => (
                    <tr key={i} className="group">
                      <td className="py-5">
                        <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {s.name}
                        </p>
                        
                      </td>
                      <td className="py-5 text-right font-black text-slate-900">
                        ₹{s.price?.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* COMPANY & CONTACT CARD */}

        </div>

        {/* RIGHT COLUMN: FINANCIAL SUMMARY */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] sticky top-24 shadow-2xl shadow-slate-200">
            <h3 className="text-xl font-bold mb-8 border-b border-white/10 pb-4 italic">
              Billing Summary
            </h3>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-400 font-bold text-xs uppercase tracking-tighter">
                <span>Items Count</span>
                <span>{request.services?.length} Services</span>
              </div>
              <div className="flex justify-between text-slate-400 font-bold text-xs uppercase tracking-tighter">
                <span>Tax (GST)</span>
                <span>Calculated at Billing</span>
              </div>

              <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">
                    Total Amount
                  </p>
                  <p className="text-4xl font-black italic">
                    ₹{request.totalAmount?.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-white/10 rounded-2xl mb-1">
                  <IndianRupee className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-400 hover:text-white transition-all active:scale-95"
            >
              Print Details
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
