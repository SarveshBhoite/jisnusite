import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Otp from "@/models/Otp";
import nodemailer from "nodemailer";

const DEFAULT_SENDER = "info.jdsolutions2018@gmail.com";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Generate 6-digit numeric OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Connect DB & save/update OTP
    await dbConnect();
    await Otp.deleteMany({ email: cleanEmail });
    await Otp.create({ email: cleanEmail, otp: generatedOtp });

    const senderEmail =
      process.env.BREVO_SENDER_EMAIL ||
      process.env.EMAIL_USER ||
      DEFAULT_SENDER;

    const brevoApiKey = process.env.BREVO_API_KEY || process.env.BREVO_SMTP_KEY;

    const emailHtml = `
      <div style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <div style="background: linear-gradient(135deg, #0f172a 0%, #0284c7 100%); padding: 28px 24px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px;">Jisnu Digital</h1>
          <p style="color: #bae6fd; margin: 4px 0 0 0; font-size: 13px;">Security & Form Verification</p>
        </div>
        <div style="padding: 32px 28px; text-align: center; color: #334155;">
          <h2 style="margin: 0 0 12px 0; color: #0f172a; font-size: 18px;">Your Verification Code</h2>
          <p style="margin: 0 0 24px 0; color: #64748b; font-size: 14px; line-height: 1.5;">
            Please use the following 6-digit verification code to confirm your form submission. This code will expire in <strong>10 minutes</strong>.
          </p>
          <div style="background: #f0f9ff; border: 2px dashed #0284c7; border-radius: 12px; padding: 18px 24px; display: inline-block; margin-bottom: 24px;">
            <span style="font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #0284c7; font-family: monospace;">${generatedOtp}</span>
          </div>
          <p style="margin: 0; color: #94a3b8; font-size: 12px; line-height: 1.4;">
            If you did not request this verification code, please ignore this email.
          </p>
        </div>
        <div style="background: #f8fafc; border-top: 1px solid #f1f5f9; padding: 16px 24px; text-align: center; color: #94a3b8; font-size: 11px;">
          &copy; ${new Date().getFullYear()} Jisnu Digital Solutions. All rights reserved.
        </div>
      </div>
    `;

    // Send using Brevo REST API if available
    if (brevoApiKey) {
      try {
        const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            "api-key": brevoApiKey,
          },
          body: JSON.stringify({
            sender: { name: "Jisnu Digital Verification", email: senderEmail },
            to: [{ email: cleanEmail }],
            subject: `${generatedOtp} is your verification code for Jisnu Digital`,
            htmlContent: emailHtml,
          }),
        });

        if (brevoRes.ok) {
          return NextResponse.json({
            message: "Verification code sent to your email.",
          });
        }
      } catch (err) {
        console.error("Brevo API error in send-otp:", err);
      }
    }

    // Fallback using Nodemailer
    const isBrevo = Boolean(
      process.env.BREVO_SMTP_KEY ||
        process.env.BREVO_API_KEY ||
        process.env.BREVO_SMTP_USER ||
        process.env.BREVO_SMTP_HOST
    );

    const transporter = nodemailer.createTransport(
      isBrevo
        ? {
            host: process.env.BREVO_SMTP_HOST || "smtp-relay.brevo.com",
            port: Number(process.env.BREVO_SMTP_PORT) || 587,
            secure: Number(process.env.BREVO_SMTP_PORT) === 465,
            auth: {
              user: process.env.BREVO_SMTP_USER || process.env.EMAIL_USER,
              pass:
                process.env.BREVO_SMTP_KEY ||
                process.env.BREVO_API_KEY ||
                process.env.EMAIL_PASS,
            },
          }
        : {
            service: "gmail",
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          }
    );

    await transporter.sendMail({
      from: `"Jisnu Digital Verification" <${senderEmail}>`,
      to: cleanEmail,
      subject: `${generatedOtp} is your verification code for Jisnu Digital`,
      html: emailHtml,
    });

    return NextResponse.json({
      message: "Verification code sent to your email.",
    });
  } catch (error: any) {
    console.error("Error sending OTP:", error);
    return NextResponse.json(
      { message: error?.message || "Failed to send verification email." },
      { status: 500 }
    );
  }
}
