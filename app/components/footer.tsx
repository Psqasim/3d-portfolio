"use client"
import { Mail, Linkedin, Github, Heart, ArrowUp, Twitter } from 'lucide-react'
import { useState } from "react"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [showScrollTop, setShowScrollTop] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-card/50 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4 gradient-text">Muhammad Qasim</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Full Stack Developer & AI Enthusiast crafting modern web experiences with Next.js, TypeScript, and
              cutting-edge technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {["About", "Projects", "Skills", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-1 group"
                  >
                    {item}
                    <span className="inline-block opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-4px] group-hover:translate-x-0">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex gap-4 mb-6">
              <a
                href="https://www.linkedin.com/in/muhammad-qasim-5bba592b4"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-muted rounded-lg hover:bg-primary/20 hover:text-primary transition-colors group"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://x.com/psqasim0"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-muted rounded-lg hover:bg-primary/20 hover:text-primary transition-colors group"
                aria-label="X (Twitter)"
              >
                <Twitter size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://github.com/Psqasim"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-muted rounded-lg hover:bg-primary/20 hover:text-primary transition-colors group"
                aria-label="GitHub"
              >
                <Github size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="mailto:muhammadqasim0326@gmail.com"
                className="p-2 bg-muted rounded-lg hover:bg-primary/20 hover:text-primary transition-colors group"
                aria-label="Email"
              >
                <Mail size={20} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>

            {/* Scroll to top button */}
            <button
              onClick={scrollToTop}
              className="w-full px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 group"
              aria-label="Scroll to top"
            >
              <span>Top</span>
              <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} Muhammad Qasim. All rights reserved.</p>
            <p className="flex items-center gap-2">
              Made with
              <Heart size={16} className="text-accent animate-pulse" />
              by Muhammad Qasim
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
