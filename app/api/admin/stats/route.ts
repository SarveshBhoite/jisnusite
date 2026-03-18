import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Company from "@/models/Company";
import ServiceRequest from "@/models/ServiceRequest";
import { requireAdminOnly } from "@/lib/admin-access";

export async function GET() {
  const guard = await requireAdminOnly();
  if (!guard.ok) return guard.response!;

  try {
    await connectDB();

    const [verifiedCompanies, completedServices, pendingCount, newRequestsCount] = await Promise.all([
      Company.find({ status: "verified" }).select("email planType plan").lean(),
      ServiceRequest.find({ status: "Completed" }).select("email").lean(),
      Company.countDocuments({ status: "pending" }),
      ServiceRequest.countDocuments({ status: "New" }),
    ]);

    const paidEmails = new Set(
      completedServices
        .map((s: any) => s.email?.toLowerCase().trim())
        .filter(Boolean)
    );

    const paidCount = verifiedCompanies.filter((company: any) => {
      const email = (company.email || "").toLowerCase().trim();
      return (
        company.planType === "paid" ||
        company.plan === "paid" ||
        paidEmails.has(email)
      );
    }).length;

    const totalVerified = verifiedCompanies.length;
    const freeCount = totalVerified - paidCount;

    return NextResponse.json({
      total: totalVerified,
      paid: paidCount,
      free: freeCount,
      pending: pendingCount,
      requests: newRequestsCount
    });
  } catch (error) {
    return NextResponse.json({ error: "Stats Error" }, { status: 500 });
  }
}
