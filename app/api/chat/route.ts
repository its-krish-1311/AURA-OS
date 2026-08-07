import { NextResponse } from "next/server";
import OpenAI from "openai";
import Groq from "groq-sdk";
import { z } from "zod";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

// Basic in-memory rate limiter for prototype
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10; // 10 requests per minute

const chatRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system"]),
      content: z.string().min(1).max(10000)
    })
  ).min(1).max(50),
  mode: z.enum(["builder", "normal"]).optional().default("builder")
});

const BUILDER_SYSTEM_PROMPT = `You are Aura Code, an elite digital twin and software builder.

CRITICAL RULES:
1. If the user just says hello, asks a general question, or is chatting normally, DO NOT WRITE CODE. Just answer naturally with text.
2. ONLY generate React code if the user EXPLICITLY asks you to "build", "create", "code", or "design" a UI/app.

DESIGN SYSTEM:
- Use Tailwind CSS for all styling. Prioritize modern aesthetics (glassmorphism, dark mode, smooth gradients).
- Primary accent color should be neon purple (e.g. \`bg-purple-600\`, \`text-purple-400\`, \`shadow-[0_0_15px_rgba(168,85,247,0.5)]\`).
- Use \`lucide-react\` for icons.
- Use \`framer-motion\` for micro-animations (e.g., hover states, layout transitions).

WHEN BUILDING CODE (and ONLY when building code), you must wrap your complete React component exactly like this:
\`\`\`javascript render
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen p-4 bg-gray-900 text-white flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(168,85,247,0.15)]"
      >
        <h1 className="text-2xl font-bold flex items-center gap-2 text-purple-400">
          <Sparkles className="w-6 h-6" />
          Hello Aura
        </h1>
      </motion.div>
    </div>
  );
}
\`\`\`
`;

const NORMAL_SYSTEM_PROMPT = `You are Aura AI, an elite digital assistant. You are highly intelligent, friendly, and conversational.
Answer the user's questions clearly and concisely. You do NOT need to generate React applications unless explicitly asked. Provide normal text responses.`;

export async function POST(req: Request) {
  try {
    // 0. Authentication Check
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized. Please log in to use AuraOS AI features." }, { status: 401 });
    }

    // 1. Rate Limiting Check (using IP from headers)
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const now = Date.now();
    const rateData = rateLimitMap.get(ip);
    
    if (rateData && now < rateData.resetTime) {
      if (rateData.count >= MAX_REQUESTS) {
        return NextResponse.json({ error: "Rate limit exceeded. Please try again later." }, { status: 429 });
      }
      rateData.count++;
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    }

    // 2. Input Validation
    const body = await req.json().catch(() => ({}));
    const parseResult = chatRequestSchema.safeParse(body);
    
    if (!parseResult.success) {
      return NextResponse.json({ error: "Invalid request data", details: parseResult.error.format() }, { status: 400 });
    }

    const { messages, mode } = parseResult.data;
    const SYSTEM_PROMPT = mode === 'normal' ? NORMAL_SYSTEM_PROMPT : BUILDER_SYSTEM_PROMPT;

    // Security: Limit history to last 20 messages to prevent context exhaustion and massive payload attacks
    const formattedHistory = messages.slice(-20).map((msg: any) => ({
      role: (msg.role === "user" ? "user" : "assistant") as "user" | "assistant",
      content: msg.content,
    }));

    const builderPriority = ["anthropic", "openai", "groq", "gemini", "github", "openrouter", "cohere", "huggingface", "pollinations"];
    const normalPriority = ["groq", "gemini", "anthropic", "openai", "github", "openrouter", "cohere", "huggingface", "pollinations"];
    const priority = mode === 'builder' ? builderPriority : normalPriority;

    for (const provider of priority) {
      try {
        if (provider === "anthropic" && process.env.ANTHROPIC_API_KEY) {
          const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
              "x-api-key": process.env.ANTHROPIC_API_KEY,
              "anthropic-version": "2023-06-01",
              "content-type": "application/json"
            },
            body: JSON.stringify({
              model: "claude-3-haiku-20240307",
              system: SYSTEM_PROMPT,
              messages: formattedHistory,
              max_tokens: 4000
            })
          });
          if (response.ok) {
            const data = await response.json();
            return NextResponse.json({ text: data.content[0].text, provider: "anthropic" });
          }
          console.warn(`[Anthropic] API returned ${response.status}`);
        }

        if (provider === "openai" && process.env.OPENAI_API_KEY) {
          const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
          const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "system", content: SYSTEM_PROMPT }, ...formattedHistory],
            temperature: 0.7,
          });
          return NextResponse.json({ text: response.choices[0]?.message?.content || "", provider: "openai" });
        }

        if (provider === "groq" && process.env.GROQ_API_KEY) {
          const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: { "Authorization": `Bearer ${process.env.GROQ_API_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              model: "llama-3.1-8b-instant",
              messages: [{ role: "system", content: SYSTEM_PROMPT }, ...formattedHistory],
              temperature: 0.7
            })
          });
          if (response.ok) {
            const data = await response.json();
            return NextResponse.json({ text: data.choices[0]?.message?.content || "", provider: "groq" });
          }
          console.warn(`[Groq] API returned ${response.status}: ${response.statusText}`);
        }

        if (provider === "gemini" && process.env.GEMINI_API_KEY) {
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: formattedHistory.map((m: any) => ({ role: m.role === "user" ? "user" : "model", parts: [{ text: m.content }] })),
              systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] }
            })
          });
          if (response.ok) {
            const data = await response.json();
            return NextResponse.json({ text: data.candidates?.[0]?.content?.parts?.[0]?.text || "", provider: "gemini" });
          }
          console.warn(`[Gemini] API returned ${response.status}`);
        }

        if (provider === "github" && process.env.GITHUB_TOKEN) {
          const openai = new OpenAI({ apiKey: process.env.GITHUB_TOKEN, baseURL: "https://models.inference.ai.azure.com" });
          const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", messages: [{ role: "system", content: SYSTEM_PROMPT }, ...formattedHistory], temperature: 0.7, max_tokens: 4000,
          });
          return NextResponse.json({ text: response.choices[0]?.message?.content || "", provider: "github" });
        }

        if (provider === "openrouter" && process.env.OPENROUTER_API_KEY) {
          const openai = new OpenAI({ apiKey: process.env.OPENROUTER_API_KEY, baseURL: "https://openrouter.ai/api/v1" });
          const response = await openai.chat.completions.create({
            model: "meta-llama/llama-3-8b-instruct:free", messages: [{ role: "system", content: SYSTEM_PROMPT }, ...formattedHistory], temperature: 0.7,
          });
          return NextResponse.json({ text: response.choices[0]?.message?.content || "", provider: "openrouter" });
        }

        if (provider === "cohere" && process.env.COHERE_API_KEY) {
          const response = await fetch("https://api.cohere.ai/v1/chat", {
            method: "POST", headers: { "Authorization": `Bearer ${process.env.COHERE_API_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              model: "command-r-plus", message: formattedHistory[formattedHistory.length - 1].content, preamble: SYSTEM_PROMPT,
              chat_history: formattedHistory.slice(0, -1).map((m: any) => ({ role: m.role === "user" ? "USER" : "CHATBOT", message: m.content }))
            })
          });
          if (response.ok) {
            const data = await response.json();
            return NextResponse.json({ text: data.text, provider: "cohere" });
          }
          console.warn(`[Cohere] API returned ${response.status}`);
        }

        if (provider === "huggingface" && process.env.HUGGINGFACE_API_KEY) {
          const openai = new OpenAI({ apiKey: process.env.HUGGINGFACE_API_KEY, baseURL: "https://api-inference.huggingface.co/v1" });
          const response = await openai.chat.completions.create({
            model: "meta-llama/Meta-Llama-3-8B-Instruct", messages: [{ role: "system", content: SYSTEM_PROMPT }, ...formattedHistory], temperature: 0.7,
          });
          return NextResponse.json({ text: response.choices[0]?.message?.content || "", provider: "huggingface" });
        }

        if (provider === "pollinations") {
          const openai = new OpenAI({ baseURL: "https://text.pollinations.ai/openai", apiKey: "dummy-key", timeout: 5000 });
          const response = await openai.chat.completions.create({
            model: "openai",
            messages: [{ role: "system", content: SYSTEM_PROMPT }, ...formattedHistory],
            temperature: 0.7,
          });
          return NextResponse.json({ text: response.choices[0]?.message?.content || "", provider: "pollinations" });
        }

      } catch (err: any) {
        console.warn(`[${provider}] Attempt failed: ${err.message}`);
      }
    }

    // If all fail or no keys exist
    return NextResponse.json(
      { error: "AI Services unavailable. All configured providers failed or no valid API keys were found in .env." },
      { status: 503 }
    );

  } catch (error: any) {
    console.error("Chat API General Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred processing your request." },
      { status: 500 }
    );
  }
}
