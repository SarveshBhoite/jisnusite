// app/api/companies/rate/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Company from "@/models/Company";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { companyId, rating } = await req.json();

    if (!companyId || !rating) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    // Find the company
    const company = await Company.findById(companyId);
    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    // Logic: If your model doesn't track individual votes yet, 
    // we calculate a simple moving average or just update the field.
    // Ideally, your Model should have { rating: Number, totalReviews: Number }
    
    const currentRating = company.rating || 0;
    const currentTotal = company.totalReviews || 0;

    const newTotal = currentTotal + 1;
    const newRating = (currentRating * currentTotal + rating) / newTotal;

    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      { 
        $set: { rating: newRating },
        $inc: { totalReviews: 1 } 
      },
      { new: true }
    );

    return NextResponse.json({ 
      success: true, 
      newRating: updatedCompany.rating,
      totalReviews: updatedCompany.totalReviews 
    });

  } catch (error) {
    console.error("Rating Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}