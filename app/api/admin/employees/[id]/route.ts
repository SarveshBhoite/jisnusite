import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import Employee from "@/models/Employee";
import Company from "@/models/Company";
import { normalizePermissions } from "@/lib/employee-permissions";
import { requireAdminOnly } from "@/lib/admin-access";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdminOnly();
  if (!guard.ok) return guard.response!;

  await dbConnect();

  try {
    const body = await req.json();
    const { id } = await params;
    const email = body?.email ? String(body.email).trim().toLowerCase() : undefined;

    if (email) {
      const [existingEmployee, existingCompany] = await Promise.all([
        Employee.findOne({ email, _id: { $ne: id } }).select("_id"),
        Company.findOne({ email }).select("_id"),
      ]);

      if (existingEmployee || existingCompany) {
        return NextResponse.json({ error: "Email already in use" }, { status: 409 });
      }
    }

    const updatePayload: any = {
      ...(body?.name ? { name: String(body.name).trim() } : {}),
      ...(email ? { email } : {}),
      ...(typeof body?.isActive === "boolean" ? { isActive: body.isActive } : {}),
      ...(Array.isArray(body?.permissions)
        ? { permissions: normalizePermissions(body.permissions) }
        : {}),
    };

    if (body?.password) {
      updatePayload.password = await bcrypt.hash(String(body.password), 10);
    }

    const updated = await Employee.findByIdAndUpdate(id, updatePayload, { new: true });
    if (!updated) {
      return NextResponse.json({ error: "Employee not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to update employee" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdminOnly();
  if (!guard.ok) return guard.response!;

  await dbConnect();
  const { id } = await params;
  const deleted = await Employee.findByIdAndDelete(id);
  if (!deleted) {
    return NextResponse.json({ error: "Employee not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
