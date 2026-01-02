// app/api/companies/public/route.ts
import dbConnect from '@/lib/mongodb';
import Company from '@/models/Company';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    // Only return companies that the Admin has already verified
    const companies = await Company.find({ status: "verified" }).sort({ createdAt: -1 });
    return NextResponse.json(companies);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}