import dbConnect from '@/lib/mongodb';
import Company from '@/models/Company';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await dbConnect();
    
    // Parse the JSON directly
    const body = await req.json();

    if (!body) {
      return NextResponse.json({ success: false, error: "Request body is empty" }, { status: 400 });
    }

    // 1. Map ALL fields from the body to the database
    const newCompany = await Company.create({
      name: body.name,
      category: body.category,
      password: body.password,
      email: body.email,
      description: body.description, // Ensure this matches your form 'name="description"'
      location: body.location,
      whatsapp: body.whatsapp,
      logo: body.logo,               // 👈 ADD THIS: Save the logo string
      services: body.services,       // 👈 ADD THIS: Save the services array
      status: 'pending' 
    });

    return NextResponse.json({ success: true, data: newCompany }, { status: 201 });
  } catch (error: any) {
    console.error("❌ API Error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}