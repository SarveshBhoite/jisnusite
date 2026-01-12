import dbConnect from "@/lib/mongodb";
import Company from "@/models/Company";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// app/api/seed/route.ts
export async function GET() {
  try {
    await dbConnect();
    const hashedPassword = await bcrypt.hash("Password123", 10);

    // Use findOneAndUpdate to FORCE the role to admin even if the user exists
    await Company.findOneAndUpdate(
      { email: "info.jdsolutions2018@gmail.com" },
      { 
        role: "admin", 
        password: hashedPassword,
        name: "Super Admin",
        status: "approved" 
      },
      { upsert: true, new: true } // Create if doesn't exist, update if it does
    );

    return NextResponse.json({ message: "Admin role forced successfully!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}