"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Building2,
  CheckCircle,
  Clock,
  DollarSign,
  Image,
  ClipboardList,
  Loader2,
  Users,
  ShieldCheck,
  Zap
} from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    total: 0,
    paid: 0,
    free: 0,
    pending: 0,
    requests: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/admin/stats");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        
        // Ensure data mapping matches your API response fields
        setStats({
          total: data.total || 0,
          paid: data.paid || 0,
          free: data.free || 0,
          pending: data.pending || 0,
          requests: data.requests || 0,
        });
      } catch (err) {
        console.error("Failed to load stats:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <main className="pt-20 px-6 md:px-10 pb-20 bg-slate-50/30 min-h-screen">
      {/* ===== HEADER ===== */}
      <div className="mb-10 pt-10">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 uppercase">
          System Overview
        </h1>
        <p className="text-slate-500 font-medium mt-1">
          Managing <span className="text-blue-600 font-bold">{stats.total}</span> total businesses across all tiers.
        </p>
      </div>

      {/* ===== KPI CARDS - NOW WITH PAID & FREE LOGIC ===== */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-14">
        {loading ? (
          Array(5).fill(0).map((_, i) => (
            <div key={i} className="h-28 bg-white animate-pulse rounded-2xl border border-slate-200 shadow-sm" />
          ))
        ) : (
          <>
            <KpiCard
              title="Total Companies"
              value={stats.total.toString()}
              icon={<Building2 className="w-6 h-6" />}
              accent="blue"
            />
            <KpiCard
              title="Paid Partners"
              value={stats.paid.toString()}
              icon={<ShieldCheck className="w-6 h-6" />}
              accent="amber"
             
            />
            <KpiCard
              title="Free Listings"
              value={stats.free.toString()}
              icon={<Zap className="w-6 h-6" />}
              accent="green"
              
            />
            <KpiCard
              title="Pending Companies request"
              value={stats.pending.toString()}
              icon={<Clock className="w-6 h-6" />}
              accent="red"
              
            />
            <KpiCard
              title="New service Requests"
              value={stats.requests.toString()}
              icon={<ClipboardList className="w-6 h-6" />}
              accent="purple"
              
            />

            
          </>
        )}
      </section>




      {/* ===== QUICK ACTIONS ===== */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickAction
            title="Manage All Companies"
            href="/dashboard/admin/manage-companies"
            icon={<Building2 />}
          />
          <QuickAction
            title="New Company Requests"
            href="/dashboard/admin/approvals"
            icon={<Clock />}
          />
          <QuickAction
            title=" Manage Service "
            href="/dashboard/admin/services"
            icon={<ClipboardList />}
          />
          <QuickAction
            title="Service request"
            href="/dashboard/admin/service-requests"
            icon={<ClipboardList />}
          />
          <QuickAction
            title="Manage Portfolio"
            href="/dashboard/admin/portfolio"
            icon={<Image />}
          />
           <QuickAction
            title="Manage Ads"
            href="/dashboard/admin/ads"
            icon={<Image />}
          />

            <QuickAction
            title="Blogs Publish"
            href="/dashboard/admin/blog"
            icon={<Image />}
          />
        </div>
      </section>

      {/* ===== ACTIVITY & STATUS SUMMARY ===== */}
      <section className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-slate-800 mb-6">
            Recent Activity
          </h2>
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <ActivityItem
              title="System Updated"
              subtitle="All company stats have been refreshed"
              time="Just Now"
            />
            <ActivityItem
              title="TechStart Innovation"
              subtitle="Company listing pending review"
              time="2 hours ago"
            />
            <ActivityItem
              title="Media assets added"
              subtitle="New gallery images uploaded"
              time="Yesterday"
            />
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Live Status</h2>
          <div className="space-y-4">
            <StatusCard
              title="Revenue Generating"
              value={stats.paid}
              description="Approved paid accounts"
            />
            <StatusCard
              title="Standard Tier"
              value={stats.free}
              description="Approved free accounts"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

/* ===== REUSABLE UI COMPONENTS ===== */

function KpiCard({
  title,
  value,
  icon,
  accent,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  accent: string;
}) {
  const colors: any = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    green: "bg-green-50 text-green-600 border-green-100",
    red: "bg-red-50 text-red-600 border-red-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
  };

  return (
    <div className="p-6 rounded-2xl border border-slate-200 bg-white flex items-center justify-between shadow-sm hover:shadow-md transition-all group">
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
          {title}
        </p>
        <p className="text-3xl font-black text-slate-900 group-hover:scale-110 transition-transform origin-left">
          {value}
        </p>
      </div>
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-inner ${colors[accent]}`}
      >
        {icon}
      </div>
    </div>
  );
}

function QuickAction({
  title,
  href,
  icon,
}: {
  title: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <div className="p-5 rounded-2xl border border-slate-100 bg-white hover:border-blue-500/30 hover:bg-blue-50/20 transition-all cursor-pointer flex flex-col items-center gap-3 text-center shadow-sm hover:shadow-lg group">
        <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center group-hover:bg-blue-600 transition-colors shadow-md">
          {icon}
        </div>
        <span className="font-bold text-sm text-slate-700">{title}</span>
      </div>
    </Link>
  );
}

function ActivityItem({
  title,
  subtitle,
  time,
}: {
  title: string;
  subtitle: string;
  time: string;
}) {
  return (
    <div className="flex items-start justify-between px-6 py-5 border-b last:border-b-0 border-slate-100 hover:bg-slate-50 transition-colors">
      <div>
        <p className="font-bold text-slate-900">{title}</p>
        <p className="text-sm text-slate-500 font-medium">{subtitle}</p>
      </div>
      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full uppercase tracking-tighter">
        {time}
      </span>
    </div>
  );
}

function StatusCard({
  title,
  value,
  description,
}: {
  title: string;
  value: number;
  description: string;
}) {
  return (
    <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-slate-300 transition-all">
      <h3 className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">
        {title}
      </h3>
      <p className="text-2xl font-black text-slate-900 mb-1">
        {value} Companies
      </p>
      <p className="text-xs text-slate-500 font-medium">{description}</p>
    </div>
  );
}
