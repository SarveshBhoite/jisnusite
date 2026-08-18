import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const DEFAULT_CONTACT_RECIPIENT = "info.jdsolutions2018@gmail.com";

function getContactRecipients() {
  const envRecipients = process.env.CONTACT_RECIPIENTS || "";
  const recipients = envRecipients
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return recipients.length ? recipients.join(",") : DEFAULT_CONTACT_RECIPIENT;
}

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, company, subject, message } = await req.json();
    const adminRecipient = getContactRecipients();
    const senderEmail = process.env.BREVO_SENDER_EMAIL || process.env.EMAIL_USER || DEFAULT_CONTACT_RECIPIENT;
    const senderName = [firstName, lastName].filter(Boolean).join(" ") || "Contact Form";

    const brevoApiKey = process.env.BREVO_API_KEY || process.env.BREVO_SMTP_KEY;

    // Try Brevo REST API if API Key is available
    if (brevoApiKey) {
      const recipientsList = adminRecipient
        .split(",")
        .map((e) => ({ email: e.trim() }))
        .filter((r) => r.email);

      const htmlBody = `
        <div style="font-family: sans-serif; padding: 20px; color: #333; border: 1px solid #eee;">
          <h2 style="color: #0891b2;">New Inquiry from Jisnu Digital</h2>
          <hr />
          <p><strong>User Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || "Not provided"}</p>
          <p><strong>Subject:</strong> ${subject || "No Subject"}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #0891b2;">
            ${message}
          </div>
          <hr />
          <p style="font-size: 12px; color: #666;">
            Note: You can reply directly to this email to contact the user.
          </p>
        </div>
      `;

      try {
        const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            "api-key": brevoApiKey,
          },
          body: JSON.stringify({
            sender: { name: senderName, email: senderEmail },
            to: recipientsList,
            replyTo: { email: email },
            subject: `${subject || "New Contact Form Submission"} - from ${firstName || "Visitor"}`,
            htmlContent: htmlBody,
          }),
        });

        if (brevoRes.ok) {
          return NextResponse.json({ message: "Sent!" }, { status: 200 });
        } else {
          const errorData = await brevoRes.json();
          console.error("Brevo API Error Response:", JSON.stringify(errorData, null, 2));
          return NextResponse.json(
            { message: errorData?.message || "Brevo authentication error. Check IP whitelisting or API key." },
            { status: 401 }
          );
        }
      } catch (apiError: any) {
        console.error("Brevo REST API fetch failed:", apiError);
      }
    }

    // Fallback: SMTP via Nodemailer
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
              pass: process.env.BREVO_SMTP_KEY || process.env.BREVO_API_KEY || process.env.EMAIL_PASS,
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

    const mailOptions = {
      from: `"${senderName}" <${senderEmail}>`,
      to: adminRecipient,
      replyTo: email,
      subject: `${subject} - from ${firstName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; border: 1px solid #eee;">
          <h2 style="color: #0891b2;">New Inquiry from Jisnu Digital</h2>
          <hr />
          <p><strong>User Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || "Not provided"}</p>
          <p><strong>Subject:</strong> ${subject}</p>
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
  } catch (error: any) {
    console.error("Email error:", error);
    return NextResponse.json({ message: error?.message || "Error sending email" }, { status: 500 });
  }
}
