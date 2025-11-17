"use client"

import { useEffect, useState } from "react"
import { Menu, X, Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from "./theme-provider"

export function Navigation() {
  const { isDark, themeMode, setThemeMode } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showThemeMenu, setShowThemeMenu] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ]

  const handleThemeChange = (mode: ThemeMode) => {
    setThemeMode(mode)
    setShowThemeMenu(false)
  }

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-300 safe-area-top ${
          isScrolled
            ? "glass border-b border-border/50 shadow-lg backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a href="#" className="text-2xl font-bold gradient-text hover:opacity-80 transition-opacity">
                MQ
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-foreground hover:text-accent transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setShowThemeMenu(!showThemeMenu)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  aria-label="Theme menu"
                >
                  {themeMode === "system" ? (
                    <Monitor size={20} />
                  ) : isDark ? (
                    <Moon size={20} />
                  ) : (
                    <Sun size={20} />
                  )}
                </button>

                {/* Theme dropdown */}
                {showThemeMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <button
                      onClick={() => handleThemeChange("light")}
                      className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 transition-colors ${
                        themeMode === "light" ? "bg-primary/20 text-primary" : "hover:bg-muted text-foreground"
                      }`}
                    >
                      <Sun size={16} />
                      Light Mode
                    </button>
                    <button
                      onClick={() => handleThemeChange("dark")}
                      className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 transition-colors ${
                        themeMode === "dark" ? "bg-primary/20 text-primary" : "hover:bg-muted text-foreground"
                      }`}
                    >
                      <Moon size={16} />
                      Dark Mode
                    </button>
                    <button
                      onClick={() => handleThemeChange("system")}
                      className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 transition-colors ${
                        themeMode === "system" ? "bg-primary/20 text-primary" : "hover:bg-muted text-foreground"
                      }`}
                    >
                      <Monitor size={16} />
                      System Mode
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setIsOpen(false)}
            style={{ top: "64px" }}
          />

          {/* Mobile Menu Panel */}
          <div className="fixed top-16 left-0 right-0 z-30 md:hidden bg-background border-b border-border/50 safe-area-bottom shadow-lg">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-2 max-h-[calc(100vh-64px)] overflow-y-auto">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-3 text-base font-medium text-foreground hover:bg-accent/20 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}

type ThemeMode = "light" | "dark" | "system"
