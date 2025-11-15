"use client"

import type React from "react"
import { ThemeProvider } from "./components/theme-provider"
import { AIChatbot } from "./components/ai-chatbot"

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider>
      {children}
      <AIChatbot />
    </ThemeProvider>
  )
}
