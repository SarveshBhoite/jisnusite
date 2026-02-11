"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, ClipboardList, ArrowRight, Loader2 } from "lucide-react";

interface ServiceRequest {
  totalAmount: any;
  createdAt: string;
  _id: string;
  services: { name: string }[];
  status: string;
}

export default function ServiceRequestsPage() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("/api/admin/services/request");
        
        if (res.status === 401) {
          setError(true);
          return;
        }

        const data = await res.json();
        setRequests(data);
      } catch (err) {
        console.error("Failed to fetch requests", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  if (error) return (
    <div className="text-center py-20 px-4">
      <p className="text-red-500 font-bold">Please log in to view your requests.</p>
    </div>
  );

  return (
    <div className="space-y-6 md:space-y-10 px-1 md:px-0">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">My Service Progress</h2>
          <p className="text-slate-500 text-xs md:text-sm">View and track your active service orders.</p>
        </div>
      </div>

      {/* LIST SECTION */}
      <div className="space-y-4 md:space-y-6">
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" /></div>
        ) : requests.length > 0 ? (
          requests.map((req, index) => (
            <div key={req._id} className="p-4 md:p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
               
               <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  {/* Left: ID and Service Names */}
                  <div className="space-y-1">
                    <span className="text-[10px] md:text-xs font-bold text-blue-600 uppercase tracking-wider">
                      REQ #{index + 1}
                    </span>
                    <h3 className="text-base md:text-lg font-black italic uppercase leading-tight text-slate-900">
                       {req.services.map(s => s.name).join(", ")}
                    </h3>
                    
                    {/* Status Badge - Visible on Mobile under title */}
                    <div className="pt-1 md:hidden">
                       <StatusBadge status={req.status} />
                    </div>
                  </div>

                  {/* Right: Status (Desktop Only), Price & Date */}
                  <div className="flex flex-row md:flex-col justify-between items-center md:items-end w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                    
                    {/* Status Badge - Hidden on Mobile here, visible on Desktop */}
                    <div className="hidden md:block mb-3">
                       <StatusBadge status={req.status} />
                    </div>

                    <div className="text-left md:text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Total Amount</p>
                      <p className="text-lg md:text-xl font-black text-slate-900">₹{req.totalAmount.toLocaleString()}</p>
                    </div>

                    <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-md mt-0 md:mt-2">
                      <Calendar className="w-3 h-3 text-blue-500" />
                      {new Date(req.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
               </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 border-2 border-dashed rounded-3xl bg-slate-50/50">
            <ClipboardList className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-400 font-medium italic">You haven't requested any services yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Separate StatusBadge component for cleaner code
function StatusBadge({ status }: { status: string }) {
  const getStyles = (s: string) => {
    const low = s.toLowerCase();
    if (low.includes("complete")) return "bg-green-50 text-green-600 border-green-100";
    if (low.includes("progress")) return "bg-amber-50 text-amber-600 border-amber-100";
    return "bg-blue-50 text-blue-600 border-blue-100";
  };

  return (
    <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${getStyles(status)}`}>
      {status}
    </span>
  );
}