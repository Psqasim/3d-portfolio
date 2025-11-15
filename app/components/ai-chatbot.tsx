"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, Send, Sparkles } from 'lucide-react'
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  suggestedQuestions?: string[]
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [showPreview, setShowPreview] = useState(true)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Greetings! 👋",
      timestamp: new Date(),
      suggestedQuestions: [
        "What are your main skills and expertise?",
        "Tell me about your recent projects",
        "How can I hire you for a project?",
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("[v0] Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handlePreviewClick = () => {
    setShowPreview(false)
    setIsOpen(true)
  }

  const handlePreviewClose = () => {
    setShowPreview(false)
  }

  const handleSuggestedQuestion = async (question: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: question,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("[v0] Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Floating chat button - hidden when preview is shown */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 p-4 rounded-full shadow-lg transition-all duration-300 z-40",
          "bg-gradient-to-br from-primary to-primary/80 hover:from-primary hover:to-primary text-primary-foreground",
          "hover:shadow-xl hover:scale-110 flex items-center justify-center",
          (isOpen || showPreview) && "hidden",
        )}
        aria-label="Open AI Assistant chat"
      >
        <Sparkles size={24} className="animate-pulse" />
      </button>

      {showPreview && !isOpen && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="w-80 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-6 pb-20 shadow-2xl backdrop-blur-sm relative">
            {/* Close button */}
            <button
              onClick={handlePreviewClose}
              className="absolute top-4 right-4 p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors shadow-lg"
              aria-label="Close preview"
            >
              <X size={18} />
            </button>

            {/* Message content */}
            <div className="pr-4">
              <h3 className="text-lg font-semibold text-primary mb-2">Hi! I'm Qasim's AI Assistant</h3>
              <p className="text-sm text-foreground/80 mb-6">How can I assist you today?</p>

              {/* Action button */}
              <button
                onClick={handlePreviewClick}
                className="w-full bg-primary text-primary-foreground py-2.5 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                Start Chat
                <Sparkles size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Chat widget */}
      <div
        ref={containerRef}
        className={cn(
          "fixed bottom-6 right-6 w-full sm:w-96 max-h-96 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 z-50",
          "sm:max-h-[600px] bg-gradient-to-br from-background to-background/95 border border-border/50",
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none",
          "sm:bottom-6 sm:right-6 bottom-0 right-0 sm:rounded-2xl rounded-t-3xl",
          isOpen && "sm:rounded-2xl",
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/10 to-transparent">
          <div className="flex items-center gap-3 flex-1">
            <div className="p-2 bg-gradient-to-br from-primary to-primary/70 rounded-lg shadow-md">
              <Sparkles size={20} className="text-primary-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-sm text-foreground">AI Assistant</h3>
              <p className="text-xs text-muted-foreground truncate">Ask me anything about my work</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0 ml-2"
            aria-label="Close chat"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id}>
              {/* Message content */}
              <div className={cn("flex gap-3", message.role === "user" ? "justify-end" : "justify-start")}>
                {message.role === "assistant" && (
                  <div className="p-1.5 bg-primary/20 rounded-lg flex-shrink-0 h-fit">
                    <Sparkles size={16} className="text-primary" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-xs px-4 py-2.5 rounded-lg",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-muted text-foreground rounded-bl-none",
                  )}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>

              {/* Suggested questions display */}
              {message.suggestedQuestions && message.suggestedQuestions.length > 0 && (
                <div className="mt-4 space-y-2 ml-8">
                  <p className="text-xs text-muted-foreground font-medium mb-2">Ready to dive in? Choose a question to get started!</p>
                  {message.suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      disabled={isLoading}
                      className="w-full text-left px-4 py-3 bg-background border border-border/50 rounded-lg hover:bg-muted hover:border-primary/30 transition-colors text-sm text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="p-1.5 bg-primary/20 rounded-lg flex-shrink-0">
                <Sparkles size={16} className="text-primary" />
              </div>
              <div className="bg-muted text-foreground px-4 py-2.5 rounded-lg rounded-bl-none">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce animation-delay-100" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce animation-delay-200" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-border p-4 bg-background/50 backdrop-blur">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="flex-1 px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
