import dbConnect from '@/lib/mongodb';
import Company from '@/models/Company';
import { NextResponse } from 'next/server';

/**
 * GET: Fetch a single company by ID
 * Used by: Public Profile Page & Admin Edit Page
 */
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const company = await Company.findById(params.id);

    if (!company) {
      return NextResponse.json(
        { success: false, error: "Company not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: company }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

/**
 * PUT: Update a single company by ID
 * Used by: Admin Edit Page
 */
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const body = await req.json();

    const updatedCompany = await Company.findByIdAndUpdate(
      params.id,
      { $set: body }, // This updates all fields sent from the form
      { new: true, runValidators: true } // returns the updated document
    );

    if (!updatedCompany) {
      return NextResponse.json(
        { success: false, error: "Update failed: Company not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedCompany }, { status: 200 });
  } catch (error: any) {
    console.error("Update Error:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

/**
 * DELETE: Remove a company
 * Used by: Admin Manage Page
 */
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    await Company.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true, message: "Deleted" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}