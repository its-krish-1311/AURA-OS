import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id && process.env.NODE_ENV !== "development") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Fallback to a default user ID for development if no session
    const userId = session?.user?.id || "local-dev-user-id";

    const conversations = await prisma.conversation.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        title: true,
        updatedAt: true,
      }
    });

    return NextResponse.json(conversations);
  } catch (error: any) {
    console.error("Error fetching conversations:", error);
    return NextResponse.json({ error: "Failed to fetch conversations" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id && process.env.NODE_ENV !== "development") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session?.user?.id || "local-dev-user-id";
    const { title } = await req.json();

    if (userId === "local-dev-user-id") {
      const userExists = await prisma.user.findUnique({ where: { id: userId } });
      if (!userExists) {
        await prisma.user.create({
          data: { id: userId, name: "Local Dev User", email: "dev@local.host" }
        });
      }
    }

    const conversation = await prisma.conversation.create({
      data: {
        userId,
        title: title || "New Chat",
      },
    });

    return NextResponse.json(conversation);
  } catch (error: any) {
    console.error("Error creating conversation:", error);
    return NextResponse.json({ error: "Failed to create conversation" }, { status: 500 });
  }
}
