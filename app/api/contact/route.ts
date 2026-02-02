import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, company, subject, message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
     
      from: `"${firstName} ${lastName}" <${process.env.EMAIL_USER}>`,
      
      // 2. The destination (Admin)
      to: process.env.ADMIN_EMAIL, 
      
      // 3. THIS IS THE KEY: When you click "Reply", it goes to the user
      replyTo: email, 
      
      subject: `${subject} - from ${firstName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; border: 1px solid #eee;">
          <h2 style="color: #0891b2;">New Inquiry from Jisnu Digital</h2>
          <hr />
          <p><strong>User Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || "Not provided"}</p>
          <p><strong> Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #0891b2;">
            ${message}
          </div>
          <hr />
          <p style="font-size: 12px; color: #666;">
            Note: You can reply directly to this email to contact the user.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Sent!" }, { status: 200 });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}