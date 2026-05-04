import connectDB from "@/lib/mongodb";
import ServiceRequest from "@/models/ServiceRequest";
import User from "@/models/User";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { requireAdminOrEmployeePermission } from "@/lib/admin-access";

// GET: Filter based on logged-in user
export async function GET() {
  const guard = await requireAdminOrEmployeePermission("service-requests", "view");
  if (!guard.ok) return guard.response!;

  try {
    await connectDB();
    const requests = await ServiceRequest.find({}).sort({ createdAt: -1 }).lean();
    
    // Populate whatsapp if missing (for legacy requests)
    const populatedRequests = await Promise.all(requests.map(async (req: any) => {
      if ((!req.whatsapp || req.whatsapp.trim() === "") && req.email) {
        // Try exact email match first
        let user = await User.findOne({ email: req.email });
        
        // If not found, try case-insensitive match
        if (!user) {
          user = await User.findOne({ email: { $regex: `^${req.email}$`, $options: "i" } });
        }
        
        // If user found and has whatsapp, set it
        if (user && user.whatsapp && user.whatsapp.trim() !== "") {
          req.whatsapp = user.whatsapp;
        }
      }
      return req;
    }));

    return NextResponse.json(populatedRequests);
  } catch (error) {
    console.error("Error fetching requests:", error);
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
  const guard = await requireAdminOrEmployeePermission("service-requests", "update");
  if (!guard.ok) return guard.response!;

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
