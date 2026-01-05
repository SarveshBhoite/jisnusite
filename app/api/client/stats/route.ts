import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 
import connectDB from "@/lib/mongodb";
import Company from "@/models/Company";

export async function GET() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
    }

    const company = await Company.findOne({ email: session.user.email });

    if (!company) {
      return NextResponse.json({ status: "No Listing", mediaCount: 0, requests: 0, completion: 0 });
    }

    // --- Enhanced Dynamic Completion Logic ---
    const checkFields = [
      company.name,
      company.category,
      company.logo,
      company.description,
      company.detailedOverview,
      company.location,
      company.whatsapp,
      company.website,
      // Arrays
      (company.gallery?.length > 0),
      (company.services?.length > 0),
      (company.inclusions?.length > 0),
      (company.workingHours?.length > 0),
      // Socials (even if one is present, it counts towards social presence)
      (company.social?.instagram || company.social?.facebook || company.social?.linkedin || company.social?.twitter)
    ];

    const filledFields = checkFields.filter(f => f && f !== "" && f !== false).length;
    const completionScore = Math.round((filledFields / checkFields.length) * 100);

    return NextResponse.json({
      status: company.status || "pending",
      mediaCount: company.gallery?.length || 0,
      requests: 0, // Replace with actual requests count if needed
      completion: completionScore
    });

  } catch (error: any) {
    console.error("Stats API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}