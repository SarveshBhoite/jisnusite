import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Otp from "@/models/Otp";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { message: "Email and verification code are required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanOtp = otp.trim();

    await dbConnect();
    const record = await Otp.findOne({ email: cleanEmail, otp: cleanOtp });

    if (!record) {
      return NextResponse.json(
        { message: "Invalid or expired verification code." },
        { status: 400 }
      );
    }

    // Delete used OTP
    await Otp.deleteOne({ _id: record._id });

    return NextResponse.json({
      success: true,
      message: "Email verified successfully.",
    });
  } catch (error: any) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      { message: "Verification failed. Please try again." },
      { status: 500 }
    );
  }
}
