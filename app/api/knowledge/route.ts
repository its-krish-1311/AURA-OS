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

    const sources = await prisma.knowledgeSource.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(sources);
  } catch (error: any) {
    console.error("Error fetching knowledge sources:", error);
    return NextResponse.json({ error: "Failed to fetch sources" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || (process.env.NODE_ENV === "development" ? "local-dev-user-id" : null);

    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { name, type, size } = await req.json();

    if (!name || !type || size === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const source = await prisma.knowledgeSource.create({
      data: {
        userId,
        name,
        type,
        size,
        status: "Uploaded",
      },
    });

    return NextResponse.json(source);
  } catch (error: any) {
    console.error("Error uploading knowledge source:", error);
    return NextResponse.json({ error: "Failed to upload source" }, { status: 500 });
  }
}
