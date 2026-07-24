import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    let { email, password, name, otp } = await req.json();

    if (!email || !password || !otp) {
      return NextResponse.json(
        { error: "Email, password, and OTP are required" },
        { status: 400 }
      );
    }

    // Basic Email Format Validation (Security)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Convert email to lowercase to prevent duplicates/bypasses
    email = email.toLowerCase();

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // Verify OTP
    const otpRecord = await prisma.oTP.findUnique({
      where: { email },
    });

    if (!otpRecord) {
      return NextResponse.json(
        { error: "Please request an OTP first" },
        { status: 400 }
      );
    }

    if (otpRecord.code !== otp) {
      return NextResponse.json(
        { error: "Invalid verification code" },
        { status: 400 }
      );
    }

    if (new Date() > otpRecord.expiresAt) {
      return NextResponse.json(
        { error: "OTP has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Hash the password for fast but secure encryption (10 rounds is standard)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user securely
    const user = await prisma.user.create({
      data: {
        email,
        name: name || "",
        password: hashedPassword,
        emailVerified: new Date(),
      },
    });

    // Clean up OTP record
    await prisma.oTP.delete({
      where: { email },
    });

    return NextResponse.json(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        message: "Account created successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
