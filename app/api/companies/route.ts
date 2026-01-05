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