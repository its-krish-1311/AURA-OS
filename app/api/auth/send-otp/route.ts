import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";
import crypto from "crypto";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(req: Request) {
  try {
    let { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    email = email.toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    // Generate secure 6-digit OTP
    const code = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store OTP in database (upsert to replace any old OTPs for this email)
    await prisma.oTP.upsert({
      where: { email },
      update: { code, expiresAt },
      create: { email, code, expiresAt },
    });

    // Await the email send to guarantee 100% reliability in Production/Vercel
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      await transporter.sendMail({
        from: `"Aura OS" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: "Your Aura OS Verification Code",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;">
            <h1 style="color: #9333EA;">Aura OS</h1>
            <p style="font-size: 16px; color: #333;">Here is your secure verification code. It will expire in 10 minutes.</p>
            <div style="margin: 30px auto; background-color: #f4f4f5; padding: 20px; border-radius: 12px; display: inline-block;">
              <h2 style="font-size: 32px; letter-spacing: 5px; color: #111; margin: 0;">${code}</h2>
            </div>
            <p style="font-size: 14px; color: #666;">If you didn't request this code, please ignore this email.</p>
          </div>
        `,
      });
    } else {
      console.log(`[DEV MODE] Simulated OTP for ${email}: ${code}`);
    }

    return NextResponse.json({ message: "OTP sent successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("OTP Error:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
