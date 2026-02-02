import dbConnect from '@/lib/mongodb';
import Company from '@/models/Company';
import { NextResponse } from 'next/server';
import bcrypt from "bcryptjs"; // 👈 Import bcrypt


export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body || !body.password) {
      return NextResponse.json({ success: false, error: "Password is required" }, { status: 400 });
    }

    // 👈 IMPORTANT: Hash the password before saving
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newCompany = await Company.create({
      name: body.name,
      category: body.category,
      email: body.email,
      password: hashedPassword, // 👈 Save the hashed version
      description: body.description,
      location: body.location,
      whatsapp: body.whatsapp,
      logo: body.logo,
      services: body.services,  
      workingHours: body.workingHours,
      status: 'pending' 
    });

    return NextResponse.json({ success: true, data: newCompany }, { status: 201 });
  } catch (error: any) {
    console.error("❌ API Error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    
    const category = searchParams.get("query"); // Matches 'query' from frontend
    const loc = searchParams.get("location");

    // Create a dynamic filter object
    let filter: any = { status: 'approved' }; // Optional: only show approved companies

    if (category) {
      filter.category = { $regex: category, $options: "i" }; // Case-insensitive search
    }
    if (loc) {
      filter.location = { $regex: loc, $options: "i" };
    }

    const companies = await Company.find(filter).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: companies });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}