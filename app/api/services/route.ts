import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Service from "@/models/Service";

export async function GET() {
  await dbConnect();
  const services = await Service.find({});
  return NextResponse.json(services);
}

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  const newService = await Service.create(data);
  return NextResponse.json(newService);
}