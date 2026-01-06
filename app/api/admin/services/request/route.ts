import connectDB from "@/lib/mongodb";
import ServiceRequest from "@/models/ServiceRequest";
import { NextResponse } from "next/server";
import Company from "@/models/Company";
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
    await connectDB();
    const data = await req.json();

    // 1. Database mein check karein ki ye name aur whatsapp listed hai ya nahi
    const isListed = await Company.findOne({
      name: { $regex: new RegExp(`^${data.name}$`, "i") },
      whatsapp: data.whatsapp
    });

    if (!isListed) {
      return NextResponse.json(
        { success: false, message: "Company not found! Please list your company first." }, 
        { status: 404 }
      );
    }

    // 2. Agar mil gayi, toh Request Save karein
    const newRequest = await ServiceRequest.create(data);
    return NextResponse.json({ success: true, data: newRequest });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
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