import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { generateEmbedding } from "@/lib/memory/embeddings";

export const dynamic = 'force-dynamic';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || (process.env.NODE_ENV === "development" ? "local-dev-user-id" : null);

    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const memory = await prisma.memory.findFirst({
      where: { id, userId },
    });

    if (!memory) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(memory);
  } catch (error: any) {
    console.error("Error fetching memory:", error);
    return NextResponse.json({ error: "Failed to fetch memory" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || (process.env.NODE_ENV === "development" ? "local-dev-user-id" : null);

    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const updates = await req.json();

    // If content changes, we must update the embedding
    if (updates.content) {
      const vector = await generateEmbedding(updates.content);
      if (vector.length > 0) {
        updates.embedding = JSON.stringify(vector);
      }
    }

    const { id } = await params;
    const existing = await prisma.memory.findFirst({ where: { id, userId } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const memory = await prisma.memory.update({
      where: { id },
      data: updates,
    });

    return NextResponse.json(memory);
  } catch (error: any) {
    console.error("Error updating memory:", error);
    return NextResponse.json({ error: "Failed to update memory" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || (process.env.NODE_ENV === "development" ? "local-dev-user-id" : null);

    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const existing = await prisma.memory.findFirst({ where: { id, userId } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await prisma.memory.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting memory:", error);
    return NextResponse.json({ error: "Failed to delete memory" }, { status: 500 });
  }
}
