"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, ClipboardList, ArrowRight, Loader2 } from "lucide-react";

interface ServiceItem {
  name: string;
  price: number;
}

interface ServiceRequest {
  _id: string;
  name: string;
  whatsapp: string;
  services: ServiceItem[];
  totalAmount: number;
  message?: string;
  status: "New" | "In Progress" | "Completed";
  createdAt: string;
}

export default function ServiceRequestsPage() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("/api/admin/services/request", { cache: "no-store" });
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

  return (
    <div className="space-y-10">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="font-display text-2xl font-semibold mb-2">Service Requests</h2>
          <p className="text-muted-foreground">Track your service progress and status.</p>
        </div>
        <Link href="/services">
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-white font-medium hover:bg-primary/90 transition">
            New Request <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>

      {/* REQUESTS LIST */}
      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" />
          </div>
        ) : requests.length > 0 ? (
          requests.map((req, index) => {
            const uniqueServices = Array.from(new Set(req.services.map((s) => s.name)));

            return (
              <div
                key={req._id}
                className="group p-6 rounded-xl bg-background border border-border hover:border-primary/40 transition relative overflow-hidden shadow-sm"
              >
                {/* Request Main Serial Number Badge (Top-Left) */}
                <div className="absolute top-0 left-0 bg-primary/10 text-primary text-[10px] font-bold px-3 py-1 rounded-br-lg">
                  REQ #{index + 1}
                </div>

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pt-3">
                  {/* Left Side: Services List with Numbers */}
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      <ClipboardList className="w-3.5 h-3.5 text-primary" />
                      ID: {req._id.slice(-6).toUpperCase()}
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                        Services Requested:
                      </p>
                      <div className="grid gap-2">
                        {uniqueServices.map((serviceName, sIndex) => (
                          <div key={sIndex} className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-[10px] font-bold italic">
                              {sIndex + 1}
                            </span>
                            <h3 className="font-display text-lg font-bold text-slate-900 italic uppercase">
                              {serviceName}
                            </h3>
                          </div>
                        ))}
                      </div>
                    </div>

                    {req.message && (
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground italic">"{req.message}"</p>
                      </div>
                    )}
                  </div>

                  {/* Right Side: Status, Price & Date */}
                  <div className="flex flex-col items-start md:items-end gap-4 min-w-[150px]">
                    <StatusBadge status={req.status} />
                    
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">Total Amount</p>
                      <p className="text-xl font-black text-primary">₹{req.totalAmount.toLocaleString()}</p>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                      <Calendar className="w-3 h-3" />
                      {new Date(req.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-20 border-2 border-dashed rounded-2xl">
            <p className="text-muted-foreground">No service requests found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: "New" | "In Progress" | "Completed" }) {
  const styles: Record<string, string> = {
    New: "bg-blue-500/10 text-blue-600 border-blue-200",
    "In Progress": "bg-yellow-500/10 text-yellow-600 border-yellow-200",
    Completed: "bg-green-500/10 text-green-600 border-green-200",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter border ${styles[status]}`}>
      {status}
    </span>
  );
}