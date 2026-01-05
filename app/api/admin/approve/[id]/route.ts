import dbConnect from '@/lib/mongodb';
import Company from '@/models/Company';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: any }) {
  try {
    await dbConnect();
    const { id } = await params; 
    const { action } = await req.json();

    if (action === "accepted") {
      // Approve: Change status to 'verified'
      const updated = await Company.findByIdAndUpdate(
        id, 
        { status: "verified" }, 
        { new: true }
      );
      return NextResponse.json({ success: true, data: updated });
    } else {
      // Reject: DELETE from DB entirely as per your requirement
      const deleted = await Company.findByIdAndDelete(id);
      if (!deleted) {
        return NextResponse.json({ error: "Company not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, message: "Company removed from database" });
    }
  } catch (error) {
    return NextResponse.json({ error: "Action failed" }, { status: 500 });
  }
}