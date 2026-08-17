import { NextResponse } from "next/server";
import { createOpenAI } from '@ai-sdk/openai';
import { streamText, generateId } from 'ai';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 20;

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

const NORMAL_SYSTEM_PROMPT = `You are Siya AI, an elite digital assistant. You are highly intelligent, friendly, and conversational.
Answer the user's questions clearly and concisely. You do NOT need to generate React applications unless explicitly asked. Provide normal text responses.`;

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || (process.env.NODE_ENV === "development" ? "local-dev-user-id" : null);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized. Please log in to use AuraOS AI features." }, { status: 401 });
    }

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

    const { messages, mode, conversationId } = await req.json();
    
    let baseSystemPrompt = NORMAL_SYSTEM_PROMPT;
    switch (mode) {
      case "Developer Siya":
      case "AI Engineer Mode":
      case "builder":
        baseSystemPrompt = BUILDER_SYSTEM_PROMPT;
        break;
      case "Designer Siya":
        baseSystemPrompt = "You are Designer Siya, an elite UI/UX AI assistant. Focus on aesthetics, accessibility, color theory, and responsive design. Provide detailed CSS and Tailwind suggestions.";
        break;
      case "Siya Think":
        baseSystemPrompt = "You are Siya Think, an analytical and philosophical AI. Break problems down step-by-step using first principles. Provide deep, reasoned insights.";
        break;
      case "Startup Siya":
        baseSystemPrompt = "You are Startup Siya, a ruthless and brilliant business strategist. Give advice on product-market fit, growth hacking, and venture capital.";
        break;
      case "Siya Personal":
        baseSystemPrompt = "You are Siya Personal, an empathetic and supportive digital companion. Listen carefully and offer warm, encouraging, and helpful advice.";
        break;
    }
    
    const SYSTEM_PROMPT = baseSystemPrompt;

    let currentConversationId = conversationId;
    let finalSystemPrompt = SYSTEM_PROMPT;

    // Save the user message to the DB
    if (messages.length > 0) {
      const lastUserMessage = messages[messages.length - 1];
      
      // Auto-create local dev user if missing
      if (userId === "local-dev-user-id") {
        const userExists = await prisma.user.findUnique({ where: { id: userId } });
        if (!userExists) {
          await prisma.user.create({
            data: { id: userId, name: "Local Dev User", email: "dev@local.host" }
          });
        }
      }

      // Memory Retrieval Engine
      try {
        const settings = await prisma.siyaSetting.findUnique({ where: { userId } });
        if (!settings || settings.memoryEnabled !== false) {
          const { generateEmbedding, cosineSimilarity } = await import("@/lib/memory/embeddings");
          const queryVector = await generateEmbedding(lastUserMessage.content);
          
          if (queryVector.length > 0) {
            const activeMemories = await prisma.memory.findMany({
              where: { userId, isActive: true },
              select: { content: true, category: true, importance: true, embedding: true }
            });
            
            const scoredMemories = activeMemories
              .filter(m => m.embedding)
              .map(m => {
                const vec = JSON.parse(m.embedding!);
                return { ...m, score: cosineSimilarity(queryVector, vec) };
              })
              .filter(m => m.score > 0.5) // Threshold
              .sort((a, b) => b.score - a.score)
              .slice(0, 5); // Top 5
            
            if (scoredMemories.length > 0) {
              const memoryContext = scoredMemories.map(m => `- [${m.category}] ${m.content}`).join("\n");
              finalSystemPrompt += `\n\n<SIYA_MEMORY>\nThe following context are explicitly taught memories and preferences about the user. Adhere to them strictly when formulating your response:\n${memoryContext}\n</SIYA_MEMORY>`;
            }
          }
        }
        
        if (settings?.responseStyle && settings.responseStyle !== "Balanced") {
           finalSystemPrompt += `\n\nUser explicitly prefers a response style that is: ${settings.responseStyle}.`;
        }
      } catch (memErr) {
        console.error("Memory Engine Error in Chat:", memErr);
      }

      // If no conversation ID, create one
      if (!currentConversationId) {
        const title = lastUserMessage.content.substring(0, 40) + (lastUserMessage.content.length > 40 ? "..." : "");
        const newConversation = await prisma.conversation.create({
          data: {
            userId,
            title,
          }
        });
        currentConversationId = newConversation.id;
      }

      // Ensure the conversation actually exists for this user (prevent injecting messages into others' chats)
      const convCheck = await prisma.conversation.findFirst({
        where: { id: currentConversationId, userId }
      });

      if (convCheck) {
        await prisma.message.create({
          data: {
            conversationId: currentConversationId,
            role: "user",
            content: lastUserMessage.content,
          }
        });
      } else {
         return NextResponse.json({ error: "Invalid conversation ID." }, { status: 400 });
      }
    }

    const formattedHistory = messages.slice(-20).map((msg: any) => ({
      role: (msg.role === "user" ? "user" : "assistant") as "user" | "assistant",
      content: msg.content,
    }));

    if (!process.env.NVIDIA_API_KEY || !process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "API Keys are not configured." }, { status: 500 });
    }

    const abortController = new AbortController();
    let timeoutId: NodeJS.Timeout | undefined;

    // Clean up function to save assistant message
    const saveAssistantMessage = async (content: string) => {
      try {
        if (currentConversationId && content.trim() !== '') {
          await prisma.message.create({
            data: {
              conversationId: currentConversationId,
              role: "assistant",
              content: content,
            }
          });
          // Update conversation updated_at
          await prisma.conversation.update({
            where: { id: currentConversationId },
            data: { updatedAt: new Date() }
          });
        }
      } catch (err) {
        console.error("Failed to save assistant message", err);
      }
    };

    req.signal.addEventListener('abort', () => {
      abortController.abort();
    });

    try {
      timeoutId = setTimeout(() => {
        abortController.abort();
      }, 10000);
      
      const nvidiaResponse = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NVIDIA_API_KEY}`,
        },
        body: JSON.stringify({
          model: process.env.NVIDIA_MODEL || 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning',
          messages: [{ role: "system", content: finalSystemPrompt }, ...formattedHistory],
          temperature: 0.6,
          top_p: 0.95,
          max_tokens: parseInt(process.env.NVIDIA_MAX_TOKENS || '65536'),
          ...(process.env.NVIDIA_MODEL?.includes('reasoning') ? { reasoning_budget: parseInt(process.env.NVIDIA_REASONING_BUDGET || '16384') } : {}),
          stream: true
        }),
        signal: abortController.signal
      });

      if (!nvidiaResponse.ok) {
        throw new Error(`NVIDIA API Error: ${nvidiaResponse.status}`);
      }

      clearTimeout(timeoutId);

      const stream = new ReadableStream({
        async start(controller) {
          const reader = nvidiaResponse.body?.getReader();
          if (!reader) {
            controller.close();
            return;
          }
          const decoder = new TextDecoder();
          let buffer = '';
          let isReasoning = false;
          let hasFinishedReasoning = false;
          let fullResponse = '';
          
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                // Done reading
                // We send a custom event containing the conversation ID so the frontend can update URL if it was a new chat
                const meta = JSON.stringify({ conversationId: currentConversationId });
                controller.enqueue(new TextEncoder().encode(`\n\n[META:${meta}]`));
                break;
              }
              
              buffer += decoder.decode(value, { stream: true });
              const lines = buffer.split('\n');
              buffer = lines.pop() || '';
              
              for (const line of lines) {
                if (line.startsWith('data: ') && line !== 'data: [DONE]') {
                  try {
                    const data = JSON.parse(line.slice(6));
                    const delta = data.choices[0]?.delta;
                    
                    if (delta?.reasoning_content) {
                      if (!isReasoning) {
                        isReasoning = true;
                      }
                    }
                    
                    if (delta?.content) {
                      if (isReasoning && !hasFinishedReasoning) {
                        hasFinishedReasoning = true;
                      }
                      fullResponse += delta.content;
                      controller.enqueue(new TextEncoder().encode(delta.content));
                    }
                  } catch (e) {
                    // ignore parse errors for partial chunks
                  }
                }
              }
            }
          } catch (err: any) {
            if (err.name === 'AbortError') {
              console.log("Client aborted the stream. Saving partial response.");
            } else {
              console.error("Stream reading error:", err);
            }
          } finally {
            await saveAssistantMessage(fullResponse);
            controller.close();
          }
        }
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Transfer-Encoding': 'chunked',
        },
      });
      
    } catch (fallbackError) {
      if (timeoutId) clearTimeout(timeoutId);
      console.warn("Nemotron failed or timed out, falling back to Groq Llama 3", fallbackError);
      
      const groqOpenAI = createOpenAI({
        apiKey: process.env.GROQ_API_KEY,
        baseURL: 'https://api.groq.com/openai/v1',
      });
      const groqResult = await streamText({
        model: groqOpenAI('mixtral-8x7b-32768'),
        system: finalSystemPrompt,
        messages: formattedHistory,
        temperature: 0.7,
      });
      
      return new Response(groqResult.textStream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Transfer-Encoding': 'chunked',
        },
      });
    }

  } catch (error: any) {
    console.error("Chat API General Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred processing your request.", details: error.message, stack: error.stack },
      { status: 500 }
    );
  }
}
