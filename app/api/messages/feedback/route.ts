import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id && process.env.NODE_ENV !== "development") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { messageId, isPositive } = await req.json();

    // In a full implementation, you would update the Message model in the DB
    // e.g., await prisma.message.update({ where: { id: messageId }, data: { isPositive } });
    console.log(`Feedback recorded for message ${messageId}: ${isPositive ? 'Thumbs Up' : 'Thumbs Down'}`);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error saving feedback:", error);
    return NextResponse.json({ error: "Failed to save feedback" }, { status: 500 });
  }
}
