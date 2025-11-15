// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge"; // optional, keep if you prefer edge runtime

const PORTFOLIO_CONTEXT = `
You are Qasim's AI Assistant.

Your ONLY job:
- Help visitors learn about Qasim's portfolio, projects, skills, services, background, and how to contact him.

STRICT RULES:
- If the user asks anything OUTSIDE Qasim’s portfolio (math, jokes, general knowledge, politics, cooking, celebrities, unrelated coding help), DO NOT answer it.
- Instead reply: "I'm here only to help you explore Qasim's portfolio, skills, and projects. Please ask something related to his work."

- Do NOT invent facts.
- Keep replies short, friendly, and helpful.

Allowed Topics:
- Qasim’s skills, experience, projects, services, contact info, technologies, education, certifications.
`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request: messages must be an array" }, { status: 400 });
    }

    // keep last N messages to reduce token cost
    const MAX_HISTORY = 8;
    const trimmed = messages.slice(-MAX_HISTORY).map((m: any) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.content,
    }));

    const input = [
      { role: "system", content: PORTFOLIO_CONTEXT },
      ...trimmed,
    ];

    const headers: Record<string,string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    };
    if (process.env.OPENAI_PROJECT_ID) {
      headers["OpenAI-Project"] = process.env.OPENAI_PROJECT_ID;
    }

    const resp = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input,                    // array of messages (system + trimmed conversation)
        temperature: 0.2,
        max_output_tokens: 500,
        // NO 'conversation' or unsupported fields here
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error("OpenAI responses error:", resp.status, text);
      throw new Error(`OpenAI API error: ${resp.status}`);
    }

    const data = await resp.json();

    // Safe extraction of the assistant text:
    let messageText = "";

    if (typeof data.output_text === "string" && data.output_text.trim()) {
      messageText = data.output_text;
    } else if (Array.isArray(data.output) && data.output.length > 0) {
      // Try to gather textual pieces
      messageText = data.output
        .map((o: any) => {
          if (typeof o === "string") return o;
          // 'content' can be array or string
          if (o.content) {
            if (typeof o.content === "string") return o.content;
            if (Array.isArray(o.content)) {
              return o.content.map((c: any) => (c?.text ?? c?.value ?? "")).join("");
            }
          }
          return o.text ?? "";
        })
        .join("\n")
        .trim();
    } else if (data.output && data.output_text) {
      messageText = data.output_text;
    }

    if (!messageText) {
      // final fallback: include a short JSON for debugging (trimmed)
      messageText = (typeof data === "object") ? JSON.stringify(data).slice(0, 2000) : String(data);
    }

    return NextResponse.json({ message: messageText }, { status: 200, headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("[v0] Chat API error:", err);
    return NextResponse.json({ error: "Failed to process chat request" }, { status: 500 });
  }
}
