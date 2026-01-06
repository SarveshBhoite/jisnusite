import connectDB from "@/lib/mongodb";
import Service from "@/models/Services"; 
import { NextResponse } from "next/server";

// 1. GET ALL SERVICES
export async function GET() {
  try {
    await connectDB();
    const services = await Service.find({}).sort({ createdAt: -1 });
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}

// 2. POST (Add New)
export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    const newService = await Service.create(data);
    return NextResponse.json({ success: true, data: newService });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 3. PATCH (Update by ID)
export async function PATCH(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); // URL se ID nikalne ke liye: /api/admin/services?id=123

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const data = await req.json();
    const updated = await Service.findByIdAndUpdate(id, data, { new: true });
    
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 4. DELETE (Remove by ID)
export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await Service.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}