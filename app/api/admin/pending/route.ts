import dbConnect from "@/lib/mongodb";
import Company from "@/models/Company";
import { NextResponse } from "next/server";
import { requireAdminOrEmployeePermission } from "@/lib/admin-access";

export async function GET() {
  const guard = await requireAdminOrEmployeePermission("approvals", "view");
  if (!guard.ok) return guard.response!;

  try {
    await dbConnect();
    // Fetch companies where status is exactly 'pending'
    const companies = await Company.find({ status: "pending" }).sort({ createdAt: -1 });
    return NextResponse.json(companies);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
