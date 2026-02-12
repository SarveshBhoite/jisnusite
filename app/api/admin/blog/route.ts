import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function GET() {
  await dbConnect();
  const posts = await Blog.find({}).sort({ createdAt: -1 });
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();

    // 1. Validation Check
    if (!body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // 2. Robust Slug Generation
    const slug = body.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") 
      .replace(/[\s_-]+/g, "-") 
      .replace(/^-+|-+$/g, ""); 

    // 3. Format Date (Better to use ISO string or specific format)
    const date = new Date().toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric", 
      year: "numeric" 
    });

    const newPost = await Blog.create({ 
      ...body, 
      slug, 
      date 
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error: any) {
    // 🚀 LOG THE ACTUAL ERROR TO CONSOLE
    console.error("BLOG_POST_ERROR:", error);
    
    // Check for duplicate key (Slug already exists)
    if (error.code === 11000) {
      return NextResponse.json({ error: "A blog with this title/slug already exists" }, { status: 400 });
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  await dbConnect();
  
  // Get ID from Query Params: /api/admin/blog?id=123
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  try {
    const body = await req.json();
    const { _id, ...updateData } = body; 

    const updatedPost = await Blog.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updatedPost);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  await dbConnect();
  
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  try {
    await Blog.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}