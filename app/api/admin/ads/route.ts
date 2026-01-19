import { NextResponse } from "next/server";
import dbConnect from '@/lib/mongodb'; // Your DB connection helper
import Ad from "@/models/Ad";

// GET: Fetch for Frontend
export async function GET() {
  await dbConnect();
  const ads = await Ad.find({ active: true }).sort({ createdAt: -1 });
  return NextResponse.json(ads);
}

// POST: Add from Admin Panel
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const newAd = await Ad.create(body);
    return NextResponse.json(newAd, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create ad" }, { status: 500 });
  }
}