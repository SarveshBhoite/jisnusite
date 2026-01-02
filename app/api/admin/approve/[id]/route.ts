import dbConnect from '@/lib/mongodb';
import Company from '@/models/Company';
import { NextResponse } from 'next/server';
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // Define as Promise
) {
  try {
    const { id } = await params; // 👈 You MUST await this in Next.js 16
    const { action } = await req.json();

    await dbConnect();
    
    // Update the company status
    const updated = await Company.findByIdAndUpdate(
      id,
      { status: action },
      { new: true }
    );

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}