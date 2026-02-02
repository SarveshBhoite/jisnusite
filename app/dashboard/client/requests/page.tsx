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
          setError(true); // User not logged in
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
    <div className="text-center py-20">
      <p className="text-red-500 font-bold">Please log in to view your requests.</p>
    </div>
  );

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">My Service Progress</h2>
          <p className="text-slate-500 text-sm">View and track your active service orders.</p>
        </div>
      </div>

      {/* LIST SECTION */}
      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin" /></div>
        ) : requests.length > 0 ? (
          requests.map((req, index) => (
            <div key={req._id} className="p-6 bg-white border rounded-2xl shadow-sm">
               {/* Same Card UI as before */}
               <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-blue-600 uppercase">REQ #{index + 1}</span>
                    <h3 className="text-lg font-black mt-1 italic uppercase">
                       {req.services.map(s => s.name).join(", ")}
                    </h3>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700">{req.status}</span>
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

                    </div>n
               </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 border-2 border-dashed rounded-3xl">
            <p className="text-slate-400 font-medium italic">You haven't requested any services yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}