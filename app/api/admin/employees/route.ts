import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import Employee from "@/models/Employee";
import Company from "@/models/Company";
import { normalizePermissions } from "@/lib/employee-permissions";
import { requireAdminOnly } from "@/lib/admin-access";

export async function GET() {
  const guard = await requireAdminOnly();
  if (!guard.ok) return guard.response!;

  await dbConnect();
  const employees = await Employee.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json(employees);
}

export async function POST(req: Request) {
  const guard = await requireAdminOnly();
  if (!guard.ok) return guard.response!;

  await dbConnect();
  try {
    const body = await req.json();
    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim().toLowerCase();
    const password = String(body?.password || "");

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email and password are required" }, { status: 400 });
    }

    const [existingEmployee, existingCompany] = await Promise.all([
      Employee.findOne({ email }).select("_id"),
      Company.findOne({ email }).select("_id"),
    ]);

    if (existingEmployee || existingCompany) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = await Employee.create({
      name,
      email,
      password: hashedPassword,
      isActive: body?.isActive !== false,
      permissions: normalizePermissions(body?.permissions),
    });

    return NextResponse.json(employee, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to create employee" }, { status: 500 });
  }
}