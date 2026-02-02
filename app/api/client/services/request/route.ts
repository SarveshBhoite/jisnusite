import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ServiceRequest from "@/models/ServiceRequest";
import { getServerSession } from "next-auth/next"; // Or your auth provider
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  await dbConnect();

  // 1. Get the current logged-in user's session
  const session = await getServerSession(authOptions);

  // 2. If no user is logged in, return empty or 401
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 3. ONLY find requests where the email matches the logged-in user
    const requests = await ServiceRequest.find({ 
      userEmail: session.user.email 
    }).sort({ createdAt: -1 });
    
    return NextResponse.json(requests);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}