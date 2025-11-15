import { type NextRequest, NextResponse } from "next/server"

const PORTFOLIO_CONTEXT = `
You are Qasim's AI Assistant. Your role is to help visitors learn about Qasim's portfolio, skills, and experience.

About Qasim:
- Full Stack Developer with expertise in Next.js, TypeScript, React, and modern web technologies
- Certified in AI, Metaverse, and Web 3.0
- Passionate about building innovative solutions using cutting-edge technologies
- Experienced with database design, API development, and cloud deployment
- Interested in AI applications and emerging technologies

Skills:
- Frontend: React, Next.js, TypeScript, Tailwind CSS, Framer Motion
- Backend: Node.js, Express, API design, REST/GraphQL
- Databases: PostgreSQL, MongoDB, Supabase, Firebase
- Tools: Git, Docker, Vercel, AWS, Web3 technologies
- AI/ML: Machine Learning basics, AI integrations, Prompt Engineering

Projects:
- Full Stack web applications
- AI-powered features
- Portfolio websites
- Web 3.0 applications

Keep responses concise and friendly. If asked something outside Qasim's portfolio, politely redirect to portfolio topics.
`

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: PORTFOLIO_CONTEXT,
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    const message = data.choices[0]?.message?.content

    if (!message) {
      throw new Error("No response from OpenAI")
    }

    return NextResponse.json({ message })
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    return NextResponse.json({ error: "Failed to process chat request" }, { status: 500 })
  }
}
