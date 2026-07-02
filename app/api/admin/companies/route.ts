import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Company from "@/models/Company";
import { requireAdminOrEmployeePermission } from "@/lib/admin-access";

// DELETE - Delete company by ID
export async function DELETE(req: Request) {
  const guard = await requireAdminOrEmployeePermission("companies", "delete");
  if (!guard.ok) return guard.response!;

  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const deletedCompany = await Company.findByIdAndDelete(id);
    
    if (!deletedCompany) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Company deleted successfully" });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
