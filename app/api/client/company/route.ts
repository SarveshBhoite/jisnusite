import dbConnect from "@/lib/mongodb";
import Company from "@/models/Company";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const company = await Company.findOne({ email: session.user.email });
    return NextResponse.json({ success: true, data: company });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Mapping all fields from the Model to ensure deep update
    const updateData = {
      name: body.name,
      category: body.category,
      description: body.description,
      detailedOverview: body.detailedOverview,
      location: body.location,
      website: body.website,
      whatsapp: body.whatsapp,
      logo: body.logo,
      gallery: body.gallery, // Array of Base64
      services: body.services, // Array of {title, desc}
      inclusions: body.inclusions, // Array of strings (New)
      workingHours: body.workingHours, // Array of strings (New)
      social: {
        instagram: body.social?.instagram || "",
        facebook: body.social?.facebook || "",
        linkedin: body.social?.linkedin || "",
        twitter: body.social?.twitter || "",
      }
    };

    const updated = await Company.findOneAndUpdate(
      { email: session.user.email },
      { $set: updateData },
      { new: true, runValidators: true } // runValidators ensures model rules are followed
    );

    if (!updated) {
      return NextResponse.json({ success: false, error: "Company not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error("Update Route Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}