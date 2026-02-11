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
  Printer,
} from "lucide-react";

type Status = "New" | "In Progress" | "Completed";

export default function ServiceRequestDetailPage() {
  const params = useParams();
  const [request, setRequest] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchRequestDetails = async () => {
    try {
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
        <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Loading Details...
        </p>
      </div>
    );

  if (!request)
    return (
      <div className="pt-32 px-6 text-center">
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
    <main className="pt-20 md:pt-24 px-4 md:px-10 pb-20 max-w-6xl mx-auto">
      {/* BACK NAVIGATION */}
      <Link
        href="/dashboard/admin/service-requests"
        className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold text-[9px] md:text-[10px] uppercase tracking-widest mb-6 md:mb-10 transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> Back to All Requests
      </Link>

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 md:mb-12">
        <div>
          <h1 className="font-black text-3xl md:text-4xl text-slate-900 uppercase italic leading-none mb-3">
            Request Details
          </h1>
          <p className="text-slate-400 font-bold text-[10px] md:text-sm uppercase tracking-tight">
            Submitted on{" "}
            {new Date(request.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="w-full md:w-auto flex items-center justify-between md:justify-start gap-4 bg-white md:bg-slate-50 p-4 rounded-[1.5rem] md:rounded-3xl border border-slate-100 shadow-sm md:shadow-none">
          <div className="flex items-center gap-3">
            {request.status === "Completed" ? (
              <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" />
            ) : (
              <Clock className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />
            )}
            <div>
              <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase leading-none mb-1">
                Status
              </p>
              <p className="font-bold text-slate-900 leading-none text-sm md:text-base">
                {request.status}
              </p>
            </div>
          </div>
          <select
            value={request.status}
            onChange={(e) => updateStatus(e.target.value as Status)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-[10px] font-bold uppercase outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="New">New</option>
            <option value="In Progress">Progress</option>
            <option value="Completed">Done</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* LEFT COLUMN: INFO & SERVICES */}
        <div className="lg:col-span-2 space-y-6">
          {/* CLIENT CARD */}
          <div className="p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 bg-white shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase leading-none mb-1">
                    Client Name
                  </p>
                  <h2 className="font-black text-xl md:text-2xl text-slate-900 uppercase italic truncate">
                    {request.name || "Direct Client"}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-4 border-l-0 md:border-l pl-0 md:pl-6 border-slate-100">
                <div>
                  <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase leading-none mb-1">
                    Contact Number
                  </p>
                  <p className="font-bold text-slate-900 text-base md:text-lg">
                    {request.whatsapp || "Pending..."}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-slate-50">
              <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase flex items-center gap-2 mb-3">
                <MessageSquare className="w-3 h-3 text-blue-500" /> Requirements
              </p>
              <p className="text-sm md:text-slate-600 font-medium italic leading-relaxed bg-slate-50 md:bg-transparent p-4 md:p-0 rounded-2xl">
                "{request.message || "No specific requirements provided."}"
              </p>
            </div>
          </div>

          {/* SERVICES TABLE CARD */}
          <div className="p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 bg-white shadow-sm overflow-hidden">
            <h3 className="font-black text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-2 italic text-sm md:text-base">
              Requested Services
            </h3>

            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-left border-collapse min-w-[300px] px-2">
                <thead>
                  <tr className="border-b border-slate-50">
                    <th className="pb-4 px-2 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Service Item
                    </th>
                    <th className="pb-4 px-2 text-right text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {request.services?.map((s: any, i: number) => (
                    <tr key={i} className="group">
                      <td className="py-4 px-2">
                        <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-xs md:text-sm">
                          {s.name}
                        </p>
                      </td>
                      <td className="py-4 px-2 text-right font-black text-slate-900 text-xs md:text-sm">
                        ₹{s.price?.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: FINANCIAL SUMMARY */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 text-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] md:sticky md:top-24 shadow-2xl shadow-slate-200">
            <h3 className="text-lg md:text-xl font-bold mb-6 md:mb-8 border-b border-white/10 pb-4 italic">
              Billing Summary
            </h3>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-400 font-bold text-[10px] uppercase tracking-tighter">
                <span>Items Count</span>
                <span className="text-white">{request.services?.length} Services</span>
              </div>
              <div className="flex justify-between text-slate-400 font-bold text-[10px] uppercase tracking-tighter">
                <span>Tax (GST)</span>
                <span className="text-white">Calculated at Billing</span>
              </div>

              <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                <div>
                  <p className="text-[9px] md:text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">
                    Total Amount
                  </p>
                  <p className="text-3xl md:text-4xl font-black italic">
                    ₹{request.totalAmount?.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-white/10 rounded-2xl mb-1 shrink-0">
                  <IndianRupee className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-400 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" /> Print Details
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}