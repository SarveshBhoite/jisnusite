import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Portfolio from "@/models/Portfolio";

// Ye function chalega jab aap fetch('/api/portfolio') karenge (GET)
export async function GET() {
  try {
    await connectDB();
    const projects = await Portfolio.find().sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// Ye function chalega jab aap fetch('/api/portfolio', { method: 'POST' }) karenge
export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    
    // Check if data is coming
    if(!data.companyName) {
        return NextResponse.json({ error: "Data missing" }, { status: 400 });
    }

    const newProject = await Portfolio.create(data);
    return NextResponse.json({ success: true, data: newProject });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}