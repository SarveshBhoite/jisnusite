import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Company from "@/models/Company";

export async function GET() {
  try {
    await connectDB();

    const [totalVerified, paidCount, freeCount, pendingCount] = await Promise.all([
      // Only count Verified companies for the main total
      Company.countDocuments({ status: "verified" }),
      
      // Verified AND paid
      Company.countDocuments({ status: "verified", planType: "paid" }),

      // Verified AND free
      Company.countDocuments({ status: "verified", planType: "free" }),

      // Strictly pending
      Company.countDocuments({ status: "pending" })
    ]);

    return NextResponse.json({
      total: totalVerified,
      paid: paidCount,
      free: freeCount,
      pending: pendingCount,
      requests: 0
    });
  } catch (error) {
    return NextResponse.json({ error: "Stats Error" }, { status: 500 });
  }
}