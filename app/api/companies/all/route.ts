import dbConnect from '@/lib/mongodb';
import Company from '@/models/Company';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    // Manage page should only show Verified companies
    const companies = await Company.find({ status: "verified" }).sort({ createdAt: -1 });
    return NextResponse.json(companies);
  } catch (error) {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}