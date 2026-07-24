import { NextResponse } from "next/server";
import OpenAI from "openai";
import Groq from "groq-sdk";

const BUILDER_SYSTEM_PROMPT = `You are Aura Code, an elite digital twin and software builder.

CRITICAL RULES:
1. If the user just says hello, asks a general question, or is chatting normally, DO NOT WRITE CODE. Just answer naturally with text.
2. ONLY generate React code if the user EXPLICITLY asks you to "build", "create", "code", or "design" a UI/app.

WHEN BUILDING CODE (and ONLY when building code), you must wrap your complete React component exactly like this:
\`\`\`javascript render
export default function App() {
  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg">
      <h1 className="text-2xl font-bold">Hello World</h1>
    </div>
  );
}
\`\`\`
`;

const NORMAL_SYSTEM_PROMPT = `You are Aura AI, an elite digital assistant. You are highly intelligent, friendly, and conversational.
Answer the user's questions clearly and concisely. You do NOT need to generate React applications unless explicitly asked. Provide normal text responses.`;

export async function POST(req: Request) {
  try {
    const { messages, mode = 'builder' } = await req.json();
    console.log("Loaded API Keys:", {
      groq: !!process.env.GROQ_API_KEY,
    });

    const SYSTEM_PROMPT = mode === 'normal' ? NORMAL_SYSTEM_PROMPT : BUILDER_SYSTEM_PROMPT;

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    // Security: Limit history to last 20 messages to prevent context exhaustion and massive payload attacks
    const formattedHistory = messages.slice(-20).map((msg: any) => ({
      role: msg.role === "user" ? "user" : "assistant",
      content: msg.content,
    }));

    // --- ATTEMPT 1: POLLINATIONS (100% FREE & KEYLESS) ---
    try {
      // Pollinations provides a free OpenAI-compatible endpoint that doesn't require a key
      const openai = new OpenAI({
        baseURL: "https://text.pollinations.ai/openai",
        apiKey: "dummy-key-not-needed",
        timeout: 5000 // 5 seconds timeout to prevent hanging
      });

      const response = await openai.chat.completions.create({
        model: "openai", // Their default free routing model
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...formattedHistory
        ],
        temperature: 0.7,
      });

      const text = response.choices[0]?.message?.content || "";
      return NextResponse.json({ text, provider: "pollinations" });
    } catch (pollinationsError) {
      console.error("Pollinations Error:", pollinationsError);
    }

    // --- ATTEMPT 2: GROQ (ACTIVE IN .ENV) ---
    const groqKey = process.env.GROQ_API_KEY;
    if (groqKey) {
      try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${groqKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [{ role: "system", content: SYSTEM_PROMPT }, ...formattedHistory],
            temperature: 0.7
          })
        });
        
        if (response.ok) {
          const data = await response.json();
          return NextResponse.json({ text: data.choices[0]?.message?.content || "", provider: "groq" });
        } else {
          console.error("Groq HTTP Error:", await response.text());
        }
      } catch (groqError) {
        console.error("Groq Fetch Error:", groqError);
      }
    }

    // --- ATTEMPT 1.5: OPENAI (Highly Reliable) ---
    const openAIKey = process.env.OPENAI_API_KEY;
    if (openAIKey) {
      try {
        const openai = new OpenAI({ apiKey: openAIKey });
        const response = await openai.chat.completions.create({
          model: "gpt-4o-mini", // Fast model
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...formattedHistory
          ],
          temperature: 0.7,
        });

        const text = response.choices[0]?.message?.content || "";
        return NextResponse.json({ text, provider: "openai" });
      } catch (openaiError) {
        console.error("OpenAI Error:", openaiError);
      }
    }

    // --- ATTEMPT 1.8: ANTHROPIC (Fast & Reliable) ---
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    if (anthropicKey) {
      try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "x-api-key": anthropicKey,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json"
          },
          body: JSON.stringify({
            model: "claude-3-haiku-20240307",
            system: SYSTEM_PROMPT,
            messages: formattedHistory,
            max_tokens: 2000
          })
        });
        if (response.ok) {
          const data = await response.json();
          return NextResponse.json({ text: data.content[0].text, provider: "anthropic" });
        } else {
           console.error("Anthropic HTTP Error:", await response.text());
        }
      } catch (err) {
        console.error("Anthropic Error:", err);
      }
    }

    // --- ATTEMPT 3: GITHUB MODELS (FREE VIA GITHUB PAT) ---
    const githubToken = process.env.GITHUB_TOKEN;
    if (githubToken) {
      try {
        const openai = new OpenAI({ apiKey: githubToken, baseURL: "https://models.inference.ai.azure.com" });
        const response = await openai.chat.completions.create({
          model: "gpt-4o-mini", messages: [{ role: "system", content: SYSTEM_PROMPT }, ...formattedHistory], temperature: 0.7, max_tokens: 2000,
        });
        return NextResponse.json({ text: response.choices[0]?.message?.content || "", provider: "github" });
      } catch (err) { console.error("GitHub Error:", err); }
    }

    // --- ATTEMPT 4: OPENROUTER (BEST FOR OPEN SOURCE) ---
    const openRouterKey = process.env.OPENROUTER_API_KEY;
    if (openRouterKey) {
      try {
        const openai = new OpenAI({ apiKey: openRouterKey, baseURL: "https://openrouter.ai/api/v1" });
        const response = await openai.chat.completions.create({
          model: "meta-llama/llama-3-8b-instruct:free", messages: [{ role: "system", content: SYSTEM_PROMPT }, ...formattedHistory], temperature: 0.7,
        });
        return NextResponse.json({ text: response.choices[0]?.message?.content || "", provider: "openrouter" });
      } catch (err) { console.error("OpenRouter Error:", err); }
    }

    // --- ATTEMPT 5: GOOGLE GEMINI ---
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
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
      } catch (err) { console.error("Gemini Error:", err); }
    }

    // --- ATTEMPT 6: COHERE (FREE DEVELOPER TIER) ---
    const cohereKey = process.env.COHERE_API_KEY;
    if (cohereKey) {
      try {
        const response = await fetch("https://api.cohere.ai/v1/chat", {
          method: "POST", headers: { "Authorization": `Bearer ${cohereKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "command-r-plus", message: formattedHistory[formattedHistory.length - 1].content, preamble: SYSTEM_PROMPT,
            chat_history: formattedHistory.slice(0, -1).map((m: any) => ({ role: m.role === "user" ? "USER" : "CHATBOT", message: m.content }))
          })
        });
        if (response.ok) {
          const data = await response.json();
          return NextResponse.json({ text: data.text, provider: "cohere" });
        }
      } catch (err) { console.error("Cohere Error:", err); }
    }

    // --- ATTEMPT 7: HUGGINGFACE ---
    const hfKey = process.env.HUGGINGFACE_API_KEY;
    if (hfKey) {
      try {
        const openai = new OpenAI({ apiKey: hfKey, baseURL: "https://api-inference.huggingface.co/v1" });
        const response = await openai.chat.completions.create({
          model: "meta-llama/Meta-Llama-3-8B-Instruct", messages: [{ role: "system", content: SYSTEM_PROMPT }, ...formattedHistory], temperature: 0.7,
        });
        return NextResponse.json({ text: response.choices[0]?.message?.content || "", provider: "huggingface" });
      } catch (err) { console.error("HuggingFace Error:", err); }
    }

    // If all fail or no keys exist
    return NextResponse.json(
      { error: "AI Services unavailable. Pollinations is down and no valid API keys were found in .env." },
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
