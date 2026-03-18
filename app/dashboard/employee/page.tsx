"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ArrowRight, ShieldCheck } from "lucide-react";

type SessionPermission = {
  module: string;
  canView: boolean;
  canAdd: boolean;
  canUpdate: boolean;
  canDelete: boolean;
};

function labelFromModule(module: string) {
  return module
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function EmployeeDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      if (session?.user?.role === "admin") {
        router.push("/dashboard/admin");
      } else if (session?.user?.role !== "employee") {
        router.push("/dashboard/client");
      }
    }
  }, [status, session, router]);

  const permissions = ((session?.user as any)?.permissions || []) as SessionPermission[];
  const modules = permissions.filter((item) => item.canView);

  return (
    <main className="min-h-screen bg-slate-50 px-9 py-24 md:px-10 mt-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900">Employee Dashboard</h1>
          <p className="mt-2 text-slate-500">Access only the modules assigned by admin.</p>
        </div>

        {modules.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
            <ShieldCheck className="mx-auto mb-3 h-10 w-10 text-slate-300" />
            <p className="font-bold text-slate-700">No module access assigned yet.</p>
            <p className="text-sm text-slate-500">Please contact your admin to enable permissions.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((item) => (
              <Link
                key={item.module}
                href={`/dashboard/admin/${item.module}`}
                className="rounded-3xl border border-slate-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-md"
              >
                <h2 className="text-lg font-black text-slate-900">{labelFromModule(item.module)}</h2>
                <p className="mt-2 text-sm text-slate-500">Allowed actions for this module:</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold uppercase">
                  {item.canAdd && <span className="rounded-full bg-green-50 px-3 py-1 text-green-700">Add</span>}
                  {item.canUpdate && <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">Update</span>}
                  {item.canDelete && <span className="rounded-full bg-red-50 px-3 py-1 text-red-700">Delete</span>}
                  {!item.canAdd && !item.canUpdate && !item.canDelete && (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">View Only</span>
                  )}
                </div>
                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-blue-600">
                  Open Module <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}