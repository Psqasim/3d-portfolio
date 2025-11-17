"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Phone, Linkedin, Github, Send, CheckCircle, AlertCircle, Twitter } from "lucide-react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage("")

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send email")
      }

      setSubmitStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
      setTimeout(() => setSubmitStatus("idle"), 5000)
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Failed to send message")
      setTimeout(() => setSubmitStatus("idle"), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const phoneNumber = "+923010832227"
  const message = "Hello! I'm interested in your services. Can we talk about a project?"
  const encodedMessage = encodeURIComponent(message)
  
  const contactInfo = [
    { icon: Mail, label: "Email", value: "muhammadqasim0326@gmail.com", href: "mailto:muhammadqasim0326@gmail.com" },
    { icon: Phone, label: "Phone", value: "+92 301 0832227", href: `https://wa.me/${phoneNumber}?text=${encodedMessage}` },
  ]

  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/muhammad-qasim-5bba592b4", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/Psqasim", label: "GitHub" },
    { icon: Twitter, href: "https://x.com/psqasim0", label: "Twitter" },
  ]

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-card/30">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Get In Touch</h2>
          <div className="w-12 h-1 bg-accent rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
          {/* Contact Info */}
          <div className="order-2 md:order-1">
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8">
              I'm always open to new opportunities and collaborations. Feel free to reach out!
            </p>

            {/* Contact Cards */}
            <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10 md:mb-12">
              {contactInfo.map((info, idx) => {
                  const Icon = info.icon
                  return (
                    <a
                      key={idx}
                      href={info.href}
                      className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 glass rounded-lg hover:shadow-lg transition-all group active:scale-95"
                    >
                      <div className="p-2.5 sm:p-3 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors shrink-0">
                        <Icon className="text-accent" size={20} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm text-muted-foreground">{info.label}</p>
                        <p className="font-semibold text-sm sm:text-base break-words">{info.value}</p>
                      </div>
                    </a>
                  )
                })}
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Follow Me</h3>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {socialLinks.map((link, idx) => {
                  const Icon = link.icon
                  return (
                    <a
                      key={idx}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 sm:p-3.5 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors active:scale-95 min-w-11 min-h-11 flex items-center justify-center"
                      aria-label={link.label}
                    >
                      <Icon size={22} className="sm:w-6 sm:h-6" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="order-1 md:order-2">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm sm:text-base font-medium mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  placeholder="Your name"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm sm:text-base font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  placeholder="your@email.com"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm sm:text-base font-medium mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  placeholder="Message subject"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm sm:text-base font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
                  placeholder="Your message..."
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[44px]"
              >
                <Send size={18} className="sm:w-5 sm:h-5" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {submitStatus === "success" && (
                <div className="p-3 sm:p-4 bg-green-500/10 border border-green-500/50 rounded-lg flex items-start gap-2 sm:gap-3">
                  <CheckCircle className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" size={18} />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-green-600 dark:text-green-400 text-sm sm:text-base">
                      Message sent successfully!
                    </p>
                    <p className="text-xs sm:text-sm text-green-600/70 dark:text-green-400/70">
                      I'll get back to you soon.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-3 sm:p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-2 sm:gap-3">
                  <AlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" size={18} />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-red-600 dark:text-red-400 text-sm sm:text-base">
                      Failed to send message
                    </p>
                    <p className="text-xs sm:text-sm text-red-600/70 dark:text-red-400/70 break-words">
                      {errorMessage || "Please try again."}
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}