import connectDB from "@/lib/mongodb";
import ServiceRequest from "@/models/ServiceRequest";
import { NextResponse } from "next/server";
import Company from "@/models/Company";
import dbConnect from "@/lib/mongodb";
// GET: Admin requests fetch karega
export async function GET() {
  try {
    await connectDB();
    const requests = await ServiceRequest.find({}).sort({ createdAt: -1 });
    return NextResponse.json(requests);
  } catch (error) {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}

// POST: Cart se naya request save hoga
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    // Check if body has required fields
    if (!body.email || !body.services) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const newRequest = await ServiceRequest.create(body);

    return NextResponse.json({ message: "Success", data: newRequest }, { status: 201 });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ message: error.message || "Server Error" }, { status: 500 });
  }
}
// PATCH: Status update karne ke liye (?id=... use hoga)
export async function PATCH(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const { status } = await req.json();

    const updated = await ServiceRequest.findByIdAndUpdate(id, { status }, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}