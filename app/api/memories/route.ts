import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { generateEmbedding } from "@/lib/memory/embeddings";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || (process.env.NODE_ENV === "development" ? "local-dev-user-id" : null);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";
    const category = searchParams.get("category") || "";

    const memories = await prisma.memory.findMany({
      where: {
        userId,
        ...(query ? { content: { contains: query } } : {}),
        ...(category ? { category } : {}),
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(memories);
  } catch (error: any) {
    console.error("Error fetching memories:", error);
    return NextResponse.json({ error: "Failed to fetch memories" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || (process.env.NODE_ENV === "development" ? "local-dev-user-id" : null);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Lazy user creation for local dev
    if (userId === "local-dev-user-id") {
      const userExists = await prisma.user.findUnique({ where: { id: userId } });
      if (!userExists) {
        await prisma.user.create({
          data: { id: userId, name: "Local Dev User", email: "dev@local.host" }
        });
      }
    }

    const { content, category, importance } = await req.json();

    if (!content || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Generate embedding
    const vector = await generateEmbedding(content);
    const embeddingStr = vector.length > 0 ? JSON.stringify(vector) : null;

    const memory = await prisma.memory.create({
      data: {
        userId,
        content,
        category,
        importance: importance || "Medium",
        embedding: embeddingStr,
        source: "Manual Training",
      },
    });

    return NextResponse.json(memory);
  } catch (error: any) {
    console.error("Error creating memory:", error);
    return NextResponse.json({ error: "Failed to create memory" }, { status: 500 });
  }
}
