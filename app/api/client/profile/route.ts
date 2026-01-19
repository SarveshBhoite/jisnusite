import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import  User  from "@/models/User"; // Ensure your User model has phone and company fields

// GET: Load user profile
export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) return NextResponse.json({ error: "No email provided" }, { status: 400 });

    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

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

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { name, phone, company },
      { new: true }
    );

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}