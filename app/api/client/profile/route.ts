import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

// GET: Load user profile (Auto-creates if missing)
export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) return NextResponse.json({ error: "No email provided" }, { status: 400 });

    // 1. Case-insensitive search
    let user = await User.findOne({ 
      email: { $regex: new RegExp(`^${email}$`, "i") } 
    });

    // 2. If NOT found, create the record immediately (The Fix)
    if (!user) {
      console.log(`🆕 Creating new profile for: ${email}`);
      user = await User.create({
        email: email.toLowerCase(),
        name: email.split("@")[0],
        phone: "",
        company: "",
      });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PUT: Update user profile
export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { email, name, phone, company } = body;

    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    const updatedUser = await User.findOneAndUpdate(
      { email: { $regex: new RegExp(`^${email}$`, "i") } },
      { name, phone, company },
      { new: true, runValidators: true }
    );

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Update failed" }, { status: 500 });
  }
}