import connectDB from "@/lib/mongodb";
import ServiceRequest from "@/models/ServiceRequest";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
// 1. Import session tools
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// GET: Filter based on logged-in user
export async function GET() {
  try {
    await connectDB();
    
    // 2. Get the current session
    const session = await getServerSession(authOptions);

    // 3. If no session, don't show any data
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });
    }

   
    const requests = await ServiceRequest.find({ email: session.user.email }).sort({ createdAt: -1 });
    
    return NextResponse.json(requests);
  } catch (error) {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}

// POST: Cart se naya request save hoga (No changes needed, but ensure email is saved)
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

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

// PATCH: Status update logic remains the same
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