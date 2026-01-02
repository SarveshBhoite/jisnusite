import dbConnect from "@/lib/mongodb";
import Company from "@/models/Company";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    // Fetch companies where status is exactly 'pending'
    const companies = await Company.find({ status: "pending" }).sort({ createdAt: -1 });
    return NextResponse.json(companies);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}