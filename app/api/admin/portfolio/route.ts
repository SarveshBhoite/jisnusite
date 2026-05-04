import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Portfolio from "@/models/Portfolio";
import { requireAdminOrEmployeePermission } from "@/lib/admin-access";

// GET - Fetch all portfolios
export async function GET() {
  try {
    await connectDB();
    const projects = await Portfolio.find().sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// POST - Create new portfolio
export async function POST(req: Request) {
  const guard = await requireAdminOrEmployeePermission("portfolio", "add");
  if (!guard.ok) return guard.response!;

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

// PUT - Update portfolio
export async function PUT(req: Request) {
  const guard = await requireAdminOrEmployeePermission("portfolio", "update");
  if (!guard.ok) return guard.response!;

  try {
    await connectDB();
    const data = await req.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const updatedProject = await Portfolio.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updatedProject) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedProject });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE - Delete portfolio
export async function DELETE(req: Request) {
  const guard = await requireAdminOrEmployeePermission("portfolio", "delete");
  if (!guard.ok) return guard.response!;

  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const deletedProject = await Portfolio.findByIdAndDelete(id);
    
    if (!deletedProject) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Portfolio deleted successfully" });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
