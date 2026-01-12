import dbConnect from "@/lib/mongodb";
import Company from "@/models/Company";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) return NextResponse.json({ exists: false }, { status: 400 });

  await dbConnect();
  const company = await Company.findOne({ email }).select("email");

  return NextResponse.json({ exists: !!company });
}