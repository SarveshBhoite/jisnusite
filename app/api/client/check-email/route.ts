import dbConnect from "@/lib/mongodb";
import Company from "@/models/Company";
import Employee from "@/models/Employee";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) return NextResponse.json({ exists: false }, { status: 400 });

  await dbConnect();
  const normalizedEmail = email.toLowerCase().trim();
  const [company, employee] = await Promise.all([
    Company.findOne({ email: normalizedEmail }).select("email"),
    Employee.findOne({ email: normalizedEmail }).select("email"),
  ]);

  return NextResponse.json({ exists: !!company || !!employee });
}
