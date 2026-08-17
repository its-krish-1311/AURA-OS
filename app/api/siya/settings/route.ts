import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || (process.env.NODE_ENV === "development" ? "local-dev-user-id" : null);

    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let settings = await prisma.siyaSetting.findUnique({
      where: { userId },
    });

    if (!settings) {
      settings = await prisma.siyaSetting.create({
        data: { userId }
      });
    }

    return NextResponse.json(settings);
  } catch (error: any) {
    console.error("Error fetching SIYA settings:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || (process.env.NODE_ENV === "development" ? "local-dev-user-id" : null);

    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const updates = await req.json();

    const settings = await prisma.siyaSetting.upsert({
      where: { userId },
      update: updates,
      create: { userId, ...updates },
    });

    return NextResponse.json(settings);
  } catch (error: any) {
    console.error("Error updating SIYA settings:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
