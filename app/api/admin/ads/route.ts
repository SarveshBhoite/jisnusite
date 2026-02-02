import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb"; // Ensure this path matches your DB connection utility
import Ad from "@/models/Ad"; // Ensure this path matches your Ad model

// 1. GET: Fetch all ads
export async function GET() {
  await dbConnect();
  try {
    const ads = await Ad.find({}).sort({ createdAt: -1 });
    return NextResponse.json(ads, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch ads" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    
    // Check if data is arriving
    console.log("Received Body:", body);

    const newAd = await Ad.create(body);
    return NextResponse.json(newAd, { status: 201 });
  } catch (error: any) {
    // THIS WILL SHOW YOU THE ACTUAL ERROR IN YOUR TERMINAL
    console.error("Mongoose Error:", error.message); 
    
    return NextResponse.json(
      { error: error.message || "Failed to create ad" }, 
      { status: 400 }
    );
  }
}
// 3. PUT: Update an existing ad (This fixes your 405 error)
export async function PUT(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const { _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json({ error: "Ad ID is required" }, { status: 400 });
    }

    const updatedAd = await Ad.findByIdAndUpdate(_id, updateData, { new: true });
    return NextResponse.json(updatedAd, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update ad" }, { status: 400 });
  }
}

// 4. DELETE: Remove an ad
export async function DELETE(req: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Ad ID is required" }, { status: 400 });
    }

    await Ad.findByIdAndDelete(id);
    return NextResponse.json({ message: "Ad deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete ad" }, { status: 400 });
  }
}