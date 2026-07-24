import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "dummy_key_for_build", {
  apiVersion: "2025-01-27.acacia" as any, // specify any valid stable api version if needed
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Usually you would fetch the price ID from your DB or env
    const { priceId } = await req.json();

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer_email: session.user.email || undefined,
      line_items: [
        {
          price: priceId || "price_dummy_fallback",
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXTAUTH_URL}/?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/?canceled=true`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err: any) {
    console.error("Stripe Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
