import dbConnect from "@/lib/mongodb";
import Banner from "@/models/Banner";
import { NextResponse } from "next/server";
import { requireAdminOrEmployeePermission } from "@/lib/admin-access";

// 1. GET ALL BANNERS (To list them in admin)
export async function GET() {
  await dbConnect();
  try {
    const banners = await Banner.find({})
      .select("category bannerImage")
      .limit(10)
      .lean();

    return NextResponse.json(banners
      
    );
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const guard = await requireAdminOrEmployeePermission("banner", "add");
  if (!guard.ok) return guard.response!;

  await dbConnect();
  try {
    const { category, bannerImage } = await req.json();

    
    const updatedBanner = await Banner.findOneAndUpdate(
      { category: category.toLowerCase().trim() }, 
      { 
        bannerImage, 
        isPaidBanner: true,
        category: category.toLowerCase().trim() 
      },
      { new: true, upsert: true } 
    );

    return NextResponse.json({ success: true, data: updatedBanner });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

// 3. DELETE BANNER
export async function DELETE(req: Request) {
  const guard = await requireAdminOrEmployeePermission("banner", "delete");
  if (!guard.ok) return guard.response!;

  await dbConnect();
  try {
    const { id } = await req.json();
    await Banner.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
