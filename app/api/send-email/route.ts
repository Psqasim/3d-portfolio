import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate input
    if (!name || !email || !subject || !message) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Send email to yourself
    const result = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "muhammadqasim0326@gmail.com",
      replyTo: email,
      subject: `New Portfolio Message: ${subject}`,
      html: `
        <h2>New Message from Your Portfolio</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    })

    if (result.error) {
      return Response.json({ error: result.error.message }, { status: 400 })
    }

    return Response.json({ success: true, data: result.data })
  } catch (error) {
    console.error("Email error:", error)
    return Response.json({ error: "Failed to send email" }, { status: 500 })
  }
}
