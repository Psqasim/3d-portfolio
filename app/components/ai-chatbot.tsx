'use client'

import type React from 'react'

import { useState, useRef, useEffect } from 'react'
import { X, Send, Sparkles, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  suggestedQuestions?: string[]
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [showPreview, setShowPreview] = useState(true)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Greetings! 👋',
      timestamp: new Date(),
      suggestedQuestions: [
        'What are your main skills and expertise?',
        'Tell me about your recent projects',
        'How can I hire you for a project?',
      ],
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('[v0] Chat error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
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
      role: 'user',
      content: question,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('[v0] Chat error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
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
          'fixed bottom-6 right-6 p-4 rounded-full shadow-lg transition-all duration-300 z-40',
          'bg-gradient-to-br from-primary to-primary/80 hover:from-primary hover:to-primary text-primary-foreground',
          'hover:shadow-xl hover:scale-110 flex items-center justify-center',
          (isOpen || showPreview) && 'hidden'
        )}
        aria-label="Open AI Assistant chat"
      >
        <Sparkles size={24} />
      </button>

      {showPreview && !isOpen && (
        <div className="fixed bottom-24 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-sm">
          {/* Solid background preview card with proper shadow and border */}
          <div className="w-80 bg-background border-2 border-primary/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            {/* Background gradient decoration - subtle */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-accent/5" />
            
            {/* Close button */}
            <button
              onClick={handlePreviewClose}
              className="absolute top-4 right-4 p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors shadow-md z-10"
              aria-label="Close preview"
            >
              <X size={18} />
            </button>

            {/* Bot icon */}
            <div className="mb-4 inline-flex p-3 bg-primary/20 rounded-2xl border border-primary/30">
              <Sparkles size={24} className="text-primary" />
            </div>

            {/* Message content */}
            <h3 className="text-lg font-bold text-foreground mb-2">Hi! I'm Qasim's AI Assistant</h3>
            <p className="text-sm text-muted-foreground mb-8">How can I assist you today?</p>

            {/* Action button */}
            <button
              onClick={handlePreviewClick}
              className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              Start Chat
              <Sparkles size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        ref={containerRef}
        className={cn(
          'fixed bottom-6 right-6 w-full sm:w-96 max-h-96 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 z-50',
          'sm:max-h-[600px] bg-background border-2 border-border',
          'sm:bottom-6 sm:right-6 bottom-0 right-0 sm:rounded-2xl rounded-t-3xl',
          isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible pointer-events-none'
        )}
      >
        {/* Header with solid background */}
        <div className="flex items-center justify-between p-4 border-b-2 border-border bg-gradient-to-r from-primary/15 to-transparent rounded-t-2xl">
          <div className="flex items-center gap-3 flex-1">
            <div className="p-2.5 bg-primary text-primary-foreground rounded-xl shadow-md">
              <Sparkles size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-foreground text-sm">AI Assistant</h3>
              <p className="text-xs text-muted-foreground truncate">Ask me anything</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0 ml-2"
            aria-label="Close chat"
          >
            <X size={20} className="text-foreground" />
          </button>
        </div>

        {/* Messages - solid background */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
          {messages.map((message) => (
            <div key={message.id}>
              {/* Message content */}
              <div className={cn('flex gap-3', message.role === 'user' ? 'justify-end' : 'justify-start')}>
                {message.role === 'assistant' && (
                  <div className="p-1.5 bg-primary/20 rounded-lg flex-shrink-0 h-fit border border-primary/30">
                    <Sparkles size={16} className="text-primary" />
                  </div>
                )}
                <div
                  className={cn(
                    'max-w-xs px-4 py-2.5 rounded-xl shadow-sm',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none border border-primary/50'
                      : 'bg-muted text-foreground rounded-bl-none border border-border'
                  )}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>

              {/* Suggested questions display */}
              {message.suggestedQuestions && message.suggestedQuestions.length > 0 && (
                <div className="mt-4 space-y-2 ml-8">
                  <p className="text-xs text-muted-foreground font-semibold mb-3">Choose a question:</p>
                  {message.suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      disabled={isLoading}
                      className="w-full text-left px-4 py-3 bg-background border-2 border-border rounded-xl hover:bg-muted hover:border-primary/50 transition-all text-sm text-foreground disabled:opacity-50 disabled:cursor-not-allowed font-medium"
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
              <div className="p-1.5 bg-primary/20 rounded-lg flex-shrink-0 border border-primary/30">
                <Sparkles size={16} className="text-primary" />
              </div>
              <div className="bg-muted text-foreground px-4 py-2.5 rounded-xl rounded-bl-none border border-border shadow-sm">
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

        {/* Input area - solid background */}
        <div className="border-t-2 border-border p-4 bg-background rounded-b-2xl">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-2.5 bg-muted text-foreground border-2 border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder-muted-foreground"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="p-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg active:scale-95 flex-shrink-0"
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
