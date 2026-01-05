import dbConnect from '@/lib/mongodb';
import Company from '@/models/Company';
import { NextResponse } from 'next/server';

// Handle Fetch for Single Company
export async function GET(req: Request, { params }: { params: any }) {
  try {
    await dbConnect();
    const { id } = await params;
    const company = await Company.findById(id);
    return NextResponse.json({ success: true, data: company });
  } catch (err) {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}

// Handle Update (PUT)
export async function PUT(req: Request, { params }: { params: any }) {
  try {
    await dbConnect();
    const { id } = await params;
    const updateData = await req.json();

    const updated = await Company.findByIdAndUpdate(
      id,
      { $set: updateData }, // This updates all fields sent from form
      { new: true }
    );

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}