import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Company from "@/models/Company";
import ServiceRequest from "@/models/ServiceRequest";

export async function GET() {
  try {
    await connectDB();

    const [totalVerified, paidCount, freeCount, pendingCount, newRequestsCount] = await Promise.all([
      // Only count Verified companies for the main total
      Company.countDocuments({ status: "verified" }),
      
      // Verified AND paid
      Company.countDocuments({ status: "verified", planType: "paid" }),

      // Verified AND free
      Company.countDocuments({ status: "verified", planType: "free" }),

      // Strictly pending
      Company.countDocuments({ status: "pending" }),

      ServiceRequest.countDocuments({ status: "New" })

    ]);

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