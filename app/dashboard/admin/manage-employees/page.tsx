"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Loader2, Pencil, Plus, Trash2, UserCog, X } from "lucide-react";
import { EMPLOYEE_MODULES } from "@/lib/employee-permissions";

type Permission = {
  module: string;
  canView: boolean;
  canAdd: boolean;
  canUpdate: boolean;
  canDelete: boolean;
};

type Employee = {
  _id: string;
  name: string;
  email: string;
  isActive: boolean;
  permissions: Permission[];
};

const createEmptyPermissions = (): Permission[] =>
  EMPLOYEE_MODULES.map((module) => ({
    module,
    canView: false,
    canAdd: false,
    canUpdate: false,
    canDelete: false,
  }));

const moduleLabel = (module: string) =>
  module
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export default function ManageEmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    isActive: true,
    permissions: createEmptyPermissions(),
  });

  const fetchEmployees = async () => {
    try {
      const res = await fetch("/api/admin/employees", { cache: "no-store" });
      const data = await res.json();
      setEmployees(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const activeCount = useMemo(() => employees.filter((item) => item.isActive).length, [employees]);

  const openCreateModal = () => {
    setEditingEmployee(null);
    setForm({
      name: "",
      email: "",
      password: "",
      isActive: true,
      permissions: createEmptyPermissions(),
    });
    setIsModalOpen(true);
  };

  const openEditModal = (employee: Employee) => {
    const permissionMap = new Map((employee.permissions || []).map((item) => [item.module, item]));
    setEditingEmployee(employee);
    setForm({
      name: employee.name,
      email: employee.email,
      password: "",
      isActive: employee.isActive,
      permissions: EMPLOYEE_MODULES.map((module) => ({
        module,
        canView: Boolean(permissionMap.get(module)?.canView),
        canAdd: Boolean(permissionMap.get(module)?.canAdd),
        canUpdate: Boolean(permissionMap.get(module)?.canUpdate),
        canDelete: Boolean(permissionMap.get(module)?.canDelete),
      })),
    });
    setIsModalOpen(true);
  };

  const updatePermission = (module: string, key: keyof Permission, value: boolean) => {
    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.map((item) => (item.module === module ? { ...item, [key]: value } : item)),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const isEdit = Boolean(editingEmployee?._id);
    const endpoint = isEdit ? `/api/admin/employees/${editingEmployee?._id}` : "/api/admin/employees";
    const method = isEdit ? "PATCH" : "POST";

    const payload: any = {
      name: form.name,
      email: form.email,
      isActive: form.isActive,
      permissions: form.permissions,
    };

    if (!isEdit || form.password) {
      payload.password = form.password;
    }

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (!res.ok) {
      const err = await res.json();
      alert(err?.error || "Failed to save employee");
      return;
    }

    setIsModalOpen(false);
    fetchEmployees();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this employee account?")) return;
    const res = await fetch(`/api/admin/employees/${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchEmployees();
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-20 pt-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link href="/dashboard/admin" className="mb-2 inline-flex items-center gap-1 text-sm font-bold text-slate-600 hover:text-blue-600">
              <ChevronLeft className="h-4 w-4" /> Back to Home
            </Link>
            <h1 className="text-3xl font-black text-slate-900">Manage Employees</h1>
            <p className="text-slate-500">Total: {employees.length} | Active: {activeCount}</p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 font-bold text-white hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" /> Add Employee
          </button>
        </div>

        <div className="space-y-4">
          {employees.map((employee) => {
            const modules = employee.permissions?.filter((item) => item.canView).length || 0;
            return (
              <div key={employee._id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-black text-slate-900">{employee.name}</h2>
                    <p className="text-sm text-slate-500">{employee.email}</p>
                    <div className="mt-2 flex items-center gap-2 text-xs font-bold uppercase">
                      <span className={`rounded-full px-3 py-1 ${employee.isActive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                        {employee.isActive ? "Active" : "Inactive"}
                      </span>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">{modules} modules</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openEditModal(employee)} className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:text-blue-600">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(employee._id)} className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {employees.length === 0 && (
            <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-white p-12 text-center text-slate-500">
              <UserCog className="mx-auto mb-3 h-10 w-10 text-slate-300" />
              No employee accounts found.
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end bg-slate-900/60 p-0 md:items-center md:p-6 mt-25">
          <div className="max-h-[92vh] w-full overflow-hidden rounded-t-3xl bg-white md:mx-auto md:max-w-5xl md:rounded-3xl">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="text-lg font-black text-slate-900">{editingEmployee ? "Edit Employee" : "Add Employee"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="rounded-full p-2 text-slate-500 hover:bg-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="max-h-[80vh] overflow-y-auto p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  required
                  placeholder="Employee name"
                  className="rounded-xl border border-slate-200 px-4 py-3"
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                />
                <input
                  required
                  type="email"
                  placeholder="Employee email"
                  className="rounded-xl border border-slate-200 px-4 py-3"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                />
                <input
                  type="password"
                  placeholder={editingEmployee ? "New password (optional)" : "Password"}
                  className="rounded-xl border border-slate-200 px-4 py-3"
                  value={form.password}
                  onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                  required={!editingEmployee}
                />
                <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) => setForm((prev) => ({ ...prev, isActive: e.target.checked }))}
                  />
                  Employee account is active
                </label>
              </div>

              <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full min-w-[760px] border-collapse text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-black text-slate-500">Module</th>
                      <th className="px-4 py-3 text-center font-black text-slate-500">View</th>
                      <th className="px-4 py-3 text-center font-black text-slate-500">Add</th>
                      <th className="px-4 py-3 text-center font-black text-slate-500">Update</th>
                      <th className="px-4 py-3 text-center font-black text-slate-500">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {form.permissions.map((item) => (
                      <tr key={item.module} className="border-t">
                        <td className="px-4 py-3 font-bold text-slate-800">{moduleLabel(item.module)}</td>
                        <td className="px-4 py-3 text-center">
                          <input type="checkbox" checked={item.canView} onChange={(e) => updatePermission(item.module, "canView", e.target.checked)} />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input type="checkbox" checked={item.canAdd} onChange={(e) => updatePermission(item.module, "canAdd", e.target.checked)} />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input type="checkbox" checked={item.canUpdate} onChange={(e) => updatePermission(item.module, "canUpdate", e.target.checked)} />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input type="checkbox" checked={item.canDelete} onChange={(e) => updatePermission(item.module, "canDelete", e.target.checked)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                disabled={saving}
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-bold text-white hover:bg-blue-700"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />} {editingEmployee ? "Update Employee" : "Create Employee"}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}